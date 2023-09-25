<script>
    import cardBackground from "../../lib/assets/global/cardV1BG.png"
    import cardForeground from "../../lib/assets/global/cardV1Top.png"
    import cardV2Background from "../../lib/assets/global/cardV2BG.png"

    import ph from "../../lib/assets/collection/tanar/Bizso.png"

    import Filozofia from "../../lib/assets/collection/spell/filozofia.png"
    import Gomboc from "../../lib/assets/collection/spell/gomboc.png"
    import Tz from "../../lib/assets/collection/spell/tz.png"

    import SNCover from "../../lib/assets/gacha/SWCover.png" //cover for the buttons for switching banners
    import YCCover from "../../lib/assets/gacha/YCCover.png" //^^^
    import SpellCover from "../../lib/assets/gacha/SpellCover.png"

    import * as Cards from "../../card"
    //made a separate file just for all the cards, they can be used in every file with this import 
    
    let selectedCollection = 1

    let curCardInView = {
        source: "",
        name: "",
        atk: "",
        hp: "",
        cost: "",
        rarity: "",
        desc: "",
        color: ""
    }

    var starSizeArray = [] //for some reason it didnt work with a normal return so i had to put them into an array ,im throwing up
    var starSizeTop = [1,1,0,0]
    var backgroundColorByCost = ["#2672ed","#8626ed","#ed7c26","linear-gradient(180deg, rgb(235, 160, 160), rgb(240, 216, 171), rgb(233, 233, 169), rgb(174, 236, 174), rgb(168, 213, 240), rgb(200, 155, 231), rgb(235, 159, 235))"]
    var starsColorByCost = ["color: #2672ed;","color: #8626ed;","color: #ed7c26;","background-image: linear-gradient(90deg, rgb(235, 160, 160), rgb(240, 216, 171), rgb(233, 233, 169), rgb(174, 236, 174), rgb(168, 213, 240), rgb(200, 155, 231), rgb(235, 159, 235));-webkit-background-clip: text;background-clip: text;color: transparent;"]

    function handleClick(source,name,atk,hp,cost,rarity,desc) {
        curCardInView.source = source
        curCardInView.name = name
        curCardInView.atk = atk
        curCardInView.hp = hp
        curCardInView.cost = cost
        curCardInView.rarity = rarity
        starSizeTop = starSizeTop
        curCardInView.desc = desc

        starSizeArray = []
        for (let i = 0; i < curCardInView.rarity; i++){
            CalcStarSize(i)
        }
        
    }
    
    function CalcStarSize(i){
        var starSize = 0
        if ((i+1) <= Math.ceil((curCardInView.rarity)/2)){
            starSize = (i+1)
            starSizeArray.push(starSize)

        }
        else {
            starSize = (curCardInView.rarity+1)-(i+1)
            starSizeArray.push(starSize)
        }
    }
</script>

<div id = "background"></div>
<h1 style="margin-top:2vh; font-size:2.5vw; text-align:center; color:white">Collection</h1>
<div id="typeChoosers">
    <!-- buttons to choose the active banner -->
    <button style="background: URL({SNCover}), no-repeat; background-size:cover" class="bannerIcon" on:click={() => selectedCollection = 1}></button>
    <button style="background: URL({YCCover}), no-repeat; background-size:cover" class="bannerIcon" on:click={() => selectedCollection = 2}></button>
    <button style="background: URL({SpellCover}), no-repeat; background-size:cover" class="bannerIcon" on:click={() => selectedCollection = 3}></button>
</div>

{#if selectedCollection == 1}
    <div class = "cardcollection" id = "tanarcollection">
        {#each Cards.tanarCardsArr as card}
        <div id="cardPreviewListCont">
            <img style="width: 12.5vw; position:absolute" src={cardV2Background} alt="cardBg">
            <div id="rarityBGList" style="background: {backgroundColorByCost[(card.stars)-3]}; "></div>
            <img class = "cardButton" src={card.source} alt="preview"/>
            <button class="cardListFrame" alt="cardBg" on:click={() => handleClick(card.source,card.name,card.attack,card.health,card.cost,card.stars,card.description)}></button>
            <div class="curCardStatsList" style="left: 2.68vw;">{card.attack}</div>
            <div class="curCardStatsList" style="left: 9.65vw;">{card.health}</div>
            <div class="curCardCostList">{card.cost}</div>
            <div class="curCardNameList">{card.name}</div>

            <div class="curCardRarityList" style="{starsColorByCost[(card.stars)-3]}">
                {#each Array(Number(card.stars)) as card,index}
                    <span style="font-size: 1vw;">★</span>
                {/each}
            </div>
        </div>
        {/each}
    </div>
{:else if selectedCollection == 2}
    <div class = "cardcollection" id = "diakcollection">
        {#each Cards.diakCardsArr as card}
        <div id="cardPreviewListCont">
            <img style="width: 12.5vw; position:absolute" src={cardV2Background} alt="cardBg">
            <div id="rarityBGList" style="background: {backgroundColorByCost[(card.stars)-3]}; "></div>
            <img class = "cardButton" src={card.source} alt="preview"/>
            <button class="cardListFrame" alt="cardBg" on:click={() => handleClick(card.source,card.name,card.attack,card.health,card.cost,card.stars,card.description)}></button>
            <div class="curCardStatsList" style="left: 2.68vw;">{card.attack}</div>
            <div class="curCardStatsList" style="left: 9.65vw;">{card.health}</div>
            <div class="curCardCostList">{card.cost}</div>
            <div class="curCardNameList">{card.name}</div>

            <div class="curCardRarityList" style="{starsColorByCost[(card.stars)-3]}">
                {#each Array(Number(card.stars)) as card,index}
                    <span style="font-size: 1vw;">★</span>
                {/each}
            </div>
        </div>
        {/each}
    </div>
{/if}

<div id="cardPreview">
    <img class="cardTemplate" src={cardBackground} alt="cardBg">
    <div id="rarityBG" style="background: {backgroundColorByCost[(curCardInView.rarity)-3]}; "></div>
    <img id="curCardInView" src={curCardInView.source} alt="">
    <img class="cardTemplate" src={cardForeground} alt="cardBg">
    <div id="curCardDesc">{curCardInView.desc}</div>
    <div class="curCardStats" style="left: 7.4vw;">{curCardInView.atk}</div>
    <div class="curCardStats" style="left: 21.5vw;">{curCardInView.hp}</div>
    <div class="curCardCost">{curCardInView.cost}</div>
    <div class="curCardName">{curCardInView.name}</div>
    
    <div id="curCardRarity" style="{starsColorByCost[(curCardInView.rarity)-3]}; top: {starSizeTop[(curCardInView.rarity)-3]}vw;">
        {#each Array(Number(curCardInView.rarity)) as card,index}
            <span style="font-size: {starSizeArray[index]}vw;">★</span>
        {/each}
    </div>
    
</div>

<div class = "links">
    <a href="/gachaScreen">sepd ur money here</a><br>
    <a href="./">main menu here</a>
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


    #cardPreviewListCont{
        position: relative;
        width:14.3vw;
        height: 17vw;
        display:inline-block;
    }
    .cardcollection {
        width: 60vw;
        height: 65vh;
        overflow: auto;
        float: left;
        padding-top: 4vh;
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
    }
    #rarityBGList{
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


    #cardPreview{
        width: 32vw;
        height: 40vw;
        position: relative;
        margin-left:60vw;
        margin-top: 2vh;
    }
    .cardTemplate{
        width: 30vw;
        position: absolute;
        left: 0;
    }
    #rarityBG{
        position: absolute;
        width: 20vw;
        height: 20vw;
        left: 6vw;
        top: 2.5vw;

        opacity: 0.35;
        background-blend-mode:saturation;
    }
    #curCardInView{
        position: absolute;
        width: 14vw;
        left: 8.5vw;
        top: 5vw;

        box-shadow: 0 0 1.3vw rgba(0, 0, 0, 0.735);
    }
    .curCardStats{
        font-size: 3vw;
        font-family: 'SevenSwords';
        color: white;
        text-shadow:
                -0.08vw -0.08vw 0 #000, /* Top-left shadow */
                0.08vw -0.08vw 0 #000, /* Top-right shadow */
                -0.08vw 0.08vw 0 #000, /* Bottom-left shadow */
                0.08vw 0.08vw 0 #000; /* Bottom-right shadow */

        position: absolute;
        top: 26.7vw;
    }
    .curCardCost{
        font-size: 5vw;
        font-weight: bold;
        font: italic;
        font-family: 'ShadowLight';
        color: rgb(184, 11, 11);

        position: absolute;
        top: 2.5vw;
        left: 7vw;
    }
    .curCardName{
        font-size: 2vw;
        font-family: Impact;
        color: rgba(247, 240, 221, 0.778);
        text-shadow: 0 0 1vw rgba(0, 0, 0, 0.536);

        position: absolute;
        top: 19.2vw;
        left: 5.5vw;

        text-align: center;
        width: 20vw;
    }
    #curCardDesc{
        font-size: 1.3vmin;
        font-family: cursive;
        color: rgba(0, 0, 0, 0.778);
        font: bold;

        position: absolute;
        top: 23vw;
        left: 7.19vw;

        width: 16.5vw;
        text-align: center;
    }
    #curCardRarity{
        position: absolute;
        left: 8.5vw;
        width: 13.8vw;
        text-align: center;
        mix-blend-mode: screen;
    }


    #cardPreviewListCont:hover{
        cursor:pointer;
        transform: scale(1.1);
    }

    #background {
        background-image: url("../../lib/assets/collection/bg.png");
        overflow: hidden;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: cover; /* Adjust as needed: cover, contain, etc. */
        background-repeat: no-repeat;
        background-position: center center;
        z-index: -3;
    }

</style>