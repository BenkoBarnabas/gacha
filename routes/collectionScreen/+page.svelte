<script>
    import loadingScreen from "../../lib/assets/global/loadingScreen.gif"
    import logo from "../../lib/assets/global/logoTextv3.png"

    import cardBackground from "../../lib/assets/global/cardV1BG.png"
    import cardForeground from "../../lib/assets/global/cardV1Top.png"
    import cardV2Background from "../../lib/assets/global/cardV2BG.png"

    import spellForeground from "../../lib/assets/global/spellV1Top.png"
    import spellV2Foreground from "../../lib/assets/global/spellV2Top.png"
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
        tunya: "rgba(113, 166, 117, 0.6)",
        lelkiismeretes: "rgba(113, 145, 166, 0.6)",
        vérszomjas: "rgba(166, 113, 118, 0.6)",
        veszett: "rgba(133, 113, 166, 0.6)"
    }

    import ph from "../../lib/assets/collection/tanar/Bizso.png"


    import SNCover from "../../lib/assets/gacha/SWCover.png" //cover for the buttons for switching banners
    import YCCover from "../../lib/assets/gacha/YCCover.png" //^^^
    import ExtraCover from "../../lib/assets/gacha/ExtraCover.png"
    import SpellCover from "../../lib/assets/gacha/SpellCover.png"

    import * as Cards from "../../card"
    //made a separate file just for all the cards, they can be used in every file with this import 

    import {userData,getUserDataFromLocalStorage} from "../../client"

    function requestFullScreen() {
        const elem = document.documentElement; // Whole document
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen(); // Firefox
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen(); // Chrome, Safari, and Opera
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen(); // IE/Edge
        }
    }

    let fabrikalScreenLathato = 0
    let shardCosts = [400, 900, 3000, 5000]
    let shardSpan

    

    let localUserData = userData
    let pageLoaded = false
    import { onMount } from 'svelte';
    onMount(() => {
        localUserData = JSON.parse(localStorage.getItem("userData"))
        if (localUserData) {
            //localUserData = JSON.parse(localStorage.getItem("userData"))
            getUserDataFromLocalStorage(localUserData, "userData")
        } else {
            console.log("Username not found in local storage.");
        }

        pageLoaded = true
        pageLoaded = pageLoaded
    });
    function GoToPage(filePath) {
        window.location = filePath; // Navigate to the parent directory
    }
    
    let searchInput = ""

    let selectedCollection = 1
    let refTanarDeck = Array.from(Cards.tanarCardsArr)
    let curCardInView = {
        type: "",
        source: "",
        name: "",
        atk: "",
        hp: "",
        cost: "",
        rarity: "",
        desc: "",
        color: "",
        quote: "",
        talent:"",
        aligment: ""
    }

    var starSizeArray = [] //for some reason it didnt work with a normal return so i had to put them into an array ,im throwing up
    var starSizeTop = [1,1,0,0]
    var backgroundColorByCost = ["#2672ed","#8626ed","#ed7c26","linear-gradient(180deg, rgb(235, 160, 160), rgb(240, 216, 171), rgb(233, 233, 169), rgb(174, 236, 174), rgb(168, 213, 240), rgb(200, 155, 231), rgb(235, 159, 235))"]
    var starsColorByCost = ["color: #2672ed;","color: #8626ed;","color: #ed7c26;","background-image: linear-gradient(90deg, rgb(235, 160, 160), rgb(240, 216, 171), rgb(233, 233, 169), rgb(174, 236, 174), rgb(168, 213, 240), rgb(200, 155, 231), rgb(235, 159, 235));-webkit-background-clip: text;background-clip: text;color: transparent;"]
    let voicelines = {}
    function handleClick(source,name,atk,hp,cost,rarity,desc,quote,talent,aligment) {
        curCardInView.type = "character"
        curCardInView.source = source
        curCardInView.name = name
        curCardInView.atk = atk
        curCardInView.hp = hp
        curCardInView.cost = cost
        curCardInView.rarity = rarity
        starSizeTop = starSizeTop
        curCardInView.desc = desc
        curCardInView.quote = quote
        curCardInView.talent = talent
        curCardInView.aligment = aligment

        starSizeArray = []
        for (let i = 0; i < curCardInView.rarity; i++){
            CalcStarSize(i)
        }

        voicelines[name].play();
        
    }

    function handleSpellClick(source,name,cost,rarity,desc,quote) {
        curCardInView.type = "spell"
        curCardInView.source = source
        curCardInView.name = name
        curCardInView.cost = cost
        curCardInView.rarity = rarity
        starSizeTop = starSizeTop
        curCardInView.desc = desc
        curCardInView.quote = quote

        starSizeArray = []
        for (let i = 0; i < curCardInView.rarity; i++){
            CalcStarSize(i)
        }

        voicelines[name].play();
        
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

    function scrollDown() {
        var scrollContainer = document.getElementById("list");
        scrollContainer.children[0].scrollTop += 200;
    }
</script>
{#if !pageLoaded}
<div id="loadingScreen">
  <img src={loadingScreen} alt="loading..." style="width: 15vw; display: block; margin-top:15%; margin-left:auto; margin-right:auto;">
  <h1 style="font-family: cursive; display: block; text-align:center;">LOADING...</h1>
</div>
{/if}

<div id = "background"></div>

<div id="header">
    <div id="logo"><h1 style="margin-top:2vh; font-size:2.5vw; text-align:center; color:white;">Gyüjtemény</h1></div>
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



<div id="typeChoosers">
    <!-- buttons to choose the active banner -->
    <button style="background: URL({SNCover}), no-repeat; background-size:cover" class="bannerIcon" on:click={() => selectedCollection = 1}></button>
    <button style="background: URL({YCCover}), no-repeat; background-size:cover" class="bannerIcon" on:click={() => selectedCollection = 2}></button>
    <button style="background: URL({ExtraCover}), no-repeat; background-size:cover" class="bannerIcon" on:click={() => selectedCollection = 4}></button>
    <button style="background: URL({SpellCover}), no-repeat; background-size:cover" class="bannerIcon" on:click={() => selectedCollection = 3}></button>

    <div id="filtersCont">
        <tr>
        <td style="height:2vw;">
            <input type="text" id="searchBar" bind:value={searchInput}>
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

{#each Cards.allCardsArr as card,i}
<audio controls id="music" style="display: none;"  src={card.audio}   bind:this={voicelines[card.name]}></audio>
{/each}

<div id="list">
    {#if selectedCollection == 1}
    <div class = "cardcollection noScrollers" id = "tanarcollection" >
        {#each refTanarDeck as card}
        {#if card.name.includes(searchInput)}
        <div id="cardPreviewListCont">
            <img style="width: 12.5vw; position:absolute" src={cardV2Background} alt="cardBg">
            <div id="rarityBGList" style="background: {backgroundColorByCost[(card.stars)-3]}; "></div>
            <img class = "cardButton" src={card.source} alt="preview"/>
            <button class="cardListFrame" alt="cardBg" on:click={() => handleClick(card.source,card.name,card.attack,card.health,card.cost,card.stars,card.description,card.quote,card.talent,card.aligment)}></button>
            <div class="curCardStatsList" style="left: 2.68vw;">{card.attack}</div>
            <div class="curCardStatsList" style="left: 9.65vw;">{card.health}</div>
            <div class="curCardCostList">{card.cost}</div>
            <div class="curCardNameList curNonSpellNameList">{card.name}</div>

            {#if card.talent != ""}
                {#if card.talent.includes(",")}
                <div class="curCardMultipleIconsContainer">
                    {#each card.talent.split(",") as icon, i}
                    <div style="width:{5.2/card.talent.split(",").length}vw; margin:auto">
                        <img style="width:1.4vw; margin:auto; display:block" src={talentIcons[icon.replace(" ","")]} alt="talent">
                    </div>
                    {/each}
                </div>
                {:else}
                <div class="curCardTalentList">{card.talent.replace("támadás","")}</div>
                <img style="left: 3.8vw;" class="curCardTalentIconList" src={talentIcons[card.talent.replace(" ","")]} alt="talent">
                {/if}
            {/if}
            
            {#if card.aligment.includes(",")}
                {#each card.aligment.split(",") as aligment,i}
                <img style="top: {4.8 + i* 2.55}vw; background-color: {aligmentBackgroundColors[aligment]}; border-radius: 0.5vw;" class="curCardAligList" src={aligmentIcons[aligment]} alt="aligment">
                {/each}
            {:else}
                <img style="background-color: {aligmentBackgroundColors[card.aligment]}; border-radius: 0.5vw;" class="curCardAligList" src={aligmentIcons[card.aligment]} alt="aligment">
            {/if}
            <div class="curCardRarityList" style="{starsColorByCost[(card.stars)-3]}">
                {#each Array(Number(card.stars)) as card}
                    <span style="font-size: 1vw;">★</span>
                {/each}
            </div>
                
        </div>
        {/if}
        {/each}
    </div>
    {:else if selectedCollection == 2}
    <div class = "cardcollection  noScrollers" id = "diakcollection">
        {#each Cards.diakCardsArr as card}
        {#if card.name.includes(searchInput)}
        <div id="cardPreviewListCont">
            <img style="width: 12.5vw; position:absolute" src={cardV2Background} alt="cardBg">
            <div id="rarityBGList" style="background: {backgroundColorByCost[(card.stars)-3]}; "></div>
            <img class = "cardButton" src={card.source} alt="preview"/>
            <button class="cardListFrame" alt="cardBg" on:click={() => handleClick(card.source,card.name,card.attack,card.health,card.cost,card.stars,card.description,card.quote,card.talent,card.aligment)}></button>
            <div class="curCardStatsList" style="left: 2.68vw;">{card.attack}</div>
            <div class="curCardStatsList" style="left: 9.65vw;">{card.health}</div>
            <div class="curCardCostList">{card.cost}</div>
            <div class="curCardNameList curNonSpellNameList">{card.name}</div>

            {#if card.talent != ""}
                {#if card.talent.includes(",")}
                <div class="curCardMultipleIconsContainer">
                    {#each card.talent.split(",") as icon, i}
                    <div style="width:{5.2/card.talent.split(",").length}vw; margin:auto">
                        <img style="width:1.4vw" src={talentIcons[icon.replace(" ","")]} alt="talent">
                    </div>
                    {/each}
                </div>
                {:else}
                <div class="curCardTalentList">{card.talent.replace("támadás","")}</div>
                <img style="left: 3.8vw;" class="curCardTalentIconList" src={talentIcons[card.talent.replace(" ","")]} alt="talent">
                {/if}
            {/if}


            {#if card.aligment.includes(",")}
            {#each card.aligment.split(",") as aligment,i}
                <img style="top: {4.8 + i* 2.55}vw; background-color: {aligmentBackgroundColors[aligment]}; border-radius: 0.5vw;" class="curCardAligList" src={aligmentIcons[aligment]} alt="aligment">
            {/each}
            {:else}
                <img style="background-color: {aligmentBackgroundColors[card.aligment]}; border-radius: 0.5vw;" class="curCardAligList" src={aligmentIcons[card.aligment]} alt="aligment">
            {/if}

            <div class="curCardRarityList" style="{starsColorByCost[(card.stars)-3]}">
                {#each Array(Number(card.stars)) as card}
                    <span style="font-size: 1vw;">★</span>
                {/each}
            </div>
        </div>
        {/if}
        {/each}
    </div>
    {:else if selectedCollection == 4}
    <div class = "cardcollection  noScrollers" id = "extracollection">
        {#each Cards.extraCardsArr as card}
        {#if card.name.includes(searchInput)}
        <div id="cardPreviewListCont">
            <img style="width: 12.5vw; position:absolute" src={cardV2Background} alt="cardBg">
            <div id="rarityBGList" style="background: {backgroundColorByCost[(card.stars)-3]}; "></div>
            <img class = "cardButton" src={card.source} alt="preview"/>
            <button class="cardListFrame" alt="cardBg" on:click={() => handleClick(card.source,card.name,card.attack,card.health,card.cost,card.stars,card.description,card.quote,card.talent,card.aligment)}></button>
            <div class="curCardStatsList" style="left: 2.68vw;">{card.attack}</div>
            <div class="curCardStatsList" style="left: 9.65vw;">{card.health}</div>
            <div class="curCardCostList">{card.cost}</div>
            <div class="curCardNameList curNonSpellNameList">{card.name}</div>

            {#if card.talent != ""}
                {#if card.talent.includes(",")}
                <div class="curCardMultipleIconsContainer">
                    {#each card.talent.split(",") as icon, i}
                    <div style="width:{5.2/card.talent.split(",").length}vw; margin:auto">
                        <img style="width:1.4vw" src={talentIcons[icon.replace(" ","")]} alt="talent">
                    </div>
                    {/each}
                </div>
                {:else}
                <div class="curCardTalentList">{card.talent.replace("támadás","")}</div>
                <img style="left: 3.8vw;" class="curCardTalentIconList" src={talentIcons[card.talent.replace(" ","")]} alt="talent">
                {/if}
            {/if}


            {#if card.aligment.includes(",")}
            {#each card.aligment.split(",") as aligment,i}
                <img style="top: {4.8 + i* 2.55}vw; background-color: {aligmentBackgroundColors[aligment]}; border-radius: 0.5vw;" class="curCardAligList" src={aligmentIcons[aligment]} alt="aligment">
            {/each}
            {:else}
                <img style="background-color: {aligmentBackgroundColors[card.aligment]}; border-radius: 0.5vw;" class="curCardAligList" src={aligmentIcons[card.aligment]} alt="aligment">
            {/if}

            <div class="curCardRarityList" style="{starsColorByCost[(card.stars)-3]}">
                {#each Array(Number(card.stars)) as card}
                    <span style="font-size: 1vw;">★</span>
                {/each}
            </div>
        </div>
        {/if}
        {/each}
    </div>
    {:else}
        <div class = "cardcollection  noScrollers" id = "spellcollection">
            {#each Cards.spellCardsArr as card}
            {#if card.name.includes(searchInput)}
            <div id="cardPreviewListCont">
                <img style="width: 12.5vw; position:absolute" src={spellBackground} alt="cardBg">
                <div id="rarityBGList" style="background: {backgroundColorByCost[(card.stars)-3]}; "></div>
                <img class = "cardButton" src={card.source} alt="preview"/>
                <button class="spellListFrame" alt="cardBg" on:click={() => handleSpellClick(card.source,card.name,card.cost,card.stars,card.description,card.quote)}></button>

                <div class="curCardCostList">{card.cost}</div>
                <div class="curCardNameList curSpellNameList">{card.name}</div>

                <div class="curCardRarityList" style="{starsColorByCost[(card.stars)-3]}">
                    {#each Array(Number(card.stars)) as card}
                        <span style="font-size: 1vw;">★</span>
                    {/each}
                </div>
            </div>
            {/if}
            {/each}
        </div>
    {/if}
</div>

<div id="preview">
{#if curCardInView.type != ""}
    {#if curCardInView.type == "character"}
<div id="cardPreview" >
    <div id="curCardQuote" class="noScrollers"><i>"{curCardInView.quote}"</i></div>
    <div style="position:relative">
        <img class="cardTemplate" src={cardBackground} alt="cardBg">
        <div id="rarityBG" style="background: {backgroundColorByCost[(curCardInView.rarity)-3]}; "></div>
        <img id="curCardInView" src={curCardInView.source} alt="">
        <img class="cardTemplate" src={cardForeground} alt="cardBg">
        <div id="curCardDesc" class="noScrollers">{@html curCardInView.desc}</div>
        <div class="curCardStats" style="left: 7.4vw;">{curCardInView.atk}</div>
        <div class="curCardStats" style="left: 21.5vw;">{curCardInView.hp}</div>
        <div class="curCardCost">{curCardInView.cost}</div>
        <div class="curCardName">{curCardInView.name}</div>
        {#if curCardInView.talent != ""}
        <div class="curCardTalent">{curCardInView.talent.replace("támadás","")}</div>
        <img class="curCardTalentIcon" src={talentIcons[curCardInView.talent.replace(" ","")]} alt="talent">
        {/if}

            {#if curCardInView.aligment.includes(",")}
                {#each curCardInView.aligment.split(",") as aligment,i}
                <img style="top: {9.8 + i* 4.5}vw; background-color: {aligmentBackgroundColors[aligment]}; border-radius: 0.5vw;" class="curCardAlig" src={aligmentIcons[aligment]} alt="aligment">
                {/each}
            {:else}
                <img style="background-color: {aligmentBackgroundColors[curCardInView.aligment]}; border-radius: 0.5vw;" class="curCardAlig" src={aligmentIcons[curCardInView.aligment]} alt="aligment">
            {/if}        
        <div id="curCardRarity" style="{starsColorByCost[(curCardInView.rarity)-3]}; top: {starSizeTop[(curCardInView.rarity)-3]}vw;">
            {#each Array(Number(curCardInView.rarity)) as card,index}
                <span style="font-size: {starSizeArray[index]}vw;">★</span>
            {/each}
        </div>
    </div>
</div>
    
    {:else if curCardInView.type == "spell"}
    <div id="cardPreview" >
        <div id="curCardQuote" class="noScrollers"><i>"{curCardInView.quote}"</i></div>
        <div style="position:relative">
            <img class="cardTemplate" src={spellBackground} alt="cardBg">
            <div id="rarityBG" style="background: {backgroundColorByCost[(curCardInView.rarity)-3]}; "></div>
            <img id="curCardInView" src={curCardInView.source} alt="">
            <img class="cardTemplate" src={spellForeground} alt="cardBg">
            <div id="curCardDesc" class="noScrollers">{@html curCardInView.desc}</div>
            <div class="curCardCost" style="top:3vw; left:8vw;">{curCardInView.cost}</div>
            <div style="top: 19.4vw" class="curCardName">{curCardInView.name}</div>
            
            <div id="curCardRarity" style="{starsColorByCost[(curCardInView.rarity)-3]}; top: {starSizeTop[(curCardInView.rarity)-3]}vw;">
                {#each Array(Number(curCardInView.rarity)) as card,index}
                    <span style="font-size: {starSizeArray[index]}vw;">★</span>
                {/each}
            </div>

        </div>
    </div>
    {/if}
    <div id="fabricateButton">
        <button on:click={fabrikalScreenLathato = 1}>Fabrikál</button>
    </div>
    {#if fabrikalScreenLathato == 1}
    <div id="fabrikalScreen">
        <p><span bind:this={shardSpan} id="redOrGreen">{Number(localUserData.shards)}</span> / {shardCosts[curCardInView.rarity-3]}</p>
    </div>
    {/if}
{/if}
</div>
<button on:click={scrollDown} id="nyil" class="lefele"></button>



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
    @font-face{
        font-family: "talentFont";
        src: url('../../lib/assets/fonts/CenturyGothic.ttf');
    }
    #background{
        width: 100vw;
        height: 100vh;
        position: fixed;
        z-index: -1;
        background-image: url("../../lib/assets/collection/bg.png");
        background-size: 100% 100%;
        top: 0;
        left: 0;
    }

    .lefele{
        display:block;
        position:absolute;
        width: 3vw;
        height: 3vw;
        background-image: url("../../lib/assets/global/scrollbarDownArrow.png");
        background-size:100% 100% ;
        background-color: transparent;

        left: 30vw;
        animation: arrowUpDown 2s infinite;

        border: none;
    }
    .lefele:hover{
        cursor: pointer;
    }
    @keyframes arrowUpDown {
        0%{
            bottom: 4vh;
        }
        50%{
            bottom: 5vh;
        }
        100%{
            bottom: 4vh;
        }
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
    #header{
        
        margin: auto;

        width: 90vw;
        height: 10vh;

        font-family: "sgGachaFont";

        margin-bottom: 2vh;
    }
    #headerTable{


        width: 90vw;
        height: 10vh;

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

        left: 40vw;
        top:0vh;
    }
    .money{
        width: 9vw;
        height: 3.5vw;
        display: inline-block;
        text-shadow:
                -0.01vw -0.01vw 0 rgb(255, 255, 255), /* Top-left shadow */
                0.01vw -0.01vw 0 rgb(255, 255, 255), /* Top-right shadow */
                -0.01vw 0.01vw 0 rgb(255, 255, 255), /* Bottom-left shadow */
                0.01vw 0.01vw 0 rgb(255, 255, 255); /* Bottom-right shadow */
        
 
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
    @font-face {
        font-family: 'ShadowLight';
        src: url('../../lib/assets/fonts/ShadowsIntoLight-Regular.ttf');
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



    .bannerIcon {   /*the selectors itself */
        height: 4vw;
        width: 6vw;
        background-size: 100% 100%;
        margin: 10px;
    }
    .bannerIcon:hover {
        transform: scale(1.06);
        cursor: pointer;
    }

    #filtersCont{
        position: absolute;
        width: 30vw;
        height: 5vw;
        top:7.3vw;
        left:32vw;
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

    #filterChooser:hover .menu {
        display: block;
    }



    #cardPreviewListCont{
        position: relative;
        width:14.3vw;
        height: 17vw;
        display:inline-block;
        padding-top:12px;
    }
    .cardcollection {
        width: 60vw;
        height: 65vh;
        overflow: auto;
        position: absolute;
        top: 23.5vh;
        left: 4vw;
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
    .spellListFrame{
        width: 12.5vw;
        height: 15.8754vw;
        position:absolute;
        background-image: url("../../lib/assets/global/spellV2Top.png");
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
        top: 14vw;
    }
    .curCardCostList{
        font-size: 2.8vw;
        font-weight: bold;
        font: italic;
        font-family: 'ShadowLight';
        color: rgb(184, 11, 11);

        position: absolute;
        top: 1.8vw;
        left: 2.5vw;
    }
    .curCardNameList{
        font-size: 0.86vw;
        font-family: Impact;
        color: rgba(247, 240, 221, 0.778);
        text-shadow: 0 0 1vw rgba(0, 0, 0, 0.536);

        position: absolute;
        left: 2vw;

        text-align: center;
        width: 9.5vw;
    }
    .curSpellNameList{
        top:14.1vw;
    }
    .curNonSpellNameList{
        top:13.8vw;
    }
    .curCardRarityList{
        width: 6vw;
        text-align: center;
        mix-blend-mode: screen;

        position: absolute;
        left: 3.7vw;
        top: 1.4vw;
    }
    #curCardQuote{
        background-color: rgba(192, 101, 134, 0.533);
        height: 10%;
        width: 90%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align:center;
        margin-left: 1vw;
        margin-right: 1vw;
        overflow: auto;
        font-size: 0.89vw;
    }
    .curCardTalentIconList{
        position: absolute;
        width: 1.4vw;
        top: 14.6vw;
    }
    .curCardTalentList{
        position: absolute;
        font-family: "talentFont";
        color: antiquewhite;
        font-size: 0.7vw;
        top: 15vw;
        left: 3.9vw;
        width: 3.6vw;
        height: 1vw;
        padding-left:1.6vw;
    }
    .curCardAligList{
        position: absolute;
        width: 2.2vw;
        left: 1.8vw;
        top: 5.8vw;
    }
    .curCardMultipleIconsContainer{
            position: absolute;
            top: 14.5vw;
            left: 3.9vw;
            width: 5.2vw;
            height: 2vw;
            display:flex;
            flex-wrap:nowrap;
            align-content:space-around;
    }
    .curCardTalentIcon{
        position: absolute;
        width: 3.1vw;
        top: 19.6vw;
        left: 10.3vw;
    }
    .curCardTalent{
        position: absolute;
        font-family: "talentFont";
        color: antiquewhite;
        font-size: 1.2vw;
        top: 21.4vw;
        left: 13.5vw;
        width: 6vw;
        height: 1.7vw;
        text-align: center;
    }


    #preview{
        position: absolute;
        top:18.5vh;
        left:60vw;
    }
    #cardPreview{
        width: 32vw;
        height: 40vw;
        position: relative;
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
        font-size: 1.5vw;
        font-family: Impact;
        color: rgba(247, 240, 221, 0.778);
        text-shadow: 0 0 1vw rgba(0, 0, 0, 0.536);

        position: absolute;
        top: 18.6vw;
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
        height: 6.4vw;
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
    .curCardAlig{
        position: absolute;
        width: 4vw;
        left: 5.8vw;
        top: 10vw;
    }

    #cardPreviewListCont:hover{
        cursor:pointer;
        transform: scale(1.1);
    }

    

</style>