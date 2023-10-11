<script>
  import loadingScreen from "../../lib/assets/global/loadingScreen.gif"
  import {onMount} from "svelte"

  let pageLoaded = false
  onMount(() => {
      pageLoaded = true
      pageLoaded = pageLoaded
    });
</script>
{#if !pageLoaded}
<div id="loadingScreen">
  <img src={loadingScreen} alt="loading..." style="width: 15vw; margin: auto; display: block">
  <h1 style="font-family: cursive; text-align: center;">LOADING...</h1>
</div>
{/if}
hewo


<style>
  #loadingScreen{
    z-index: 9999;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgb(255, 255, 255);
  }
</style>