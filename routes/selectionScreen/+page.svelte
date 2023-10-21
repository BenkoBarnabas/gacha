<script>
    import * as Cards from "../../card"
    import cardV2Background from "../../lib/assets/global/cardV2BG.png"
    import {sendSocketValue, sendData, userData, deckData, getUserDataFromLocalStorage} from "../../client"

    let tanarcardnames = Cards.tanarCardsArr.map(item => item.name)
    let diakcardnames = Cards.diakCardsArr.map(item => item.name)
    let allcardnames = tanarcardnames.concat(diakcardnames)

    let selectedDeck = 0
    let selectedList = [[],[],[],[]]


    let localUserData = userData
    let localDeckData = deckData
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
                selectedList[i] = localDeckData[`deckarray${i+1}`]
                if( selectedList == ""){
                selectedList[i] = []
            }
            }
            console.log(selectedList);
            selectedList = selectedList

        });




    function selectByClick(card, i){
        if(!selectedList.includes(card.name)){
            selectedList.push(card.name)
            selectedList = selectedList
            console.log(String(selectedList[selectedDeck]));
            sendData(`deckarray${selectedDeck}`, String(selectedList[selectedDeck]), localUserData.id, "deck")
            
            localDeckData[`deckarray${selectedDeck}`] = selectedList[selectedDeck]
            localStorage.setItem("deckData", JSON.stringify(localDeckData));


            allcardnames[i].classList.remove('filtergrayscale')
        }else{
            allcardnames[i].classList.add('filtergrayscale')
            selectedList[selectedDeck].splice(selectedList[selectedDeck].indexOf(card.name), 1)
            selectedList[selectedDeck] = String(selectedList[selectedDeck])
            sendData(`deckarray${selectedDeck}`, String(selectedList), localUserData.id, "deck")

            localDeckData[`deckarray${selectedDeck}`] = selectedList[selectedDeck]
            localStorage.setItem("deckData", JSON.stringify(localDeckData));
        }
    }

    function deleteCard(cardname, i){
        selectedList[selectedDeck].splice(selectedList[selectedDeck].indexOf(cardname), 1)
        selectedList = selectedList
        allcardnames[i].classList.add("filtergrayscale")
        sendData(`deckarray${selectedDeck}`, String(selectedList[selectedDeck]), localUserData.id, "deck")

        localDeckData[`deckarray${selectedDeck}`] = selectedList[selectedDeck]
        localStorage.setItem("deckData", JSON.stringify(localDeckData));
    }

    function selectDeck(n){
        selectedDeck = n
    }

    var backgroundColorByCost = ["#2672ed","#8626ed","#ed7c26","linear-gradient(180deg, rgb(235, 160, 160), rgb(240, 216, 171), rgb(233, 233, 169), rgb(174, 236, 174), rgb(168, 213, 240), rgb(200, 155, 231), rgb(235, 159, 235))"]
    var starsColorByCost = ["color: #2672ed;","color: #8626ed;","color: #ed7c26;","background-image: linear-gradient(90deg, rgb(235, 160, 160), rgb(240, 216, 171), rgb(233, 233, 169), rgb(174, 236, 174), rgb(168, 213, 240), rgb(200, 155, 231), rgb(235, 159, 235));-webkit-background-clip: text;background-clip: text;color: transparent;"]
</script>

<div id = "background"></div>

<div style="display:flex; margin-inline:5vw; margin-block:4vh;">
<div id="deckBox">
    <h1>Paklid</h1>
    <button id="deck1" class = "deckchooser" on:click={()=> selectDeck(0)}>[1]</button>
    <button id="deck2" class = "deckchooser" on:click={() =>selectDeck(1)}>[2]</button>
    <button id="deck3" class = "deckchooser" on:click={()=>selectDeck(2)}>[3]</button>
    <button id="deck4" class = "deckchooser" on:click={()=>selectDeck(3)}>[4]</button>

    {#each selectedList[selectedDeck] as cardname, i}
        <button style="display:block;" id={cardname} on:click={deleteCard(cardname, i)}>{cardname}</button>
    {/each}
</div>
<div id = "cardcollection">
    {#each Cards.allCardsArr as card, i}
        <div bind:this={allcardnames[i]} class="cardPreviewListCont filtergrayscale">
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

    .deckchooser{
        width:22%;
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