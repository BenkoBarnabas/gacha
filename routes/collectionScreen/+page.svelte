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
    let refTanarDeck = Array.from(Cards.tanarCardsArr)
    let originalTanarDeck = Array.from(Cards.tanarCardsArr)
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

    function Sort(arr,property) {
    const len = arr.length;
    let swapped;

    do {
        swapped = false;

        for (let i = 0; i < len - 1; i++) {
            if (arr[i][property] > arr[i + 1][property]) {
                // Swap the elements
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }
    } while (swapped);

    refTanarDeck = refTanarDeck
    return arr;
}

    let activeFilters = [["AZ", true],["CostAsc",false],Array(10).fill(true),Array(7).fill(true),["RarityAsc",false],refTanarDeck]
    $: {ReduceList()
        if (!activeFilters[0][1] && !activeFilters[1][1] && !activeFilters[4][1]){
            activeFilters[0][1] = true
        }
        if (activeFilters[0][1]){
            Sort(refTanarDeck,"name")
            console.log(activeFilters);
        }
        else if(activeFilters[1][1]){
            Sort(refTanarDeck,"cost")
        }
        else if(activeFilters[4][1]){
            Sort(refTanarDeck,"stars")
        }
        else {
            refTanarDeck = Array.from(Cards.tanarCardsArr)
            refTanarDeck = refTanarDeck
        }
        console.log("updated");
    }
    function ReduceList(){
        var toDeleteEntries = []
        var property = "cost"
        var indexOfProperty = 2
        for (let i = 0; i < Cards.tanarCardsArr.length; i++){
            if(activeFilters[indexOfProperty][Cards.tanarCardsArr[i][property]] == false){
                toDeleteEntries.push(i)
            }
        }
        property = "stars"
        indexOfProperty = 3
        for (let i = 0; i < Cards.tanarCardsArr.length; i++){
            if(activeFilters[indexOfProperty][Cards.tanarCardsArr[i][property]] == false){
                toDeleteEntries.push(i)
            }
        }

        //delete all that isnt in the filtered domain
        refTanarDeck = Array.from(Cards.tanarCardsArr)

        toDeleteEntries = DeleteDoobsFromArray(toDeleteEntries)
        toDeleteEntries.sort(function(a, b){return a-b})
        console.log(toDeleteEntries);
        
        for (let i = toDeleteEntries.length - 1; i >= 0; i--) {
            const index = toDeleteEntries[i];
            // Use splice to remove the element at the specified index
            refTanarDeck.splice(index, 1);
        }
    }
    function SetCostFilterValues(param,indexOfProperty){
        for(let i = 0; i < activeFilters[indexOfProperty].length; i++){activeFilters[indexOfProperty][i] = param}
    }

    function DeleteDoobsFromArray(arr){
    const uniqueSet = new Set();
    return arr.filter((item) => {
        if (!uniqueSet.has(item)) {
        uniqueSet.add(item);
        return true;
        }
        return false;
    });
    }

    function ReverseListingOrder(arr){
        
        console.log("kill me");
    }
</script>

<div id = "background"></div>
<h1 style="margin-top:2vh; font-size:2.5vw; text-align:center; color:white">Collection</h1>
<div id="typeChoosers">
    <!-- buttons to choose the active banner -->
    <button style="background: URL({SNCover}), no-repeat; background-size:cover" class="bannerIcon" on:click={() => selectedCollection = 1}></button>
    <button style="background: URL({YCCover}), no-repeat; background-size:cover" class="bannerIcon" on:click={() => selectedCollection = 2}></button>
    <button style="background: URL({SpellCover}), no-repeat; background-size:cover" class="bannerIcon" on:click={() => selectedCollection = 3}></button>
    <div id="filtersCont">
        <tr>
        <td style="height:2vw;">
            <input type="text" id="searchBar">
        </td>
        <td style="height:2vw;">
            <div id="filterChooser">
                <div class="menu-trigger"></div>
                <div class="menu hidden noScrollers">
                    <label><input type="checkbox" bind:checked={activeFilters[0][1]}> A-Z</label> <button on:click={() => ReverseListingOrder(refTanarDeck)}>Desc</button><br>
                    <label><input type="checkbox" bind:checked={activeFilters[1][1]}> Cost Asc</label> <button on:click={() => ReverseListingOrder(refTanarDeck)}>Desc</button><br>
                    <label><input type="checkbox" bind:checked={activeFilters[4][1]}> Rarity Asc</label> <button on:click={() => ReverseListingOrder(refTanarDeck)}>Desc</button><br>
                    <br>
                    <label><input type="checkbox"> Megszerzett</label><br>
                    <label><input type="checkbox"> Nem megszerzett</label><br>
                    <br>
                    <label>Rarity: <button on:click={() => SetCostFilterValues(false,3)}>Clear</button> <button on:click={() => SetCostFilterValues(true,3)}>All</button><br>
                        UR<input type="checkbox" bind:checked={activeFilters[3][6]}> 5*<input type="checkbox" bind:checked={activeFilters[3][5]}> 4*<input type="checkbox" bind:checked={activeFilters[3][4]}> 3*<input type="checkbox" bind:checked={activeFilters[3][3]}></label><br>
                    <br>
                    <label>Cost: <button on:click={() => SetCostFilterValues(false,2)}>Clear</button> <button on:click={() => SetCostFilterValues(true,2)}>All</button><br>
                        {#each Array(10) as checks,i}
                            {i}<input type="checkbox" bind:checked={activeFilters[2][i]}> 
                        {/each}
                    </label>
                </div>
            </div>
        </td>
        </tr>
    </div>
</div>

{#if selectedCollection == 1}
    <div class = "cardcollection" id = "tanarcollection">
        {#each refTanarDeck as card}
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
                {#each Array(Number(card.stars)) as card}
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
    <div id="curCardDesc" class="noScrollers">{curCardInView.desc}</div>
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

    #filtersCont{
        width: 30vw;
        height: 5vw;
        float: right;
        margin-right:4vw;
    }
    #searchBar{
        width: 23vw;
        height: 2vw;
        margin: 0;
        padding: 0;
        background: rgba(119, 77, 59, 0.434);

        margin-top: 1.5vw;
    }
    #filterChooser{
        width: 2vw;
        height: 2vw;
    }
    #typeChoosers{
        width: 60vw;
        height: 5vw;
    }

    #filterChooser {
    position: relative;
    display: inline-block;
    }

    .menu-trigger {
        width: 3vw;
        height: 2vw;
        background: url("../../lib/assets/global/filterIcon.png");
        background-size: 100% 100%;
        cursor: pointer;

        margin-top: 0.7vw;
    }

    .menu {
        position: absolute;
        top: 100%;
        left: 0;
        background-color: #fff;
        border: 1px solid #ccc;
        display: none;

        height: 10vw;
        width: 10vw;
        overflow: auto;
        padding-bottom: 1vw;
        z-index: 3;

        font-family: "ShadowLight";
    }

    .hidden {
        display: none;
    }

    /* Show the menu when hovering over .menu-container */
    #filterChooser:hover .menu {
        display: block;
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
        font-family: cursive;
        color: rgba(0, 0, 0, 0.778);
        font: bold;
        font-size: 1vw;

        position: absolute;
        top: 23vw;
        left: 8.3vw;

        width: 14vw;
        text-align: center;
        overflow: auto;
        height: 6vw;
    }
    .noScrollers::-webkit-scrollbar {
        width: 0;
        background: none;
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
        height: 100vh;
        background-size: cover; /* Adjust as needed: cover, contain, etc. */
        background-repeat: no-repeat;
        background-position: center center;
        z-index: -3;
    }

</style>