<script lang="ts">
  import { InlineNotification, SkeletonPlaceholder } from "carbon-components-svelte";
  import { Configuration } from "../../config";
  import { 
    NetworkTables
	} from "../../common";
  import { NetworkTablesStore } from "../stores/NetworkTables";
  import CameraStream from "../components/Hud/CameraStream.svelte";
  import MatchTime from "../components/Hud/MatchTime.svelte";
  import Suction from "../components/Hud/Suction.svelte";
  import TargetAlignment from "../components/Hud/TargetAlignment.svelte";

  let networkTables: NetworkTables;
  $: { networkTables = $NetworkTablesStore; }
</script>

<main>
{ #if networkTables.isConnected }
  <div class="cameras">
    <CameraStream 
      stream={ Configuration.Settings.CAMERA_STREAMS.LEFT }
      isConnected={ networkTables.isConnected }
      width={ "960px" } height={ "540px" } translation={ 240 }  />
    <CameraStream 
      stream={ Configuration.Settings.CAMERA_STREAMS.RIGHT }
      isConnected={ networkTables.isConnected }
      width={ "960px" } height={ "540px" } translation={ -240 }  />
  </div>
  <div class="info">
    <TargetAlignment 
      robotPose={ networkTables.topics.get("/SmartDashboard/Drive/Pose") }
      isRedAlliance={ networkTables.topics.get("/FMSInfo/IsRedAlliance") } />
    <MatchTime 
      matchTime={ networkTables.topics.get("/SmartDashboard/Timing/MatchTime") } />
    <Suction
      isEnabled={ networkTables.topics.get("/SmartDashboard/Suction/IsEnabled") }
      topPressureCurrent={ networkTables.topics.get("/SmartDashboard/Suction/Top/Pressure/Current") }
      topPressureMinimum={ networkTables.topics.get("/SmartDashboard/Suction/Top/Pressure/Minimum") }
      topPressureTarget={ networkTables.topics.get("/SmartDashboard/Suction/Top/Pressure/Target") }
      bottomPressureCurrent={ networkTables.topics.get("/SmartDashboard/Suction/Bottom/Pressure/Current") }
      bottomPressureMinimum={ networkTables.topics.get("/SmartDashboard/Suction/Bottom/Pressure/Minimum") }
      bottomPressureTarget={ networkTables.topics.get("/SmartDashboard/Suction/Bottom/Pressure/Target") } />
  </div>
{ :else }
  <div class="inlineNotification">
    <InlineNotification
      title="Robot Not Connected:"
      subtitle={`Attempting to restart connection to ${ networkTables.address } ...`}
      kind="warning-alt"
      lowContrast
      hideCloseButton />
  </div>
  <div class="watermark"><SkeletonPlaceholder class="skeleton" /><svg class="icon"><use xlink:href="#iconRobot"/></svg></div>
{ /if }
</main>

<style lang="postcss">
  main {
    display: grid;
    grid-template-rows: 600px auto;
    row-gap: 20px;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    cursor: none;

    .cameras {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    .info {
      display: grid;
      grid-template-columns: 45% 25% 30%;
      width: 100%;
    }
  }

  .inlineNotification {
    padding: .75em 2em;
  }

  .watermark {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-128px, -128px);

    :global {
      .skeleton {
        position: absolute;
        width: 256px;
        height: 256px;
      }
    }

    .icon {
      position: absolute;
      width: 256px;
      height: 256px;
      fill: var(--app-color-pink);
    }
  }
</style>