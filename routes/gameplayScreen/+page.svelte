<script>
    import * as Cards from "../../card"

    import cardBackground from "../../lib/assets/global/cardV1BG.png"
    import cardForeground from "../../lib/assets/global/cardV1Top.png"
    import cardV2Background from "../../lib/assets/global/cardV2BG.png"
    var starSizeArray = [] //for some reason it didnt work with a normal return so i had to put them into an array ,im throwing up
    var starSizeTop = [1,1,0,0]
    var backgroundColorByCost = ["#2672ed","#8626ed","#ed7c26","linear-gradient(180deg, rgb(235, 160, 160), rgb(240, 216, 171), rgb(233, 233, 169), rgb(174, 236, 174), rgb(168, 213, 240), rgb(200, 155, 231), rgb(235, 159, 235))"]
    var starsColorByCost = ["color: #2672ed;","color: #8626ed;","color: #ed7c26;","background-image: linear-gradient(90deg, rgb(235, 160, 160), rgb(240, 216, 171), rgb(233, 233, 169), rgb(174, 236, 174), rgb(168, 213, 240), rgb(200, 155, 231), rgb(235, 159, 235));-webkit-background-clip: text;background-clip: text;color: transparent;"]



    let yourHand = [Cards.BizsoCard,Cards.BarniCard, Cards.FarkasCard,Cards.DobiCard,Cards.FiloRekaCard]

</script>


<div id="background"></div>

<div id="gamePlayFiledCont">
    <div id="playField">
        <table class="gameFiledSides" id="yourSide">
            <tr class="tierOne">
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
            </tr>
            <tr class="tierTwo">
                <td>2</td>
                <td>2</td>
                <td>2</td>
                <td>2</td>
            </tr>
        </table>
        <table class="gameFiledSides" id="enemySide">
            <tr class="tierTwo">
                <td>2</td>
                <td>2</td>
                <td>2</td>
                <td>2</td>
            </tr>
            <tr class="tierOne">
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
            </tr>
        </table>
    </div>
    <div class="handCont" id="yourHand">
        {#each yourHand as card}
        <div class="previewInHand">
            <img class="cardTemplate" src={cardBackground} alt="cardBg">
            <div id="rarityBG" style="background: {backgroundColorByCost[(card.stars)-3]}; "></div>
            <img id="curCardInView" src={card.source} alt="">
            <img class="cardTemplate" src={cardForeground} alt="cardBg">
            <div id="curCardDesc" class="noScrollers">{card.description}</div>
            <div class="curCardStats" style="left: calc(var(--cardsScale)*1vw*7.4);">{card.attack}</div>
            <div class="curCardStats" style="left: calc(var(--cardsScale)*1vw*21.5)">{card.health}</div>
            <div class="curCardCost">{card.cost}</div>
            <div class="curCardName">{card.name}</div>
            
            <div id="curCardRarity" style="{starsColorByCost[(card.stars)-3]}; top: {starSizeTop[(card.stars)-3]}vw;">
                {#each Array(Number(card.stars)) as card,index}
                    <span style="font-size: {starSizeArray[index]}vw;">★</span>
                {/each}
            </div>
        </div>
        {/each}
    </div>
    <div class="handCont" id="enemyHand"></div>

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
    :root {
        --cardsScale: 0.4;
    }


    #background{
        width: 100vw;
        height: 100vh;
        position: fixed;
        z-index: -1;
        background-image: url("../../lib/assets/gameplay/PHBG.jpg");
        background-size: 100% 100%;
    }

    #gamePlayFiledCont{
        background-color: rgba(0, 0, 0, 0.05);
        position: relative;
    }
    #playField{
        background-color: aqua;
        width: 70vw;
        height: 35vw;

        position: absolute;
        left: 15vw;
        top: 10vw;
    }
    #yourHand{
        background-color: blue;
        top: 40vw;
    }
    #enemyHand{
        background-color: red;
        top: 0vw;
    }
    .handCont{
        width: 50vw;
        height: 15vw;

        position: absolute;
        left: 25vw;

        display: flex;
    }

    #yourSide{
        background-color: rgba(0, 0, 255, 0.504);
        top: 17.5vw;
    }
    #enemySide{
        background-color: rgba(255, 0, 0, 0.507);
        top: 1.5vw;
    }
    .gameFiledSides{
        width: 68vw;
        height: 16vw;

        position: absolute;
        left: 1vw;   
    }
    td{
        border: 0.1vw solid black;
    }


    .previewInHand{
        background-color: red;

        margin-right: 10vw;
        margin-top: 0;

        position: relative;
    }
    .previewInHand:hover{
        animation: scaleUp 0.5s forwards;
        z-index: 10;
    }
    @keyframes scaleUp{
        0%{
            transform: scale(1);
        }
        100%{
            transform: scale(2);
        }
    }
    .cardTemplate{
        width: calc(var(--cardsScale)*1vw*30);
        position: absolute;
        left: 0;
    }
    #rarityBG{
        position: absolute;
        width: calc(var(--cardsScale)*1vw*20);
        height: calc(var(--cardsScale)*1vw*20);
        left: calc(var(--cardsScale)*1vw*6);
        top: calc(var(--cardsScale)*1vw*2.5);

        opacity: 0.35;
        background-blend-mode:saturation;
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
        font-family: cursive;
        color: rgba(0, 0, 0, 0.778);
        font: bold;
        font-size: calc(var(--cardsScale)*1vw*1);

        position: absolute;
        top: calc(var(--cardsScale)*1vw*23);
        left: calc(var(--cardsScale)*1vw*8.3);

        width: calc(var(--cardsScale)*1vw*14);
        text-align: center;
        overflow: auto;
        height: calc(var(--cardsScale)*1vw*6);
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


</style>