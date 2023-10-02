<script>
    import * as Cards from "../../card"

    import cardBackground from "../../lib/assets/global/cardV1BG.png"
    import cardForeground from "../../lib/assets/global/cardV1Top.png"
    import cardV2Background from "../../lib/assets/global/cardV2BG.png"
    var starSizeArray = [] //for some reason it didnt work with a normal return so i had to put them into an array ,im throwing up
    var starSizeTop = [1,1,0,0]
    var backgroundColorByCost = ["#2672ed","#8626ed","#ed7c26","linear-gradient(180deg, rgb(235, 160, 160), rgb(240, 216, 171), rgb(233, 233, 169), rgb(174, 236, 174), rgb(168, 213, 240), rgb(200, 155, 231), rgb(235, 159, 235))"]
    var starsColorByCost = ["color: #2672ed;","color: #8626ed;","#ed7c26","background-image: linear-gradient(90deg, rgb(235, 160, 160), rgb(240, 216, 171), rgb(233, 233, 169), rgb(174, 236, 174), rgb(168, 213, 240), rgb(200, 155, 231), rgb(235, 159, 235));-webkit-background-clip: text;background-clip: text;color: transparent;"]


    let yourHand = [Cards.BizsoCard,Cards.BencusCard,Cards.MsFarkasCard,Cards.FarkasCard,Cards.BarniCard]
    let yourBoard = Array(12).fill("")
    let yourBoardPhs = Array(12).fill("")

    let isCardInYourHandInPlacingMode= false


    import { onMount } from 'svelte';
    let targetArea
    let draggables;
    let dragged = undefined


    onMount(() => {
        targetArea = document.getElementsByClassName("target")

        for(draggables of document.getElementsByClassName("move")){
            draggables.addEventListener("dragstart", dragStart)
            draggables.addEventListener("touchstart", dragStart)
        }
        for(let i = 0;i<(yourBoard.length)+1;i++){
            targetArea[i].addEventListener("drop", drop)
            targetArea[i].addEventListener("dragover", dragOver)
            targetArea[i].addEventListener("dragleave", dragLeave)
        }
        
    });

    function drop(event) {
        event.preventDefault()

        yourBoardPhs[Number(event.target.id.replace("td",""))] = ""
        yourBoard[Number(event.target.id.replace("td",""))] = yourHand[dragged.id]
        yourBoard = yourBoard

        yourHand.splice(dragged.id, 1);
        yourHand = yourHand

        console.log(yourBoard);
        event.target.removeEventListener("drop", drop)
        event.target.removeEventListener("dragover", dragOver)
        event.target.removeEventListener("dragleave", dragLeave)
        console.log(event.target);
    }
    function dragStart(event) {
        dragged = event.target
        
        yourBoardPhs.fill("")
        yourBoardPhs = yourBoardPhs
        
    }
    function dragOver(event){
        event.preventDefault()
        
        yourBoardPhs[Number(event.target.id.replace("td",""))] = yourHand[dragged.id]
        yourBoardPhs = yourBoardPhs
    }
    function dragLeave(event){
        event.preventDefault()
        
        yourBoardPhs[Number(event.target.id.replace("td",""))] = ""
        yourBoardPhs = yourBoardPhs
    }

    
    function PlacingMode(card, domId){
        var parent = document.getElementById(domId)
        var child = parent.querySelector('#cardBackground')

        for (let i=0;i<(yourHand.length);i++){
            var parent2 = document.getElementById(i)
            var child2 = parent2.querySelector('#cardBackground')
            //child2.id = "cardBackground"
            yourHand = yourHand;
        }

        if(!isCardInYourHandInPlacingMode || !yourBoardPhs.includes(card)){
            yourBoardPhs.fill("")

            for (let i = 0; i<yourBoardPhs.length+1;i++){
                if(yourBoard[i] == ""){
                    yourBoardPhs[i] = card
                }
            }

            //child.id = "cardBackgroundHighlight"
            //console.log("--colorr:"+ backgroundColorByCost[(card.stars)-3]+"; --colorr2: #"+(parseInt((backgroundColorByCost[(card.stars)-3].replace('#','')), 16)+663552).toString(16)+"; animation: cardInHandHighlighted 2s infinite;");
            //style="--colorr: {backgroundColorByCost[(card.stars)-3]}; --colorr2: #{(parseInt((backgroundColorByCost[(card.stars)-3].replace("#","")), 16)+663552).toString(16)};"
            yourBoardPhs = yourBoardPhs

            isCardInYourHandInPlacingMode = true
        }
        else{
            isCardInYourHandInPlacingMode = false
            yourBoardPhs.fill("")

            //child.id = "cardBackground"
            yourBoardPhs = yourBoardPhs
        }

        yourHand = yourHand;
    }
    function PlaceByClick(card,i){
        yourBoard[i] = card;
        
        yourBoardPhs.fill("")
        yourHand.splice(yourHand.indexOf(card), 1);

        yourBoard = yourBoard
        yourBoardPhs = yourBoardPhs
        yourHand = yourHand

        console.log(document.getElementById("td"+i));
        document.getElementById("td"+i).removeEventListener("drop", drop)
        document.getElementById("td"+i).removeEventListener("dragover", dragOver)
        document.getElementById("td"+i).removeEventListener("dragleave", dragLeave)

        
    }

</script>

<div id="background"></div>

<div id="gamePlayFiledCont">
    <div id="playField">
        <table class="gameFiledSides" id="yourSide">
            <tr class="tierOne">
                {#each Array((yourBoard.length)/2) as cell,i}
                    <td class="target boardsCells" id="td{i}">
                    {#if yourBoardPhs[i] != ""}
                    <div on:click={() => PlaceByClick(yourBoardPhs[i],i)} id="cardPreviewListCont" class:isPlacingModePh={isCardInYourHandInPlacingMode} style="filter: grayscale(0.5) contrast(50%);opacity: 0.7;" on:keydown role="button" tabindex="">
                        <img draggable="false" style="width: calc(var(--cardOnBoardScale)*1vw*12.5); position:absolute" src={cardV2Background} alt="cardBg">
                        <div id="rarityBGList" style="background: {backgroundColorByCost[( yourBoardPhs[i].stars)-3]}; "></div>
                        <img draggable="false" class = "cardButton" src={ yourBoardPhs[i].source} alt="preview"/>
                        <button class="cardListFrame" alt="cardBg"></button>
                        <div class="curCardStatsList" style="left: calc(var(--cardOnBoardScale)*1vw*2.68);">{ yourBoardPhs[i].attack}</div>
                        <div class="curCardStatsList" style="left: calc(var(--cardOnBoardScale)*1vw*9.65);">{ yourBoardPhs[i].health}</div>
                        <div class="curCardCostList">{ yourBoardPhs[i].cost}</div>
                        <div class="curCardNameList">{ yourBoardPhs[i].name}</div>
            
                        <div class="curCardRarityList" style="{starsColorByCost[( yourBoardPhs[i].stars)-3]}">
                            {#each Array(Number( yourBoardPhs[i].stars)) as card,index}
                                <span style="font-size: calc(var(--cardOnBoardScale)*1vw*1);">★</span>
                            {/each}
                        </div>
                    </div>
                    {:else if yourBoard[i] != ""}
                    <div id="cardPreviewListCont">
                        <img draggable="false" style="width: calc(var(--cardOnBoardScale)*1vw*12.5); position:absolute" src={cardV2Background} alt="cardBg">
                        <div id="rarityBGList" style="background: {backgroundColorByCost[(yourBoard[i].stars)-3]}; "></div>
                        <img draggable="false" class = "cardButton" src={yourBoard[i].source} alt="preview"/>
                        <button class="cardListFrame" alt="cardBg"></button>
                        <div class="curCardStatsList" style="left: calc(var(--cardOnBoardScale)*1vw*2.68);">{yourBoard[i].attack}</div>
                        <div class="curCardStatsList" style="left: calc(var(--cardOnBoardScale)*1vw*9.65);">{yourBoard[i].health}</div>
                        <div class="curCardCostList">{yourBoard[i].cost}</div>
                        <div class="curCardNameList">{yourBoard[i].name}</div>
            
                        <div class="curCardRarityList" style="{starsColorByCost[(yourBoard[i].stars)-3]}">
                            {#each Array(Number(yourBoard[i].stars)) as card,index}
                                <span style="font-size: calc(var(--cardOnBoardScale)*1vw*1);">★</span>
                            {/each}
                        </div>
                    </div>
                    {/if}
                </td>
                {/each}
            </tr>
            <tr class="tierTwo">
                {#each Array((yourBoard.length)/2) as cell,i}
                    <td class="target boardsCells" id="td{i+(yourBoard.length)/2}">
                    {#if yourBoardPhs[i+(yourBoardPhs.length)/2] != ""}
                    <div on:click={() => PlaceByClick(yourBoardPhs[i],i+(yourBoard.length)/2)} id="cardPreviewListCont" class:isPlacingModePh={isCardInYourHandInPlacingMode} style="filter: grayscale(0.5) contrast(50%);opacity: 0.7;" on:keydown role="button" tabindex="">
                        <img draggable="false" style="width: calc(var(--cardOnBoardScale)*1vw*12.5); position:absolute" src={cardV2Background} alt="cardBg">
                        <div id="rarityBGList" style="background: {backgroundColorByCost[yourBoardPhs[i+(yourBoardPhs.length)/2]]}; "></div>
                        <img draggable="false" class = "cardButton" src={yourBoardPhs[i+(yourBoardPhs.length)/2].source} alt="preview"/>
                        <button class="cardListFrame" alt="cardBg"></button>
                        <div class="curCardStatsList" style="left: calc(var(--cardOnBoardScale)*1vw*2.68);">{yourBoardPhs[i+(yourBoardPhs.length)/2].attack}</div>
                        <div class="curCardStatsList" style="left: calc(var(--cardOnBoardScale)*1vw*9.65);">{yourBoardPhs[i+(yourBoardPhs.length)/2].health}</div>
                        <div class="curCardCostList">{yourBoardPhs[i+(yourBoardPhs.length)/2].cost}</div>
                        <div class="curCardNameList">{yourBoardPhs[i+(yourBoardPhs.length)/2].name}</div>
            
                        <div class="curCardRarityList" style="{starsColorByCost[(yourBoardPhs[i+(yourBoardPhs.length)/2].stars)-3]}">
                            {#each Array(Number(yourBoardPhs[i+(yourBoardPhs.length)/2].stars)) as card,index}
                                <span style="font-size: calc(var(--cardOnBoardScale)*1vw*1);">★</span>
                            {/each}
                        </div>
                    </div>
                    {:else if yourBoard[i+(yourBoard.length)/2] != ""}
                    <div id="cardPreviewListCont">
                        <img draggable="false" style="width: calc(var(--cardOnBoardScale)*1vw*12.5); position:absolute" src={cardV2Background} alt="cardBg">
                        <div id="rarityBGList" style="background: {backgroundColorByCost[(yourBoard[i+(yourBoard.length)/2].stars)-3]}; "></div>
                        <img draggable="false" class = "cardButton" src={yourBoard[i+(yourBoard.length)/2].source} alt="preview"/>
                        <button class="cardListFrame" alt="cardBg"></button>
                        <div class="curCardStatsList" style="left: calc(var(--cardOnBoardScale)*1vw*2.68);">{yourBoard[i+(yourBoard.length)/2].attack}</div>
                        <div class="curCardStatsList" style="left: calc(var(--cardOnBoardScale)*1vw*9.65);">{yourBoard[i+(yourBoard.length)/2].health}</div>
                        <div class="curCardCostList">{yourBoard[i+(yourBoard.length)/2].cost}</div>
                        <div class="curCardNameList">{yourBoard[i+(yourBoard.length)/2].name}</div>
            
                        <div class="curCardRarityList" style="{starsColorByCost[(yourBoard[i+(yourBoard.length)/2].stars)-3]}">
                            {#each Array(Number(yourBoard[i+(yourBoard.length)/2].stars)) as card,index}
                                <span style="font-size: calc(var(--cardOnBoardScale)*1vw*1);">★</span>
                            {/each}
                        </div>
                    </div>
                    {/if}
                </td>
                {/each}
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
        {#each yourHand as card,i}
        <div id={i} on:click={() => PlacingMode(card,i)} draggable="true" class="previewInHand move" style="--cardNum: {yourHand.length};transform: rotate({-22.5+(45/yourHand.length)*(i+1)}deg);top:{(yourHand.length-(i))/3}vw;" on:keydown role="button" tabindex="">
            <img draggable="false" class="cardTemplate" id="cardBackground" src={cardBackground} style="--colorr: {backgroundColorByCost[(card.stars)-3]}; --colorr2: #{(parseInt((backgroundColorByCost[(card.stars)-3].replace("#","")), 16)+663552).toString(16)};" alt="cardBg">
            <div id="rarityBG" style="background: {backgroundColorByCost[(card.stars)-3]}; "></div>
            <img draggable="false" id="curCardInView" src={card.source} alt="">
            <img draggable="false" class="cardTemplate" src={cardForeground} alt="cardBg">
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
        --cardOnBoardScale: 0.5;
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
        top: 0vw;
    }
    #yourHand{
        background-color: blue;
        top: 35vw;
    }
    #enemyHand{
        background-color: red;
        top: 0vw;
    }
    .handCont{
        width: 50vw;
        height: 10vw;

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
    .boardsCells{
        border: 0.1vw solid black;
        padding:0;
        margin: 0;

        width: 9vw;
        height: 9vw;

        z-index: 11;
    }


    .previewInHand{
        margin-right: calc(50/var(--cardNum)*1vw);
        margin-top: 0;

        position: relative;

        border: none;
        padding: none;
        margin: none;
        background: none;
    }
    .previewInHand:hover{
        animation: scaleUp 0.3s forwards;
        z-index: 10;
        cursor: pointer;
    }
    .isPlacingModePh:hover{
        transform: scale(1.2);
    }

    @keyframes scaleUp{
        0%{
            transform: scale(1);
        }
        100%{
            transform: scale(1.5);
        }
    }
    .cardTemplate{
        width: calc(var(--cardsScale)*1vw*30);
        position: absolute;
        left: 0;
    }
    #cardBackgroundHighlight{
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
        font-size: calc(var(--cardsScale)*1vw*1.2);

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
    #cardPreviewListCont{
        position: relative;
        width:calc(var(--cardOnBoardScale)*1vw*14.3);
        height: calc(var(--cardOnBoardScale)*1vw*17);
        display:inline-block;
        padding: 0;
        margin: 0;
    }
    .cardListFrame{
        width: calc(var(--cardOnBoardScale)*1vw*12.5);
        height: calc(var(--cardOnBoardScale)*1vw*15.8754);
        position:absolute;
        background-image: url("../../lib/assets/global/cardV2Top.png");
        background-size: cover;
        background-position: center;
        background-color: transparent;
        border: none;
    }
    #rarityBGList{
        position: absolute;
        width: calc(var(--cardOnBoardScale)*1vw*10);
        height: calc(var(--cardOnBoardScale)*1vw*13);
        left: calc(var(--cardOnBoardScale)*1vw*1);
        top: calc(var(--cardOnBoardScale)*1vw*1);

        opacity: 0.35;
        background-blend-mode:saturation;
    }
    .cardButton{
        width:calc(var(--cardOnBoardScale)*1vw*7.5);

        border: none;

        background-size:cover;
        box-shadow: 0 0 1.3vw rgba(0, 0, 0, 0.735);

        position: absolute;

        left: calc(var(--cardOnBoardScale)*1vw*2.97);
        top: calc(var(--cardOnBoardScale)*1vw*2.5);
    }
    .curCardStatsList{
        font-size: calc(var(--cardOnBoardScale)*1vw*1.7);
        font-family: 'SevenSwords';
        color: white;
        text-shadow:
                -0.08vw -0.08vw 0 #000, /* Top-left shadow */
                0.08vw -0.08vw 0 #000, /* Top-right shadow */
                -0.08vw 0.08vw 0 #000, /* Bottom-left shadow */
                0.08vw 0.08vw 0 #000; /* Bottom-right shadow */

        position: absolute;
        top: calc(var(--cardOnBoardScale)*1vw*13.3);
    }
    .curCardCostList{
        font-size: calc(var(--cardOnBoardScale)*1vw*3);
        font-weight: bold;
        font: italic;
        font-family: 'ShadowLight';
        color: rgb(184, 11, 11);

        position: absolute;
        top: calc(var(--cardOnBoardScale)*1vw*1);
        left: calc(var(--cardOnBoardScale)*1vw*2.5);
    }
    .curCardNameList{
        font-size: calc(var(--cardOnBoardScale)*1vw*1);
        font-family: Impact;
        color: rgba(247, 240, 221, 0.778);
        text-shadow: 0 0 calc(var(--cardOnBoardScale)*1vw*1) rgba(0, 0, 0, 0.536);

        position: absolute;
        top: calc(var(--cardOnBoardScale)*1vw*13.2);
        left: calc(var(--cardOnBoardScale)*1vw*2);

        text-align: center;
        width: calc(var(--cardOnBoardScale)*1vw*9.5);
    }
    .curCardRarityList{
        width: calc(var(--cardOnBoardScale)*1vw*6);
        text-align: center;
        mix-blend-mode: screen;

        position: absolute;
        left: calc(var(--cardOnBoardScale)*1vw*3.7);
        top: calc(var(--cardOnBoardScale)*1vw*0.4);
    }


</style>