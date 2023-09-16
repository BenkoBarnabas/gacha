<script>
    import Filozofia from "../../lib/assets/collection/spell/filozofia.png"
    import Gomboc from "../../lib/assets/collection/spell/gomboc.png"
    import Tz from "../../lib/assets/collection/spell/tz.png"

    import SNCover from "../../lib/assets/gacha/SWCover.png" //cover for the buttons for switching banners
    import YCCover from "../../lib/assets/gacha/YCCover.png" //^^^
    import SpellCover from "../../lib/assets/gacha/SpellCover.png"

    import * as Cards from "../../card"
    //made a separate file just for all the cards, they can be used in every file with this import 
    
    let selectedCollection = 1

    let cardName
    let cardDescription
    let cardHealth
    let cardAttack
    let cardSource
    let cardStars = ""
    let cardCost

    let descriptionPage = false

    function handleClick(name, description, health, attack, source, stars, cost) {
        cardName = name
        cardDescription = description
        cardHealth = health
        cardAttack = attack
        cardSource = source
        cardStars = ""
        cardCost = cost
        
        for(let i = 0; i < stars; i++){
            cardStars = cardStars + "*"
        }
        descriptionPage = true
    }
</script>

<div id = "background"></div>
<h1 style="margin-top:3vh; font-size:5vmin; text-align:center; color:white">Collection</h1>
<div id="typeChoosers">
    <!-- buttons to choose the active banner -->
    <button style="background: URL({SNCover}), no-repeat; background-size:cover" class="bannerIcon" on:click={() => selectedCollection = 1}></button>
    <button style="background: URL({YCCover}), no-repeat; background-size:cover" class="bannerIcon" on:click={() => selectedCollection = 2}></button>
    <button style="background: URL({SpellCover}), no-repeat; background-size:cover" class="bannerIcon" on:click={() => selectedCollection = 3}></button>
</div>

{#if selectedCollection == 1}
    <h2>Tanárok</h2>
    <div class = "cardcollection" id = "tanarcollection">
        {#each Cards.tanarCardsArr as card}
            <button class = "cardButton" style="background-image: url({card.source})" on:click={() => handleClick(card.name, card.description, card.health, card.attack, card.source, card.stars, card.cost)}></button>
        {/each}
    </div>
{:else if selectedCollection == 2}
    <h2>Diákok</h2>
    <div class = "cardcollection" id = "diakcollection">
        {#each Cards.diakCardsArr as card}
            <button class = "cardButton" style="background-image: url({card.source})" on:click={() => handleClick(card.name, card.description, card.health, card.attack, card.source, card.stars, card.cost)}></button>
        {/each}
    </div>
{/if}

{#if descriptionPage}
    <div class = "bg">
        <h3>{"(" + cardCost + ")"} {cardName} {cardStars}</h3>
        <h4>{cardDescription}</h4>
        <p>Health: {cardHealth}</p>
        <p>Attack: {cardAttack}</p>
    </div>
{/if}

<div class = "links">
    <a href="/gachaScreen">sepd ur money here</a><br>
    <a href="./">main menu here</a>
</div>

<style>
    .cardcollection {
        background-color: aliceblue;
        overflow: auto;
        width: 90vw;
        margin: auto;
    }
    .cardButton{
        height:30vh;
        width:10vw;
        border: 0.5vmin solid goldenrod;
        border-radius: 5px; /* Add border radius for rounded corners */
        padding: 10px 10px; /* Add padding to the buttons */
        margin: 5px;
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

    .bg{
        background-color: rgba(224, 123, 157, 0.5);
        padding-inline:20px;
        padding-block: 10px;
        margin:50px;
    }

    h2{
        margin-block: 1vh;
        padding-inline:20px;
        text-align: center;
        background-color:rgba(255, 255, 255, 0.2)
    }
</style>