<script>
    import loadingScreen from "../../lib/assets/global/loadingScreen.gif"

    import * as Cards from "../../card"
    import cardV2Background from "../../lib/assets/global/cardV2BG.png"
    import {sendSocketValue, sendData, userData, deckData, getUserDataFromLocalStorage} from "../../client"
    let backgroundColorByCost = ["#2672ed","#8626ed","#ed7c26","linear-gradient(180deg, rgb(235, 160, 160), rgb(240, 216, 171), rgb(233, 233, 169), rgb(174, 236, 174), rgb(168, 213, 240), rgb(200, 155, 231), rgb(235, 159, 235))"]
    let starsColorByCost = ["color: #2672ed;","color: #8626ed;","color: #ed7c26;","background-image: linear-gradient(90deg, rgb(235, 160, 160), rgb(240, 216, 171), rgb(233, 233, 169), rgb(174, 236, 174), rgb(168, 213, 240), rgb(200, 155, 231), rgb(235, 159, 235));-webkit-background-clip: text;background-clip: text;color: transparent;"]

    let allcardnames = []

    for(let i = 0; i < Cards.allCardsArr.length; i++){
        allcardnames.push((Cards.allCardsArr[i]).name)
    }
    console.log(allcardnames);

    let selectedDeck = 0
    let selectedList = [[],[],[],[]]


    let localUserData = userData
    let localDeckData = deckData

    let pageLoaded = false
    import { onMount } from 'svelte';
        onMount(() => {
            localDeckData = JSON.parse(localStorage.getItem("deckData"))
            localUserData = JSON.parse(localStorage.getItem("userData"))
            console.log("fasz3: logcaPulDa: ",localDeckData);
            console.log("fasz3: logcaUseDa: ",localUserData);
            if (localDeckData) {
                //localPullData = JSON.parse(localStorage.getItem("userData"))
                getUserDataFromLocalStorage(localDeckData, "deckData")
            } else {
                console.log("Username not found in local storage.");
            }
            if (localUserData) {
                //localPullData = JSON.parse(localStorage.getItem("userData"))
                getUserDataFromLocalStorage(localUserData, "userData")
                localUserData = localUserData
            } else {
                console.log("Username not found in local storage.");
            }

            for (let i = 0;i<4;i++){
                selectedList[i] = localDeckData[`deckarray${i}`]
                if( selectedList[i] == ""){
                selectedList[i] = []
            }
            }
            console.log(selectedList);
            selectedList = selectedList


            pageLoaded = true
            pageLoaded = pageLoaded

        });


    let cardsClassName = Array(Cards.allCardsArr.length).fill("cardPreviewListCont filtergrayscale")

    function selectByClick(card, i){
        if(!selectedList[selectedDeck].includes(card.name)){
            console.log(selectedList[selectedDeck]);
            selectedList[selectedDeck].push(card.name)
            selectedList = selectedList
            console.log(selectedList);

            console.log(String(selectedList[selectedDeck]));
            sendData(`deckarray${selectedDeck}`, String(selectedList[selectedDeck]), localUserData.id, "deck")

            localDeckData[`deckarray${selectedDeck}`] = selectedList[selectedDeck]
            localStorage.setItem("deckData", JSON.stringify(localDeckData));


            cardsClassName[i] = "cardPreviewListCont"
        }else{
            selectedList[selectedDeck].splice(selectedList[selectedDeck].indexOf(card.name), 1)
            console.log(selectedList);
            //selectedList[selectedDeck] = String(selectedList[selectedDeck])
            sendData(`deckarray${selectedDeck}`, String(selectedList[selectedDeck]), localUserData.id, "deck")

            localDeckData[`deckarray${selectedDeck}`] = selectedList[selectedDeck]
            localStorage.setItem("deckData", JSON.stringify(localDeckData));

            cardsClassName[i] = "cardPreviewListCont filtergrayscale"
        }
        selectedList = selectedList
    }

    function deleteCard(cardname, i){
        selectedList[selectedDeck].splice(selectedList[selectedDeck].indexOf(cardname), 1)
        selectedList = selectedList
        sendData(`deckarray${selectedDeck}`, String(selectedList[selectedDeck]), localUserData.id, "deck")

        localDeckData[`deckarray${selectedDeck}`] = selectedList[selectedDeck]
        localStorage.setItem("deckData", JSON.stringify(localDeckData));

        cardsClassName[i] = "cardPreviewListCont filtergrayscale"
    }

    let isSelectingDeck = true
    function ChangeDeck(){
        isSelectingDeck = true
        isSelectingDeck = isSelectingDeck
    }
    function selectDeck(n){
        selectedDeck = n

        cardsClassName.fill("cardPreviewListCont filtergrayscale")
        console.log(selectedList[selectedDeck]);
        if(selectedList[selectedDeck] != []){
            for (let i = 0; i<selectedList[selectedDeck].length;i++){
            console.log(allcardnames);
            console.log(selectedList[selectedDeck][i]);
            var index = allcardnames.indexOf(selectedList[selectedDeck][i])
            console.log(index);
            cardsClassName[index] = "cardPreviewListCont"
            }
        }

        console.log(cardsClassName);
        selectedList = selectedList

        isSelectingDeck = false
        isSelectingDeck = isSelectingDeck
        cardsClassName = cardsClassName

        curDeckName = localDeckData[`deckname${selectedDeck}`]

    }
    
    let curDeckName = ""

    function SaveDeckName(name){
        localDeckData[`deckname${selectedDeck}`] = name

        sendData(`deckname${selectedDeck}`, name, localUserData.id, "deck")

        localStorage.setItem("deckData", JSON.stringify(localDeckData));
    }


</script>
{#if !pageLoaded}
<div id="loadingScreen">
  <img src={loadingScreen} alt="loading..." style="width: 15vw; display: block; margin-top:15%; margin-left:auto; margin-right:auto;">
  <h1 style="font-family: cursive; display: block; text-align:center;">LOADING...</h1>
</div>
{/if}

<div id = "background"></div>

<div style="display:flex; margin-inline:5vw; margin-block:4vh;">
<div id="deckBox">
    <h1>Paklid</h1>
    {#if isSelectingDeck}
        <div id="deckChooserContainer" style="text-align:center">
            <button class="deckChooser" on:click={()=>selectDeck(0)}><span class="deckNumbering">1</span>{localDeckData[`deckname${0}`]}</button>
            <button class="deckChooser" on:click={()=>selectDeck(1)}><span class="deckNumbering">2</span>{localDeckData[`deckname${1}`]}</button><br><br>
            <button class="deckChooser" on:click={()=>selectDeck(2)}><span class="deckNumbering">3</span>{localDeckData[`deckname${2}`]}</button>
            <button class="deckChooser" on:click={()=>selectDeck(3)}><span class="deckNumbering">4</span>{localDeckData[`deckname${3}`]}</button>
        </div>
    {:else}
        <input type="text" bind:value={curDeckName} placeholder="Nevezd el a paklid" style="width:80%;">
        <button style="width: 15%;" on:click={() => SaveDeckName(curDeckName)}>Mentés</button>
        <br><br><br><br>
        
        <button style="float: right;" on:click={()=> ChangeDeck()}>Change Deck</button>

        {#each selectedList[selectedDeck] as cardname, i}
            <button style="display:block;" id={cardname} on:click={() => deleteCard(cardname, i)}>{cardname}</button>
        {/each}
    {/if}

</div>
<div id = "cardcollection">
    {#each Cards.allCardsArr as card, i}
        <div class={cardsClassName[i]}>
            <img style="width: 12.5vw; position:absolute" src={cardV2Background} alt="cardBg">
            <div class="rarityBGList" style="background: {backgroundColorByCost[(card.stars)-3]}; "></div>
            <img class="cardButton" src={card.source} alt="preview"/>
            <button class="cardListFrame" alt="cardBg" on:click={() => selectByClick(card, i)}></button>
            <div class="curCardStatsList" style="left: 2.68vw;">{card.attack}</div>
            <div class="curCardStatsList" style="left: 9.65vw;">{card.health}</div>
            <div class="curCardCostList">{card.cost}</div>
            <div class="curCardNameList">{card.name}</div>

            <div class="curCardRarityList" style="{starsColorByCost[(card.stars)-3]}">
                {#each Array(Number(card.stars)) as card}
                    <span style="font-size: 1vw;">★</span>
                {/each}
            </div>
        </div>
    {/each}
</div>
</div>
<div class = "links">
    <a href="/gachaScreen">pénzt ide nekem</a><br>
    <a href="/collectionScreen">kártyák</a><br>
    <a href="../">main menu</a>
  </div>
<style>
     @font-face {
            font-family: 'SevenSwords';
            src: url('../../lib/assets/fonts/SEVESBRG.ttf');
        }
    @font-face {
        font-family: 'ShadowLight';
        src: url('../../lib/assets/fonts/ShadowsIntoLight-Regular.ttf');
    }
    #loadingScreen {
    z-index: 9999;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgb(228, 231, 242);
    }

    h1{
        text-align: center;
        color:white;

    }

    #deckBox{
        height:90vh;
        width:20vw;
        margin:auto;
        border:2px solid goldenrod;
    }

    .deckChooser{
        width: 40%;
        height: 11vw;

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
        margin-top: 50%;
    }


    .cardPreviewListCont{
        position: relative;
        width:14.3vw;
        height: 17vw;
        display:inline-block;
    }

    .filtergrayscale{
        filter:grayscale();
        transform: scale(0.98);
    }

    #cardcollection {
        width: 60vw;
        height: 90vh;
        overflow: auto;
        margin-right:10vw
    }

    .cardListFrame{
        width: 12.5vw;
        height: 15.8754vw;
        position:absolute;
        background-image: url("../../lib/assets/global/cardV2Top.png");
        background-size: cover;
        background-position: center;
        background-color: transparent;
        border: none;
        cursor: pointer;
    }
    .rarityBGList{
        position: absolute;
        width: 10vw;
        height: 13vw;
        left: 1vw;
        top: 1vw;
        opacity: 0.35;
        background-blend-mode:saturation;
    }
    .cardButton{
        width:7.5vw;

        border: none;

        background-size:cover;
        box-shadow: 0 0 1.3vw rgba(0, 0, 0, 0.735);

        position: absolute;

        left: 2.97vw;
        top: 2.5vw;
    }
    .curCardStatsList{
        font-size: 1.7vw;
        font-family: 'SevenSwords';
        color: white;
        text-shadow:
                -0.08vw -0.08vw 0 #000, /* Top-left shadow */
                0.08vw -0.08vw 0 #000, /* Top-right shadow */
                -0.08vw 0.08vw 0 #000, /* Bottom-left shadow */
                0.08vw 0.08vw 0 #000; /* Bottom-right shadow */

        position: absolute;
        top: 13.3vw;
    }
    .curCardCostList{
        font-size: 3vw;
        font-weight: bold;
        font: italic;
        font-family: 'ShadowLight';
        color: rgb(184, 11, 11);

        position: absolute;
        top: 1vw;
        left: 2.5vw;
    }
    .curCardNameList{
        font-size: 1vw;
        font-family: Impact;
        color: rgba(247, 240, 221, 0.778);
        text-shadow: 0 0 1vw rgba(0, 0, 0, 0.536);

        position: absolute;
        top: 13.2vw;
        left: 2vw;

        text-align: center;
        width: 9.5vw;
    }
    .curCardRarityList{
        width: 6vw;
        text-align: center;
        mix-blend-mode: screen;

        position: absolute;
        left: 3.7vw;
        top: 0.4vw;
    }

    .cardPreviewListCont:hover{
        transform: scale(1.05);
    }

    #background {
        background-image: url("../../lib/assets/collection/bg.png");
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
</style>