<script lang="ts">
  import Video_02 from "carbon-pictograms-svelte/lib/Video_02.svelte";
  import { Utils } from "../../../common";

  export let stream: string;
  export let isConnected: boolean;
  export let width: string;
  export let height: string;
  export let translation: number = 0;

  const transparentPixelImage = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

  let image: HTMLImageElement;

  const reloadStream = async (): Promise<void> => {
    if (image) {
      image.src = transparentPixelImage;
      await Utils.wait(1);
      image.src = stream;
    }
  }

  (async (): Promise<void> => {
    await Utils.wait(30);
    reloadStream();
  })();
</script>

<div class="main" style:width style:height>
  <div class="icon"><Video_02 class="watermark" /></div>
  <img 
    src={ isConnected ? stream : transparentPixelImage } 
    bind:this={ image } 
    on:error={ reloadStream } 
    style:transform={ `translate(${ translation }px, 0)` }
    alt="" />
</div>

<style lang="postcss">
  .main {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      position: absolute;
		  
      :global {
        .watermark {
          width: 48px;
          height: 48px;
          transform: scale(4);
          fill: var(--app-color-pink);
          opacity: 0.2;
        }
      }
    }

    & img {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
</style>