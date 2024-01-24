<script>
  import loadingScreen from "../../lib/assets/global/loadingScreen.gif"
  import {onMount} from "svelte"

  import {clientID,userData, getUserDataFromLocalStorage, deckData} from "../../client"
  import {GetGameIDs, PlayerReady, SendGameDataClient, SveltePageLoaded, currentOpponentId, yourGameParametersClient, enemyGameParametersClient} from "../../matchHandler"
  import * as Cards from "../../card"

  import hourglass from "../../lib/assets/global/hourglass.gif"

    import ProfilePic from "../../lib/assets/profile/PP.jpg"
    import ProfilePic2 from "../../lib/assets/profile/PP2.png"
    let profilePics = [ProfilePic,ProfilePic2]

    import pBorder1 from "../../lib/assets/profile/border1.png"
    import pBorder2 from "../../lib/assets/profile/border2.png"
    import pBorder3 from "../../lib/assets/profile/border3.png"
    import pBorder4 from "../../lib/assets/profile/border4.png"
    import pBorder5 from "../../lib/assets/profile/border5.png"
    import pBorder6 from "../../lib/assets/profile/border6.png"
    let pBorders = [pBorder1,pBorder2,pBorder3,pBorder4,pBorder5,pBorder6]


  let yourGameID
  let opponentGameID
  let gameKey

  let localDeckData = deckData
  let localUserData = {}

  let yourGameParameters = {
        gameId: yourGameID,
        username: "esztix",
        health: 40,
        currentHand: "",
        remaningDeck: [],
        mana: 2,
        spellMana: 0,
        ko: 5,
        yourBoard: [],
        yourBoardStatus: "",
        isYourTurn: "",
        type: "player",
        secretSpells: [],
        yourBuildings: []
    }
  let enemyGameParameters = {
        gameId: "",
        username: "",
        health: 40,
        currentHand: "",
        remaningDeck: [],
        mana: 2,
        spellMana: 0,
        ko: 5,
        yourBoard: "",
        yourBoardStatus: "",
        isYourTurn: "",
        type: "player",
        secretSpells: [],
        yourBuildings: []
    }
    let currentOpponentInfo = {}

  let pageLoaded = false
  onMount(() => {

    yourGameID = JSON.parse(localStorage.getItem("yourGameID"))
    opponentGameID = JSON.parse(localStorage.getItem("opponentGameID"))
    currentOpponentInfo = JSON.parse(localStorage.getItem("opponentInfo"))
    console.log("OPOLOG: ",currentOpponentInfo)

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
      yourGameParameters.isYourTurn = yourGameParametersClient.isYourTurn
      enemyGameParameters.isYourTurn = enemyGameParametersClient.isYourTurn
      

      localStorage.setItem("yourGameParams", JSON.stringify(yourGameParameters));
      console.log("your and enemy params: ", yourGameParameters,enemyGameParameters);
      SendGameDataClient(yourGameParameters)

    }


</script>

{#if !pageLoaded}
<div id="loadingScreen">
  <img src={loadingScreen} alt="loading..." style="width: 15vw; display: block; margin-top:15%; margin-left:auto; margin-right:auto;">
  <h1 style="font-family: cursive; display: block; text-align:center;">LOADING...</h1>
</div>
{/if}

<div id = "background"></div>

<div class="yourDataCont" style="left: 5vw;">
    <div style="position: relative; width:80%; height:100%;">
        <div class="profileCont">
            <img class="profilePic profilePicComp" src={profilePics[localUserData.profilPic-1]} alt="border">
            <img class="profileBorder profilePicCom" src={pBorders[localUserData.border-1]} alt="border">
        </div>
        <div style="font-size: 3vw; width:100%; text-align: center;">{localUserData.level}</div>
        <div style="font-family: sgGachaFont; font-size:2vw; width:100%; text-align: center;">{localUserData.username}</div>

        <div class="deckChooserContainer" style="text-align:center">
            <button class="deckChooser" on:click={() => ChooseDeck(0)}><span class="deckNumbering">1</span>{localDeckData[`deckname${0}`]}</button>
            <button class="deckChooser" on:click={() => ChooseDeck(1)}><span class="deckNumbering">2</span>{localDeckData[`deckname${1}`]}</button><br><br>
            <button class="deckChooser" on:click={() => ChooseDeck(2)}><span class="deckNumbering">3</span>{localDeckData[`deckname${2}`]}</button>
            <button class="deckChooser" on:click={() => ChooseDeck(3)}><span class="deckNumbering">4</span>{localDeckData[`deckname${3}`]}</button>
        </div>
    </div>
</div>
<div class="optionButtonCont" style="filter:hue-rotate(0deg);">
    <div style="position: relative;">
    <button class="optionButtonShadow"></button>
    <button class="optionButton" on:click={PlayerReady}>Készenáll</button>
    </div>
</div>
<div style="position: absolute; top:30vh;left:38vw; width: 20vw;"><img src={hourglass} alt="waiting..."></div>
<div class="yourDataCont" style="right: 5vw;">
    <div style="position: relative; width:80%; height:100%;">
        <div class="profileCont">
            <img class="profilePic profilePicComp" src={profilePics[currentOpponentInfo.profilPic-1]} alt="border">
            <img class="profileBorder profilePicComp" src={pBorders[currentOpponentInfo.border-1]} alt="border">
        </div>
        <div style="font-size: 3vw; width:100%; text-align: center;">{currentOpponentInfo.level}</div>
        <div style="font-family: sgGachaFont; font-size:2vw; width:100%; text-align: center;">{currentOpponentInfo.username}</div>
    </div>
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
  #background {
        background: url("../../lib/assets/collection/bg.png");
        overflow: hidden;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-size: cover; /* Adjust as needed: cover, contain, etc. */
        background-repeat: no-repeat;
        background-position: center center;
        z-index: -3;
    }
    @font-face {
      font-family: 'sgGachaFont';
      src: url('../../lib/assets/fonts/MyFont-Regular.otf');
    }
    @font-face {
      font-family: 'mainFont';
      src: url('../../lib/assets/fonts/zh-cn.ttf');
    }
    .yourDataCont{
        position: absolute;
        height: 80vh;
        width: 30vw;
        top:10vh;

        background-image: url("../../lib/assets/gameplay/ActionLog.png");
        background-size: 100% 100%;
    }
    .profileCont{
        position: relative;
        width:50%;
        height: 10vw;
        margin-top: 37%;
        margin-left: auto;
        margin-right: auto;
    }
    .profileBorder{
        position: absolute;
        width: 100%;
    }
    .profilePic{
        position: absolute;
        width:70%;
        left:15%;
        top:2vh;
        border-radius: 50%;
    }
    .deckChooserContainer{
        margin-top:1vh;
        width:100%;
    }
    .deckChooser{
        width: 30%;
        height: 10vh;
        margin-right:1vw;

        background: url(../../lib/assets/deck/deckThumbnail.png);
        background-size: 100% 100%;
    }
    .deckChooser:hover{
        transform: scale(1.1);
    }
    .deckNumbering{
        font-size: 3vw;
        color: rgb(72, 72, 149);

        font-family: "ShadowLight";
        display: block;
    }

    .optionButtonCont{
        position: absolute;
        left: 10vw;
        top: 83vh;
    }
    .optionButton{
        width:13.5vw;
        height:5vw;
        
        background: url(../../lib/assets/mainmenu/optionButton.png);
        background-size: 100% 100%;

        border: none;

        margin-bottom:1vw;
        font-family: "sgGachaFont";
        font-size: 0.8vw;

        position:absolute;
    }
    .optionButtonShadow{
        width:13.5vw;
        height:5vw;
        
        background: url(../../lib/assets/mainmenu/optionButtonShadow.png);
        background-size: 100% 100%;

        border: none;
        position: absolute;
    }
    .optionButton:hover{
        cursor: pointer;
        transform: scale(1.1);
        margin-left: -0.6vw;
        margin-top: -0.6vw;
    }
</style>