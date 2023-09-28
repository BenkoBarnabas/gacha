<script>
    import * as Cards from "../../card"
    import cardV2Background from "../../lib/assets/global/cardV2BG.png"

    let selectedList = []
    export let selectedListText = ""

    function stringifyArray(array, string){
        array.forEach(element => {
            string += element
        });
    }

    function selectByClick(card){
        if(!selectedList.includes(card)){
            selectedList.push(card)
            selectedList = selectedList
            document.getElementById(card.cardSRCText).classList.remove("filtergrayscale")
            document.getElementById(card.cardSRCText).classList.add("selected")

            sendData(columnName,dataToSend,id,tableName)
        }else{
            selectedList.splice(selectedList.indexOf(card), 1)
            selectedList = selectedList
            document.getElementById(card.cardSRCText).classList.remove("selected")
            document.getElementById(card.cardSRCText).classList.add("filtergrayscale")
        }
    }

    function deleteCard(card){
        selectedList.splice(selectedList.indexOf(card), 1)
        selectedList = selectedList
        document.getElementById(card.cardSRCText).classList.remove("selected")
        document.getElementById(card.cardSRCText).classList.add("filtergrayscale")
    }

    var starSizeArray = [] //for some reason it didnt work with a normal return so i had to put them into an array ,im throwing up
    var starSizeTop = [1,1,0,0]
    var backgroundColorByCost = ["#2672ed","#8626ed","#ed7c26","linear-gradient(180deg, rgb(235, 160, 160), rgb(240, 216, 171), rgb(233, 233, 169), rgb(174, 236, 174), rgb(168, 213, 240), rgb(200, 155, 231), rgb(235, 159, 235))"]
    var starsColorByCost = ["color: #2672ed;","color: #8626ed;","color: #ed7c26;","background-image: linear-gradient(90deg, rgb(235, 160, 160), rgb(240, 216, 171), rgb(233, 233, 169), rgb(174, 236, 174), rgb(168, 213, 240), rgb(200, 155, 231), rgb(235, 159, 235));-webkit-background-clip: text;background-clip: text;color: transparent;"]
</script>
<div style="display:flex; margin-inline:5vw; margin-block:4vh;">
<div id="deckBox">
    <h1>Paklid</h1>
    {#each selectedList as card}
        <button style="display:block;" on:click={deleteCard(card)}>{card.name}</button>
    {/each}
</div>
<div id = "cardcollection">
    {#each Cards.allCardsArr as card}
        <div id={card.cardSRCText} class="cardPreviewListCont filtergrayscale">
            <img style="width: 12.5vw; position:absolute" src={cardV2Background} alt="cardBg">
            <div class="rarityBGList" style="background: {backgroundColorByCost[(card.stars)-3]}; "></div>
            <img class="cardButton" src={card.source} alt="preview"/>
            <button class="cardListFrame" alt="cardBg" on:click={() => selectByClick(card)}></button>
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
    h1{
        text-align: center;
        color:white;

    }

    #plussign{
        margin:auto;
        width:100%;
        height:5vh;
        background-image: url("../../lib/assets/global/plus.png");
        background-size:contain;
        background-position: center center;
    }

    #deckBox{
        height:90vh;
        width:20vw;
        margin:auto;
        border:2px solid goldenrod;
    }

    .cardPreviewListCont{
        position: relative;
        width:14.3vw;
        height: 17vw;
        display:inline-block;
    }

    .filtergrayscale{
        filter:grayscale();
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

    .selected{
        transform: scale(1.05);
        filter:none;
    }
</style>