<script>
    import * as Cards from "../../card"
    import cardV2Background from "../../lib/assets/global/cardV2BG.png"

    let selectedCard = ""

    function selectByClick(cardName){
        console.log(selectedCard)
        console.log(cardName)

        if(selectedCard != ""){
            document.getElementById(selectedCard).classList.remove("selected")
            console.log(document.getElementById(selectedCard).classList);
        }

        selectedCard = cardName
        selectedCard = selectedCard
        document.getElementById(cardName).classList.add("selected")
        console.log(document.getElementById(cardName).classList);
    }

    var starSizeArray = [] //for some reason it didnt work with a normal return so i had to put them into an array ,im throwing up
    var starSizeTop = [1,1,0,0]
    var backgroundColorByCost = ["#2672ed","#8626ed","#ed7c26","linear-gradient(180deg, rgb(235, 160, 160), rgb(240, 216, 171), rgb(233, 233, 169), rgb(174, 236, 174), rgb(168, 213, 240), rgb(200, 155, 231), rgb(235, 159, 235))"]
    var starsColorByCost = ["color: #2672ed;","color: #8626ed;","color: #ed7c26;","background-image: linear-gradient(90deg, rgb(235, 160, 160), rgb(240, 216, 171), rgb(233, 233, 169), rgb(174, 236, 174), rgb(168, 213, 240), rgb(200, 155, 231), rgb(235, 159, 235));-webkit-background-clip: text;background-clip: text;color: transparent;"]
</script>
<h1>Paklid</h1>
<div id="deckBox">

</div>
<div id = "cardcollection">
    {#each Cards.allCardsArr as card}
        <div class="cardPreviewListCont">
            <img style="width: 12.5vw; position:absolute" src={cardV2Background} alt="cardBg">
            <div class="rarityBGList" style="background: {backgroundColorByCost[(card.stars)-3]}; "></div>
            <img class="cardButton" src={card.source} alt="preview"/>
            <button id={card.cardSRCText} class="cardListFrame" alt="cardBg" on:click={() => selectByClick(card.cardSRCText)}></button>
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
<div class = "links">
    <a href="/gachaScreen">pénzt ide nekem</a><br>
    <a href="/collectionScreen">kártyák</a><br>
    <a href="../">main menu</a>
  </div>
<style>
    h1{
        text-align: center;
    }

    #deckBox{
        height:20vh;
        width:80vw;
        margin:auto;
        border:2px solid goldenrod;
    }

    .cardPreviewListCont{
        position: relative;
        width:14.3vw;
        height: 17vw;
        display:inline-block;
        opacity:0.85;
    }

    #cardcollection {
        width: 90vw;
        height: 60vh;
        overflow: auto;
        float: left;
        margin-top: 4vh;
        padding-top: 1vh;
        margin-left:5vw;
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
        opacity:1;
    }

    .selected{
        transform: scale(1.05);
        opacity:1;
    }
</style>