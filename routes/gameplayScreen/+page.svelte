<script>
    import loadingScreen from "../../lib/assets/global/loadingScreen.gif"

    import * as Cards from "../../card"
    let enemyStartingHand = [Cards.BarniCard,Cards.BarniCard, Cards.FarkasCard, Cards.BizsoCard, Cards.BencusCard, Cards.ZenoCard]
    
    import {SendGameData,connectedToSocket, yourGameParametersClient, enemyGameParametersClient, DomLoaded, SveltePageLoaded, currentOpponentId, EndTurn, lastCardPlayedClient,LastActionLog} from "../../matchHandler"

    import cardBack from "../../lib/assets/global/cardBack.png"

    import cardBackground from "../../lib/assets/global/cardV1BG.png"
    import cardForeground from "../../lib/assets/global/cardV1Top.png"
    import cardV2Background from "../../lib/assets/global/cardV2BG.png"
    import cardV2BackgroundRed from "../../lib/assets/global/cardV2BGRed.png"
    import spellForeground from "../../lib/assets/global/spellV1Top.png"
    import spellBackground from "../../lib/assets/global/spellV1BG.png"
    import despair from "../../lib/assets/gameplay/despair.gif"

    import manaCrystal from "../../lib/assets/gameplay/manaCrystal.png"
    import spellManaCrystal from "../../lib/assets/gameplay/spellManaCrystal.png"
    import manaCrystalPh from "../../lib/assets/gameplay/manaCrystalPh.png"

    import { onMount } from 'svelte';
	import { requestFullScreen} from "../../client";
	import { blur } from "svelte/transition";

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
    let voicelines = {}

    //#region SEGÁDVÁLTOZÓK
    var backgroundColorByCost = ["#2672ed","#8626ed","#ed7c26","linear-gradient(180deg, rgb(235, 160, 160), rgb(240, 216, 171), rgb(233, 233, 169), rgb(174, 236, 174), rgb(168, 213, 240), rgb(200, 155, 231), rgb(235, 159, 235))"]
    var starsColorByCost = ["color: #2672ed;","color: #8626ed;","color: #ed7c26;","background-image: linear-gradient(90deg, rgb(235, 160, 160), rgb(240, 216, 171), rgb(233, 233, 169), rgb(174, 236, 174), rgb(168, 213, 240), rgb(200, 155, 231), rgb(235, 159, 235));-webkit-background-clip: text;background-clip: text;color: transparent;"]

    
    let yourGameID
    let opponentGameID
    let gameKey

    let yourGameParameters = {currentHand: [],remaningDeck: [], yourBoard: Array(10).fill(""), mana: 0, spellMana: 0, username: "", hp: 0}
    let enemyGameParameters = {currentHand: [],remaningDeck: [], yourBoard: Array(10).fill(""), mana: 0, spellMana: 0, username: "", hp: 0}

    let allCardsInGame = []

    let startingHandNum = 5
    let yourHand = []
    let enemyHand = []
    let cardsInYourHandClass = Array(startingHandNum).fill("cardTemplate")
    let newCard
    let cardsInHandDoms = []

    let yourKo = 8
    let isKoHasBeenPutDownThisTurn = false

    let targetArea = []
    let koTargetArea = []
    let spellTargetArea

    let kovek = []
    let dragged = ""

    let lastCardPlayed = ""

    $:  {if (cardsInHandDoms[yourHand.length-1]) {
        cardsInHandDoms[yourHand.length-1].addEventListener("dragstart", dragStart)
        cardsInHandDoms[yourHand.length-1].addEventListener("dragend", () => {
            dragged = ""
        })
        }
        if (cardsInHandDoms[0]) {
        cardsInHandDoms[0].addEventListener("dragstart", dragStart)
        cardsInHandDoms[0].addEventListener("dragend", () => {
            dragged = ""
        })
        }
        if (cardsInHandDoms[1]) {
        cardsInHandDoms[1].addEventListener("dragstart", dragStart)
        cardsInHandDoms[1].addEventListener("dragend", () => {
            dragged = ""
        })
        }
        if (cardsInHandDoms[2]) {
        cardsInHandDoms[2].addEventListener("dragstart", dragStart)
        cardsInHandDoms[2].addEventListener("dragend", () => {
            dragged = ""
        })
        }
        if (cardsInHandDoms[3]) {
        cardsInHandDoms[3].addEventListener("dragstart", dragStart)
        cardsInHandDoms[3].addEventListener("dragend", () => {
            dragged = ""
        })
        }
        if (cardsInHandDoms[4]) {
        cardsInHandDoms[4].addEventListener("dragstart", dragStart)
        cardsInHandDoms[4].addEventListener("dragend", () => {
            dragged = ""
        })
        }}
        // #endregion
    
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
        yourGameParameters.yourHand = Array.from(yourHand)

    }
    
    //#region VARS FOR GAMEPLAY
    let yourBoard = Array(10).fill("")
    let yourBoardPhs = Array(10).fill("")
    let yourBoardDoms = Array(10)

    let enemyBoard = Array(10).fill("")
    let enemyBoardPhs = Array(10).fill("")
    let enemyBoardDoms = Array(10)

    let isCardInYourHandInPlacingMode= false
    let isKoInPlacingMode = false
    let isCardOnBoardInAttackingMode = false

    let turnCount = 1
    let isYourTurn = false
    let isYourRally = false
    let gameFase = 1
    // #endregion

    let pageLoaded = false
    
    function ServerDependingCode(){
        update()

        console.log("your and enemy params: ", yourGameParameters,enemyGameParameters,);
        isYourTurn = yourGameParameters.isYourTurn
        console.log("IS IT MINE TURN????",isYourTurn);
        isYourTurn = isYourTurn
        isYourTurn == true ? isYourRally = true : isYourRally = false

        allCardsInGame = Array.from(yourGameParameters.remaningDeck.concat(enemyGameParameters.remaningDeck))

        yourGameID = JSON.parse(localStorage.getItem("yourGameID"))
        opponentGameID = JSON.parse(localStorage.getItem("opponentGameID"))
        gameKey = JSON.parse(localStorage.getItem("gameKey"))

        DrawStartingHand(5)

        pageLoaded = true
        pageLoaded = pageLoaded
        
    }
    onMount(() => {
            targetArea = document.getElementsByClassName("target")
            koTargetArea = document.getElementsByClassName("kotarget")
            spellTargetArea = document.getElementById("spellTargetDiv")
            kovek = document.getElementsByClassName("ko")
            
            for (let i = 0; i<kovek.length; i++){
                kovek[i].addEventListener("dragstart",koDragStart)
                console.log("added ko listener");
            }

            SveltePageLoaded()
            DomLoaded()

            //events for communicating with clinet.js
            document.addEventListener('socketConnected', ServerDependingCode)
            document.addEventListener('nextTurn',NextTurn)
            document.addEventListener('updateParams', update)
            document.addEventListener('actionLog', ActionLogEvent)
        
    });

    //#region DRAG AND DROP LOGIC
    function RemoveEventListenersFromCells(){
        for(let i = 0; i< yourBoard.length;i++){
            targetArea[i].removeEventListener("drop", drop)
            targetArea[i].removeEventListener("dragover", dragOver)
            targetArea[i].removeEventListener("dragleave", dragLeave)
        }
        for(let i = 0; i< yourBoard.length;i++){
            koTargetArea[i].removeEventListener("drop", koDrop)
            koTargetArea[i].removeEventListener("dragover", koDragOver)
            koTargetArea[i].removeEventListener("dragleave", koDragLeave)
        }
    }
    function AddEventListenerToCells(cellType){
        if(cellType == "ko"){
            for(let i = 0;i<(yourBoard.length);i++){
                if(enemyBoard[i] == ""){
                    koTargetArea[i].addEventListener("drop", koDrop)
                    koTargetArea[i].addEventListener("dragover", koDragOver)
                    koTargetArea[i].addEventListener("dragleave", koDragLeave)
                }
            }
        }
        if(cellType == "spell"){
            spellTargetArea.addEventListener("drop",spellDrop)
            spellTargetArea.addEventListener("dragover",spellDragOver)
            spellTargetArea.addEventListener("dragleave",spellDragLeave)
        }
        else{
            for(let i = 0;i<(yourBoard.length);i++){
            if(yourBoard[i] == ""){ //ha még nem raktak rá cucclikat
                targetArea[i].addEventListener("drop", drop)
                targetArea[i].addEventListener("dragover", dragOver)
                targetArea[i].addEventListener("dragleave", dragLeave)
            } 
        }
        }
    }
    function drop(event) {
        event.preventDefault()
        if(dragged.cost <= yourGameParameters.mana){
            yourBoardPhs[Number(event.target.id.replace("td",""))] = ""
            yourBoard[Number(event.target.id.replace("td",""))] = dragged

            if(!dragged.talent.includes("fürge támadás")){
                yourBoard[Number(event.target.id.replace("td",""))].fieldEffects.push("asleep")
            }
            

            console.log("your board: ",yourBoard);
            console.log("dropped to this cell: ",event.target);
            console.log("the thing u dropped: ",dragged);

            if(dragged.type == "character"){
                yourHand.splice(yourHand.indexOf(dragged), 1);
            
                yourHand = yourHand
                cardsInYourHandClass = Array(yourHand.length).fill("cardTemplate")
                yourGameParameters.yourHand = Array.from(yourHand)

                console.log(voicelines);
                voicelines[dragged.name].play();

                LastActionLog(dragged)

            }
            else if(dragged.type == "ko"){
                yourKo -= 1
                yourGameParameters.ko -= 1
                yourKo = yourKo
                isKoHasBeenPutDownThisTurn = true
            }

            yourGameParameters.mana -= dragged.cost
            dragged = ""

            yourBoard = yourBoard
            yourGameParameters.yourBoard = Array.from(yourBoard)

            SendGameData(JSON.stringify(yourGameParameters))
        }
        else{
            console.log("nincs elég manád hogy kijátszsd");
        }

    }
    function koDrop(event){
        console.log(event);
        event.preventDefault()
        enemyBoardPhs[Number(event.target.id.replace("etd",""))] = ""
        enemyBoard[Number(event.target.id.replace("etd",""))] = dragged
        enemyBoard = enemyBoard

        yourKo -= 1
        isKoHasBeenPutDownThisTurn = true

        yourGameParameters.ko -= 1

        enemyGameParameters.yourBoard = Array.from(enemyBoard)
        console.log(enemyBoard);

        console.log("hey bb u dropped this :^ ", event.target);

        SendGameData(JSON.stringify(yourGameParameters))
        SendGameData(JSON.stringify(enemyGameParameters))
    }
    function spellDrop(event){
        event.preventDefault()
        if(dragged.cost <= (yourGameParameters.mana+yourGameParameters.spellMana)){
            event.preventDefault()

            yourHand.splice(yourHand.indexOf(dragged), 1);
            yourHand = yourHand
            cardsInYourHandClass = Array(yourHand.length).fill("cardTemplate")
            yourGameParameters.yourHand = Array.from(yourHand)
            console.log(yourGameParameters.spellMana,yourGameParameters.mana,dragged.cost);
            if(yourGameParameters.spellMana >= dragged.cost){
                yourGameParameters.spellMana -= dragged.cost
            }
            else{
                yourGameParameters.mana = dragged.cost-yourGameParameters.spellMana
                yourGameParameters.spellMana = 0
            }
            console.log(yourGameParameters.spellMana,yourGameParameters.mana,dragged.cost);

            LastActionLog(dragged)

            dragged = ""
            dragged = dragged

            spellTargetArea.style.boxShadow = "inset 1vw 1vw 1.5vw #3e7ee6ba, inset -1vw -1vw 1.5vw #3e7ee6ba"
            spellTargetArea.style.fontSize = "1.5vw"
            spellTargetArea.children[0].innerHtml = "play spell"

            SendGameData(JSON.stringify(yourGameParameters))

        }

    }
    function dragStart(event) {
        if(yourHand[event.target.id].type == "character" || yourHand[event.target.id].type == "spell"){
            ClearAttackModes()

            RemoveEventListenersFromCells()
            console.log(event);
            console.log(event.target);

            dragged = yourHand[event.target.id]
            
            yourBoardPhs.fill("")
            enemyBoardPhs.fill("")
            yourBoardPhs = yourBoardPhs
            enemyBoardPhs = enemyBoardPhs

            AddEventListenerToCells(yourHand[event.target.id].type)
        }
    }
    function koDragStart(event){
        if(!isKoHasBeenPutDownThisTurn){
            ClearAttackModes()

            RemoveEventListenersFromCells()
            var ko = {
                attack: 0,
                health: Math.ceil(2*turnCount/3),
                type: "ko",
                cost: 0
            }
            console.log(event);
            console.log(event.target);
            dragged = ko

            AddEventListenerToCells("ko")
            
            yourBoardPhs.fill("")
            yourBoardPhs = yourBoardPhs
            enemyBoardPhs.fill("")
            enemyBoardPhs = enemyBoardPhs
        }
        else{
            console.log("már raktál le követ");
        }
    }

    function dragOver(event){
        if(dragged.cost <= yourGameParameters.mana){
            event.preventDefault()
            yourBoardPhs[Number(event.target.id.replace("td",""))] = dragged
            yourBoardPhs = yourBoardPhs
        }
        else{
            console.log("nincs elég manád hogy kijátszsd");
        }
        
    }
    function koDragOver(event){
        event.preventDefault()
        enemyBoardPhs[Number(event.target.id.replace("etd",""))] = dragged
        enemyBoardPhs = enemyBoardPhs
    }
    function spellDragOver(event){
        event.preventDefault()
        if(dragged.type == "spell" && dragged.cost <= (yourGameParameters.mana+yourGameParameters.spellMana))
        {
            spellTargetArea.style.boxShadow = "inset 1vw 1vw 1.5vw #3ee63eba, inset -1vw -1vw 1.5vw #3ee63eba"
            spellTargetArea.style.fontSize = "2vw"
            spellTargetArea.children[0].innerHtml = `play spell <br> ${dragged.name}`
        }
    }
    function dragLeave(event){
        event.preventDefault()
        yourBoardPhs[Number(event.target.id.replace("td",""))] = ""
        yourBoardPhs = yourBoardPhs
    }
    function koDragLeave(event){
        event.preventDefault()
        enemyBoardPhs[Number(event.target.id.replace("etd",""))] = ""
        enemyBoardPhs = enemyBoardPhs
    }
    function spellDragLeave(event){
        event.preventDefault()
        if(dragged.type == "spell")
        {
            spellTargetArea.style.boxShadow = "inset 1vw 1vw 1.5vw #3e7ee6ba, inset -1vw -1vw 1.5vw #3e7ee6ba"
            spellTargetArea.style.fontSize = "1.5vw"
            spellTargetArea.children[0].innerHtml = "play spellk"
        }
    }

    //playing mode with clicks
    function ClearBoardPhs(){
        yourBoardPhs.fill("")
        yourBoardPhs = yourBoardPhs
        enemyBoardPhs.fill("")
        enemyBoardPhs = enemyBoardPhs

        isKoInPlacingMode = false
        isKoInPlacingMode = isKoInPlacingMode
        isCardInYourHandInPlacingMode = false
        isCardInYourHandInPlacingMode = isCardInYourHandInPlacingMode
    }
    function PlacingMode(card, domId){
        if(isYourTurn && card.cost <= yourGameParameters.mana){
            ClearAttackModes()

            enemyBoardPhs.fill("")
            enemyBoardPhs = enemyBoardPhs

            isKoInPlacingMode = false

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
        else{
            console.log("nincs elég manád vagy nem te jössz");
        }
    }
    function PlaceByClick(card,i){
        yourBoard[i] = card;
        if(!card.talent.includes("fürge támadás")){
            yourBoard[i].fieldEffects.push("asleep")
        }
    
        yourBoardPhs.fill("")
        yourHand.splice(yourHand.indexOf(card), 1);

        cardsInYourHandClass = Array(yourHand.length).fill("cardTemplate")


        yourGameParameters.mana -= card.cost

        yourBoard = yourBoard
        yourBoardPhs = yourBoardPhs
        yourHand = yourHand

        console.log("dropped to this cell by click: ",yourBoard[i]);
        console.log("the thing u dropped by click: ",card);
        RemoveEventListenersFromCells()

        yourGameParameters.yourBoard = Array.from(yourBoard)
        SendGameData(JSON.stringify(yourGameParameters))

        console.log(voicelines[card.name]);
        voicelines[card.name].play();

        LastActionLog(card)
    }
    function KoPlacingMode(){
        if(isYourTurn && !isKoHasBeenPutDownThisTurn){
            isCardInYourHandInPlacingMode = false

            ClearAttackModes()

            var ko = {
                attack: 0,
                health: Math.ceil(2*turnCount/3),
                type: "ko",
                cost: 0
            }
            dragged = ko

            yourBoardPhs.fill("")
            enemyBoardPhs.fill("")
            if(!isKoInPlacingMode){
                for (let i = 0; i<yourBoardPhs.length+1;i++){
                    if(yourBoard[i] == ""){
                        yourBoardPhs[i] = ko
                    }
                    if(enemyBoard[i] == ""){
                        enemyBoardPhs[i] = ko
                    }
                }
                isKoInPlacingMode = true
            }
            else{isKoInPlacingMode = false}
            
            

            yourBoardPhs = yourBoardPhs
            enemyBoardPhs = enemyBoardPhs
        }
    }
    function KoPlacedByClick(i,side){
        if(!isKoHasBeenPutDownThisTurn){
            var ko = {
                attack: 0,
                health: Math.ceil(2*turnCount/3),
                type: "ko",
                cost: 0
            }
            enemyBoardPhs.fill("")
            yourBoardPhs.fill("")
            if(side == "yourSide"){
                yourBoard[i] = ko
                yourBoard = yourBoard
                yourGameParameters.yourBoard = Array.from(yourBoard)
            }
            else if(side == "enemySide"){
                enemyBoard[i] = ko
                enemyBoard = enemyBoard
                enemyGameParameters.yourBoard = Array.from(enemyBoard)
                SendGameData(JSON.stringify(enemyGameParameters))
            }
            yourGameParameters.ko -= 1

            RemoveEventListenersFromCells()

            isKoHasBeenPutDownThisTurn = true

            enemyBoardPhs = enemyBoardPhs
            yourBoardPhs = yourBoardPhs

            SendGameData(JSON.stringify(yourGameParameters))
            
        } 
    }
    // #endregion

    //#region QUALITY OF LIFE LOGIC
    function NextTurn(){
        if(gameFase < 3){
            isYourTurn = !isYourTurn
            yourGameParameters.isYourTurn = isYourTurn
           
            gameFase++
            if(gameFase == 3 && isYourRally){ //ha az tuolsó rallyd van
                yourBoard.forEach(element => {
                    console.log(element,yourBoard);
                    if(element != ""){
                        if(element.fieldEffects.includes("asleep")){
                            element.fieldEffects.splice(element.fieldEffects.indexOf("asleep"),1)
                        }
                    }
                });
            }
        }
        else if(gameFase == 3){
            isYourRally = !isYourRally
            isYourTurn = !isYourTurn
            yourGameParameters.isYourTurn = isYourTurn
            gameFase = 1

            //mana számolás
            console.log(yourGameParameters.spellMana + yourGameParameters.mana);
            yourGameParameters.spellMana + yourGameParameters.mana <= 3 ? yourGameParameters.spellMana = yourGameParameters.spellMana + yourGameParameters.mana : yourGameParameters.spellMana = 3

            yourGameParameters.mana <= 9 ? yourGameParameters.mana = turnCount + 2 : yourGameParameters.mana = 10
            enemyGameParameters.mana <= 9 ? enemyGameParameters.mana = turnCount + 2 : enemyGameParameters.mana = 10
            console.log("mana: ",yourGameParameters.mana," spellMana: ",yourGameParameters.spellMana);

            isKoHasBeenPutDownThisTurn = false
            turnCount++
            DrawOne()


            yourBoard.forEach(element => {
                if(element != ""){
                    if(!element.fieldEffects.includes("asleep"))
                    element.fieldEffects.push("asleep")
                    if(element.talent.includes("kettős támadás")){
                        yourBoard[yourBoard.indexOf(element)].fieldEffects[0] = "kettős:0"
                    }
                }
            });

            
            enemyGameParameters.currentHand = []
            yourGameParameters.yourBoard = Array.from(yourBoard)
            SendGameData(JSON.stringify(yourGameParameters))
        }
        console.log("turn: ",turnCount," gameFaze: ",gameFase, " rally: ",isYourRally," u cum?: ",isYourTurn);
        

        isYourTurn = isYourTurn
        isYourRally = isYourRally

        var endTurnButton = document.getElementById("endTurnButton")
        endTurnButton.style.animation = "none"
        endTurnButton.offsetHeight;
        endTurnButton.style.animation = "endTurnAnim 1s"

        ClearBoardPhs()
        ClearAttackModes()
        
    }
    function ClickEndTurn(){
        if(!isYourTurn){
            console.log("nem a te köröd");
            return;
        }
        EndTurn()
    }

    let logOpen = false
    let logCard
    function OpenBattleLog(){
        logOpen = !logOpen
        logOpen = logOpen
    }
    function ActionLogEvent(){
        logOpen = false
        logOpen = logOpen
        logOpen = true
        logOpen = logOpen

        lastCardPlayed = lastCardPlayedClient
        lastCardPlayed = lastCardPlayed

        setTimeout(() => {
            logCard.style.animation = "none"
            logCard.offsetHeight
            logCard.style.animation = "actionLogCard 1.3s forwards" 
        }, 10);
        

        setTimeout(() => {
            logOpen = false
            logOpen = logOpen
            logCard.offsetHeight
            logCard.style.animation = "none"
        }, 4000);
    }
    // #endregion

    //GAMEPLAY----------------------------------
    //-----------------------------------------------------------------------------------------------------------
   
   
    //#region ANIMS
    let AnimTargetTop
    let AnimTargetLeft
    let AnimAttackerTop
    let AnimAttackerLeft
    let AnimAttackerYRot
    function CardDmgAnimation(dom,dmg,side){
        
        setTimeout(() => {
            dom.children[0].children[0].src = cardV2BackgroundRed
            dom.children[0].children[3].style.background = '../../lib/assets/global/cardV2TopRed.png'
        }, 600);

        dom.children[0].style.animation = "none"
        dom.children[0].offsetHeight;
        if(dmg == "sebzés"){
            dom.children[0].style.animation = "cardDmg 1.5s 0.6s ease-in"
            setTimeout(() => {
                dom.children[0].children[0].src = cardV2Background
                dom.children[0].children[3].style.background = '../../lib/assets/global/cardV2Top.png'
            }, 1350);
        }
        else if(dmg == "halál"){
            dom.children[0].style.animation = "cardDeath 1.5s 0.6s ease-in"
            setTimeout(() => {
                if(side == "enemy"){
                    enemyBoard[Number(dom.id.replace("etd",""))].source = despair
                }
                else if(side == "your"){
                    yourBoard[Number(dom.id.replace("td",""))].source = despair
                }
            }, 600);
            setTimeout(() => {
                if(side == "enemy"){
                    enemyBoard[Number(dom.id.replace("etd",""))] = ""
                }
                else if(side == "your"){
                    yourBoard[Number(dom.id.replace("td",""))] = ""
                }
            }, 2100);
        }  
    }
    function CardAttackAnimation(enemyi){
        //ANIM----------
        var attackeri = yourBoard.indexOf(cardInAttackingMode)
        console.log(attackeri);
        var row = enemyi
        row < 5 ? row = 1 : row = 0
        var attackerRow = attackeri
        attackerRow < 5 ? attackerRow = 0 : attackerRow = 1

        var cardHeight = window.innerHeight/window.innerWidth * 12.5*0.57 * (3/2)
        console.log(window.innerWidth/window.innerHeight);
        console.log("AnimLog cardH: ",cardHeight);

        AnimAttackerYRot = `${((enemyi%5)-(attackeri%5))*10}deg`

        AnimAttackerTop = 15 + 32.5 + attackerRow*(16.25-11)
        //margó + az enemy sávja + ahanyadik row-ba van annyiszor a row magassága - ha a másodikba van mert ők feljebb vannak a row-ban
        var targetTop = 15 + row*16.25 - row*11 + cardHeight
        //margó + ahanyadik row* raw magassága - ha a másodikba van mert az feljebb + egy kártya magasága
        AnimTargetTop = `${-32.5+ row*11 +cardHeight -attackerRow*(11)}vh`

        AnimAttackerLeft = 13+(attackeri%5+1)*14.8 
        var targetLeft = 13+(enemyi%5+1)*14.8
        AnimTargetLeft = `${targetLeft-AnimAttackerLeft}vw`

        console.log("AnimLogTop: ",AnimAttackerTop,targetTop,AnimTargetTop);
        console.log("AnimLogLeft: ",AnimAttackerLeft,targetLeft,AnimTargetLeft);

        cardDomInAttackingMode.style.animation = "none"
        cardDomInAttackingMode.offsetHeight;
        cardDomInAttackingMode.style.animation = "attackAnim 0.7s"

        ClearAttackModes()

        enemyBoard = enemyBoard
        enemyGameParameters = enemyGameParameters
        console.log(enemyBoard, enemyGameParameters.hp);

        enemyGameParameters.yourBoard = Array.from(enemyBoard)
        SendGameData(JSON.stringify(enemyGameParameters))
    }
    //#endregion
    
    //#region ATTACK CALCULATION
    let attackableCards = [] //kicsit csúnyi de kell a funkción kívül is :((
    let attackableCardsDoms = []
    let cardInAttackingMode = ""
    let cardDomInAttackingMode = ""


    function ClearAttackModes(){
        isCardOnBoardInAttackingMode = false
        isCardOnBoardInAttackingMode = isCardOnBoardInAttackingMode

        cardInAttackingMode = ""
        cardInAttackingMode = cardInAttackingMode
        cardDomInAttackingMode = ""
        cardDomInAttackingMode = cardDomInAttackingMode
        attackableCards = []
        attackableCards = attackableCards
        attackableCardsDoms = []
        attackableCardsDoms = attackableCardsDoms
    }
    function CardInAttackMode(attackingCard){
        var canAttack = isYourTurn && isYourRally && !attackingCard.fieldEffects.includes("asleep")
        var cardHasQuickAttack = isYourTurn && !attackingCard.fieldEffects.includes("asleep")
        if(canAttack || cardHasQuickAttack){
            ClearBoardPhs()
            cardDomInAttackingMode = document.getElementById(`td${yourBoard.indexOf(attackingCard)}`).children[0]
            console.log(cardDomInAttackingMode);

            attackableCards = []
            attackableCardsDoms = []
            console.log("yourCard: ",attackingCard);

            if(!isCardOnBoardInAttackingMode && cardInAttackingMode != attackingCard){
                cardInAttackingMode = attackingCard


                for (let i = 0; i < enemyBoard.length/2; i++){
                    if(enemyBoard[i] != ""){
                        attackableCards.push(enemyBoard[i])

                        var dom = document.getElementById(`etd${i}`)
                        attackableCardsDoms.push(dom)
                        //dom.children[0].children[0].style = "transform: scale(1.1); width: calc(var(--cardOnBoardScale)*1vw*12.5); position:absolute; filter: drop-shadow(calc(var(--cardOnBoardScale)*1vw*0.6) calc(var(--cardOnBoardScale)*1vw*0.6) 3px red) drop-shadow(calc(var(--cardOnBoardScale)*1vw*-0.6) calc(var(--cardOnBoardScale)*1vw*-0.6) 3px red);"
                    }
                    else{
                        if(enemyBoard[i+(enemyBoard.length/2)] != ""){
                            attackableCards.push(enemyBoard[i+(enemyBoard.length/2)])

                            var dom = document.getElementById(`etd${i+(enemyBoard.length/2)}`)
                            attackableCardsDoms.push(dom)
                            //dom.children[0].children[0].style = "transform: scale(1.1); width: calc(var(--cardOnBoardScale)*1vw*12.5); position:absolute; filter: drop-shadow(calc(var(--cardOnBoardScale)*1vw*0.6) calc(var(--cardOnBoardScale)*1vw*0.6) 3px red) drop-shadow(calc(var(--cardOnBoardScale)*1vw*-0.6) calc(var(--cardOnBoardScale)*1vw*-0.6) 3px red);"

                        }
                    }
                }
                console.log("you can attack these cards: ",attackableCards);
                console.log("thier doms: ",attackableCardsDoms);

                isCardOnBoardInAttackingMode = true
            }
            else if (isCardOnBoardInAttackingMode && cardInAttackingMode == attackingCard){
                isCardOnBoardInAttackingMode = false
                attackableCards = []
                attackableCardsDoms = []

                cardInAttackingMode = ""
            }
            else if(cardInAttackingMode != attackingCard){
                cardInAttackingMode = attackingCard


                for (let i = 0; i < enemyBoard.length/2; i++){
                    if(enemyBoard[i] != ""){
                        attackableCards.push(enemyBoard[i])

                        var dom = document.getElementById(`etd${i}`)
                        attackableCardsDoms.push(dom)
                        //dom.children[0].children[0].style = "transform: scale(1.1); width: calc(var(--cardOnBoardScale)*1vw*12.5); position:absolute; filter: drop-shadow(calc(var(--cardOnBoardScale)*1vw*0.6) calc(var(--cardOnBoardScale)*1vw*0.6) 3px red) drop-shadow(calc(var(--cardOnBoardScale)*1vw*-0.6) calc(var(--cardOnBoardScale)*1vw*-0.6) 3px red);"
                    }
                    else{
                        if(enemyBoard[i+(enemyBoard.length/2)] != ""){
                            attackableCards.push(enemyBoard[i+(enemyBoard.length/2)])

                            var dom = document.getElementById(`etd${i+(enemyBoard.length/2)}`)
                            attackableCardsDoms.push(dom)
                            //dom.children[0].children[0].style = "transform: scale(1.1); width: calc(var(--cardOnBoardScale)*1vw*12.5); position:absolute; filter: drop-shadow(calc(var(--cardOnBoardScale)*1vw*0.6) calc(var(--cardOnBoardScale)*1vw*0.6) 3px red) drop-shadow(calc(var(--cardOnBoardScale)*1vw*-0.6) calc(var(--cardOnBoardScale)*1vw*-0.6) 3px red);"

                        }
                    }
                }
                console.log("you can attack these cards: ",attackableCards);
                console.log("thier doms: ",attackableCardsDoms);

                isCardOnBoardInAttackingMode = true
            }
            attackableCards = attackableCards
            attackableCardsDoms = attackableCardsDoms
            cardInAttackingMode = cardInAttackingMode

            enemyBoard = enemyBoard
        }
    }
    function AttackCard(target,i){
        console.log("target: ", target, " i: ", i);

        var dmg = cardInAttackingMode.attack

        //DMG CALCULATION
        if(target.health - dmg >= 0){ //1 kezdés, 1 megáll
            target.health -= dmg
            console.log("1 kezdés, 1 megáll");

            
            if(target.health == 0){
                CardDmgAnimation(enemyBoardDoms[i],"halál","enemy")
            }
            else{
                CardDmgAnimation(enemyBoardDoms[i],"sebzés","enemy")
            }
        }
        else{ //1 kezdés, tovább
            
            dmg -= target.health
            target.health = 0 //első dead
            CardDmgAnimation(enemyBoardDoms[i],"halál","enemy")

            if(i < 5){ //1 kezdés, tovább
                console.log(enemyBoard[i+5]);
                if(enemyBoard[i+5] != "") {//1 kezdés, 2 tovább

                    if(enemyBoard[i+5].health - dmg >= 0){ //1 kezdés, 2 megáll
                        enemyBoard[i+5].health -= dmg

                        console.log("1 kezdés, 2 megáll");

                        if(enemyBoardDoms[i+5].health == 0){
                            CardDmgAnimation(enemyBoardDoms[i+5],"halál","enemy")
                        }
                        else{
                            CardDmgAnimation(enemyBoardDoms[i+5],"sebzés","enemy")
                        }
                    }
                    else{ //1 kezdés, 2 tovább, 3 megáll
                        

                        dmg -= enemyBoard[i+5].health
                        enemyBoard[i+5].health = 0
                        
                        CardDmgAnimation(enemyBoardDoms[i+5],"halál","enemy")
                        

                        enemyGameParameters.hp -= dmg
                        console.log("1 kezdés, 2 tovább, 3 megáll");
                    }
                }
                else{ //1kezdés, 2 nincs, 3 megáll
                    enemyGameParameters.hp -= dmg
                    console.log("1kezdés, 2 nincs, 3 megáll");
                }
            }
            else{ //2 kezdés, tovább
                //2 kezdés, 3 megáll
                enemyGameParameters.hp -= dmg
                console.log("2 kezdés, 3 megáll")
            }
        }

        //TALENTS--------------------------------------------------------------------
        // #region TALENTS
        //KETTŐS TÁMADÁS
        if(!cardInAttackingMode.talent.includes("kettős támadás")){
            //yourBoard[yourBoard.indexOf(cardInAttackingMode)].fieldEffects.push("asleep")
        }
        else{
            var whichAttack = Number(yourBoard[yourBoard.indexOf(cardInAttackingMode)].fieldEffects[0].replace("kettős:",""))
            console.log("KETTŐSLOG: ",yourBoard[yourBoard.indexOf(cardInAttackingMode)],whichAttack);
            
            if(whichAttack < 2){
                whichAttack++
                yourBoard[yourBoard.indexOf(cardInAttackingMode)].fieldEffects[0] = `kettős:${whichAttack}`
                console.log("KETTŐSLOG: after ++",yourBoard[yourBoard.indexOf(cardInAttackingMode)].fieldEffects[0]);
                
                if(whichAttack == 2){
                yourBoard[yourBoard.indexOf(cardInAttackingMode)].fieldEffects[0] = "kettős:0"
                yourBoard[yourBoard.indexOf(cardInAttackingMode)].fieldEffects.push("asleep")
                }
            }
        }
        //ÉLETELSZÍVÁS
        if(cardInAttackingMode.talent.includes("életelszívás")){
            var healAmount = Number(cardInAttackingMode.talent[(cardInAttackingMode.talent.indexOf("_"))+1])
            console.log("ÉLETLOG: amount:", healAmount);

            yourBoard[yourBoard.indexOf(cardInAttackingMode)].health += healAmount
        }
        //TÖVISES BŐR
        if(target.talent.includes("tövisesbőr")){
            yourBoard[yourBoard.indexOf(cardInAttackingMode)].health -= 1
        }
        //BLAST TÁMADÁS l
        if(cardInAttackingMode.talent.includes("robbanó támadás")){
                if(i%5 != 4){ //ha a szélén van akkor ne menjen tovább, jobbral + balról is if
                    //SEBZÉS
                    if(enemyBoard[i+1] != ""){
                        enemyBoard[i+1].health -= Math.ceil(dmg*(1/3))
                        console.log("BLASTLOG: jobbrú");
                    }
                    //ANIM
                    if(enemyBoard[i+1].health > 0 && enemyBoard[i+1] != ""){
                        CardDmgAnimation(enemyBoardDoms[i+1],"sebzés","enemy")
                    }
                    else if(enemyBoard[i+1].health <= 0 && enemyBoard[i+1] != ""){
                        CardDmgAnimation(enemyBoardDoms[i+1],"halál","enemy")
                    }
                }
                if(i%5 != 0){
                    //SEBZÉS
                    if(enemyBoard[i-1] != ""){
                        enemyBoard[i-1].health -= Math.ceil(dmg*(1/3))
                        console.log("BLASTLOG: barró");
                    }
                    //ANIM
                    if(enemyBoard[i-1].health > 0 && enemyBoard[i-1] != ""){
                        CardDmgAnimation(enemyBoardDoms[i-1],"sebzés","enemy")
                    }
                    else if(enemyBoard[i-1].health <= 0 && enemyBoard[i-1] != ""){
                        CardDmgAnimation(enemyBoardDoms[i-1],"halál","enemy")
                    }
                }
        }
        // #endregion


        yourGameParameters.yourBoard = Array.from(yourBoard)
        SendGameData(JSON.stringify(yourGameParameters))

        console.log("dom that attacked: ",cardDomInAttackingMode);
        CardAttackAnimation(i)
    }
    //#endregion
    


    //MAIN ---------------------------------------------
    function update() {
        console.log("updated");
        yourGameParameters = yourGameParametersClient
        enemyGameParameters = enemyGameParametersClient
        console.log(yourGameParametersClient);
        console.log(enemyGameParametersClient);
        
        yourGameParameters = yourGameParameters
        enemyGameParameters = enemyGameParameters

        enemyGameParameters.currentHand = enemyGameParameters.currentHand
        enemyBoard = enemyGameParameters.yourBoard
        enemyBoard = enemyBoard

        for(let i = 0; i<yourBoard.length;i++){
            if(yourBoard[i] != ""){
                if(yourBoard[i].health > yourGameParameters.yourBoard[i].health && !isYourTurn){
                    if(yourGameParameters.yourBoard[i].health > 0){
                        CardDmgAnimation(yourBoardDoms[i],"sebzés","your")
                    }
                    else{
                        CardDmgAnimation(yourBoardDoms[i],"halál","your")
                    }
                }
            }
        }
        yourBoard = yourGameParameters.yourBoard
        yourBoard = yourBoard
    }
</script>
{#if !pageLoaded}
<div id="loadingScreen">
  <img src={loadingScreen} alt="loading..." style="width: 15vw; display: block; margin-top:15%; margin-left:auto; margin-right:auto;">
  <h1 style="font-family: cursive; display: block; text-align:center;">LOADING...</h1>
</div>
{/if}

<div id="background"></div>
{#each allCardsInGame as card,i}
<audio controls id="music" style="display: none;"  src={card.audio}   bind:this={voicelines[card.name]}></audio>
{/each}

<div id="gamePlayFiledCont">
    <div id="playerHps">
        <div class="playerNameCont" id="enemyPlayerName">{enemyGameParameters.username}</div>

        <div class="playerHpCont" id="enemyPlayerHp">{enemyGameParameters.hp}</div>
        <div class="playerHpCont" id="yourPlayerHp">{yourGameParameters.hp}</div>

        <div class="playerNameCont" id="yourPlayerName">{yourGameParameters.username}</div>
    </div>
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
                    <td class="boardsCells kotarget" id="etd{i}" bind:this={enemyBoardDoms[i]}>
                    {#if enemyBoardPhs[i] != ""}
                        <div class="BoardTierTwo ko" on:click={() => KoPlacedByClick(i,"enemySide")} style="filter: grayscale(0.5) contrast(50%);opacity: 0.7;" on:keydown role="button" tabindex="">{enemyBoardPhs[i].health}</div>
                    {/if}

                    {#if enemyBoard[i] != ""}
                        {#if enemyBoard[i].type == "character"}
                            <div on:click={() => AttackCard(enemyBoard[i],i)} class="BoardTierTwo" id="cardPreviewListCont" class:cardOnBoardInTargetMode={attackableCardsDoms.includes(document.getElementById(`etd${i}`))}  class:NotcardOnBoardInTargetMode={isCardOnBoardInAttackingMode && !attackableCardsDoms.includes(document.getElementById(`etd${i}`))} on:keydown role="button" tabindex="">
                                <img draggable="false" style="width: calc(var(--cardOnBoardScale)*1vw*12.5); position:absolute"  src={cardV2Background} alt="cardBg">
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
                        {:else if enemyBoard[i].type == "ko"}
                            <div on:click={() => AttackCard(enemyBoard[i],i)} class="BoardTierTwo ko" on:keydown role="button" tabindex="">{enemyBoard[i].health}</div>
                        {/if}
                    {/if}
                    </td>
                    {/each}
                </tr>
                <tr class="tierOne boardRows">
                    {#each Array((enemyBoard.length)/2) as cell,i}
                    <td class="boardsCells kotarget" id="etd{(enemyBoard.length)/2+i}" bind:this={enemyBoardDoms[i+(enemyBoard.length/2)]}>
                    {#if enemyBoardPhs[(enemyBoardPhs.length)/2+i] != ""}
                        <div on:click={() => KoPlacedByClick((enemyBoardPhs.length)/2+i,"enemySide")} style="filter: grayscale(0.5) contrast(50%);opacity: 0.7;" class="ko" on:keydown role="button" tabindex="">{enemyBoardPhs[(enemyBoardPhs.length)/2+i].health}</div>
                    {/if}


                    {#if enemyBoard[(enemyBoard.length)/2+i] != ""}
                        {#if enemyBoard[(enemyBoard.length)/2+i].type == "character"}
                            {#if enemyBoard[(enemyBoard.length)/2+i] != ""}
                            <div on:click={() => AttackCard(enemyBoard[(enemyBoard.length)/2+i],(enemyBoard.length)/2+i)} id="cardPreviewListCont"  class:cardOnBoardInTargetMode={attackableCardsDoms.includes(document.getElementById(`etd${i+(enemyBoard.length/2)}`))}  class:NotcardOnBoardInTargetMode={isCardOnBoardInAttackingMode && !attackableCardsDoms.includes(document.getElementById(`etd${i+(enemyBoard.length/2)}`))} on:keydown role="button" tabindex="">
                                <img draggable="false" style="width: calc(var(--cardOnBoardScale)*1vw*12.5); position:absolute"  src={cardV2Background} alt="cardBg">
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
                        {:else if enemyBoard[(enemyBoard.length)/2+i].type == "ko"}
                            <div on:click={() => AttackCard(enemyBoard[(enemyBoard.length)/2+i],(enemyBoard.length)/2+i)} class="ko" on:keydown role="button" tabindex="">{enemyBoard[(enemyBoard.length)/2+i].health}</div>
                        {/if}
                    {/if}

                    </td>
                    {/each}
                </tr>
            </div>
            <div class="gameFiledSides" id="yourSide">
                <tr class="tierOne boardRows">
                    {#each Array((yourBoard.length)/2) as cell,i}
                        <td class="target boardsCells" id="td{i}" bind:this={yourBoardDoms[i]}>
                        
                        {#if yourBoardPhs[i] != ""}
                            {#if yourBoardPhs[i].type == "character"}
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
                            {:else if yourBoardPhs[i].type == "ko"}
                                <div on:click={() => KoPlacedByClick(i,"yourSide")} style="filter: grayscale(0.5) contrast(50%);opacity: 0.7;" class:isPlacingModePh={isKoInPlacingMode} class="ko" on:keydown role="button" tabindex="">{yourBoardPhs[i].health}</div>
                            {/if}
                        {/if}

                        {#if yourBoard[i] != ""}
                            {#if yourBoard[i].type == "character"}
                                <div on:click={() => CardInAttackMode(yourBoard[i])} class:cardAwake={!yourBoard[i].fieldEffects.includes("asleep") && isYourTurn} style="--AnimTargetTop: {AnimTargetTop}; --AnimTargetLeft: {AnimTargetLeft}; --AnimAttackerYRot: {AnimAttackerYRot};"  class:cardInAttackingMode={cardInAttackingMode == yourBoard[i]}  id="cardPreviewListCont" on:keydown role="button" tabindex="">
                                    <img draggable="false" style="width: calc(var(--cardOnBoardScale)*1vw*12.5); position:absolute" src={cardV2Background} alt="cardBg">
                                    <div id="rarityBGList" style="background: {backgroundColorByCost[(yourBoard[i].stars)-3]}; "></div>
                                    <img draggable="false" class = "cardButton" src={yourBoard[i].source} alt="preview"/>
                                    <button class="cardListFrame" alt="cardBg"></button>
                                    <div class="curCardStatsList" style="left: calc(var(--cardOnBoardScale)*1vw*2.68);">{yourBoard[i].attack}</div>
                                    <div class="curCardStatsList" style="left: calc(var(--cardOnBoardScale)*1vw*9.65);">{yourBoard[i].health}</div>
                                    <div class="curCardCostList">{yourBoard[i].cost}</div>
                                    <div class="curCardNameList">{yourBoard[i].name}</div>
                                    {#if yourBoard[i].talent != ""}
                                        {#if yourBoard[i].talent.includes(",")}
                                            <div class="curCardMultipleIconsContainer">
                                                {#each yourBoard[i].talent.split(",") as icon, i}
                                                <div style="width:{5.2/yourBoard[i].talent.split(",").length}vw; margin:auto">
                                                    <img style="calc(var(--cardOnBoardScale)*1vw*1.4);" src={talentIcons[icon.replace(" ","")]} alt="talent">
                                                </div>
                                                {/each}
                                            </div>
                                            {:else}
                                            <div class="curCardTalentList">{yourBoard[i].talent.replace("támadás","")}</div>
                                            <img style="left: calc(var(--cardOnBoardScale)*1vw*4);" class="curCardTalentIconList" src={talentIcons[yourBoard[i].talent.replace(" ","")]} alt="talent">
                                            {/if}
                                        {/if}
                                        
                                    {#if yourBoard[i].aligment.includes(",")}
                                        {#each yourBoard[i].aligment.split(",") as aligment,i}
                                        <img style="top: calc(var(--cardOnBoardScale)*1vw*{4.8 + i* 2.55}); background-color: {aligmentBackgroundColors[aligment]}; border-radius: 0.5vw;" class="curCardAligList" src={aligmentIcons[aligment]} alt="aligment">
                                        {/each}
                                    {:else}
                                        <img style="background-color: {aligmentBackgroundColors[yourBoard[i].aligment]}; border-radius: 0.5vw;" class="curCardAligList" src={aligmentIcons[yourBoard[i].aligment]} alt="aligment">
                                    {/if}
                        
                                    <div class="curCardRarityList" style="{starsColorByCost[(yourBoard[i].stars)-3]}">
                                        {#each Array(Number(yourBoard[i].stars)) as card,index}
                                            <span style="font-size: calc(var(--cardOnBoardScale)*1vw*1);">★</span>
                                        {/each}
                                    </div>
                                </div>
                            {:else if yourBoard[i].type == "ko"}
                                <div class="ko">{yourBoard[i].health}</div>
                            {/if}
                        {/if}
                    </td>
                    {/each}
                </tr>
                <tr class="tierTwo boardRows">
                    {#each Array((yourBoard.length)/2) as cell,i}
                        <td class="target boardsCells" id="td{i+(yourBoard.length)/2}" bind:this={yourBoardDoms[i+(yourBoard.length/2)]}>
                        {#if yourBoardPhs[i+(yourBoardPhs.length)/2] != ""}
                            {#if yourBoardPhs[i+(yourBoardPhs.length)/2].type == "character"}
                                <div class="BoardTierTwo" on:click={() => PlaceByClick(yourBoardPhs[i+(yourBoard.length)/2],i+(yourBoard.length)/2)} id="cardPreviewListCont" class:isPlacingModePh={isCardInYourHandInPlacingMode} style="filter: grayscale(0.5) contrast(50%);opacity: 0.7;" on:keydown role="button" tabindex="">
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
                            {:else if yourBoardPhs[i+(yourBoardPhs.length)/2].type == "ko"}
                                <div class="BoardTierTwo ko" on:click={() => KoPlacedByClick((i + (yourBoard.length/2)),"yourSide")}  style="filter: grayscale(0.5) contrast(50%);opacity: 0.7;" class:isPlacingModePh={isKoInPlacingMode}  on:keydown role="button" tabindex="">{yourBoardPhs[i+(yourBoardPhs.length)/2].health}</div>
                            {/if}
                        {/if}

                        {#if yourBoard[i+(yourBoard.length)/2] != ""}
                            {#if yourBoard[i+(yourBoard.length)/2].type == "character"}
                                <div class="BoardTierTwo" on:click={() => CardInAttackMode(yourBoard[i+(yourBoard.length)/2])} class:cardAwake={!yourBoard[i+(yourBoard.length)/2].fieldEffects.includes("asleep") && isYourTurn} style="--AnimTargetTop: {AnimTargetTop}; --AnimTargetLeft: {AnimTargetLeft}; --AnimAttackerYRot: {AnimAttackerYRot};" class:cardInAttackingMode={cardInAttackingMode == yourBoard[i+(yourBoard.length/2)]}  id="cardPreviewListCont" on:keydown role="button" tabindex="">
                                    <img draggable="false" style="width: calc(var(--cardOnBoardScale)*1vw*12.5); position:absolute" src={cardV2Background} alt="cardBg">
                                    <div id="rarityBGList" style="background: {backgroundColorByCost[(yourBoard[i+(yourBoard.length)/2].stars)-3]}; "></div>
                                    <img draggable="false" class = "cardButton" src={yourBoard[i+(yourBoard.length)/2].source} alt="preview"/>
                                    <button class="cardListFrame" alt="cardBg"></button>
                                    <div class="curCardStatsList" style="left: calc(var(--cardOnBoardScale)*1vw*2.68);">{yourBoard[i+(yourBoard.length)/2].attack}</div>
                                    <div class="curCardStatsList" style="left: calc(var(--cardOnBoardScale)*1vw*9.65);">{yourBoard[i+(yourBoard.length)/2].health}</div>
                                    <div class="curCardCostList">{yourBoard[i+(yourBoard.length)/2].cost}</div>
                                    <div class="curCardNameList">{yourBoard[i+(yourBoard.length)/2].name}</div>

                                    {#if yourBoard[i+(yourBoard.length)/2].talent != ""}
                                        {#if yourBoard[i+(yourBoard.length)/2].talent.includes(",")}
                                            <div class="curyourBoard[i+(yourBoard.length)/2]MultipleIconsContainer">
                                                {#each yourBoard[i+(yourBoard.length)/2].talent.split(",") as icon, i}
                                                <div style="width:{5.2/yourBoard[i+(yourBoard.length)/2].talent.split(",").length}vw; margin:auto">
                                                    <img style="width:1.4vw" src={talentIcons[icon.replace(" ","")]} alt="talent">
                                                </div>
                                                {/each}
                                            </div>
                                            {:else}
                                            <div class="curCardTalentList">{yourBoard[i+(yourBoard.length)/2].talent.replace("támadás","")}</div>
                                            <img style="left: 3.8vw;" class="curCardTalentIconList" src={talentIcons[yourBoard[i+(yourBoard.length)/2].talent.replace(" ","")]} alt="talent">
                                            {/if}
                                        {/if}
                                        
                                    {#if yourBoard[i+(yourBoard.length)/2].aligment.includes(",")}
                                        {#each yourBoard[i+(yourBoard.length)/2].aligment.split(",") as aligment,i}
                                        <img style="top: {4.8 + i* 2.55}vw; background-color: {aligmentBackgroundColors[aligment]}; border-radius: 0.5vw;" class="curCardAligList" src={aligmentIcons[aligment]} alt="aligment">
                                        {/each}
                                    {:else}
                                        <img style="background-color: {aligmentBackgroundColors[yourBoard[i+(yourBoard.length)/2].aligment]}; border-radius: 0.5vw;" class="curCardAligList" src={aligmentIcons[yourBoard[i+(yourBoard.length)/2].aligment]} alt="aligment">
                                    {/if}
                        
                                    <div class="curCardRarityList" style="{starsColorByCost[(yourBoard[i+(yourBoard.length)/2].stars)-3]}">
                                        {#each Array(Number(yourBoard[i+(yourBoard.length)/2].stars)) as card,index}
                                            <span style="font-size: calc(var(--cardOnBoardScale)*1vw*1);">★</span>
                                        {/each}
                                    </div>
                                </div>
                            {:else if yourBoard[i+(yourBoard.length)/2].type == "ko"}
                                <div class="ko BoardTierTwo">{yourBoard[i+(yourBoard.length)/2].health}</div>
                            {/if}
                        {/if}
                        
                    </td>
                    {/each}
                </tr>
                <div id="spellTargetDiv" class:displayBlock={dragged != "" && dragged.type == "spell"} class:displayNone={dragged == "" || dragged.tpye != "spell"}><span style="margin-top:10vh; display:block; pointer-events: none;">play spell</span></div>
            </div>
        </div>
        <div id="yourHand" class="handCont" >
            {#each yourHand as card,i}
            {#if card.type == "character"}
                <div bind:this={cardsInHandDoms[i]} id={i} on:click={() => PlacingMode(card,i)} draggable={isYourTurn} class="previewInHand move" style="--cardNum: {yourHand.length};transform: rotate({-22.5+(45/yourHand.length)*(i+1)}deg);top:{(yourHand.length-(i))/3}vw;" on:keydown role="button" tabindex="">
                    <img draggable="false" class={cardsInYourHandClass[i]} id="cardBackground" src={cardBackground} style="--colorr: {backgroundColorByCost[(card.stars)-3]}; --colorr2: #{(parseInt((backgroundColorByCost[(card.stars)-3].replace("#","")), 16)+663552).toString(16)};" alt="cardBg">
                    <div id="rarityBG" style="background: {backgroundColorByCost[(card.stars)-3]}; "></div>
                    <img draggable="false" id="curCardInView" src={card.source} alt="">
                    <img draggable="false" class="cardTemplate" src={cardForeground} alt="cardBg">
                    <div id="curCardDesc" class="noScrollers">{@html card.description}</div>
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
            {:else if card.type == "spell"}
                <div bind:this={cardsInHandDoms[i]} id={i} draggable={isYourTurn} class="previewInHand move" style="--cardNum: {yourHand.length};transform: rotate({-22.5+(45/yourHand.length)*(i+1)}deg);top:{(yourHand.length-(i))/3}vw;" on:keydown role="button" tabindex="">
                    <img draggable="false" class={cardsInYourHandClass[i]} id="cardBackground" src={spellBackground} style="--colorr: {backgroundColorByCost[(card.stars)-3]}; --colorr2: #{(parseInt((backgroundColorByCost[(card.stars)-3].replace("#","")), 16)+663552).toString(16)};" alt="cardBg">
                    <div id="rarityBG" style="background: {backgroundColorByCost[(card.stars)-3]}; "></div>
                    <img draggable="false" id="curCardInView" src={card.source} alt="">
                    <img draggable="false" class="cardTemplate" src={spellForeground} alt="cardBg">
                    <div id="curCardDesc" class="noScrollers">{@html card.description}</div>
                    <div class="curCardCost" style="top: calc(var(--cardsScale)*1vw*4);">{card.cost}</div>
                    <div class="curCardName">{card.name}</div>
                    
                    <div id="curCardRarity" style="{starsColorByCost[(card.stars)-3]}; top: calc(var(--cardsScale)*1vw*1);">
                        {#each Array(Number(card.stars)) as card,index}
                            <span style="font-size: calc(var(--cardsScale)*2.4vw">★</span>
                        {/each}
                    </div>
                </div>
            {/if}
            {/each}
            
        </div>
    </div>
    <div id="mana">
        <div class="manaCont" id="enemyManaCont">
            <div class="normalMana" style="margin-bottom: 2.5%;">
                {#each Array(10) as mana,i}
                    <div class="manaCrystal" class:manaCrystalPic={enemyGameParameters.mana > i} class:manaCrystalPicPh={enemyGameParameters.mana <= i}></div>
                {/each}
            </div>
            <div class="spellMana">
                {#each Array(3) as spellMana,i}
                    <div class="spellManaCrystal" class:spellManaCrystalPic={enemyGameParameters.spellMana > i} class:spellManaCrystalPicPh={enemyGameParameters.spellMana <= i}></div>
                {/each}

            </div>
        </div>
        <div class="manaCont" id="yourManaCont">
            <div class="spellMana"  style="margin-bottom: 2.5%;">
                {#each Array(3) as spellMana,i}
                    <div class="spellManaCrystal" class:spellManaCrystalPic={yourGameParameters.spellMana > i} class:spellManaCrystalPicPh={yourGameParameters.spellMana <= i}></div>
                {/each}
            </div>
            <div class="normalMana">
                {#each Array(10) as mana,i}
                    <div class="manaCrystal" class:manaCrystalPic={yourGameParameters.mana > i} class:manaCrystalPicPh={yourGameParameters.mana <= i}></div>
                {/each}
            </div>
            
        </div>
    </div>
    <div id="ko">
        <div id="enemyKo" class="koCont">

        </div>
        <div id="yourKo" class="koCont">
            {#each Array(yourKo) as ko}
                <div on:click={KoPlacingMode} draggable={isYourTurn && !isKoHasBeenPutDownThisTurn} class="ko" on:keydown role="button" tabindex="">ko</div>
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
    <div id="actionLog">
        <div class:displayNone={!logOpen} class:displayBlock={logOpen}>
            {#if lastCardPlayed.type == "character"}
                    <div id="logPerspectiveCont" >
                        <div class="previewInLog" bind:this={logCard}>
                            <img draggable="false" class="cardTemplateLog" id="cardBackgroundLog" src={cardBackground} style="--colorr: {backgroundColorByCost[(lastCardPlayed.stars)-3]};" alt="cardBg">
                            <div id="rarityBGLog" style="background: {backgroundColorByCost[(lastCardPlayed.stars)-3]}; "></div>
                            <img draggable="false" id="curCardInViewLog" src={lastCardPlayed.source} alt="">
                            <img draggable="false" class="cardTemplateLog" src={cardForeground} alt="cardBg">
                            <div id="curCardDescLog" class="noScrollers">{@html lastCardPlayed.description}</div>
                            <div class="curCardStatsLog" style="left: calc(var(--cardsLogScale)*1vw*7.4);">{lastCardPlayed.attack}</div>
                            <div class="curCardStatsLog" style="left: calc(var(--cardsLogScale)*1vw*21.5)">{lastCardPlayed.health}</div>
                            <div class="curCardCostLog">{lastCardPlayed.cost}</div>
                            <div class="curCardNameLog">{lastCardPlayed.name}</div>
                            
                            {#if lastCardPlayed.talent != ""}
                            {#if lastCardPlayed.talent.includes(",")}
                            <div class="curCardMultipleIconsContainerLog">
                                {#each lastCardPlayed.talent.split(",") as icon, i}
                                <div style="width:{(0.8*5.2)/lastCardPlayed.talent.split(",").length}vw; margin:auto">
                                    <img style="width:calc(var(--cardsLogScale)*1vw*1.4)" src={talentIcons[icon.replace(" ","")]} alt="talent">
                                </div>
                                {/each}
                            </div>
                            {:else}
                                <div class="curCardTalentLog">{lastCardPlayed.talent.replace("támadás","")}</div>
                                <img style="left: calc(var(--cardsLogScale)*1vw*10);" class="curCardTalentIconLog" src={talentIcons[lastCardPlayed.talent.replace(" ","")]} alt="talent">
                                {/if}
                            {/if}

                            {#if lastCardPlayed.aligment.includes(",")}
                            {#each lastCardPlayed.aligment.split(",") as aligment,i}
                                <img style="top: {0.8*9.8 + i* 4.5*0.8}vw; background-color: {aligmentBackgroundColors[aligment]}; border-radius: 0.5vw;" class="curCardAligLog" src={aligmentIcons[aligment]} alt="aligment">
                            {/each}
                            {:else}
                                <img style="background-color: {aligmentBackgroundColors[lastCardPlayed.aligment]}; border-radius: 0.5vw;" class="curCardAligLog" src={aligmentIcons[lastCardPlayed.aligment]} alt="aligment">
                            {/if}

                            <div id="curCardRarityLog" style="{starsColorByCost[(lastCardPlayed.stars)-3]}; top: 0">
                                {#each Array(Number(lastCardPlayed.stars)) as card,index}
                                    <span style="font-size: calc(var(--cardsLogScale)*2.4vw">★</span>
                                {/each}
                            </div>
                        </div>
                    </div>
            {:else if lastCardPlayed.type == "spell"}
                <div id="logPerspectiveCont" >
                    <div class="previewInLog" bind:this={logCard}>
                        <img draggable="false" class="cardTemplateLog" id="cardBackgroundLog" src={spellBackground} style="--colorr: {backgroundColorByCost[(lastCardPlayed.stars)-3]};" alt="cardBg">
                        <div id="rarityBGLog" style="background: {backgroundColorByCost[(lastCardPlayed.stars)-3]}; "></div>
                        <img draggable="false" id="curCardInViewLog" src={lastCardPlayed.source} alt="">
                        <img draggable="false" class="cardTemplateLog" src={spellForeground} alt="cardBg">
                        <div id="curCardDescLog" class="noScrollers">{@html lastCardPlayed.description}</div>
                        <div class="curCardCostLog" style="top: calc(var(--cardsLogScale)*1vw*4);">{lastCardPlayed.cost}</div>
                        <div class="curCardNameLog">{lastCardPlayed.name}</div>

                        <div id="curCardRarityLog" style="{starsColorByCost[(lastCardPlayed.stars)-3]}; top: 0">
                            {#each Array(Number(lastCardPlayed.stars)) as card,index}
                                <span style="font-size: calc(var(--cardsLogScale)*2.4vw">★</span>
                            {/each}
                        </div>
                    </div>
                </div>
            {/if}
        </div>
        <button id="logOpenClose" on:click={OpenBattleLog}>Log</button>
    </div>
    
</div>

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
    @font-face {
      font-family: 'mainFont';
      src: url('../../lib/assets/fonts/zh-cn.ttf');
    }
    @font-face {
      font-family: 'sgGachaFont';
      src: url('../../lib/assets/fonts/MyFont-Regular.otf');
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
        background-image: url("../../lib/assets/gameplay/notebook.png");
        background-size: 100% 100%;
        top: 0;
        left: 0;
    }
    :root{
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;

    }
    .displayNone{display: none;}
    .displayBlock{display: block;}



    @keyframes -global-cardDeath{
        0%{
            opacity: 1;
            padding: 0;
        }
        5%{
            padding-left: 1vw;
        }
        10%{
            padding-left: 0;
            padding-right: 1vw;
        }
        15%{
            padding: 0;
        }
        100%{
            opacity: 0;
        }
    }
    @keyframes -global-cardDmg{
        0%{
            padding: 0;
        }
        5%{
            padding-left: 1vw;
        }
        10%{
            padding-left: 0;
            padding-right: 1vw;
        }
        15%{
            padding: 0;
        }
        100%{
            padding: 0
        }
    }
    @keyframes -global-attackAnim{
        0%{
            position: absolute;
            transform: rotateX(0deg) rotateZ(0deg) rotateY(0deg);
            top:0;
            left: auto;
        }
        20%{
            transform: rotateX(0deg) rotateZ(0deg) rotateY(0deg);
        }
        40%{
            transform: rotateX(10deg) rotateZ(var(--AnimAttackerYRot)) rotateY(var(--AnimAttackerYRot));
            top: 8vh;
        }
        60%{
            transform: rotateX(10deg) rotateZ(var(--AnimAttackerYRot)) rotateY(var(--AnimAttackerYRot));
            top: 8vh;
            left: auto;
        }
        100%{
            position: absolute;
            transform: rotateX(0deg) rotateZ(0deg) rotateY(0deg);
            top: var(--AnimTargetTop);
            left: var(--AnimTargetLeft);
        }
    }



    .cardAwake{
        filter:drop-shadow(0.5vw 0.5vw 2px rgb(0, 205, 0));
    }
    .cardInAttackingMode{
        transform: scale(1.1);
        filter:drop-shadow(0.5vw 0.5vw 2px rgba(44, 75, 200, 0.722));
    }
    .NotcardOnBoardInTargetMode{
        transform: scale(0.95);
        filter: grayscale(0.7) brightness(65%);
    }
    .cardOnBoardInTargetMode{
        filter: drop-shadow(-0.6vw -0.6vw 3px rgba(170, 49, 49, 0.62)) drop-shadow(0.6vw 0.6vw 3px rgba(170, 49, 49, 0.62));
    }
    .cardOnBoardInTargetMode:hover{
        transform: scale(1.1);
        cursor: pointer;
    }



    #actionLog{
        position: absolute;

        background-color: rgba(19, 216, 19, 0.521);
        width: 16vw;
        height: 44vh;

        top: 26vh;
        left: 1vw;
    }
    #logOpenClose{
        position: absolute;
        bottom: 0;
    }


    .playerNameCont{
        height: 7vh;
        width: 10vw;

        font-size: 2vw;
        font-family: "sgGachaFont";
        text-align: center;

        position: absolute;
        background-color: red;
    }
    .playerHpCont{

        position: absolute;

        width: 10vw;
        height: 15vh;

        font-size: 4.5vw;
        font-family: "ShadowLight";
        text-align: center;
        background-color: blue;
    }   
    #enemyPlayerName{top:2vh;left: 2vw;}
    #enemyPlayerHp{top: 8vh;left: 2vw;}
    @media screen and (min-width: 836px) {
        #yourPlayerName{bottom:4vh;left: 2vw;}
        #yourPlayerHp{bottom: 8vh;left: 2vw;}
    }
    @media screen and (max-width: 836px) {
        #yourPlayerName{bottom:4vh;left: 45vw;}
        #yourPlayerHp{bottom: 8vh;left: 45vw;}
    }

    .koCont{
        width: 7vw;
        height: 12vh;

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
    .ko:hover{
        cursor: pointer;
    }

    #matchConsoleCont{
        width: 7vw;
        height: 50vh;

        position: absolute;
        left: 86.5vw;
        top: 22.5vh;

    }
    .battleStateIndicatorCont{
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
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        bottom: 2px solid rgb(131, 70, 27);
        background-color: rgb(255, 98, 0);
        cursor: pointer;
    }
    @keyframes -global-endTurnAnim {
        0%{
            transform: rotateX(0deg) scale(1);
        }
        30%{
            transform: rotateX(180deg) scale(1.5);
        }
        100%{
            transform: rotateX(360deg) scale(1);
        }
    }



    .manaCont{
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

        margin: 0;
        padding: 0;
    }
    .spellMana{
        width: 40%;
        height: 45%;
        margin: 0;
        margin-left:2vw;
        padding: 0;
    }
    .manaCrystal{
        width: 2.2vw;
        height: 2.2vw;
        display: inline-block;
        padding: 0;
        margin: 0;
    }
    .manaCrystalPic{
        background-image: url("../../lib/assets/gameplay/manaCrystal.png");
        background-size: 100% 100%;
    }
    .manaCrystalPicPh{
        background-image: url("../../lib/assets/gameplay/manaCrystalPh.png");
        background-size: 100% 100%;
        opacity: 0.5;
    }
    .spellManaCrystal{
        width: 2.9vw;
        height: 2.9vw;
        display: inline-block;
    }
    .spellManaCrystalPic{
        background-image: url("../../lib/assets/gameplay/spellManaCrystal.png");
        background-size: 100% 100%;
    }
    .spellManaCrystalPicPh{
        background-image: url("../../lib/assets/gameplay/spellManaCrystalPh.png");
        background-size: 100% 100%;
        opacity: 0.5;
    }



    #spellTargetDiv{
        width: 74vw;
        height: 29.875vh; 
        position: absolute;
        top: -2.625vh;
        background-color: #96aad691;

        font-size: 1.5vw;
        font-family: 'mainFont';
        text-align: center;

        box-shadow:inset 1vw 1vw 1.5vw #3e7ee6ba, inset -1vw -1vw 1.5vw #3e7ee6ba;

        /*animation: spellTargetDivAnimation 3s infinite;*/
    }
    #gamePlayFiledCont{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    }
    #playField{
        background: url(../../lib/assets/gameplay/pad.png);
        background-size: cover;
        width: 74vw;
        height: 60vh;

        position: absolute;
        left: 13vw;
        top: 15vh;
    }
    @media screen and (min-width: 836px) {
        :root {
        --cardsScale: 0.4;
        --cardOnBoardScale: 0.57;
        --cardsLogScale: 0.8;
    
        }
        #yourHand{
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
        --cardOnBoardScale: 0.57;
        --cardsLogScale: 0.8;
    
        }
        #yourHand{
        bottom: 5vh;

        width: 30vw;
        height: 15vh;

        position: absolute;
        left: 1vw;

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
    }
    #enemySide{
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
        padding:0;
        margin: 0;

        width: 14.8vw; /*wanna kill myself*/
        height: 16.25vh;

        z-index: 11;
        perspective: 10vw; /* Adjust the perspective value as needed */
        perspective-origin: 50% 50%;
    }
    .tierOne{
        top: 0;
    }
    .tierTwo{
        top: 11vh;
    }
    .BoardTierTwo{
        display: block;
        float: right;
    }

    
    .previewInHand:hover{
        animation: scaleUp 0.3s forwards;
        z-index: 10;
        cursor: pointer;
    }
    .isPlacingModePh:hover{
        transform: scale(1.2);
        cursor: pointer;
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
        font-size: calc(var(--cardOnBoardScale)*1vw*1.9);
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
        top: calc(var(--cardOnBoardScale)*1vw*12.6);
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
    .curCardTalentIconList{
        position: absolute;
        width: calc(var(--cardOnBoardScale)*1vw*1.4);
        top: calc(var(--cardOnBoardScale)*1vw*13.4);
    }
    .curCardTalentList{
        position: absolute;
        font-family: "talentFont";
        color: antiquewhite;
        font-size: calc(var(--cardOnBoardScale)*1vw*0.7);
        top: calc(var(--cardOnBoardScale)*1vw*14);
        left: calc(var(--cardOnBoardScale)*1vw*3.9);
        width: calc(var(--cardOnBoardScale)*1vw*3.6);
        height: calc(var(--cardOnBoardScale)*1vw*1);
        padding-left:calc(var(--cardOnBoardScale)*1vw*1.9);
    }
    .curCardAligList{
        position: absolute;
        width: calc(var(--cardOnBoardScale)*1vw*2.2);
        left: calc(var(--cardOnBoardScale)*1vw*1.8);
        top: calc(var(--cardOnBoardScale)*1vw*4.8);
    }


    #logPerspectiveCont{
        perspective: 60vw; /* Adjust the perspective value as needed */
        perspective-origin: 50% 50%;
    }
    .previewInLog{
        position: absolute;
        border: none;
        margin: none;
        background: none;

        margin-top: 20%;
    }
    @keyframes -global-actionLogCard{
        0%{
            transform: rotateX(200deg) rotateZ(-30deg) rotateY(10deg);
            left: 30vw;
            top: -40vh;

            opacity: 0;
            scale: 0;
        }
        35%{
            transform: rotateX(260deg) rotateZ(-25deg) rotateY(0deg);
            opacity:1;
        }
        50%{
            top: 8vh;
            scale: 0.9;
        }
        80%{
            left:0vw;
        }
        90%{
            transform: rotateX(360deg) rotateZ(0deg) rotateY(0deg);
            background: none;
            top: -5vh;
            scale: 1.1;
        }
        100%{
            transform: rotateX(360deg) rotateZ(0deg) rotateY(0deg);
            top: 0vh;
            scale: 1;
        }
    }
    .cardTemplateLog{
        width: calc(var(--cardsLogScale)*1vw*30);
        position: absolute;
        left: 0;
    }
    #rarityBGLog{
        position: absolute;
        width: calc(var(--cardsLogScale)*1vw*20);
        height: calc(var(--cardsLogScale)*1vw*20);
        left: calc(var(--cardsLogScale)*1vw*6);
        top: calc(var(--cardsLogScale)*1vw*2.5);

        opacity: 0.35;
    }
    #curCardInViewLog{
        position: absolute;
        width: calc(var(--cardsLogScale)*1vw*14);
        left: calc(var(--cardsLogScale)*1vw*8.5);
        top: calc(var(--cardsLogScale)*1vw*5);

        box-shadow: 0 0 calc(var(--cardsLogScale)*1vw*1.3) rgba(0, 0, 0, 0.735);
    }
    .curCardStatsLog{
        font-size: calc(var(--cardsLogScale)*1vw*3);
        font-family: 'SevenSwords';
        color: white;
        text-shadow:
                -0.08vw -0.08vw 0 #000, /* Top-left shadow */
                0.08vw -0.08vw 0 #000, /* Top-right shadow */
                -0.08vw 0.08vw 0 #000, /* Bottom-left shadow */
                0.08vw 0.08vw 0 #000; /* Bottom-right shadow */

        position: absolute;
        top: calc(var(--cardsLogScale)*1vw*26.7);
    }
    .curCardCostLog{
        font-size: calc(var(--cardsLogScale)*1vw*5);
        font-weight: bold;
        font: italic;
        font-family: 'ShadowLight';
        color: rgb(184, 11, 11);

        position: absolute;
        top: calc(var(--cardsLogScale)*1vw*2.5);
        left: calc(var(--cardsLogScale)*1vw*7);
    }
    .curCardNameLog{
        font-size: calc(var(--cardsLogScale)*1vw*2);
        font-family: Impact;
        color: rgba(247, 240, 221, 0.778);
        text-shadow: 0 0 calc(var(--cardsLogScale)*1vw*1) rgba(0, 0, 0, 0.536);

        position: absolute;
        top: calc(var(--cardsLogScale)*1vw*18.2);
        left: calc(var(--cardsLogScale)*1vw*5.5);

        text-align: center;
        width: calc(var(--cardsLogScale)*1vw*20);
    }
    #curCardDescLog{
        font-family: Arial, Helvetica, sans-serif;
        color: rgba(0, 0, 0, 0.778);
        font-weight: bold;
        font-size: calc(var(--cardsLogScale)*1vw*1.3);

        position: absolute;
        top: calc(var(--cardsLogScale)*1vw*23);
        left: calc(var(--cardsLogScale)*1vw*8.3);

        width: calc(var(--cardsLogScale)*1vw*14);
        text-align: center;
        overflow: auto;
        height: calc(var(--cardsLogScale)*1vw*6);
    }
    #curCardRarityLog{
        position: absolute;
        left: calc(var(--cardsLogScale)*1vw*8.5);
        width: calc(var(--cardsLogScale)*1vw*13.8);
        text-align: center;
        mix-blend-mode: screen;
    }
    .curCardMultipleIconsContainerLog{
        position: absolute;
        top: calc(var(--cardsLogScale)*1vw*13.5);
        left: calc(var(--cardsLogScale)*1vw*3.9);
        width: calc(var(--cardsLogScale)*1vw*5.2);
        height: calc(var(--cardsLogScale)*1vw*2);
        display:flex;
        flex-wrap:nowrap;
        align-content:space-around;
}
    .curCardTalentIconLog{
        position: absolute;
        width: calc(var(--cardsLogScale)*1vw*3.1);
        top: calc(var(--cardsLogScale)*1vw*19.6);
        left: calc(var(--cardsLogScale)*1vw*10.3);
    }
    .curCardTalentLog{
        position: absolute;
        font-family: "talentFont";
        color: antiquewhite;
        font-size: calc(var(--cardsLogScale)*1vw*1.2);
        top: calc(var(--cardsLogScale)*1vw*21.4);
        left: calc(var(--cardsLogScale)*1vw*13.5);
        width: calc(var(--cardsLogScale)*1vw*6);
        height: calc(var(--cardsLogScale)*1vw*1.7);
        padding-left:calc(var(--cardsLogScale)*1vw*1.9*var(--cardsLogScale));
    }
    .curCardAligLog{
        position: absolute;
        width: calc(var(--cardsLogScale)*1vw*4);
        left: calc(var(--cardsLogScale)*1vw*5.8);
        top: calc(var(--cardsLogScale)*1vw*10);
    }
</style>