<script>
    import cardBackground from "../../lib/assets/collection/cardV1BG.png"
    import cardForeground from "../../lib/assets/collection/cardV1Top.png"
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
        source: ph,
        name: "Dr. Farkas",
        atk: "6",
        hp: "7",
        cost: "4",
        rarity: "5",
        desc: "loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum",
        color: ""
    }


    function handleClick(source,name,atk,hp,cost,rarity,desc) {
        curCardInView.source = source
        curCardInView.name = name
        curCardInView.atk = atk
        curCardInView.hp = hp
        curCardInView.cost = cost
        curCardInView.rarity = rarity
        if (rarity == 3){
            curCardInView.color = "#2672ed"
        }
        else if (rarity == 4){
            curCardInView.color = "#8626ed"
        }
        else if (rarity == 5){
            curCardInView.color = "#ed7c26"
        }
        else{
            curCardInView.color = "linear-gradient(180deg, rgb(235, 160, 160), rgb(240, 216, 171), rgb(233, 233, 169), rgb(174, 236, 174), rgb(168, 213, 240), rgb(200, 155, 231), rgb(235, 159, 235))"
        }
        curCardInView.desc = desc
    }
</script>

<div id = "background"></div>
<h1 style="margin-top:2vh; font-size:5vmin; text-align:center; color:white">Collection</h1>
<div id="typeChoosers">
    <!-- buttons to choose the active banner -->
    <button style="background: URL({SNCover}), no-repeat; background-size:cover" class="bannerIcon" on:click={() => selectedCollection = 1}></button>
    <button style="background: URL({YCCover}), no-repeat; background-size:cover" class="bannerIcon" on:click={() => selectedCollection = 2}></button>
    <button style="background: URL({SpellCover}), no-repeat; background-size:cover" class="bannerIcon" on:click={() => selectedCollection = 3}></button>
</div>

{#if selectedCollection == 1}
    <div class = "cardcollection" id = "tanarcollection">
        {#each Cards.tanarCardsArr as card}
            <button class = "cardButton" style="background-image: url({card.source})" on:click={() => handleClick(card.source,card.name,card.attack,card.health,card.cost,card.stars,card.description)}></button>
        {/each}
    </div>
{:else if selectedCollection == 2}
    <div class = "cardcollection" id = "diakcollection">
        {#each Cards.diakCardsArr as card}
            <button class = "cardButton" style="background-image: url({card.source})" on:click={() => handleClick(card.source)}></button>
        {/each}
    </div>
{/if}

<div id="cardPreview">
    <img class="cardTemplate" src={cardBackground} alt="cardBg">
    <div id="rarityBG" style="background: {curCardInView.color}; "></div>
    <img id="curCardInView" src={curCardInView.source} alt="">
    <img class="cardTemplate" src={cardForeground} alt="cardBg">
    <div id="curCardDesc">{curCardInView.desc}</div>
    <div class="curCardStats" style="left: 64vw;">{curCardInView.atk}</div>
    <div class="curCardStats" style="left: 78.1vw;">{curCardInView.hp}</div>
    <div id="curCardCost">{curCardInView.cost}</div>
    <div id="curCardName">{curCardInView.name}</div>
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

    #cardPreview{
        background-color: rgba(154, 137, 124, 0.42);
        position: relative;
    }
    .cardTemplate{
        width: 30vw;
        position: absolute;
    }
    #rarityBG{
        position: absolute;
        width: 20vw;
        height: 20vw;
        left: 62vw;
        top: 2.5vw;

        opacity: 0.35;
        background-blend-mode:saturation;
    }
    #curCardInView{
        position: absolute;
        width: 14vw;
        left: 64.93vw;
        top: 5vw;
    }
    .curCardStats{
        font-size: 6vmin;
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
    #curCardCost{
        font-size: 10vmin;
        font-weight: bold;
        font: italic;
        font-family: 'ShadowLight';
        color: rgb(184, 11, 11);

        position: absolute;
        top: 2.5vw;
        left: 63.6vw;
    }
    #curCardName{
        font-size: 4vmin;
        font-family: Impact;
        color: rgba(247, 240, 221, 0.778);

        position: absolute;
        top: 19.2vw;
        left: 62vw;
        
        text-align: center;
        width: 20vw;
    }
    #curCardDesc{
        font-size: 2vmin;
        font-family: cursive;
        color: rgba(0, 0, 0, 0.778);
        font: bold;

        position: absolute;
        top: 23vw;
        left: 63.7vw;

        width: 16.5vw;
        text-align: center;
    }

    .cardcollection {
        width: 57%;
        height: 65vh;
        overflow: auto;
        float: left;
    }

    .cardButton{
        height:30vh;
        width:10vw;
        border: 0.5vmin solid goldenrod;
        border-radius: 0.3vw; /* Add border radius for rounded corners */
        margin: 0.2vw;
        background-size:cover;
    }

    .cardButton:hover{
        cursor:pointer;
        scale:1.02;
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