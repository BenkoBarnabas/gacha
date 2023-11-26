<script>
    import loadingScreen from "../../lib/assets/global/loadingScreen.gif"

    import * as Cards from "../../card"
    let enemyStartingHand = [Cards.BarniCard,Cards.BarniCard, Cards.FarkasCard, Cards.BizsoCard, Cards.BencusCard, Cards.ZenoCard]
    
    import {SendGameData,connectedToSocket, yourGameParametersClient, enemyGameParametersClient, DomLoaded, SveltePageLoaded, currentOpponentId, EndTurn} from "../../matchHandler"

    import cardBack from "../../lib/assets/global/cardBack.png"

    import cardBackground from "../../lib/assets/global/cardV1BG.png"
    import cardForeground from "../../lib/assets/global/cardV1Top.png"
    import cardV2Background from "../../lib/assets/global/cardV2BG.png"

    import { onMount } from 'svelte';
	import { requestFullScreen} from "../../client";
	import { blur } from "svelte/transition";

    var backgroundColorByCost = ["#2672ed","#8626ed","#ed7c26","linear-gradient(180deg, rgb(235, 160, 160), rgb(240, 216, 171), rgb(233, 233, 169), rgb(174, 236, 174), rgb(168, 213, 240), rgb(200, 155, 231), rgb(235, 159, 235))"]
    var starsColorByCost = ["color: #2672ed;","color: #8626ed;","color: #ed7c26;","background-image: linear-gradient(90deg, rgb(235, 160, 160), rgb(240, 216, 171), rgb(233, 233, 169), rgb(174, 236, 174), rgb(168, 213, 240), rgb(200, 155, 231), rgb(235, 159, 235));-webkit-background-clip: text;background-clip: text;color: transparent;"]

    
    let yourGameID
    let opponentGameID
    let gameKey

    let yourGameParameters = JSON.parse(JSON.stringify(yourGameParametersClient))
    let enemyGameParameters = JSON.parse(JSON.stringify(enemyGameParametersClient))

    
    let startingHandNum = 5
    let yourHand = []
    let enemyHand = []
    let cardsInYourHandClass = Array(startingHandNum).fill("cardTemplate")
    let newCard
    let cardsInHandDoms = []

    let yourKo = 8

    let targetArea = []
    let koTargetArea = []
    let kovek = []
    let dragged = undefined
    $:  {if (cardsInHandDoms[yourHand.length-1]) {
        cardsInHandDoms[yourHand.length-1].addEventListener("dragstart", dragStart)
        }
        if (cardsInHandDoms[0]) {
        cardsInHandDoms[0].addEventListener("dragstart", dragStart)
        }
        if (cardsInHandDoms[1]) {
        cardsInHandDoms[1].addEventListener("dragstart", dragStart)
        }
        if (cardsInHandDoms[2]) {
        cardsInHandDoms[2].addEventListener("dragstart", dragStart)
        }
        if (cardsInHandDoms[3]) {
        cardsInHandDoms[3].addEventListener("dragstart", dragStart)
        }
        if (cardsInHandDoms[4]) {
        cardsInHandDoms[4].addEventListener("dragstart", dragStart)
        }}

    
    function DrawStartingHand(n){
        var a = Array(5)
        for(let i = 0; i<n; i++){
            var random = Math.floor(Math.random() * yourGameParameters.remaningDeck.length)
            yourHand.push(yourGameParameters.remaningDeck[random])

            yourGameParameters.remaningDeck.splice(random,1)
            cardsInYourHandClass.push("cardTemplate")
            yourHand = yourHand

        }
        
        
        yourGameParameters.currentHand = Array.from(yourHand)
        //UpdateLocalStorage()
        
        SendGameData(JSON.stringify(yourGameParameters))
    }

    function DrawOne(){
        yourHand.push(yourGameParameters.remaningDeck[Math.floor(Math.random() * yourGameParameters.remaningDeck.length)])
        cardsInYourHandClass.push("cardTemplate")
        yourHand = yourHand

    }
    
    let yourBoard = Array(10).fill("")
    let yourBoardPhs = Array(10).fill("")
    let enemyBoard = Array(10).fill("")
    let enemyBoardPhs = Array(10).fill("")

    let isCardInYourHandInPlacingMode= false

    let turnCount = 1
    let isYourTurn = false
    let isYourRally = false
    let gameFase = 1


    let pageLoaded = false
    
    function ServerDependingCode(){
        update()

        console.log("your and enemy params: ", yourGameParameters,enemyGameParameters,);
        isYourTurn = yourGameParameters.isYourTurn
        console.log("IS IT MINE TURN????",isYourTurn);
        isYourTurn = isYourTurn
        isYourTurn == true ? isYourRally = true : isYourRally = false

        yourGameID = JSON.parse(localStorage.getItem("yourGameID"))
        opponentGameID = JSON.parse(localStorage.getItem("opponentGameID"))
        gameKey = JSON.parse(localStorage.getItem("gameKey"))

        DrawStartingHand(5)
        
    }
    onMount(() => {
            targetArea = document.getElementsByClassName("target")
            koTargetArea = document.getElementsByClassName("kotarget")
            kovek = document.getElementsByClassName("ko")

            
            for(let i = 0;i<(yourBoard.length);i++){
                targetArea[i].addEventListener("drop", drop)
                targetArea[i].addEventListener("dragover", dragOver)
                targetArea[i].addEventListener("dragleave", dragLeave)
            }
            for(let i = 0;i<(yourBoard.length);i++){
                koTargetArea[i].addEventListener("drop", koDrop)
                koTargetArea[i].addEventListener("dragover", koDragOver)
                koTargetArea[i].addEventListener("dragleave", koDragLeave)
                console.log(getEventListeners(koTargetArea[i]));
            }
            for (let i = 0; i<kovek.length; i++){
                kovek[i].addEventListener("dragstart",koDragStart)
                console.log("added ko listener");
            }
           

            SveltePageLoaded()
            DomLoaded()

            //events for communicating with clinet.js
            document.addEventListener('socketConnected', ServerDependingCode)
            document.addEventListener('nextTurn',NextTurn)



            pageLoaded = true
            pageLoaded = pageLoaded
        
    });



    function drop(event) {
        event.preventDefault()

        yourBoardPhs[Number(event.target.id.replace("td",""))] = ""
        yourBoard[Number(event.target.id.replace("td",""))] = dragged

       

        console.log("your board: ",yourBoard);
        event.target.removeEventListener("drop", drop)
        event.target.removeEventListener("dragover", dragOver)
        event.target.removeEventListener("dragleave", dragLeave)
        console.log("dropped to this cell: ",event.target);
        console.log("the thing u dropped: ",dragged);

        
        if(dragged.type == "character"){
            yourHand.splice(yourHand.indexOf(dragged), 1);
        
            yourHand = yourHand
            cardsInYourHandClass = Array(yourHand.length).fill("cardTemplate")
            yourGameParameters.yourHand = Array.from(yourHand)
        }
        else if(dragged.type == "ko"){
            yourKo -= 1
            yourGameParameters.ko -= 1
            yourKo = yourKo
        }
        dragged = ""

        yourBoard = yourBoard
        yourGameParameters.yourBoard = Array.from(yourBoard)
        SendGameData(JSON.stringify(yourGameParameters))
    }
    function koDrop(event){
        event.preventDefault()
        enemyBoardPhs[Number(event.target.id.replace("etd",""))] = ""
        enemyBoard[Number(event.target.id.replace("etd",""))] = dragged
        enemyBoard = enemyBoard

        event.target.removeEventListener("drop", koDrop)
        event.target.removeEventListener("dragover", koDragOver)
        event.target.removeEventListener("dragleave", koDragLeave)


        yourKo -= 1

        yourGameParameters.ko -= 1
        enemyGameParameters.yourBoard = Array.from(enemyBoard)
        console.log(enemyBoard);
        console.log("hey bb u dropped this :^ ", event.target);
        SendGameData(JSON.stringify(yourGameParameters))
    }
    function dragStart(event) {
        console.log(event);
        console.log(event.target);
        dragged = yourHand[event.target.id]
        
        yourBoardPhs.fill("")
        yourBoardPhs = yourBoardPhs
        
    }
    function koDragStart(event){
        var ko = {
            attack: 0,
            health: Math.ceil(2*turnCount/3),
            type: "ko"
        }
        console.log(event);
        console.log(event.target);
        dragged = ko
        
        yourBoardPhs.fill("")
        yourBoardPhs = yourBoardPhs
        enemyBoardPhs.fill("")
        enemyBoardPhs = enemyBoardPhs

    }

    function dragOver(event){
        event.preventDefault()
        yourBoardPhs[Number(event.target.id.replace("td",""))] = dragged
        yourBoardPhs = yourBoardPhs
    }
    function koDragOver(event){
        event.preventDefault()
        enemyBoardPhs[Number(event.target.id.replace("etd",""))] = dragged
        enemyBoardPhs = enemyBoardPhs
        console.log(enemyBoardPhs);
    }
    function dragLeave(event){
        event.preventDefault()
        yourBoardPhs[Number(event.target.id.replace("td",""))] = ""
        yourBoardPhs = yourBoardPhs
    }
    function koDragLeave(event){
        event.preventDefault()
        enemyBoardPhs[Number(event.target.id.replace("etd",""))] = "dragged"
        enemyBoardPhs = enemyBoardPhs
        console.log(enemyBoardPhs);
    }



    function PlacingMode(card, domId){
        if(isYourTurn){
            dragged = card
            console.log(card);
            console.log(domId);
            Array(yourHand.length).fill("cardTemplate")
            for (let i=0;i<(yourHand.length);i++){
                cardsInYourHandClass[i] = "cardTemplate"
                yourHand = yourHand;
            }

            if(!isCardInYourHandInPlacingMode || !yourBoardPhs.includes(card)){
                yourBoardPhs.fill("")

                for (let i = 0; i<yourBoardPhs.length+1;i++){
                    if(yourBoard[i] == ""){
                        yourBoardPhs[i] = card
                    }
                }

                if (card.stars < 6){
                    cardsInYourHandClass[domId] = "cardTemplate cardInHandHighlighted"
                }
                else {
                    cardsInYourHandClass[domId] = "cardTemplate cardInHandRainbowHighlighted"
                }
                yourBoardPhs = yourBoardPhs

                isCardInYourHandInPlacingMode = true
            }
            else{
                isCardInYourHandInPlacingMode = false
                yourBoardPhs.fill("")
                cardsInYourHandClass[domId] = "cardTemplate"
                yourBoardPhs = yourBoardPhs
            }

            yourHand = yourHand;
        }
    }
    function PlaceByClick(card,i){
        yourBoard[i] = card;
        
        yourBoardPhs.fill("")
        yourHand.splice(yourHand.indexOf(card), 1);

        cardsInYourHandClass = Array(yourHand.length).fill("cardTemplate")

        yourBoard = yourBoard
        yourBoardPhs = yourBoardPhs
        yourHand = yourHand

        console.log("dropped to this cell by click: ",yourBoard[i]);
        console.log("the thing u dropped by click: ",card);
        document.getElementById("td"+i).removeEventListener("drop", drop)
        document.getElementById("td"+i).removeEventListener("dragover", dragOver)
        document.getElementById("td"+i).removeEventListener("dragleave", dragLeave)

        
    }

    function NextTurn(){
        if(gameFase < 3){
            isYourTurn = !isYourTurn
            yourGameParameters.isYourTurn = isYourTurn
           
            gameFase++
            }
            else if(gameFase == 3){
                isYourRally = !isYourRally
                isYourTurn = !isYourTurn
                yourGameParameters.isYourTurn = isYourTurn
                gameFase = 1
                turnCount++
                DrawOne()
            }
            console.log("turn: ",turnCount," gameFaze: ",gameFase, " rally: ",isYourRally," u cum?: ",isYourTurn);
        
        isYourTurn = isYourTurn
        isYourRally = isYourRally
    }
    function ClickEndTurn(){
        if(!isYourTurn){
            console.log("nem a te köröd");
            return;
        }
        EndTurn()
    }

    

    function update() {
        yourGameParameters = yourGameParametersClient
        enemyGameParameters = enemyGameParametersClient
        
        yourGameParameters = yourGameParameters
        enemyGameParameters = enemyGameParameters

        enemyGameParameters.currentHand = enemyGameParameters.currentHand
        enemyBoard = enemyGameParameters.yourBoard
        enemyBoard = enemyBoard

        requestAnimationFrame(update)
    }
</script>
{#if !pageLoaded}
<div id="loadingScreen">
  <img src={loadingScreen} alt="loading..." style="width: 15vw; display: block; margin-top:15%; margin-left:auto; margin-right:auto;">
  <h1 style="font-family: cursive; display: block; text-align:center;">LOADING...</h1>
</div>
{/if}

<div id="background"></div>


<div id="gamePlayFiledCont">
    <div id="board">
        <div id="enemyHand" class="handCont">
            {#each enemyGameParameters.currentHand as card,i}
                <div id="enemyHandCardCont" style="--enemyCardNum: {enemyGameParameters.currentHand.length};transform: rotate({-22.5+(45/enemyGameParameters.currentHand.length)*(i+1)}deg);top:{(enemyGameParameters.currentHand.length-(i))/3}vw;">
                    <img class="cardTemplate" src={cardBack} alt="enemy Card">
                </div>
            {/each}
        </div>
        <div id="playField">
            <div class="gameFiledSides" id="enemySide">
                <tr class="tierTwo boardRows">
                    {#each Array(enemyBoard.length/2) as card,i}
                    <td class="boardsCells kotarget" id="etd{i}">
                        {#if enemyBoard[i] != ""}
                        <div id="cardPreviewListCont">
                            <img draggable="false" style="width: calc(var(--cardOnBoardScale)*1vw*12.5); position:absolute" src={cardV2Background} alt="cardBg">
                            <div id="rarityBGList" style="background: {backgroundColorByCost[(enemyBoard[i].stars)-3]}; "></div>
                            <img draggable="false" class = "cardButton" src={enemyBoard[i].source} alt="preview"/>
                            <button class="cardListFrame" alt="cardBg"></button>
                            <div class="curCardStatsList" style="left: calc(var(--cardOnBoardScale)*1vw*2.68);">{enemyBoard[i].attack}</div>
                            <div class="curCardStatsList" style="left: calc(var(--cardOnBoardScale)*1vw*9.65);">{enemyBoard[i].health}</div>
                            <div class="curCardCostList">{enemyBoard[i].cost}</div>
                            <div class="curCardNameList">{enemyBoard[i].name}</div>
                
                            <div class="curCardRarityList" style="{starsColorByCost[(enemyBoard[i].stars)-3]}">
                                {#each Array(Number(enemyBoard[i].stars)) as card,index}
                                    <span style="font-size: calc(var(--cardOnBoardScale)*1vw*1);">★</span>
                                {/each}
                            </div>
                        </div>
                        {/if}
                    </td>
                    {/each}
                </tr>
                <tr class="tierOne boardRows">
                    {#each Array((enemyBoard.length)/2) as cell,i}
                    <td class="boardsCells kotarget" id="etd{(enemyBoard.length)/2+i}">
                        {#if enemyBoard[(enemyBoard.length)/2+i] != ""}
                        <div id="cardPreviewListCont">
                            <img draggable="false" style="width: calc(var(--cardOnBoardScale)*1vw*12.5); position:absolute" src={cardV2Background} alt="cardBg">
                            <div id="rarityBGList" style="background: {backgroundColorByCost[(enemyBoard[i+(enemyBoard.length)/2].stars)-3]}; "></div>
                            <img draggable="false" class = "cardButton" src={enemyBoard[i+(enemyBoard.length)/2].source} alt="preview"/>
                            <button class="cardListFrame" alt="cardBg"></button>
                            <div class="curCardStatsList" style="left: calc(var(--cardOnBoardScale)*1vw*2.68);">{enemyBoard[i+(enemyBoard.length)/2].attack}</div>
                            <div class="curCardStatsList" style="left: calc(var(--cardOnBoardScale)*1vw*9.65);">{enemyBoard[i+(enemyBoard.length)/2].health}</div>
                            <div class="curCardCostList">{enemyBoard[i+(enemyBoard.length)/2].cost}</div>
                            <div class="curCardNameList">{enemyBoard[i+(enemyBoard.length)/2].name}</div>
                
                            <div class="curCardRarityList" style="{starsColorByCost[(enemyBoard[i+(enemyBoard.length)/2].stars)-3]}">
                                {#each Array(Number(enemyBoard[i+(enemyBoard.length)/2].stars)) as card,index}
                                    <span style="font-size: calc(var(--cardOnBoardScale)*1vw*1);">★</span>
                                {/each}
                            </div>
                        </div>
                        {/if}
                    </td>
                    {/each}
                </tr>
            </div>
            <div class="gameFiledSides" id="yourSide">
                <tr class="tierOne boardRows">
                    {#each Array((yourBoard.length)/2) as cell,i}
                        <td class="target boardsCells" id="td{i}">
                        {#if yourBoardPhs[i].type == "character"}
                            {#if yourBoardPhs[i] != ""}
                            <div on:click={() => PlaceByClick(yourBoardPhs[i],i)} id="cardPreviewListCont" class:isPlacingModePh={isCardInYourHandInPlacingMode} style="filter: grayscale(0.5) contrast(50%);opacity: 0.7;" on:keydown role="button" tabindex="">
                                <img draggable="false" style="width: calc(var(--cardOnBoardScale)*1vw*12.5); position:absolute" src={cardV2Background} alt="cardBg">
                                <div id="rarityBGList" style="background: {backgroundColorByCost[( yourBoardPhs[i].stars)-3]}; "></div>
                                <img draggable="false" class = "cardButton" src={yourBoardPhs[i].source} alt="preview"/>
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
                            {/if}
                        {:else if yourBoardPhs[i].type == "ko"}
                            <div class="ko">{yourBoard[i].health}</div>
                        {/if}

                        {#if yourBoard[i].type == "character"}
                            {#if yourBoard[i] != ""}
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
                        {:else if yourBoard[i].type == "ko"}
                            <div class="ko">{yourBoard[i].health}</div>
                        {/if}
                        
                    </td>
                    {/each}
                </tr>
                <tr class="tierTwo boardRows">
                    {#each Array((yourBoard.length)/2) as cell,i}
                        <td class="yourBoardTierTwo target boardsCells" id="td{i+(yourBoard.length)/2}">
                        {#if yourBoardPhs[i+(yourBoardPhs.length)/2].type == "character"}
                            {#if yourBoardPhs[i+(yourBoardPhs.length)/2] != ""}
                            <div on:click={() => PlaceByClick(yourBoardPhs[i+(yourBoard.length)/2],i+(yourBoard.length)/2)} id="cardPreviewListCont" class:isPlacingModePh={isCardInYourHandInPlacingMode} style="filter: grayscale(0.5) contrast(50%);opacity: 0.7;" on:keydown role="button" tabindex="">
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
                            {/if}
                        {:else if yourBoardPhs[i+(yourBoardPhs.length)/2].type == "ko"}
                            <div class="ko">{yourBoard[i+(yourBoardPhs.length)/2].health}</div>
                        {/if}

                        {#if yourBoard[i+(yourBoard.length)/2].type == "character"}
                            {#if yourBoard[i+(yourBoard.length)/2] != ""}
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
                        {:else if yourBoard[i+(yourBoard.length)/2].type == "ko"}
                            <div class="ko">{yourBoard[i+(yourBoardPhs.length)/2].health}</div>
                        {/if}
                        
                    </td>
                    {/each}
                </tr>
            </div>
        </div>
        <div id="yourHand" class="handCont" >
            {#each yourHand as card,i}
            <div bind:this={cardsInHandDoms[i]} id={i} on:click={() => PlacingMode(card,i)} draggable={isYourTurn} class="previewInHand move" style="--cardNum: {yourHand.length};transform: rotate({-22.5+(45/yourHand.length)*(i+1)}deg);top:{(yourHand.length-(i))/3}vw;" on:keydown role="button" tabindex="">
                <img draggable="false" class={cardsInYourHandClass[i]} id="cardBackground" src={cardBackground} style="--colorr: {backgroundColorByCost[(card.stars)-3]}; --colorr2: #{(parseInt((backgroundColorByCost[(card.stars)-3].replace("#","")), 16)+663552).toString(16)};" alt="cardBg">
                <div id="rarityBG" style="background: {backgroundColorByCost[(card.stars)-3]}; "></div>
                <img draggable="false" id="curCardInView" src={card.source} alt="">
                <img draggable="false" class="cardTemplate" src={cardForeground} alt="cardBg">
                <div id="curCardDesc" class="noScrollers">{card.description}</div>
                <div class="curCardStats" style="left: calc(var(--cardsScale)*1vw*7.4);">{card.attack}</div>
                <div class="curCardStats" style="left: calc(var(--cardsScale)*1vw*21.5)">{card.health}</div>
                <div class="curCardCost">{card.cost}</div>
                <div class="curCardName">{card.name}</div>
                
                <div id="curCardRarity" style="{starsColorByCost[(card.stars)-3]}; top: 0">
                    {#each Array(Number(card.stars)) as card,index}
                        <span style="font-size: calc(var(--cardsScale)*2.4vw">★</span>
                    {/each}
                </div>
            </div>
            {/each}
            
        </div>
    </div>
    <div id="mana">
        <div class="manaCont" id="enemyManaCont">
            <div class="normalMana" style="margin-bottom: 2.5%;"></div>
            <div class="spellMana"></div>
        </div>
        <div class="manaCont" id="yourManaCont">
            <div class="spellMana"  style="margin-bottom: 2.5%;"></div>
            <div class="normalMana"></div>
            
        </div>
    </div>
    <div id="ko">
        <div id="enemyKo" class="koCont">

        </div>
        <div id="yourKo" class="koCont">
            {#each Array(yourKo) as ko}
                <div draggable={isYourTurn} class="ko">ko</div>
            {/each}
        </div>
    </div>
    <div id="matchConsole">
        <div id="matchConsoleCont">
            <div style="top:0;" id="enemyBattleStateIndicator" class="battleStateIndicatorCont" class:notYourTurnBattleIndicator={!enemyGameParameters.isYourTurn} class:rallyTurn={!isYourRally} class:defendTurn={isYourRally}>

            </div>
            
            <button on:click={ClickEndTurn} id="endTurnButton" class:notYourTurnBattleIndicator={!isYourTurn}>
                END TURN 
            </button>
            <div style="bottom:0;" id="yourBattleStateIndicator" class="battleStateIndicatorCont" class:notYourTurnBattleIndicator={!isYourTurn} class:rallyTurn={isYourRally} class:defendTurn={!isYourRally}>

            </div>
        </div>

    </div>
    
</div>

<button style="z-index: 100; position:absolute" on:click={() => DrawOne()} >KÁRTYÁT IDE A KEZEMBEEE</button>
<button style="z-index: 100; position:absolute" id="fullScreenButton" on:click={requestFullScreen}>[]</button>

<style>
    @font-face {
            font-family: 'SevenSwords';
            src: url('../../lib/assets/fonts/SEVESBRG.ttf');
        }
    @font-face {
        font-family: 'ShadowLight';
        src: url('../../lib/assets/fonts/ShadowsIntoLight-Regular.ttf');
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
    #background{
        width: 100vw;
        height: 100vh;
        position: fixed;
        z-index: -1;
        background-image: url("../../lib/assets/gameplay/GameUI.png");
        background-size: 100% 100%;
        top: 0;
        left: 0;
    }


    .koCont{
        width: 7vw;
        height: 12vh;
        background-color: rgba(137, 43, 226, 0.764);

        position: absolute
    }
    #yourKo{
        bottom: 13vh;
        left: 80.5vw;
    }
    #enemyKo{
        top: 8vh;
        left: 82vw;
    }
    .ko{
        width: 6vw;
        height: 6vw;
        background-image: url(../../lib/assets/gameplay/ko.png);
        background-size: 100% 100%;
        position: absolute;
    }

    #matchConsoleCont{
        background-color: rgba(255, 166, 0, 0.742);
        width: 7vw;
        height: 50vh;

        position: absolute;
        left: 86.5vw;
        top: 22.5vh;

    }
    .battleStateIndicatorCont{
        border:2px solid black;
        width: 7vw;
        height: 7vw;
        position: absolute;
    }
    .rallyTurn{
        background: url(../../lib/assets/gameplay/rallyIcon.png) no-repeat;
        background-size: 100% 100%;

    }
    .defendTurn{
        background: url(../../lib/assets/gameplay/defendIcon.png) no-repeat;
        background-size: 100% 100%;
    }
    .notYourTurnBattleIndicator{
        filter:grayscale(0.8);
        cursor: default;
    }
    #endTurnButton{
        width: 100%;
        height: 10%;
        position: absolute;
        top: 50%;
        background-color: rgb(238, 134, 59);
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        bottom: 2px solid rgb(131, 70, 27);

        cursor: pointer;
    }


    .manaCont{
        background-color: rgba(238, 130, 238, 0.74);
        width: 22vw;
        height: 11vh;
        

        position: absolute;
    }
    @media screen and (min-width: 836px) {
        .manaCont{
            left: 71.5vw;
        }
    }
    @media screen and (max-width: 836px) {
        .manaCont{
            left: 68.5vw;
        }
    }
    #enemyManaCont{
        top: 2vh;
    }
    #yourManaCont{
        top: 86vh;
    }
    .normalMana{
        width: 100%;
        height: 45%;
        background-color: blue;

        margin: 0;
        padding: 0;
    }
    .spellMana{
        width: 40%;
        height: 45%;
        background-color: cadetblue;

        margin: 0;
        margin-left:2vw;
        padding: 0;
    }





    #gamePlayFiledCont{
        background-color: rgba(0, 0, 0, 0.432);
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    }
    #playField{
        background-color: aqua;
        width: 74vw;
        height: 65vh;

        position: absolute;
        left: 13vw;
        top: 15vh;
    }
    @media screen and (min-width: 836px) {
        :root {
        --cardsScale: 0.4;
        --cardOnBoardScale: 0.5;
    
        }
        #yourHand{
        background-color: rgba(0, 0, 255, 0.726);
        bottom: 5vh;
    }
    .previewInHand{
        margin-right: calc(35/var(--cardNum)*1vw*0.99);
        position: relative;

        border: none;
        padding-bottom: 30vh;
        margin: none;
        background: none;
    }
    }
    @media screen and (max-width: 836px) {
        :root {
        --cardsScale: 0.3;
        --cardOnBoardScale: 0.5;
    
        }
        #yourHand{
        background-color: rgba(0, 0, 255, 0.726);
        bottom: 5vh;

        width: 30vw;
        height: 15vh;

        position: absolute;
        left: 0vw;

        display: flex;
        padding-bottom: 7vh;

        --cardsScale: 0.3;
    }
    .previewInHand{
        margin-right: calc(25/var(--cardNum)*1vw*0.99);
        position: relative;

        border: none;
        padding-bottom: 30vh;
        margin: none;
        background: none;
    }
    }
    
    #enemyHand{
        background-color: rgba(255, 0, 0, 0.616);
        left: 25vw;
        
    }
    #enemyHandCardCont{
        width: calc(var(--cardsScale)*1vw*30);

    }
    .handCont{
        width: 40vw;
        height: 15vh;

        position: absolute;
        left: 28vw;

        display: flex;
        padding-bottom: 6vh;
    }
    #yourSide{
        background-color: rgba(0, 0, 255, 0.504);
    }
    #enemySide{
        background-color: rgba(255, 0, 0, 0.507);
    }


    .gameFiledSides{
        width: 74vw;
        height: 32.5vh; 
        position: relative;
    }
    .boardRows{
        width: 74vw;
        height: 16.25vh;
        position: absolute;
    }
    .boardsCells{
        border: 0.1vw solid black;
        padding:0;
        margin: 0;

        width: 14.8vw; /*wanna kill myself*/
        height: 16.25vh;

        z-index: 11;
    }
    .tierOne{
        top: 0;
        background-color: rgba(172, 255, 47, 0.438);
    }
    .tierTwo{
        top: 11vh;
    }
    .yourBoardTierTwo{
        padding-left: 7.4vw;
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
        top: 0;
    }


</style>