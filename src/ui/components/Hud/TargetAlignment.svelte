<script lang="ts">
  import Two from "two.js";
  import { onMount } from "svelte";
  import { 
    NetworkTablesTopic,
    Pose,
    Alliance
	} from "../../../common";

  export let robotPose: NetworkTablesTopic;
  export let isRedAlliance: NetworkTablesTopic;

  const zoneLimits = {
    [Alliance.Blue]: 1.70,
    [Alliance.Red]: 14.78
  }

  let alliance: Alliance = Alliance.Blue;
  let pose: Pose = { x: 0, y: 0, rotation: 0 };
  let isInRange: boolean = false;
  let host: HTMLDivElement;

  const two = new Two({
    width: 550,
    height: 300,
    type: Two.Types.canvas,
    autostart: true
  });

  const background = two.makeRectangle(0, 0, 550, 300);
  background.fill = "#330000";

  const robotFrame = two.makeRectangle(0, 0, 48, 54);

  const robot = two.makeGroup([
    robotFrame
  ]);

  onMount(async () => {
    two.appendTo(host);
	});

  $: {
    alliance = isRedAlliance?.value ? Alliance.Red : Alliance.Blue;

    if (robotPose?.value) {
      [ pose.x, pose.y, pose.rotation ] = robotPose?.value as Array<number>;
    }

    if (alliance === Alliance.Red) {
      isInRange = Math.abs(zoneLimits[Alliance.Red] - pose.x) <= 1;
    } else {
      isInRange = Math.abs(pose.x - zoneLimits[Alliance.Blue]) <= 1;
    }

    two.update();
  }
</script>

<div class="main">
  <div class="host" bind:this={ host } />
</div>

<style lang="postcss">
  .main {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    .host {
      width: 550px;
      height: 300px;
      background: red;
    }
  }
</style>