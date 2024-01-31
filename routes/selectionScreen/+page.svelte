<script>

    import {requestFullScreen} from "../../client"
    function GoToPage(filePath) {
        window.location.href = filePath; // Navigate to the parent directory
    }
    import loadingScreen from "../../lib/assets/global/loadingScreen.gif"


    import * as Cards from "../../card"
    import {sendData, userData, deckData, getUserDataFromLocalStorage} from "../../client"
    let backgroundColorByCost = ["#2672ed","#8626ed","#ed7c26","linear-gradient(180deg, rgb(235, 160, 160), rgb(240, 216, 171), rgb(233, 233, 169), rgb(174, 236, 174), rgb(168, 213, 240), rgb(200, 155, 231), rgb(235, 159, 235))"]
    let starsColorByCost = ["color: #2672ed;","color: #8626ed;","color: #ed7c26;","background-image: linear-gradient(90deg, rgb(235, 160, 160), rgb(240, 216, 171), rgb(233, 233, 169), rgb(174, 236, 174), rgb(168, 213, 240), rgb(200, 155, 231), rgb(235, 159, 235));-webkit-background-clip: text;background-clip: text;color: transparent;"]

    import cardBackground from "../../lib/assets/global/cardV1BG.png"
    import cardForeground from "../../lib/assets/global/cardV1Top.png"
    import cardV2Background from "../../lib/assets/global/cardV2BG.png"
    import cardV2BackgroundRed from "../../lib/assets/global/cardV2BGRed.png"
    import spellForeground from "../../lib/assets/global/spellV1Top.png"
    import spellBackground from "../../lib/assets/global/spellV1BG.png"

    import qucikAtk from "../../lib/assets/global/quickAtk.png"
    import doubleAtk from "../../lib/assets/global/doubleAtk.png"
    import blastAtk from "../../lib/assets/global/blastAtk.png"
    import lifeSteal from "../../lib/assets/global/lifeSteal.png"
    import thorns from "../../lib/assets/global/thorns.png"
    import challanger from "../../lib/assets/global/challanger.png"

    let talentIcons = {
        kihívó: challanger,
        kettőstámadás: doubleAtk,
        tövisesbőr: thorns,
        fürgetámadás: qucikAtk,
        robbanótámadás: blastAtk,
        életelszívás_1: lifeSteal,
        életelszívás_2: lifeSteal,
        életelszívás_3: lifeSteal
    }

    import tunya from "../../lib/assets/gameplay/tunya.png"
    import lelkiismeretes from "../../lib/assets/gameplay/lelkiismeretes.png"
    import vérszomjas from "../../lib/assets/gameplay/vérszomjas.png"
    import veszett from "../../lib/assets/gameplay/veszett.png"

    let aligmentIcons = {
        tunya: tunya,
        lelkiismeretes: lelkiismeretes,
        vérszomjas: vérszomjas,
        veszett: veszett
    }
    let aligmentBackgroundColors = {
        tunya: "rgb(113, 166, 117)",
        lelkiismeretes: "rgb(113, 145, 166)",
        vérszomjas: "rgb(166, 113, 118)",
        veszett: "rgb(133, 113, 166)"
    }  


    let allcardnames = []

    for(let i = 0; i < Cards.allCardsArr.length; i++){
        allcardnames.push((Cards.allCardsArr[i]).name)
    }

    let selectedDeck = 0
    let selectedList = [[],[],[],[]]

    let currDeckArray = []

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
        if(selectedList[selectedDeck] == []){
            currDeckArray = []
        }else if(selectedList[selectedDeck] == ""){
            currDeckArray = []
        }else{
            currDeckArray = selectedList[selectedDeck].split(",")
        }
        if(!currDeckArray.includes(card.name)){
            currDeckArray.push(card.name)
            currDeckArray = currDeckArray
            selectedList[selectedDeck] = String(currDeckArray)
            console.log(selectedList);
            console.log(currDeckArray)
            sendData(`deckarray${selectedDeck}`, selectedList[selectedDeck], localUserData.id, "deck")

            localDeckData[`deckarray${selectedDeck}`] = selectedList[selectedDeck]
            localStorage.setItem("deckData", JSON.stringify(localDeckData));


            cardsClassName[i] = "cardPreviewListCont"
        }else{
            currDeckArray.splice(currDeckArray.indexOf(card.name), 1)
            console.log(currDeckArray);
            selectedList[selectedDeck] = String(currDeckArray)
            sendData(`deckarray${selectedDeck}`, selectedList[selectedDeck], localUserData.id, "deck")

            localDeckData[`deckarray${selectedDeck}`] = selectedList[selectedDeck]
            localStorage.setItem("deckData", JSON.stringify(localDeckData));

            cardsClassName[i] = "cardPreviewListCont filtergrayscale"
        }
        currDeckArray = currDeckArray
        selectedList = selectedList
    }

    function deleteCard(cardname, i){
        currDeckArray.splice(currDeckArray.indexOf(cardname), 1)
        console.log(currDeckArray);
        selectedList[selectedDeck] = String(currDeckArray)
        allcardnames = allcardnames

        console.log(cardsClassName[i]);
        cardsClassName[i] = "cardPreviewListCont filtergrayscale"
        console.log(cardsClassName[i]);


        document.getElementById(cardname).remove()

        sendData(`deckarray${selectedDeck}`, selectedList[selectedDeck], localUserData.id, "deck")

        localDeckData[`deckarray${selectedDeck}`] = selectedList[selectedDeck]
        localStorage.setItem("deckData", JSON.stringify(localDeckData));
    }

    let isSelectingDeck = true
    function ChangeDeck(){
        isSelectingDeck = true
        isSelectingDeck = isSelectingDeck
        currDeckArray = []
    }
    function selectDeck(n){
        selectedDeck = n

        if(selectedList[selectedDeck] == []){
            currDeckArray = []
        }else if(selectedList[selectedDeck] == ""){
            currDeckArray = []
        }else{
            currDeckArray = selectedList[selectedDeck].split(",")
        }

        cardsClassName.fill("cardPreviewListCont filtergrayscale")
        console.log(selectedList[selectedDeck]);

        if(currDeckArray != []){
            for (let i = 0; i<currDeckArray.length;i++){
                console.log(currDeckArray[i]);
                var index = allcardnames.indexOf(currDeckArray[i])
                console.log(index);
                cardsClassName[index] = "cardPreviewListCont"
            }
        }

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

<div id="header">
    <div id="logo"><h1 style="margin-top:2vh; font-size:2.5vw; text-align:center; color:white;">Paklim</h1></div>
    <table id="headerTable">
        <tr>
            <td class="headerTd"><button id="homeButton" on:click={() => GoToPage("../mainmenuScreen")} ></button></td>
            <td class="headerTd"></td>
            <td class="headerTd">
                <div class="money" id="gachaCurrency" style="margin-right: 2vw;"><p style="margin-top:1.2vw;">{localUserData.gachaCurrency}</p></div>
                <div class="money" id="nameTag" style="position: relative;">
                    <div id="levelText">{localUserData.level}</div>
                    <p style="margin-top:1.2vw;">{localUserData.username}</p>
                </div>
                <button id="fullScreenButton" on:click={requestFullScreen}>[]</button>
            </td>
        </tr>
    </table>
</div>

<div id = "background"></div>

<div style="display:flex; margin-inline:5vw; margin-block:4vh;">
<div id="deckBox">
    {#if isSelectingDeck}
        <div id="deckChooserContainer" style="text-align:center">
            <button class="deckChooser" on:click={()=>selectDeck(0)}><span class="deckNumbering">1</span>{localDeckData[`deckname${0}`]}</button>
            <button class="deckChooser" on:click={()=>selectDeck(1)}><span class="deckNumbering">2</span>{localDeckData[`deckname${1}`]}</button><br><br>
            <button class="deckChooser" on:click={()=>selectDeck(2)}><span class="deckNumbering">3</span>{localDeckData[`deckname${2}`]}</button>
            <button class="deckChooser" on:click={()=>selectDeck(3)}><span class="deckNumbering">4</span>{localDeckData[`deckname${3}`]}</button>
        </div>
    {:else}
        <button style="float: left; margin-block:1vw;" on:click={()=> ChangeDeck()}>Vissza a paklikhoz</button>
        <input type="text" bind:value={curDeckName} placeholder="Nevezd el a paklid" style="width:58%;">
        <button style="width: 37%;" on:click={() => SaveDeckName(curDeckName)}>Név mentése</button>
        
        {#each allcardnames as cardname, i}
            {#if currDeckArray.includes(cardname)}
                <button class="selectedCardButton" style="display:block;" id={cardname} on:click={() => deleteCard(cardname, i)}>{cardname}</button>
            {/if}
        {/each}
    {/if}

</div>
<div id = "cardcollection">
    {#each Cards.allCardsArr as card, i}
        <div class={cardsClassName[i]}  on:keydown role="button" tabindex="" style="margin:1vw;">
                {#if card.type == "character"}
                    <div class="previewInHand" on:click={() => selectByClick(card,i)} on:keydown role="button" tabindex="">
                        <img draggable="false" class="cardTemplate" id="cardBackground" src={cardBackground} style="--colorr: {backgroundColorByCost[(card.stars)-3]}; --colorr2: #{(parseInt((backgroundColorByCost[(card.stars)-3].replace("#","")), 16)+663552).toString(16)};" alt="cardBg">
                        <div id="rarityBG" style="background: {backgroundColorByCost[(card.stars)-3]}; "></div>
                        <img draggable="false" id="curCardInView" src={card.source} alt="">
                        <img draggable="false" class="cardTemplate" src={cardForeground} alt="cardBg">
                        <div id="curCardDesc" class="noScrollers">{@html card.description}</div>
                        <div class="curCardStats" style="left: calc(var(--cardsScale)*1vw*7.4);">{card.attack}</div>
                        <div class="curCardStats" style="left: calc(var(--cardsScale)*1vw*21.5)">{card.health}</div>
                        <div class="curCardCost">{card.cost}</div>
                        <div class="curCardName">{card.name}</div>
    
                        {#if card.talent != ""}
                            {#if card.talent.includes(",")}
                            <div class="curCardMultipleIconsContainer">
                                {#each card.talent.split(",") as icon, i}
                                <div style="width:{(0.4*5.2)/card.talent.split(",").length}vw; margin:auto">
                                    <img style="width:calc(var(--cardsScale)*1vw*3.1)" src={talentIcons[icon.replace(" ","")]} alt="talent">
                                </div>
                                {/each}
                            </div>
                            {:else}
                                <div class="curCardTalent">{card.talent.replace("támadás","")}</div>
                                <img style="left: calc(var(--cardsScale)*1vw*10);" class="curCardTalentIcon" src={talentIcons[card.talent.replace(" ","")]} alt="talent">
                                {/if}
                            {/if}
    
                        {#if card.aligment != ""}
                        {#if card.aligment.includes(",")}
                        {#each card.aligment.split(",") as aligment,i}
                            <img style="top: {0.4*9.8 + i* 4.5*0.4}vw; background-color: {aligmentBackgroundColors[aligment]}; border-radius: 0.5vw;" class="curCardAlig" src={aligmentIcons[aligment]} alt="aligment">
                        {/each}
                        {:else}
                            <img style="background-color: {aligmentBackgroundColors[card.aligment]}; border-radius: 0.5vw;" class="curCardAlig" src={aligmentIcons[card.aligment]} alt="aligment">
                        {/if}
                        {/if}
                        
                        <div id="curCardRarity" style="{starsColorByCost[(card.stars)-3]}; top: 0">
                            {#each Array(Number(card.stars)) as card,index}
                                <span style="font-size: calc(var(--cardsScale)*2.4vw">★</span>
                            {/each}
                        </div>
                    </div>
                {:else if card.type == "spell"}
                    <div class="previewInHand " on:click={() => selectByClick(card,i)} on:keydown role="button" tabindex="">
                        <img draggable="false" class="cardTemplate" id="cardBackground" src={spellBackground} style="--colorr: {backgroundColorByCost[(card.stars)-3]}; --colorr2: #{(parseInt((backgroundColorByCost[(card.stars)-3].replace("#","")), 16)+663552).toString(16)};" alt="cardBg">
                        <div id="rarityBG" style="background: {backgroundColorByCost[(card.stars)-3]}; "></div>
                        <img draggable="false" id="curCardInView" src={card.source} alt="">
                        <img draggable="false" class="cardTemplate" src={spellForeground} alt="cardBg">
                        <div id="curCardDesc" class="noScrollers">{@html card.description}</div>
                        <div class="curCardCost" style="top: calc(var(--cardsScale)*1vw*4);">{card.cost}</div>
                        <div class="curCardName">{card.name}</div>
                        
                        <div id="curCardRarity" style="{starsColorByCost[(card.stars)-3]}; top: calc(var(--cardsScale)*1vw*1);">
                            {#each Array(Number(card.stars)) as card,index}
                                <span style="font-size: calc(var(--cardsScale)*2.4vw">★</span>
                            {/each}
                        </div>
                    </div>
                {/if}
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
    @font-face {
      font-family: 'sgGachaFont';
      src: url('../../lib/assets/fonts/MyFont-Regular.otf');
    }
    @font-face {
      font-family: 'mainFont';
      src: url('../../lib/assets/fonts/zh-cn.ttf');
    }
    :root{
        --cardsScale:0.5;
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

    #deckBox{
        height:90vh;
        width:20vw;
        margin:auto;
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

    .selectedCardButton{
        width:100%;
        background-color: #001630;
        opacity: 80%;
        color:white;
        text-align:left;
    }

    .cardPreviewListCont{
        position: relative;
        width:14.3vw;
        height: 17vw;
        display:inline-block;
    }
    .cardPreviewListCont:hover{
       animation: grayHover 1s;
       cursor: pointer;
    }
    @keyframes grayHover{
        100%{
            filter: grayscale(0);
        }
    }

    .filtergrayscale{
        filter:grayscale();
        transform: scale(0.98);
    }

    #cardcollection {
        width: 75vw;
        height: 90vh;
        overflow: auto;
        padding:0;
    }

    .cardTemplate{
        width: calc(var(--cardsScale)*1vw*30);
        position: absolute;
        left: 0;
    }
    .cardInHandHighlighted{
        animation:cardInHandHighlighted 2s infinite;
    }
    @keyframes cardInHandHighlighted{
        0%{
            filter:brightness(150%) drop-shadow(calc(var(--cardsScale)*1vw*1.5) calc(var(--cardsScale)*1vw*1.5) 5px var(--colorr)) drop-shadow(calc(var(--cardsScale)*1vw*-1.5) calc(var(--cardsScale)*1vw*-1.5) 5px var(--colorr));
        }
        50%{
            filter:brightness(170%) drop-shadow(calc(var(--cardsScale)*1vw*1.5) calc(var(--cardsScale)*1vw*1.5) 5px var(--colorr2)) drop-shadow(calc(var(--cardsScale)*1vw*-1.5) calc(var(--cardsScale)*1vw*-1.5) 5px var(--colorr2));
        }
        100%{
            filter:brightness(150%) drop-shadow(calc(var(--cardsScale)*1vw*1.5) calc(var(--cardsScale)*1vw*1.5) 5px var(--colorr)) drop-shadow(calc(var(--cardsScale)*1vw*-1.5) calc(var(--cardsScale)*1vw*-1.5) 5px var(--colorr));
        }
    }

    .cardInHandRainbowHighlighted{
        animation:cardInHandRainbowHighlighted 7s infinite;
    }
    
    @keyframes cardInHandRainbowHighlighted{
        0%{
            filter:brightness(150%) drop-shadow(calc(var(--cardsScale)*1vw*1.5) calc(var(--cardsScale)*1vw*1.5) 5px rgb(242, 121, 121)) drop-shadow(calc(var(--cardsScale)*1vw*-1.5) calc(var(--cardsScale)*1vw*-1.5) 5px rgb(242, 121, 121));
        }
        15%{
            filter:brightness(170%) drop-shadow(calc(var(--cardsScale)*1vw*1.5) calc(var(--cardsScale)*1vw*1.5) 5px rgb(235, 197, 127)) drop-shadow(calc(var(--cardsScale)*1vw*-1.5) calc(var(--cardsScale)*1vw*-1.5) 5px rgb(235, 197, 127));
        }
        30%{
            filter:brightness(150%) drop-shadow(calc(var(--cardsScale)*1vw*1.5) calc(var(--cardsScale)*1vw*1.5) 5px rgb(235, 235, 124)) drop-shadow(calc(var(--cardsScale)*1vw*-1.5) calc(var(--cardsScale)*1vw*-1.5) 5px rgb(235, 235, 124));
        }
        45%{
            filter:brightness(150%) drop-shadow(calc(var(--cardsScale)*1vw*1.5) calc(var(--cardsScale)*1vw*1.5) 5px rgb(131, 237, 237)) drop-shadow(calc(var(--cardsScale)*1vw*-1.5) calc(var(--cardsScale)*1vw*-1.5) 5px rgb(131, 237, 237));
        }
        60%{
            filter:brightness(170%) drop-shadow(calc(var(--cardsScale)*1vw*1.5) calc(var(--cardsScale)*1vw*1.5) 5px rgb(127, 127, 234)) drop-shadow(calc(var(--cardsScale)*1vw*-1.5) calc(var(--cardsScale)*1vw*-1.5) 5px rgb(127, 127, 234));
        }
        75%{
            filter:brightness(150%) drop-shadow(calc(var(--cardsScale)*1vw*1.5) calc(var(--cardsScale)*1vw*1.5) 5px rgb(208, 140, 239)) drop-shadow(calc(var(--cardsScale)*1vw*-1.5) calc(var(--cardsScale)*1vw*-1.5) 5px rgb(208, 140, 239));
        }
        100%{
            filter:brightness(150%) drop-shadow(calc(var(--cardsScale)*1vw*1.5) calc(var(--cardsScale)*1vw*1.5) 5px rgb(241, 139, 210)) drop-shadow(calc(var(--cardsScale)*1vw*-1.5) calc(var(--cardsScale)*1vw*-1.5) 5px rgb(241, 139, 210));
        }
    }

    #header{
        
        margin: auto;

        width: 90vw;
        height: 12vh;

        font-family: "sgGachaFont";
    }
    #headerTable{

        width: 90vw;
        height: 12vh;

        font-family: 'sgGachaFont';
    }
    .headerTd{
        width: 30vw;
        text-align: center;
    }
    #homeButton{
        background: url(../../lib/assets/mainmenu/home.png);
        background-size: 100% 100%;
        width: 12vw;
        height: 4vw;

        float: left;

        border: none;
        font-family: "sgGachaFont";

        margin-left: 1vw;
    }
    #homeButton:hover{
        transform: scale(1.1);
    }
    #logo{
        width:1vw;
        position: absolute;

        left: 44vw;
        top:1vw;
    }
    .money{
        width: 9vw;
        height: 3.5vw;
        display: inline-block;
 
    }
    #gachaCurrency{
        background-image: url(../../lib/assets/global/headerMoney.png);
        background-size: 100% 100%;

        font-family: 'mainFont';
        font-size: 1.7vw;
    }
    #nameTag{
        background-image: url(../../lib/assets/global/headerProfile.png);
        background-size: 100% 100%;

    }
    #levelText{
        font-size: 2vw;
        font-weight: bold;
        font: italic;
        font-family: 'ShadowLight';
        color: rgb(184, 11, 11);
        text-shadow:
                -0.01vw -0.01vw 0 rgb(184, 11, 11), /* Top-left shadow */
                0.01vw -0.01vw 0 rgb(184, 11, 11), /* Top-right shadow */
                -0.01vw 0.01vw 0 rgb(184, 11, 11), /* Bottom-left shadow */
                0.01vw 0.01vw 0 rgb(184, 11, 11); /* Bottom-right shadow */

        position: absolute;
        top: 0%;
        left: 2.5%;
        text-align: center;

        width: 2.5vw;
        height: 2.5vw;

        padding: 0;
    }
    

    #rarityBG{
        position: absolute;
        width: calc(var(--cardsScale)*1vw*20);
        height: calc(var(--cardsScale)*1vw*20);
        left: calc(var(--cardsScale)*1vw*6);
        top: calc(var(--cardsScale)*1vw*2.5);

        opacity: 0.35;
    }
    #curCardInView{
        position: absolute;
        width: calc(var(--cardsScale)*1vw*14);
        left: calc(var(--cardsScale)*1vw*8.5);
        top: calc(var(--cardsScale)*1vw*5);

        box-shadow: 0 0 calc(var(--cardsScale)*1vw*1.3) rgba(0, 0, 0, 0.735);
    }
    .curCardStats{
        font-size: calc(var(--cardsScale)*1vw*3);
        font-family: 'SevenSwords';
        color: white;
        text-shadow:
                -0.08vw -0.08vw 0 #000, /* Top-left shadow */
                0.08vw -0.08vw 0 #000, /* Top-right shadow */
                -0.08vw 0.08vw 0 #000, /* Bottom-left shadow */
                0.08vw 0.08vw 0 #000; /* Bottom-right shadow */

        position: absolute;
        top: calc(var(--cardsScale)*1vw*26.7);
    }
    .curCardCost{
        font-size: calc(var(--cardsScale)*1vw*5);
        font-weight: bold;
        font: italic;
        font-family: 'ShadowLight';
        color: rgb(184, 11, 11);

        position: absolute;
        top: calc(var(--cardsScale)*1vw*2.5);
        left: calc(var(--cardsScale)*1vw*7);
    }
    .curCardName{
        font-size: calc(var(--cardsScale)*1vw*2);
        font-family: Impact;
        color: rgba(247, 240, 221, 0.778);
        text-shadow: 0 0 calc(var(--cardsScale)*1vw*1) rgba(0, 0, 0, 0.536);

        position: absolute;
        top: calc(var(--cardsScale)*1vw*19.2);
        left: calc(var(--cardsScale)*1vw*5.5);

        text-align: center;
        width: calc(var(--cardsScale)*1vw*20);
    }
    #curCardDesc{
        font-family: Arial, Helvetica, sans-serif;
        color: rgba(0, 0, 0, 0.778);
        font-weight: bold;
        font-size: calc(var(--cardsScale)*1vw*1.6);

        position: absolute;
        top: calc(var(--cardsScale)*1vw*23);
        left: calc(var(--cardsScale)*1vw*8.3);

        width: calc(var(--cardsScale)*1vw*14);
        text-align: center;
        overflow: auto;
        height: calc(var(--cardsScale)*1vw*6);
        padding:0;
    }
    .noScrollers::-webkit-scrollbar {
        width: 0;
        background: none;
    }
    #curCardRarity{
        position: absolute;
        left: calc(var(--cardsScale)*1vw*8.5);
        width: calc(var(--cardsScale)*1vw*13.8);
        text-align: center;
        mix-blend-mode: screen;
    }
    .curCardMultipleIconsContainer{
        position: absolute;
        top: calc(var(--cardsScale)*1vw*20);
        left: calc(var(--cardsScale)*1vw*11);
        width: calc(var(--cardsScale)*1vw*8);
        height: calc(var(--cardsScale)*1vw*2);
        display:flex;
        flex-wrap:nowrap;
        align-content:space-around;
    }
    .curCardTalentIcon{
        position: absolute;
        width: calc(var(--cardsScale)*1vw*3.1);
        top: calc(var(--cardsScale)*1vw*19.6);
        left: calc(var(--cardsScale)*1vw*10.3);
    }
    .curCardTalent{
        position: absolute;
        font-family: "talentFont";
        color: antiquewhite;
        font-size: calc(var(--cardsScale)*1vw*1.2);
        top: calc(var(--cardsScale)*1vw*21.4);
        left: calc(var(--cardsScale)*1vw*13.5);
        width: calc(var(--cardsScale)*1vw*6);
        height: calc(var(--cardsScale)*1vw*1.7);
        padding-left:calc(var(--cardsScale)*1vw*1.9*var(--cardsScale));
    }
    .curCardAlig{
        position: absolute;
        width: calc(var(--cardsScale)*1vw*4);
        left: calc(var(--cardsScale)*1vw*5.8);
        top: calc(var(--cardsScale)*1vw*10);
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