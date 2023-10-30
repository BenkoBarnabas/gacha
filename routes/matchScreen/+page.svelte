<script>
  import loadingScreen from "../../lib/assets/global/loadingScreen.gif"
  import {onMount} from "svelte"

  import {clientID,userData, getUserDataFromLocalStorage, deckData} from "../../client"
  import {GetGameIDs, PlayerReady, SveltePageLoaded, currentOpponentId, yourGameParameters} from "../../matchHandler"


  let yourGameID
  let opponentGameID
  let gameKey

  let localDeckData = deckData


  function update() {
        SenseOpponentPresence()
        requestAnimationFrame(update)
  }
  function SenseOpponentReadiness(){

  }


  let pageLoaded = false
  onMount(() => {

    yourGameID = JSON.parse(localStorage.getItem("yourGameID"))
    opponentGameID = JSON.parse(localStorage.getItem("opponentGameID"))
    gameKey = JSON.parse(localStorage.getItem("gameKey"))

    localDeckData = JSON.parse(localStorage.getItem("deckData"))
    console.log("fasz3: logcaPulDa: ",localDeckData);
    if (localDeckData) {
        //localPullData = JSON.parse(localStorage.getItem("userData"))
        getUserDataFromLocalStorage(localDeckData, "deckData")
    } else {
        console.log("Username not found in local storage.");
    }
    GetGameIDs(yourGameID,opponentGameID,gameKey)
      pageLoaded = true
      pageLoaded = pageLoaded

    console.log("u: ",yourGameID,"enemy: ",opponentGameID);

    SveltePageLoaded()
  });
    



    function ChooseDeck(n){
      yourGameParameters.selectedDeck = localDeckData[`deckarray${{n}}`]
    }


</script>

{#if !pageLoaded}
<div id="loadingScreen">
  <img src={loadingScreen} alt="loading..." style="width: 15vw; display: block; margin-top:15%; margin-left:auto; margin-right:auto;">
  <h1 style="font-family: cursive; display: block; text-align:center;">LOADING...</h1>
</div>
{/if}


<div id="main">

  <div id="yourProfile" class="profileDiv">
    <button on:click={() => ChooseDeck(0)}>1deck</button>
    <button on:click={() => ChooseDeck(1)}>2deck</button>
    <button on:click={() => ChooseDeck(2)}>3deck</button>
    <button on:click={() => ChooseDeck(3)}>4deck</button>
  </div>
  <button on:click={PlayerReady}>READY</button>
</div>


<style>
  #loadingScreen {
    z-index: 9999;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgb(228, 231, 242);
    }

  #main{
    background-color: aquamarine;
    width: 90vw;
    height: 80vh;

    margin: auto;
  }
</style>