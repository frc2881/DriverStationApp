<script lang="ts">
  import CheckmarkFilled from "carbon-icons-svelte/lib/CheckmarkFilled.svelte";

  export let frontNoteObjectSensorHasTarget: boolean;
  export let frontNoteObjectSensorTargetHeading: number;
  export let frontNoteObjectSensorTargetArea: number;

  let isAlignedToTarget: boolean = false;
  $:{ 
    isAlignedToTarget = frontNoteObjectSensorHasTarget && Math.abs(frontNoteObjectSensorTargetHeading) <= 3.0;
  }
</script>

<div class="main">
  <div 
    class="alignment"
    class:active={ isAlignedToTarget }>
    <CheckmarkFilled width=540 height=540 fill="#00CC00" />
  </div>
  <div class="robot"></div>
  <div 
    class="note"
    class:active={ frontNoteObjectSensorHasTarget }
    style:transform={ `translate(${ frontNoteObjectSensorTargetHeading * 6 }px, ${ frontNoteObjectSensorTargetArea * 18 }px)` }></div>
</div>

<style>
  .main {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden;

    & .robot {
      position: absolute;
      bottom: -10px;
      width: 330px;
      height: 80px;
      border: 15px solid var(--app-color-pink);
      border-radius: 10px;
      border-bottom: none;
    }

    & .note {
      position: absolute;
      top: 20px;
      width: 160px;
      height: 160px;
      border-radius: 80px;
      border: 20px solid var(--app-color-charcoal);
      opacity: 0.1;
      margin-top: 2em;

      &.active {
        border: 20px solid var(--app-color-orange);
        opacity: 1;
        margin-top: 0;
      }
    }

    & .alignment {
      position: absolute;
      width: 100%;
      height: 100%;
      display: none;
      align-items: center;
      justify-content: center;
      opacity: 0;
      animation: pulse 500ms infinite ease;
      z-index: 9999;

      &.active {
        display: flex;
      }
    }
  }
</style>