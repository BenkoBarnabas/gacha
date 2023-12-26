<script>
  import loadingScreen from "../../lib/assets/global/loadingScreen.gif"
  import {onMount} from "svelte"

  import {clientID,userData, getUserDataFromLocalStorage, deckData} from "../../client"
  import {GetGameIDs, PlayerReady, SendGameDataClient, SveltePageLoaded, currentOpponentId} from "../../matchHandler"
  import * as Cards from "../../card"


  let yourGameID
  let opponentGameID
  let gameKey

  let localDeckData = deckData
  let localUserData

  let yourGameParameters = {
        gameId: yourGameID,
        username: "esztix",
        health: 50,
        currentHand: "",
        remaningDeck: [],
        mana: 2,
        spellMana: 0,
        ko: 8,
        yourBoard: [],
        yourBoardStatus: "",
        isYourTurn: ""
    }
  let enemyGameParameters = {
        gameId: "",
        username: "",
        health: 50,
        currentHand: "",
        remaningDeck: [],
        mana: 2,
        spellMana: 0,
        ko: 8,
        yourBoard: "",
        yourBoardStatus: "",
        isYourTurn: ""
    }


  let pageLoaded = false
  onMount(() => {

    yourGameID = JSON.parse(localStorage.getItem("yourGameID"))
    opponentGameID = JSON.parse(localStorage.getItem("opponentGameID"))

    yourGameParameters.gameId = yourGameID
    enemyGameParameters.gameId = opponentGameID
    gameKey = JSON.parse(localStorage.getItem("gameKey"))

    localDeckData = JSON.parse(localStorage.getItem("deckData"))
    localUserData = JSON.parse(localStorage.getItem("userData"))
    console.log("fasz3: logcaPulDa: ",localDeckData);
    if (localDeckData) {
        //localPullData = JSON.parse(localStorage.getItem("userData"))
        getUserDataFromLocalStorage(localDeckData, "deckData")
        getUserDataFromLocalStorage(localUserData, "userData")
    } else {
        console.log("Username not found in local storage.");
    }
    yourGameParameters.username = localUserData.username
    GetGameIDs(yourGameID,opponentGameID,gameKey)
      pageLoaded = true
      pageLoaded = pageLoaded

    console.log("u: ",yourGameID,"enemy: ",opponentGameID);

    SveltePageLoaded()
  });
    



    function ChooseDeck(n){
      var chosenDeck = localDeckData[`deckarray${n}`]
      console.log(chosenDeck);

      Cards.allCardsArr.forEach(element => {
        if(chosenDeck.includes(element.name)){
          yourGameParameters.remaningDeck.push(element)

        }
      });
      console.log(yourGameParameters.remaningDeck);
      

      localStorage.setItem("yourGameParams", JSON.stringify(yourGameParameters));
      console.log("your and enemy params: ", yourGameParameters,enemyGameParameters);
      SendGameDataClient(JSON.stringify(yourGameParameters))

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