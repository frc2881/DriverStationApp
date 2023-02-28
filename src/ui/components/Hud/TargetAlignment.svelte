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
    height: 350,
    type: Two.Types.canvas,
    autostart: true
  });

  const robotSize = { width: 48, length: 54 };

  const robotFrame = two.makeRectangle(0, 0, robotSize.width - 6, robotSize.length - 6);
  robotFrame.noFill();
  robotFrame.stroke = "#FF69B4";
  robotFrame.linewidth = 3;

  const robotArm = two.makeRectangle(0, 0, 3, 24);
  robotArm.fill = "#FF69B4";
  robotArm.noStroke();
  robotArm.translation.x = 0;
  robotArm.translation.y = 8;

  const alignmentGuide = two.makePath(0, 0, 12, 12, 24);
  alignmentGuide.fill = "#FF69B499";
  alignmentGuide.noStroke();
  alignmentGuide.translation.x = 0;
  alignmentGuide.translation.y = 34;

  const robot = two.makeGroup([
    robotFrame,
    robotArm,
    alignmentGuide
  ]);

  const barrier = two.makeRectangle(0, 0, 550, 10);
  barrier.fill = "#FFFFFF";
  barrier.noStroke();
  barrier.position.x = barrier.width / 2;
  barrier.position.y = 171 + (barrier.height / 2); 

  const field = two.makeGroup([
    barrier,
    robot
  ]);

  onMount(async () => {
    two.appendTo(host);
	});

  $: {
    alliance = isRedAlliance?.value ? Alliance.Red : Alliance.Blue;

    if (robotPose?.value) {
      [ pose.x, pose.y, pose.rotation ] = robotPose?.value as Array<number>;
    }

    robot.position.x = pose.y * 100;
    robot.position.y = pose.x * 100 - (robotFrame.height / 2);
    robot.rotation = pose.rotation;

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
      background: #FFFFFF33;
    }
  }
</style>