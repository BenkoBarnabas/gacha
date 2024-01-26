<script>
    import loadingScreen from "../../lib/assets/global/loadingScreen.gif"
    
    import defeat from "../../lib/assets/gameplay/defeat.png"
    import win from "../../lib/assets/gameplay/win.png"


    import * as Cards from "../../card"
    let enemyStartingHand = [Cards.BarniCard,Cards.BarniCard, Cards.FarkasCard, Cards.BizsoCard, Cards.BencusCard, Cards.ZenoCard]

    function GoToPage(filePath) {
        window.location = filePath; // Navigate to the parent directory
    }
    
    import {SendGameDataClient,connectedToSocket, yourGameParametersClient, enemyGameParametersClient, DomLoaded, SveltePageLoaded, currentOpponentId, EndTurn, lastCardPlayedClient,LastActionLog,CellAligmentAnimation, CardDmgAnimationClient,BizsoEndTurnClient, SummoningLocationClient, CardAttackAnimation,StartingHandClient,EndGame} from "../../matchHandler"

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

    import buildingFG from "../../lib/assets/gameplay/buildingFG.png"

    import scribble1 from "../../lib/assets/gameplay/scribble1.png"
    import scribble2 from "../../lib/assets/gameplay/scribble2.png"
    import scribble3 from "../../lib/assets/gameplay/scribble3.png"
    import scribble4 from "../../lib/assets/gameplay/scribble4.png"
    import scribble5 from "../../lib/assets/gameplay/scribble5.png"

    import NagyTS from "../../lib/assets/collection/tanar/NagyT.png"
    import BlazóS from "../../lib/assets/collection/tanar/Blazó.png"

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
        tunya: "rgb(113, 166, 117)",
        lelkiismeretes: "rgb(113, 145, 166)",
        vérszomjas: "rgb(166, 113, 118)",
        veszett: "rgb(133, 113, 166)"
    }  
    import reshuffleOverlay from "../../lib/assets/gameplay/reshuffleOverlay.png"

    import freezFE from "../../lib/assets/gameplay/freezFE.png"
    import sleepFE from "../../lib/assets/gameplay/sleepFE.png"
    import stunnFE from "../../lib/assets/gameplay/stunnFE.png"
    import silenceFE from "../../lib/assets/gameplay/silenceFE.png"
    let fieldEffectIcons = {
        frozen: freezFE,
        asleep: sleepFE,
        stunned: stunnFE,
        silence: silenceFE
    }
    import frozenOverlay from "../../lib/assets/gameplay/frozenOverlay.png"
    import frozenGif from "../../lib/assets/gameplay/frozenGif.gif"
    import stunnOverlay from "../../lib/assets/gameplay/stunnOverlay.png"
    import stunnGif from "../../lib/assets/gameplay/stunnGif.gif"
    let fieldEffectOverlays = {
        frozen: frozenOverlay,
        stunned: stunnOverlay
    }
    let fieldEffectGifs = {
        frozen: frozenGif,
        stunned: stunnGif
    }

    import secret1 from "../../lib/assets/gameplay/Secret1.png"
    import secret2 from "../../lib/assets/gameplay/Secret2.png"
    import secret3 from "../../lib/assets/gameplay/Secret3.png"
    let secretIcons = [secret1,secret2,secret3,secret1,secret2,secret3]

    let secretHoverState = [false,false,false,false,false,false]
    function AdjustSecretHover(wether,i){
        secretHoverState[i] = wether
        secretHoverState = secretHoverState
        console.log("SECRETLOG: changed",wether,i)
    }

    import cClub from "../../lib/assets/gameplay/cardClub.png"
    import cHeart from "../../lib/assets/gameplay/cardHeart.png"
    import cDiamond from "../../lib/assets/gameplay/cardDiamond.png"
    import cSpade from "../../lib/assets/gameplay/cardSpade.png"
    
    import cardShuffling from "../../lib/assets/gameplay/cardShuffle.png"

    import tFej from "../../lib/assets/gameplay/tritzFej.png"
    import tIras from "../../lib/assets/gameplay/tritzIras.png"


    let voicelines = {}

    //#region SEGÁDVÁLTOZÓK
    var backgroundColorByCost = ["#2672ed","#8626ed","#ed7c26","linear-gradient(180deg, rgb(235, 160, 160), rgb(240, 216, 171), rgb(233, 233, 169), rgb(174, 236, 174), rgb(168, 213, 240), rgb(200, 155, 231), rgb(235, 159, 235))"]
    var starsColorByCost = ["color: #2672ed;","color: #8626ed;","color: #ed7c26;","background-image: linear-gradient(90deg, rgb(235, 160, 160), rgb(240, 216, 171), rgb(233, 233, 169), rgb(174, 236, 174), rgb(168, 213, 240), rgb(200, 155, 231), rgb(235, 159, 235));-webkit-background-clip: text;background-clip: text;color: transparent;"]

    
    let yourGameID
    let opponentGameID
    let gameKey

    let yourGameParameters = {currentHand: [],remaningDeck: [], yourBoard: Array(10).fill(""), mana: 2, spellMana: 0, username: "", hp: 0, secretSpells: [], yourBuildings: [Cards.TanariSzobaCard,Cards.TanariSzobaCard,Cards.TanariSzobaCard]}
    let enemyGameParameters = {currentHand: [],remaningDeck: [], yourBoard: Array(10).fill(""), mana: 2, spellMana: 0, username: "", hp: 0, secretSpells: [], yourBuildings: [Cards.TanariSzobaCard,Cards.TanariSzobaCard,Cards.TanariSzobaCard]}

    let allCardsInGame = []

    let startingHandNum = 5
    let yourHand = []
    let enemyHand = []
    let cardsInYourHandClass = Array(startingHandNum).fill("cardTemplate")
    let newCard
    let cardsInHandDoms = []

    let yourPlayerNameDom
    let enemyPlayerNameDom

    let yourKo = 5
    let isKoHasBeenPutDownThisTurn = false

    let targetArea = []
    let koTargetArea = []
    let spellTargetArea

    let kovek = []
    let dragged = ""

    let lastCardPlayed = ""

    let placingModeHighlightedCardIndex

    $:  {if (cardsInHandDoms[yourHand.length-1]) {
        cardsInHandDoms[yourHand.length-1].addEventListener("dragstart", dragStart)
        cardsInHandDoms[yourHand.length-1].addEventListener("dragend", () => {
            dragged = ""
            AdjustCellPointerEvents(true)
        })
        }
        if (cardsInHandDoms[0]) {
        cardsInHandDoms[0].addEventListener("dragstart", dragStart)
        cardsInHandDoms[0].addEventListener("dragend", () => {
            dragged = ""
            AdjustCellPointerEvents(true)
        })
        }
        if (cardsInHandDoms[1]) {
        cardsInHandDoms[1].addEventListener("dragstart", dragStart)
        cardsInHandDoms[1].addEventListener("dragend", () => {
            dragged = ""
            AdjustCellPointerEvents(true)
        })
        }
        if (cardsInHandDoms[2]) {
        cardsInHandDoms[2].addEventListener("dragstart", dragStart)
        cardsInHandDoms[2].addEventListener("dragend", () => {
            dragged = ""
            AdjustCellPointerEvents(true)
        })
        }
        if (cardsInHandDoms[3]) {
        cardsInHandDoms[3].addEventListener("dragstart", dragStart)
        cardsInHandDoms[3].addEventListener("dragend", () => {
            dragged = ""
            AdjustCellPointerEvents(true)
        })
        }
        if (cardsInHandDoms[4]) {
        cardsInHandDoms[4].addEventListener("dragstart", dragStart)
        cardsInHandDoms[4].addEventListener("dragend", () => {
            dragged = ""
            AdjustCellPointerEvents(true)
        })
        }}
        // #endregion
    

    function SendGameData(data){
        yourGameParameters.yourBoard = Array.from(yourBoard)
        yourGameParameters.currentHand = Array.from(yourHand)
        enemyGameParameters.yourBoard = Array.from(enemyBoard)
        yourGameParameters.ko = yourKo

        SendGameDataClient(data)
    }


    let isChooseStaringHandScreen = true
    let startingHandTargets = []
    let deletedStartingCards = []
    let switchedStartingHandOnce = false
    function ReshuffleStartingHand(){
        console.log("SHUFFLELOG: 1",startingHandTargets,deletedStartingCards)
        deletedStartingCards.forEach(card => {
            if(card != ""){
                startingHandTargets.splice(card[1],1)
                ShuffleIntoDeck(card[0])

                var random = Math.floor(Math.random() * yourGameParameters.remaningDeck.length)
                startingHandTargets.push(yourGameParameters.remaningDeck[random])
                yourGameParameters.remaningDeck.splice(random,1)
            }
        })
        console.log("SHUFFLELOG: 2",startingHandTargets,deletedStartingCards)

        startingHandTargets = startingHandTargets
        deletedStartingCards = Array(5).fill("")
        deletedStartingCards = deletedStartingCards

        VerifyStartingHand()

    }
    function VerifyStartingHand(){
        yourHand = Array.from(startingHandTargets)
        switchedStartingHandOnce = true
        switchedStartingHandOnce = switchedStartingHandOnce
        StartingHandClient()
    }
    function SelectDeleteStartingCard(data){
        if(!deletedStartingCards.some(e => e[1] == data[1])){
            console.log("SHUFFLELOG: delete this: ",data)
            deletedStartingCards[data[1]] = data
            deletedStartingCards = deletedStartingCards
        }
        else{
            deletedStartingCards[data[1]] = ""
            deletedStartingCards = deletedStartingCards
        }
        
    }
    function EnableStartingHandChoosing(targets,n){
        isChooseStaringHandScreen = true
        isChooseStaringHandScreen = isChooseStaringHandScreen
        startingHandTargets = targets
        startingHandTargets = startingHandTargets

        deletedStartingCards=Array(n).fill("")
    }
    function StartingHandVerifyEvent(event){
        update()

        if(yourHand.some(e =>e.name == "Szász Levente")){
            yourHand.push(Cards.pikkDamaCard)
            cardsInYourHandClass.push("cardTemplate")
        }
        isChooseStaringHandScreen = false
        isChooseStaringHandScreen = isChooseStaringHandScreen
        SendGameData(yourGameParameters)
    }

    function DrawStartingHand(n){
        for(let i = 0; i<n; i++){
            var random = Math.floor(Math.random() * yourGameParameters.remaningDeck.length)
            yourHand.push(yourGameParameters.remaningDeck[random])

            if(yourGameParameters.remaningDeck[random].name == "Szász Levente"){
                yourHand.push(Cards.pikkDamaCard)
                cardsInYourHandClass.push("cardTemplate")
            }

            yourGameParameters.remaningDeck.splice(random,1)
            cardsInYourHandClass.push("cardTemplate")
            yourHand = yourHand
        }
         //UpdateLocalStorage()
        EnableStartingHandChoosing(yourHand,n)

        SendGameData(yourGameParameters)
    }
    function DrawOne(){
        var random = Math.floor(Math.random() * yourGameParameters.remaningDeck.length)
            yourHand.push(yourGameParameters.remaningDeck[random])

            if(yourGameParameters.remaningDeck[random].name == "Szász Levente"){
                yourHand.push(Cards.pikkDamaCard)
                cardsInYourHandClass.push("cardTemplate")
            }

            yourGameParameters.remaningDeck.splice(random,1)
            cardsInYourHandClass.push("cardTemplate")
            yourHand = yourHand

            SendGameData(yourGameParameters)
            
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
        allCardsInGame.push(Cards.YouCard)

        yourGameID = JSON.parse(localStorage.getItem("yourGameID"))
        opponentGameID = JSON.parse(localStorage.getItem("opponentGameID"))
        gameKey = JSON.parse(localStorage.getItem("gameKey"))

        isYourTurn == true ? DrawStartingHand(4) : DrawStartingHand(5)

        pageLoaded = true
        pageLoaded = pageLoaded

        Dokosok()
        
    }
    let waitForUpdate
    let promiseResolve

    //#region LEVEL UP
    let borderNumber = 6
    import levelBarBg from "../../lib/assets/global/LevelupbarBg.png"
    import levelBarFg from "../../lib/assets/global/LevelupbarBorder.png"

    import ProfilePic from "../../lib/assets/profile/PP.jpg"
    import ProfilePic2 from "../../lib/assets/profile/PP2.png"
    let profilePics = [ProfilePic,ProfilePic2]

    import pBorder1 from "../../lib/assets/profile/border1.png"
    import pBorder2 from "../../lib/assets/profile/border2.png"
    import pBorder3 from "../../lib/assets/profile/border3.png"
    import pBorder4 from "../../lib/assets/profile/border4.png"
    import pBorder5 from "../../lib/assets/profile/border5.png"
    import pBorder6 from "../../lib/assets/profile/border6.png"
    let pBorders = [pBorder1,pBorder2,pBorder3,pBorder4,pBorder5,pBorder6]

    import gachaCurrencyIcon from "../../lib/assets/global/currencyIcon.png"
    import shardIcon from "../../lib/assets/global/shardIcon.png"
    
    import * as Client from "../../client"
    let localUserData

    let winNotes = false
    let xpToLevelUp = [0]
    let lBarLength = 0
    let LOGBarLength = 0
    let gainedXp = 0
    let gainedShards = 0
    let gainedGachaCurrency = 0
    //#endregion
    onMount(() => {
            //#region LEVELUP
            localUserData = JSON.parse(localStorage.getItem("userData"))
            if (localUserData) {
                //localPullData = JSON.parse(localStorage.getItem("userData"))
                Client.getUserDataFromLocalStorage(localUserData, "userData")
                localUserData = localUserData
            } else {
                console.log("Username not found in local storage.");
            }

            LOGBarLength = `${((localUserData.xp-xpToLevelUp[Number(localUserData.level)-1])/(xpToLevelUp[Number(localUserData.level)]-xpToLevelUp[Number(localUserData.level)-1]))*100}%`
            //#endregion

            //#region GAMEPLAY
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
            waitForUpdate = new Promise((resolve) => {
                promiseResolve = resolve
                document.addEventListener('actionLog', function() {
                    console.log("DÖKLOG: actionlog",lastCardPlayedClient)
                    if(lastCardPlayedClient.side == "your" && lastCardPlayedClient.card.type == "character"){
                        resolveBoardconPromise(resolve)
                    }   
                });
            });
            document.addEventListener('updateParams', update)
            document.addEventListener('actionLog', ActionLogEvent)
            document.addEventListener('cellAligmentAnim', CellAligmentAnim)
            document.addEventListener('cardDmgAnim',CardDmgAnimation)
            document.addEventListener('summoningLocationEvent',ChangeSummoningLocationStatus)
            document.addEventListener('cardAttackAnimEvent',CardAttackAnimationEvent)
            document.addEventListener('startingHandEvent',StartingHandVerifyEvent)
            document.addEventListener('endGameEvent',EndGameEvent)

            document.addEventListener('bizsoEndTurn',BizsoEndTurn)

            document.addEventListener('animationstart', function (event) {
                if(event.animationName !== "scaleUp" || event.animationName !== "actionLogCard"){
                    isAnimationOngoing = true
                }
                
            });

            document.addEventListener('animationend', function (event) {
                if(event.animationName !== "scaleUp" || event.animationName !== "actionLogCard"){
                    isAnimationOngoing = false
                }
            });
            //#endregion
        
    });
    function resolveBoardconPromise(resolve){
        resolve();
        console.log("DÖKLOG resolved")
        waitForUpdate = new Promise((resolvea) => {
            promiseResolve = resolvea
            document.addEventListener('actionLog', function() {
                if(lastCardPlayedClient.side == "your" && lastCardPlayedClient.card.type == "character"){
                    resolvea();
                }   
            });
        });
    }
    


    //#region DRAG AND DROP LOGIC
    let cellPointerEvents = true
    function AdjustCellPointerEvents(wether){
        cellPointerEvents = wether
        cellPointerEvents = cellPointerEvents
    }
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
            console.log("DDLOG: ",targetArea) 
        }
        }
    }
    function drop(event) {
        event.preventDefault()
        if(dragged.cost <= yourGameParameters.mana){
            AdjustCellPointerEvents(true)

            yourBoardPhs[Number(event.target.id.replace("td",""))] = ""
            yourBoard[Number(event.target.id.replace("td",""))] = dragged

            console.log("your board: ",yourBoard);
            console.log("dropped to this cell: ",event.target);
            console.log("the thing u dropped: ",dragged);

            if(dragged.type == "character"){
                yourHand.splice(placingModeHighlightedCardIndex, 1);
            
                yourHand = yourHand
                cardsInYourHandClass = Array(yourHand.length).fill("cardTemplate")
                yourGameParameters.yourHand = Array.from(yourHand)

                if(!dragged.talent.includes("fürge támadás")){
                    yourBoard[Number(event.target.id.replace("td",""))].fieldEffects.push("asleep:")
                }

                console.log(voicelines);
                //voicelines[dragged.name].play();

                LastActionLog(dragged)

                //#region ABILITIES
                
                if(enemyGameParameters.secretSpells.some(e => e.name == "haggyá' má'!") && dragged.attack >= 10){
                    DealDmg(dragged,placingModeHighlightedCardIndex,9999999,"your")
                    enemyGameParameters.secretSpells.splice(enemyGameParameters.secretSpells.findIndex(e => e.name == "haggyá' má'!"),1)
                    SendGameData(enemyGameParameters)
                }
                else{
                    if((dragged.abilityType == "summon" || dragged.abilityType == "boardcon") && !dragged.fieldEffects.some(e => e.includes("silence"))){
                    console.log("uwulog1: ",yourBoard[Number(event.target.id.replace("td",""))]);
                        eval(`${dragged.ability}(yourBoard[Number(event.target.id.replace("td",""))]),${Number(event.target.id.replace("td",""))}`)
                    }
                }
                
                //#endregion

            }
            else if(dragged.type == "ko"){
                yourKo -= 1
                yourGameParameters.ko -= 1
                yourKo = yourKo
                isKoHasBeenPutDownThisTurn = true
            }

            yourGameParameters.mana -= dragged.cost
            yourBoard = yourBoard

            SendGameData(yourGameParameters)

            dragged = ""
        }
        else{ //NINCS ELÉG MANA/ NEM TE JÖSSZ 
            console.log("nincs elég manád hogy kijátszsd");
        }
    }
    function koDrop(event){
        console.log(event);
        event.preventDefault()
        AdjustCellPointerEvents(true)

        enemyBoardPhs[Number(event.target.id.replace("etd",""))] = ""
        enemyBoard[Number(event.target.id.replace("etd",""))] = dragged
        enemyBoard = enemyBoard

        yourKo -= 1
        isKoHasBeenPutDownThisTurn = true

        yourGameParameters.ko -= 1

        enemyGameParameters.yourBoard = Array.from(enemyBoard)
        console.log(enemyBoard);

        console.log("hey bb u dropped this :^ ", event.target);

        SendGameData(yourGameParameters)
        SendGameData(enemyGameParameters)
    }
    //TIKTOK
    function spellDrop(event){
        event.preventDefault()
        var isAnder = yourBoard.some(e => e.name == "Anderléné")
        var manaCost = dragged.cost
        isAnder && manaCost > 0 ? manaCost -= 1 : {} 
        if(manaCost <= (yourGameParameters.mana+yourGameParameters.spellMana)){
            event.preventDefault()

            yourHand.splice(placingModeHighlightedCardIndex, 1);
            yourHand = yourHand
            cardsInYourHandClass = Array(yourHand.length).fill("cardTemplate")
            yourGameParameters.yourHand = Array.from(yourHand)

            console.log(yourGameParameters.spellMana,yourGameParameters.mana,manaCost);

            if(yourGameParameters.spellMana >= manaCost){
                yourGameParameters.spellMana -= manaCost
            }
            else{
                manaCost -= yourGameParameters.spellMana
                yourGameParameters.spellMana = 0
                yourGameParameters.mana -= manaCost
            }
            console.log(yourGameParameters.spellMana,yourGameParameters.mana,manaCost);

            LastActionLog(dragged)

            //#region ABILITIES
            if(enemyGameParameters.secretSpells.some(e => e.name == "álljon meg a menet!")){
                LastActionLog(Cards.alljonMegAMenetCard)
                enemyGameParameters.secretSpells.splice(enemyGameParameters.secretSpells.findIndex(e => e.name == "álljon meg a menet!"),1)
                SendGameData(enemyGameParameters)
            }
            else{
                dragged.abilityType == "summon" ? eval(`${dragged.ability}()`) : yourGameParameters.secretSpells.push(dragged)
            }
            
            //#endregion

            dragged = ""
            dragged = dragged

            spellTargetArea.style.boxShadow = "inset 1vw 1vw 1.5vw #3e7ee6ba, inset -1vw -1vw 1.5vw #3e7ee6ba"
            spellTargetArea.style.fontSize = "1.5vw"
            spellTargetArea.children[0].innerHtml = "play spell"

            SendGameData(yourGameParameters)

        }

    }
    function dragStart(event) {
        if((yourHand[event.target.id].type == "character" || yourHand[event.target.id].type == "spell") && !isSummonLocationChoosing){
            ClearAttackModes()

            AdjustCellPointerEvents(false)

            RemoveEventListenersFromCells()
            console.log(event);
            console.log(event.target);

            dragged = yourHand[event.target.id]
            placingModeHighlightedCardIndex = event.target.id
            
            yourBoardPhs.fill("")
            enemyBoardPhs.fill("")
            yourBoardPhs = yourBoardPhs
            enemyBoardPhs = enemyBoardPhs

            AddEventListenerToCells(yourHand[event.target.id].type)
        }
    }
    function koDragStart(event){
        if(!isKoHasBeenPutDownThisTurn  && !isSummonLocationChoosing){
            ClearAttackModes()

            AdjustCellPointerEvents(false)

            RemoveEventListenersFromCells()
            var ko = {
                attack: 0,
                health: Math.ceil(2*turnCount/3),
                type: "ko",
                cost: 0,
                ability: "EmptyAbility",
                abilityType: "summon",
                fieldEffects: []
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
    let isSummonLocationChoosing = false
    let isSummonLocationChoosingEnemy = false
    function SummoningLocation(wether){
        SummoningLocationClient(wether,"your")
    }
    function ChangeSummoningLocationStatus(event){
        console.log("SUMMEVENTLOG: ",event.data)
        event.data.side == "your" ? isSummonLocationChoosing = event.data.wether : isSummonLocationChoosingEnemy = event.data.wether
        console.log("SUMMEVENTLOG: ",isSummonLocationChoosing,isSummonLocationChoosingEnemy)
        isSummonLocationChoosing = isSummonLocationChoosing
        isSummonLocationChoosingEnemy = isSummonLocationChoosingEnemy
    }
    function PlacingMode(card, domId){
        if(isYourTurn && card.cost <= yourGameParameters.mana  && !isSummonLocationChoosing){
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

            if(!isCardInYourHandInPlacingMode || !yourBoardPhs.includes(card)){ //új kártyára katt
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
                placingModeHighlightedCardIndex = domId
            }
            else{
                isCardInYourHandInPlacingMode = false
                yourBoardPhs.fill("")
                cardsInYourHandClass[domId] = "cardTemplate"
                yourBoardPhs = yourBoardPhs
                placingModeHighlightedCardIndex = ""
            }
            
            yourHand = yourHand;
        }
        else{
            console.log("nincs elég manád vagy nem te jössz");
        }
    }
    function PlaceByClick(card,i){
        yourBoard[i] = card;

        //#region Card placing
        if(!card.talent.includes("fürge támadás")){
            yourBoard[i].fieldEffects.some(e => e.includes("asleep:")) == false ? yourBoard[i].fieldEffects.push("asleep:") : {}
        }
    
        yourBoardPhs.fill("")

        if(!isSummonLocationChoosing){
            yourHand.splice(placingModeHighlightedCardIndex, 1);
            cardsInYourHandClass = Array(yourHand.length).fill("cardTemplate")
            yourGameParameters.mana -= card.cost
        }
        

        yourBoard = yourBoard
        yourBoardPhs = yourBoardPhs
        yourHand = yourHand

        if(!isTomiSummonLocation){
            SummoningLocation(false)
        }
        else{
            tomiPlaces[1] = i
        }
        

        console.log("dropped to this cell by click: ",yourBoard[i]);
        console.log("the thing u dropped by click: ",card);
        RemoveEventListenersFromCells()

        SendGameData(yourGameParameters)

        console.log(voicelines[card.name]);
        //voicelines[card.name].play();

        LastActionLog(card)
        //#endregion


        if(enemyGameParameters.secretSpells.some(e => e.name == "haggyá' má'!") && card.attack >= 10){
                    DealDmg(card,placingModeHighlightedCardIndex,9999999,"your")
                    enemyGameParameters.secretSpells.splice(enemyGameParameters.secretSpells.findIndex(e => e.name == "haggyá' má'!"),1)
                    SendGameData(enemyGameParameters)
                }
                else{
                    if((card.abilityType == "summon" || dragged.abilityType == "boardcon") && !card.fieldEffects.some(e => e.includes("silence"))){
                eval(`${card.ability}(yourBoard[i],${i})`)
            }
                }
        //#region ABILITIES
            if((card.abilityType == "summon" || dragged.abilityType == "boardcon") && !card.fieldEffects.some(e => e.includes("silence"))){
                eval(`${card.ability}(yourBoard[i],${i})`)
            }
        //#endregion
    }
    function KoPlacingMode(){
        if(isYourTurn  && !isSummonLocationChoosing){
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
        isKoHasBeenPutDownThisTurn = false
        if(!isKoHasBeenPutDownThisTurn){
            var ko = {
                attack: 0,
                health: Math.ceil(2*turnCount/3),
                type: "ko",
                cost: 0,
                ability: "EmptyAbility",
                abilityType: "summon",
                fieldEffects: []
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
                SendGameData(enemyGameParameters)
            }
            yourGameParameters.ko -= 1

            RemoveEventListenersFromCells()

            isKoHasBeenPutDownThisTurn = true

            enemyBoardPhs = enemyBoardPhs
            yourBoardPhs = yourBoardPhs

            SendGameData(yourGameParameters)
            
        } 
    }
    // #endregion

    //#region QUALITY OF LIFE LOGIC
    let isAnimationOngoing = false
    let cardsToDrawNewTurn = 1
    function NextTurn(){
        if(gameFase < 3){
            isYourTurn = !isYourTurn
            yourGameParameters.isYourTurn = isYourTurn
           
            gameFase++
            if(gameFase == 3 && isYourRally){ //ha az tuolsó rallyd van
                yourBoard.forEach(element => {
                    console.log(element,yourBoard);
                    if(element != ""){
                        if(element.fieldEffects.includes("asleep:")){
                            element.fieldEffects.splice(element.fieldEffects.indexOf("asleep:"),1)
                        }
                    }
                });
            }
        }
        else if(gameFase == 3){
            for(let i=0;i<yourBoard.length;i++){
                if(yourBoard[i] != ""){
                    if(yourBoard[i].abilityType == "onturnend"){
                        eval(`${yourBoard[i].ability}(yourBoard[i],${i})`)
                        console.log("MEZESLOG: ",yourBoard[i])
                        }
                    }
            }
            
            isYourRally = !isYourRally
                isYourTurn = !isYourTurn
                yourGameParameters.isYourTurn = isYourTurn
                gameFase = 1

                //CC-K
                yourBoard.forEach(element => {
                    var toDeleteIndexes = []
                    if(element != "" ){
                        if(element.type == "character"){
                        var i = 0
                        element.fieldEffects.forEach(effect => {
                            if(effect.includes("stunned") || effect.includes("frozen") || effect.includes("silence")){
                                var stringPartOne = effect.substring(effect.indexOf(":"),-1)
                                if(effect.includes("frozen")){
                                    var preTurn = Number(effect.substring(effect.indexOf(":")+1,effect.indexOf("-")))
                                    var stringPartTwo = effect.substring(effect.indexOf("-"))
                                }
                                else{
                                    var preTurn = Number(effect.substring(effect.indexOf(":")+1))
                                    var stringPartTwo = ""
                                }
                                console.log("TURNLOG: preTurn",preTurn)
                                if(preTurn == 1){
                                    toDeleteIndexes.push(i)
                                }
                                else{
                                    effect = `${stringPartOne}:${preTurn-1}${stringPartTwo}`
                                }
                                
                                
                            }
                            i++
                        });
                        console.log("TURNLOG: ",toDeleteIndexes)
                        toDeleteIndexes.sort((a, b) => b - a);
                        toDeleteIndexes.forEach(index => {
                            element.fieldEffects.splice(index,1)
                        });
                        }
                    }
                });
                console.log("TURNLOG: ",yourBoard)

                //mana számolás
                console.log(yourGameParameters.spellMana + yourGameParameters.mana);
                yourGameParameters.spellMana + yourGameParameters.mana <= 3 ? yourGameParameters.spellMana = yourGameParameters.spellMana + yourGameParameters.mana : yourGameParameters.spellMana = 3

                yourGameParameters.mana <= 9 ? yourGameParameters.mana = turnCount + 2 : yourGameParameters.mana = 10
                enemyGameParameters.mana <= 9 ? enemyGameParameters.mana = turnCount + 2 : enemyGameParameters.mana = 10
                console.log("mana: ",yourGameParameters.mana," spellMana: ",yourGameParameters.spellMana);

                isKoHasBeenPutDownThisTurn = false
                turnCount++
                for(let i=0; i<cardsToDrawNewTurn;i++){
                    DrawOne()
                }

                for(let i= 0; i<yourBoard.length;i++){
                    if(yourBoard[i] != ""){
                        yourBoard[i].fieldEffects.some(e => e.includes("asleep:")) == true ? yourBoard[i].fieldEffects.push("asleep:") : {}
                        if(yourBoard[i].talent.includes("kettős támadás")){
                            yourBoard[i].fieldEffects[0] = "kettős:0"
                        }
                    }
                }

                for(let i= 0; i<yourHand.length;i++){
                    if(yourHand[i].name.includes("Elillanó")){
                        yourHand.splice(i,1)
                        cardsInYourHandClass.pop()
                    }
                }

                //charzard
                //var isChar = yourBoard.some(e => e.fieldEffects.some(f => f.includes("turnCount")))
                var isChar
                yourBoard.forEach(e => {
                    if(yourBoard != ""){
                        //if(e.fieldEffects.some(f => f.includes("turnCount"))){isChar = true}
                    }
                })
                if(isChar){

                    for(let i= 0;i<yourBoard.length;i++){
                        var tCE = yourBoard[i].fieldEffects.findIndex(e => e.includes("turnCount"))
                        if(tCE !== -1){
                            var count = Number(tCE.replace("turnCount:",""))
                            count += 1

                            if(count == 2){
                                switch (result.name) {
                                case 'Sárkánytojás':
                                    yourBoard[i] = Cards.CharmanderCard
                                break;
                                case 'Charmander':
                                    yourBoard[i] = Cards.CharmeleonCard
                                break;
                                case 'Charmeleon':
                                    yourBoard[i] = Cards.CharizardCard
                                break;
                                case 'Charizard':
                                    yourBoard[i] = Cards.MegaCharizardXCard
                                break;
                                    default:
                                    console.log('Invalid choice');
                                    // Handle invalid choice
                                }
                            }
                            else{
                                yourBoard[i].fieldEffects[tCE] = `turnCount:${count}`
                            }
                        }
                    }
                }

                enemyGameParameters.currentHand = []
                SendGameData(yourGameParameters)             
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

        if(gameFase == 1){
            for(let i=0;i<yourBoard.length;i++){
                if(yourBoard[i] != ""){
                    if(yourBoard[i].abilityType == "onturnstart"){
                        eval(`${yourBoard[i].ability}(yourBoard[i],${i})`)
                        }
                    }
            }
        }

        //ANDRIS
        var Aindex = yourBoard.findIndex(e => e.name == "Vígh Andris")
        if(Aindex != -1 && isYourTurn){
            yourBoard[Aindex].attack -= 3
            yourBoardDoms[Aindex].children[0].children[5].style.animation = "none"
            yourBoardDoms[Aindex].children[0].children[5].offsetHeight
            yourBoardDoms[Aindex].children[0].children[5].style.animation = "statDmg 1s"

            SendGameData(yourGameParameters)
        }
        else if(Aindex != -1 && !isYourTurn){
            yourBoard[Aindex].attack += 3
            yourBoardDoms[Aindex].children[0].children[5].style.animation = "none"
            yourBoardDoms[Aindex].children[0].children[5].offsetHeight
            yourBoardDoms[Aindex].children[0].children[5].style.animation = "statHeal 1s"

            SendGameData(yourGameParameters)
        }
        
    }
    function ClickEndTurn(){
        if(!isYourTurn || isSelectTargetMode || isInChoosingMode || isAnimationOngoing || isSummonLocationChoosing || isSummonLocationChoosingEnemy){
            console.log("nem a te köröd");
            console.log("urtrun: ",isYourTurn," sleectTarget: ",isSelectTargetMode, " choosingÍMode: ",isInChoosingMode, " isAnimation: ",isAnimationOngoing, " tomisummon: ",isTomiSummonLocation)
            return;
        }
        EndTurn()
    }

    let logOpen = false
    let logCard
    let actionLogList = []

    function OpenBattleLog(){
        logOpen = !logOpen
        logOpen = logOpen
    }
    function NextBattleLog(){
        if(actionLogList.indexOf(lastCardPlayed) != actionLogList.length-1){
            lastCardPlayed = actionLogList[actionLogList.indexOf(lastCardPlayed)+1]
        }
        lastCardPlayed = lastCardPlayed
        console.log("ACTIONlOG",lastCardPlayed);
    }
    function PrevBattleLog(){
        if(actionLogList.indexOf(lastCardPlayed) != 0){
            lastCardPlayed = actionLogList[actionLogList.indexOf(lastCardPlayed)-1]
        }
        lastCardPlayed = lastCardPlayed
        console.log("ACTIONlOG",lastCardPlayed);
    }
    function ActionLogEvent(){
        logOpen = false
        logOpen = logOpen
        logOpen = true
        logOpen = logOpen


        lastCardPlayedClient.side == "enemy" && lastCardPlayedClient.card.type == "spell" && lastCardPlayedClient.card.abilityType == "secret" ? lastCardPlayed = Cards.secretCoverCard : lastCardPlayed = lastCardPlayedClient.card

        lastCardPlayed = lastCardPlayed
        actionLogList.push(lastCardPlayed)

        setTimeout(() => {
            logCard.style.animation = "actionLogCard 1.3s forwards" 
        }, 10);
        

        setTimeout(() => {
            logOpen = false
            logOpen = logOpen
            logCard.offsetHeight
            logCard.style.animation = "none"
        }, 4000);

        //ABILITIES
        if(lastCardPlayedClient.side == "your" && lastCardPlayed.type == "spell"){
            yourBoard.some(element => element.name == "Fehér Márta") ? eval(`${lastCardPlayed.ability}()`) : {}

            for(let i=0;yourBoard.length;i++){
                if(yourBoard[i].abilityType =="onspell"){
                    eval(`${yourBoard[i].ability}(yourBoard[i],${i})`)
                }
            }
        }
        if(lastCardPlayedClient.side == "enemy" && lastCardPlayed.type == "character" && yourGameParameters.secretSpells.some(e => e.name == "Ctrl+C / Ctrl+V")){
            var topush = Object.assign({},lastCardPlayed)
            topush.cost == 2
            yourHand.push(topush)
            cardsInYourHandClass.push("cardTemplate")
            yourGameParameters.secretSpells.splice(yourGameParameters.secretSpells.findIndex(e => e.name == "Ctrl+C / Ctrl+V"),1)
            ActionLog(Cards.ctrlCCtrlVCard)
            SendGameData(yourGameParameters)
        }

    }

    let isVisualAnimation = false
    let visualAnimCard = {}
    let visualAnimDom
    function VisualAnimationEnabler(card){
        isVisualAnimation = true
        isVisualAnimation = isVisualAnimation

        visualAnimCard = card
        visualAnimCard = visualAnimCard

        visualAnimDom.style.animation = "none"
        visualAnimDom.offsetHeight;
        visualAnimDom.style.animation = "visualIndicatorAnim 4s forwards"

        setTimeout(() => {
            VisualAnimationDeleter()
        }, 4000);
    }
    function VisualAnimationDeleter(){
        isVisualAnimation = false
        isVisualAnimation = isVisualAnimation

        visualAnimCard = {}
        visualAnimCard = visualAnimCard
    }
    // #endregion

    //GAMEPLAY----------------------------------
    //-----------------------------------------------------------------------------------------------------------

    //#region ANIMS
    let AnimTargetTop
    let AnimTargetLeft
    let AnimAttackerTop
    let AnimAttackerLeft
    let AnimAttackerXRot
    let AnimAttackerMarginTop

    let isCardAttackingAnimationOngoing
    function CardDmgAnimation(event){
        isCardAttackingAnimationOngoing = true

        var domId = event.data.domId
        var dmg = event.data.dmg
        var side = event.data.side
        var type = event.data.type
        
        var dom = document.getElementById(domId)
        console.log("HALÁL: ",domId,dom);

        dom.children[0].style.animation = "none"
        dom.children[0].offsetHeight;

        setTimeout(() => {
            if(type == "character"){
                dom.children[0].children[0].src = cardV2BackgroundRed
                dom.children[0].children[3].style.background = '../../lib/assets/global/cardV2TopRed.png'

                dom.children[0].children[6].style.animation = "none"
                dom.children[0].children[6].offsetHeight;
                dom.children[0].children[6].style.animation = "statDmg 1s"
            }
            else if (type == "ko"){
                dom.children[0].style.backgroundImage = "../../lib/assets/gameplay/koTarget.png"
            }

            //#region ABILITIES
                //yourBoard[domId].name == "Szaszi" ? Szaszak() : {}
            //#endregion
        }, 300);

        if(dmg == "sebzés"){
            dom.children[0].style.animation = "cardDmg 1s 0.5s ease-in"
            setTimeout(() => {
                if(type == "character"){
                    dom.children[0].children[0].src = cardV2Background
                    dom.children[0].children[3].style.background = '../../lib/assets/global/cardV2Top.png'
                    if(side == "your"){
                        var ybIndex = Number(domId.replace("td",""))
                        if(yourBoard[ybIndex].abilityType == "onhit" && !yourBoard[ybIndex].fieldEffects.some(e => e.includes('silence'))){
                        eval(`${yourBoard[ybIndex].ability}(yourBoard[ybIndex],${ybIndex})`)
                        }
                    }
                    
                }
                else if (type == "ko"){
                    dom.children[0].style.background = "../../lib/assets/gameplay/ko.png"
                }
            }, 1500);
        }
        else if(dmg == "halál"){
            dom.children[0].style.animation = "cardDeath 1s 0.5s ease-in"
            setTimeout(() => {
                if(type == "character"){
                    if(side == "enemy"){
                    enemyBoard[Number(dom.id.replace("etd",""))].source = despair
                    }
                    else if(side == "your"){
                        yourBoard[Number(dom.id.replace("td",""))].source = despair
                    }
                }
            }, 500);
            setTimeout(() => {
                if(side == "enemy"){
                    enemyBoard[Number(dom.id.replace("etd",""))] = ""
                }
                else if(side == "your"){
                    if(type == "character"){
                        //#region ABILITIES
                        if(yourBoard[Number(dom.id.replace("td",""))].abilityType == "death" && !yourBoard[Number(dom.id.replace("td",""))].fieldEffects.some(element => element.includes("silence"))){
                                eval(`${yourBoard[Number(dom.id.replace("td",""))].ability}(yourBoard[Number(dom.id.replace("td",""))])`)
                            }
                        //#endregion
                        resolveBoardconPromise(promiseResolve)
                        //onchardeath
                        yourBoard.forEach(element => {
                            if(element != ""){
                                if(element.abilityType == "onchardeath" && !element.fieldEffects.some(e => e.includes("silence"))){
                                    eval(`${element.ability}(yourBoard[domId])`)
                                }
                            }
                        })
                        
                    }
                    else if(type == "ko"){
                        Reka()
                    }
                    if(yourBoard[Number(dom.id.replace("td",""))].name != "Blazó" && yourBoard[Number(dom.id.replace("td",""))].name != "Nagy T"){
                        yourBoard[Number(dom.id.replace("td",""))] = ""
                    }
                    
                }
                isCardAttackingAnimationOngoing = false
            }, 1500);
        }  
    }
    function CardAttackAnimationEvent(event){
        var defendingi = event.data.defenderI
        var attackeri = event.data.attackerI
        var side = event.data.side
        console.log("ANIMLOG: ",event.data)

        var attackingDom = document.getElementById(`${side}${attackeri}`).children[0]

        function makeitvw(na,side){
            console.log("animlog: asd",na)
            var n = Number(na.replace("%",""))
            if(side == "top"){
                return (n/100)*66
            }
            else if(side =="left"){
                return ((n/100)*80)
            }
            else{
                return ((100-n)/100)*66
            }
        }
        
        //ANIM----------

        if(defendingi >= 10 || attackeri >= 10){
            side == "etd" ? AnimAttackerTop =  makeitvw(attackingDom.parentNode.style.top,"top") : AnimAttackerTop =  makeitvw(attackingDom.parentNode.style.bottom,"bottom")
            AnimAttackerLeft = attackingDom.parentNode.style.left

            var toppu = AnimAttackerTop

            side == "etd" ? AnimTargetTop = `${45+(4-toppu)}vh` : AnimTargetTop = `-${39-(52-toppu)}vh`

            var lefto = makeitvw(attackingDom.parentNode.style.left,"left")
            AnimTargetLeft = `${(40 - lefto)}vw`
            console.log("ANIMLOG: ENEMY: ",toppu,AnimTargetTop)

        }
        else{
            var defendingDomId = ""
        side == "etd" ? defendingDomId = "td" : defendingDomId="etd"
        var defendingDom = document.getElementById(`${defendingDomId}${defendingi}`).children[0]
        console.log("ANIMLOG: ",attackingDom,side,defendingDom,defendingDomId)

            if(side == "etd"){ //enemy támadt targetnek bottomja van
                AnimAttackerTop =  makeitvw(attackingDom.parentNode.style.top,"top")
                AnimAttackerLeft = makeitvw(attackingDom.parentNode.style.left,"left")
                AnimTargetTop = makeitvw(defendingDom.parentNode.style.bottom,"bottom")
                AnimTargetLeft = makeitvw(defendingDom.parentNode.style.left,"left")
            }
            else{
                AnimAttackerTop =  makeitvw(attackingDom.parentNode.style.bottom,"bottom")
                AnimAttackerLeft = makeitvw(attackingDom.parentNode.style.left,"left")
                AnimTargetTop = makeitvw(defendingDom.parentNode.style.top,"top")
                AnimTargetLeft = makeitvw(defendingDom.parentNode.style.left,"left")
            }
            
            AnimTargetLeft -= AnimAttackerLeft

            side == "etd" ? AnimTargetTop -= (AnimAttackerTop + 12) : AnimTargetTop -= (AnimAttackerTop - 12)
            side == "etd" ? AnimAttackerTop =  attackingDom.parentNode.style.top : AnimAttackerTop =  attackingDom.parentNode.style.bottom
            AnimAttackerLeft = attackingDom.parentNode.style.left
            AnimTargetTop = `${AnimTargetTop}vh`
            AnimTargetLeft = `${AnimTargetLeft}vw`
            
            

        } 

        side == "etd" ? AnimAttackerMarginTop = "-8vh" : AnimAttackerMarginTop = "8vh"
        side == "etd" ? AnimAttackerXRot = "-10deg" : AnimAttackerXRot = "10deg"

        console.log("AnimLogTop: ",AnimAttackerTop,AnimTargetTop);
        console.log("AnimLogLeft: ",AnimAttackerLeft,AnimTargetLeft);



        attackingDom.style.animation = "none"
        attackingDom.offsetHeight;
        attackingDom.style.animation = "attackAnim 0.6s"

        ClearAttackModes()

        enemyBoard = enemyBoard
        enemyGameParameters = enemyGameParameters
        console.log(enemyBoard, enemyGameParameters.health);

        SendGameData(enemyGameParameters)
    }
    function CellAligmentAnim(event){
            var targetDom
            var targetAbility
            isYourTurn ? targetDom = document.getElementById(`td${event.data[0]}`).children[0] : targetDom = document.getElementById(`etd${event.data[0]}`).children[0]
            targetAbility = event.data.replace(event.data[0],"")

            targetDom.children[9].style.animation = "none"
            targetDom.children[9].offsetHeight
            targetDom.children[9].style.animation = `aligActivateCont${targetAbility} 1.8s 0.8s`

            targetDom.children[5].style.animation = "none"
            targetDom.children[5].offsetHeight
            targetDom.children[6].style.animation = "none"
            targetDom.children[6].offsetHeight

            targetAbility == "vérszomjas" ? targetDom.children[5].style.animation = "statHeal 1s 0.8s" : {}
            targetAbility == "veszett" ? targetDom.children[6].style.animation = "statHeal 1s 0.8s" : {}
            targetAbility == "tunya" ? targetDom.children[5].style.animation = "statDmg 1s 0.8s" : {}
            targetAbility == "lelkiismeretes" ? targetDom.children[6].style.animation = "statDmg 1s 0.8s" : {}

            targetDom.children[10].style.animation = "none"
            targetDom.children[10].offsetHeight
            targetDom.children[10].style.animation = "aligActivateImg 1.8s 0.8s"
            

            
    }
    //#endregion
    
    //DMG VÁLTOZÓK
    let spellDmgMulti = 1
    //#region ATTACK CALCULATION
    
    let isInChoosingMode = false
    let cardChoosingModeOptions = []
    let isSelectTargetMode = false
    let selectableCards = []
    let selectableCardDoms = []
    let cardChoosingModeResult = ""


    function ChoosingModeResult(option){cardChoosingModeResult = option}
    

    function EnableTargetSelectionMode(targets){
        if(targets)
        isSelectTargetMode = true
        isSelectTargetMode = isSelectTargetMode

        for(let i=0;i<targets.length;i++){
            selectableCards.push(targets[i])
        }
        
        selectableCards = selectableCards
        console.log("kinyo: ",selectableCards);
    }
    function EnableChoosingMode(targets){
        console.log("TARGETLOG: ",targets)
        isInChoosingMode = true
        isInChoosingMode = isInChoosingMode

        cardChoosingModeOptions = targets
        cardChoosingModeOptions = cardChoosingModeOptions
    }
    function DeleteChoosingMode(){
        isInChoosingMode = false
        isInChoosingMode = isInChoosingMode

        cardChoosingModeOptions = []
        cardChoosingModeOptions = cardChoosingModeOptions

        cardChoosingModeResult = ""
        cardChoosingModeResult = cardChoosingModeResult
    }
    function DeleteSelectTargetMode(){
        isSelectTargetMode = false
        isSelectTargetMode = isSelectTargetMode

        selectableCards = []
        selectableCards = selectableCards
        selectableCardDoms = []
        selectableCardDoms = selectableCardDoms

        cardChoosingModeResult = ""
        cardChoosingModeResult = cardChoosingModeResult
    }

    function getUserChoice() {
            return new Promise((resolve) => {
            // Check if choice is not an empty string and resolve the promise
            function checkValue() {
            if (cardChoosingModeResult !== "") {
                resolve(cardChoosingModeResult);
            } else {
                // If value is still empty, wait and check again
                setTimeout(checkValue, 100); // Adjust the delay as needed

            }
            }
            // Start checking for the value
            checkValue();
        });
    }


    let attackableCards = [] //kicsit csúnyi de kell a funkción kívül is :((
    let attackableCardsDoms = []
    let cardInAttackingMode = ""
    let cardDomInAttackingMode = ""
    let isCardOnBoardInAttackingMode = false
    let cardIndexInAttackingMode =0

    function SelectTargetCard(target,i,side){
        if(!isSummonLocationChoosing){
            console.log("SELECTLOG: chosen card",target);
            if(isSelectTargetMode && selectableCards.some(element => element.name == target.name)){
            cardChoosingModeResult = {target: target, i: i,side:side}
            console.log("SELECTLOG: chosen as Starget",i);
            return;
            }
            if(cardInAttackingMode != "" && (enemyBoard.includes(target) || target === enemyGameParameters)){
                AttackCard(target,i)
                console.log("SELECTLOG: chosen as atkTarget");
                return;
            }
            if(cardInAttackingMode == "" || isCardOnBoardInAttackingMode){
                CardInAttackMode(target,i)
                console.log("SELECTLOG: chosen as attackingCard");
                return;
            }
        }
        
    }

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
        cardIndexInAttackingMode = ""
        cardIndexInAttackingMode = cardIndexInAttackingMode
    }
    function CardInAttackMode(attackingCard,i){
        var cardNotCCd = !attackingCard.fieldEffects.some(element => element.includes("frozen")) && !attackingCard.fieldEffects.some(element => element.includes("stunned")) 
        var canAttack = isYourTurn && isYourRally && !attackingCard.fieldEffects.includes("asleep:")
        var cardHasQuickAttack = isYourTurn && !attackingCard.fieldEffects.includes("asleep:")
        console.log("ASLEEPLOG can attack: ",cardNotCCd,canAttack,cardHasQuickAttack)
    
        if((canAttack || cardHasQuickAttack) && !isSelectTargetMode && !isCardAttackingAnimationOngoing && cardNotCCd){
            ClearBoardPhs()

            attackableCards = []
            attackableCardsDoms = []
    

            if(!isCardOnBoardInAttackingMode && cardInAttackingMode != attackingCard){ //ÚJ KÁRTYA KATT
                cardInAttackingMode = attackingCard
                cardIndexInAttackingMode = i
                cardDomInAttackingMode = yourBoardDoms[i]


                if(cardInAttackingMode.name == "Olívia"){
                    for (let i = 0; i < enemyBoard.length; i++){
                        if(enemyBoard[i] != ""){
                            attackableCards.push(enemyBoard[i])

                            var dom = document.getElementById(`etd${i}`)
                            attackableCardsDoms.push(dom)
                            //dom.children[0].children[0].style = "transform: scale(1.1); width: calc(var(--cardOnBoardScale)*1vw*12.5); position:absolute; filter: drop-shadow(calc(var(--cardOnBoardScale)*1vw*0.6) calc(var(--cardOnBoardScale)*1vw*0.6) 3px red) drop-shadow(calc(var(--cardOnBoardScale)*1vw*-0.6) calc(var(--cardOnBoardScale)*1vw*-0.6) 3px red);"
                        }
                    }
                    attackableCards.push(enemyGameParameters)
                    attackableCardsDoms.push(enemyPlayerNameDom)
                }
                else{
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
                    if(attackableCards.length == 0){
                        attackableCards.push(enemyGameParameters)
                        attackableCardsDoms.push(enemyPlayerNameDom)
                    }
                }
                console.log("you can attack these cards: ",attackableCards);
                console.log("thier doms: ",attackableCardsDoms);

                isCardOnBoardInAttackingMode = true

            }
            else if (isCardOnBoardInAttackingMode && cardInAttackingMode == attackingCard){ //ATK CANCEL
                isCardOnBoardInAttackingMode = false
                attackableCards = []
                attackableCardsDoms = []

                cardInAttackingMode = ""
                cardIndexInAttackingMode = ""
                cardDomInAttackingMode = ""
            }
            else if(cardInAttackingMode != attackingCard){ //MÁSIKRA VÁLTÁS
                cardInAttackingMode = attackingCard
                cardIndexInAttackingMode = i
                cardDomInAttackingMode = yourBoardDoms[i]

                if(cardInAttackingMode.name == "Olívia"){
                    for (let i = 0; i < enemyBoard.length; i++){
                        if(enemyBoard[i] != ""){
                            attackableCards.push(enemyBoard[i])

                            var dom = document.getElementById(`etd${i}`)
                            attackableCardsDoms.push(dom)
                            //dom.children[0].children[0].style = "transform: scale(1.1); width: calc(var(--cardOnBoardScale)*1vw*12.5); position:absolute; filter: drop-shadow(calc(var(--cardOnBoardScale)*1vw*0.6) calc(var(--cardOnBoardScale)*1vw*0.6) 3px red) drop-shadow(calc(var(--cardOnBoardScale)*1vw*-0.6) calc(var(--cardOnBoardScale)*1vw*-0.6) 3px red);"
                        }
                    }
                    attackableCards.push(enemyGameParameters)
                    attackableCardsDoms.push(enemyPlayerNameDom)
                }
                else{
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
                    if(attackableCards == []){
                        attackableCards.push(enemyGameParameters)
                        attackableCardsDoms.push(enemyPlayerNameDom)
                    }
                }
                console.log("you can attack these cards: ",attackableCards);
                console.log("thier doms: ",attackableCardsDoms);

                isCardOnBoardInAttackingMode = true
            }
            console.log("yourCard: ",attackingCard);

            
            cardInAttackingMode = cardInAttackingMode
            
            console.log("ASLEEP: select ",cardIndexInAttackingMode,cardDomInAttackingMode)
            attackableCards = attackableCards
            attackableCardsDoms = attackableCardsDoms
            

            enemyBoard = enemyBoard
        }
    }
    function AttackCard(target,i){
        console.log("target: ", target, " i: ", i);
        console.log("HITENEMYLOG: ",target.type == "player")
        if(target.type == "player"){
            DmgEnemyPlayer(cardInAttackingMode.attack)
        }
        else{

            cardInAttackingMode.health -= target.attack
            var bombaN = 0
            cardInAttackingMode.fieldEffects.forEach(effect => {
                effect.includes("bomba") ? bombaN += 1 : {}
            });
            var dmg = cardInAttackingMode.attack + bombaN
            var targetType = target.type

            var powerModDmg = ""
            var powerModType = ""

            cardInAttackingMode.fieldEffects.forEach(effect => {
                if(effect.includes("PowerMod")){

                powerModType = effect.replace("PowerMod","")
                console.log("POWERMODLOG: ",powerModType);
                if(powerModType.includes("+")){
                    powerModDmg = powerModType.substring(powerModType.indexOf("+"));
                }
                if(powerModType.includes("*")){
                    powerModDmg = powerModType.substring(powerModType.indexOf("*"));
                }
                
                powerModType = powerModType.replace(powerModDmg,"")
                }
            });
            console.log("POWERMODLOG:"," dmg: ",powerModDmg," tpye: ",powerModType);
            

            //#region DMG CALCULATION
            if(target.fieldEffects.includes("barrier")){
                target.fieldEffects.splice(target.fieldEffects.indexOf("barrier"),1)
            }
            else if(target.fieldEffects.includes("invinsible")){
                console.log("szar lehet")
            }
            else{
            if(target.health - dmg >= 0 || (cardInAttackingMode.name == "Emma" && target.type == "ko")){ //1 kezdés, 1 megáll
                if(cardInAttackingMode.name == "Emma" && target.type == "ko"){
                    target.health = 0
                    CardDmgAnimationClient(`td${i}`,"halál","enemy","ko")

                    dmg -= 1
                }
                else{
                    if(target.type == "character"){
                        if(target.aligment.includes(powerModType)){
                        target.health -= eval(`(Math.ceil(${dmg}${powerModDmg}))`)
                        }
                    else{
                        target.health -= dmg
                    }
                    }
                    else{
                        target.health -= dmg
                    }
                    console.log("1 kezdés, 1 megáll");

                    if(target.health == 0){
                        CardDmgAnimationClient(`td${i}`,"halál","enemy",targetType)
                    }
                    else{
                        CardDmgAnimationClient(`td${i}`,"sebzés","enemy",targetType)
                    }
                }
                
            }
            else{ //1 kezdés, tovább
                
                dmg -= target.health
                target.health = 0 //első dead
                CardDmgAnimationClient(`td${i}`,"halál","enemy",targetType)

                if(i < 5){ //1 kezdés, tovább
                    console.log(enemyBoard[i+5]);
                    if(enemyBoard[i+5] != "") {//1 kezdés, 2 tovább

                        if(enemyBoard[i+5].health - dmg >= 0){ //1 kezdés, 2 megáll
                            if(enemyBoard[i+5].aligment.includes(powerModType)){
                                enemyBoard[i+5].health -= eval(`(Math.ceil(${dmg}${powerModDmg}))`)
                            }
                            else{
                                enemyBoard[i+5].health -= dmg
                            }

                            console.log("1 kezdés, 2 megáll");

                            if(enemyBoardDoms[i+5].health == 0){
                                CardDmgAnimationClient(`td${i+5}`,"halál","enemy",targetType)
                            }
                            else{
                                CardDmgAnimationClient(`td${i+5}`,"sebzés","enemy",targetType)
                            }
                        }
                        else{ //1 kezdés, 2 tovább, 3 megáll
                            

                            dmg -= enemyBoard[i+5].health
                            enemyBoard[i+5].health = 0
                            
                            CardDmgAnimationClient(`td${i+5}`,"halál","enemy",targetType)
                            

                            DmgEnemyPlayer(dmg)
                            console.log("1 kezdés, 2 tovább, 3 megáll");
                        }
                    }
                    else{ //1kezdés, 2 nincs, 3 megáll
                        DmgEnemyPlayer(dmg)
                        console.log("1kezdés, 2 nincs, 3 megáll");
                    }
                }
                else{ //2 kezdés, tovább
                    //2 kezdés, 3 megáll
                    DmgEnemyPlayer(dmg)
                }
            }
            }
            //#endregion
            
            //#region TALENTS
            //---------------------------------------------------------------
            //KETTŐS TÁMADÁS
            if(!cardInAttackingMode.talent.includes("kettős")){
                var cardIndex = cardIndexInAttackingMode
                setTimeout(() => {
                    yourBoard[cardIndex].fieldEffects.push("asleep:")
                    console.log("ASLEEPLOG: kettős nem",yourBoard[cardIndexInAttackingMode],cardIndexInAttackingMode)
                },1000)
                
                
            }
            else{
                var whichAttack = Number(yourBoard[cardIndexInAttackingMode].fieldEffects[0].replace("kettős:",""))
                console.log("KETTŐSLOG: ",yourBoard[cardIndexInAttackingMode],whichAttack);
                
                if(whichAttack < 2){
                    whichAttack++
                    yourBoard[cardIndexInAttackingMode].fieldEffects[0] = `kettős:${whichAttack}`
                    console.log("KETTŐSLOG: after ++",yourBoard[cardIndexInAttackingMode].fieldEffects[0]);
                    
                    if(whichAttack == 2){
                    yourBoard[cardIndexInAttackingMode].fieldEffects[0] = "kettős:0"
                    var cardIndex = cardIndexInAttackingMode
                    setTimeout(() => {
                        yourBoard[cardIndex].fieldEffects.push("asleep:")
                        console.log("ASLEEPLOG: kettős nem",yourBoard[cardIndexInAttackingMode],cardIndexInAttackingMode)
                    },1000)
                    }
                }
            }
            //ÉLETELSZÍVÁS
            if(cardInAttackingMode.talent.includes("életelszívás")){
                var healAmount = Number(cardInAttackingMode.talent[(cardInAttackingMode.talent.indexOf("_"))+1])
                console.log("ÉLETLOG: amount:", healAmount);
                Heal(cardInAttackingMode,cardDomInAttackingMode,healAmount,"your")
            }
            //TÖVISES BŐR
            if(target.type == "character"){
                if(target.talent.includes("tövisesbőr")){
                    yourBoard[cardIndexInAttackingMode].health -= 1
                }
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
                            CardDmgAnimationClient(`td${i+1}`,"sebzés","enemy",targetType)
                        }
                        else if(enemyBoard[i+1].health <= 0 && enemyBoard[i+1] != ""){
                            CardDmgAnimationClient(`td${i+1}`,"halál","enemy",targetType)
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
                            CardDmgAnimationClient(`td${i-1}`,"sebzés","enemy",targetType)
                        }
                        else if(enemyBoard[i-1].health <= 0 && enemyBoard[i-1] != ""){
                            CardDmgAnimationClient(`td${i-1}`,"halál","enemy",targetType)
                        }
                    }
            }
            // #endregion

            //ALIGMENTS, death related things
            if(target.health == 0 && target.type == "character" && cardInAttackingMode.health > 0){
                if(cardInAttackingMode.aligment.includes("vérszomjas")){
                    cardInAttackingMode.attack += 1
                    CellAligmentAnimation(`${cardIndexInAttackingMode}vérszomjas`)
                }
                if(cardInAttackingMode.aligment.includes("veszett")){
                    cardInAttackingMode.health += 1
                    cardInAttackingMode.maxhealth += 1
                    CellAligmentAnimation(`${cardIndexInAttackingMode}veszett`)
                }
                if(cardInAttackingMode.aligment.includes("tunya") && cardInAttackingMode.attack != 1){
                    cardInAttackingMode.attack -= 1
                    CellAligmentAnimation(`${cardIndexInAttackingMode}tunya`)
                }
                if(cardInAttackingMode.aligment.includes("lelkiismeretes")){
                    cardInAttackingMode.health -= 1
                    CellAligmentAnimation(`${cardIndexInAttackingMode}lelkiismeretes`)
                }

                //#region CHARACTER ABILITIES
                if(cardInAttackingMode.abilityType == "onkill"){
                    eval(`${cardInAttackingMode.ability}(cardInAttackingMode)`)
                }
                //#endregion
            }
            var cardInAPId = `td${cardIndexInAttackingMode}`
            if(cardInAttackingMode.health <= 0){
            setTimeout(() => {
                CardDmgAnimationClient(cardInAPId,"halál","your","character")
            }, 450);
            }
        }
        if(cardInAttackingMode.abilityType == "onatk"){
            eval(`${cardInAttackingMode.ability}(cardInAttackingMode,target,i)`)
        }

        SendGameData(yourGameParameters)

        console.log("dom that attacked: ",cardDomInAttackingMode);

        CardAttackAnimation(i,cardIndexInAttackingMode)
    }
    //#endregion
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //ABILITIES HERE AAAAAAAAA_____________________________________________________________________________________
    //#region DAMN... ABILITIES

        function EmptyAbility(card){
            console.log("ABILOG: ", "WOOO KIJÁTSZOTTÁL");
        }

        //#region TANARS
        //abc sorrend
        function Bizso(card){
            BizsoEndTurnClient()
        }
        function BizsoEndTurn(){
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
                    if(!element.fieldEffects.includes("asleep:"))
                    element.fieldEffects.push("asleep:")
                    if(element.talent.includes("kettős támadás")){
                        yourBoard[yourBoard.indexOf(element)].fieldEffects[0] = "kettős:0"
                    }
                }
            });

            
            enemyGameParameters.currentHand = []
            SendGameData(yourGameParameters)
        
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
        function Bencus(card,i){
            card.attack += yourHand.length

            yourBoardDoms[i].children[0].children[5].style.animation = "none"
            yourBoardDoms[i].children[0].children[5].offsetHeight
            yourBoardDoms[i].children[0].children[5].style.animation = "statHeal 1s"
        }
        function Blazo(card){
            card.source = BlazóS
            card.attack = Math.floor(card.attack*1.5)
            card.health = card.attack
            yourBoard = yourBoard

            SendGameData(yourGameParameters)
        }
        function Dobi(card){
            var targets = []
            for(let i =0;i< enemyBoard.length;i++){
                enemyBoard[i] != "" ? targets.push([enemyBoard[i],i]) : {}
            }
            targets.push(enemyGameParameters)
            function dmgEnemy(){
                    function chooseEnemy(){
                        if(targets[Math.floor(Math.random() * (targets))][0].health > 0){
                            targets[Math.floor(Math.random() * (targets))][0].health -= 1
                            SendGameData(enemyGameParameters)
                        }else{
                            chooseEnemy()
                        }
                    }
                }
            Array(card.attack).forEach(() => {
                setTimeout(() => {
                    dmgEnemy()
                },1000)
            });
            for(let i =0;i< targets.length-1;i++){
                targets[i][0].health > 0 ? CardDmgAnimationClient(`td${targets[i][0]}`,"sebzés","enemy","character") : CardDmgAnimationClient(`td${targets[i][0]}`,"halál","enemy","character")

            }  
        }
        async function Farkas(card,index){
            var targets = Array.from(enemyBoard)

        
            if(targets.some(element => element !== "")){ //ha nincs target nem történik semmi
                for(let i = 0; i<enemyBoard.length; i++){
                if(enemyBoard[i] != ""){
                    selectableCardDoms.push(enemyBoardDoms[i])
                }
                }
                selectableCardDoms = selectableCardDoms


                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()
                var domID = result.i
                
                console.log("FREEZLOG: ",enemyBoardDoms[domID])
                FreezEnemy(targets[domID],enemyBoardDoms[domID],1,"enemy")

                if(domID%5 != 4){ //ha a szélén van akkor ne menjen tovább, jobbral + balról is if
                    if(enemyBoard[domID+1] != ""){
                        FreezEnemy(targets[domID+1],enemyBoardDoms[domID+1],1,"enemy")
                    }
                }
                if(domID%5 != 0){
                    if(enemyBoard[domID-1] != ""){
                        FreezEnemy(targets[domID-1],enemyBoardDoms[domID-1],1,"enemy")
                    }
                    
                }          
                DeleteSelectTargetMode()
            }
            console.log("BOARDCON: 1",index)
            var isMrsFarkas = yourBoard.some(element => element.name == "Mrs Farkas")
            if(isMrsFarkas){
                yourBoard[index].attack += 3
                yourBoard[index].health += 3
                yourBoard[index].maxhealth += 3

                yourBoardDoms[index].children[0].children[6].style.animation = "none"
                yourBoardDoms[index].children[0].children[6].offsetHeight
                yourBoardDoms[index].children[0].children[6].style.animation = "statHeal 1s"

                yourBoardDoms[index].children[0].children[5].style.animation = "none"
                yourBoardDoms[index].children[0].children[5].offsetHeight
                yourBoardDoms[index].children[0].children[5].style.animation = "statHeal 1s"

                SendGameData(yourGameParameters)
            }
            FarkasBoardcon(card,index)
        }
        async function FarkasBoardcon(card,i){
            var isMrsFarkas = yourBoard.some(element => element.name == "Mrs. Farkas")
            console.log("BOARDCON pre: ",isMrsFarkas)
            SendGameData(yourGameParameters)

            await waitForUpdate

            var isMrsFarkasNew = yourBoard.some(element => element.name == "Mrs. Farkas")
            var something = yourBoard.findIndex(element => element.name == "Mrs. Farkas")
            if(isMrsFarkasNew){
                if(yourBoard[something].health <= 0){isMrsFarkasNew = false}
            }
            console.log("BOARDCON pre: ",isMrsFarkasNew)

            if(isMrsFarkas == true && isMrsFarkasNew == false){
                yourBoard[i].attack -= 3
                DealDmg(yourBoard[i],i,3,"your")

                yourBoardDoms[i].children[0].children[5].style.animation = "none"
                yourBoardDoms[i].children[0].children[5].offsetHeight
                yourBoardDoms[i].children[0].children[5].style.animation = "statHeal 1s"

                SendGameData(yourGameParameters)
            }
            else if(isMrsFarkas == false && isMrsFarkasNew == true){
                yourBoard[i].attack += 3
                yourBoard[i].health += 3
                yourBoard[i].maxhealth += 3

                yourBoardDoms[i].children[0].children[6].style.animation = "none"
                yourBoardDoms[i].children[0].children[6].offsetHeight
                yourBoardDoms[i].children[0].children[6].style.animation = "statHeal 1s"

                yourBoardDoms[i].children[0].children[5].style.animation = "none"
                yourBoardDoms[i].children[0].children[5].offsetHeight
                yourBoardDoms[i].children[0].children[5].style.animation = "statHeal 1s"

                SendGameData(yourGameParameters)
            }
            console.log("BOARDCON VÉGE")
            SendGameData(yourGameParameters)
            var isMrFarkas = yourBoard.some(element => element.name == "Dr. Farkas")
            isMrFarkas == true ? FarkasBoardcon(card,i) : {}
            
        }
        function FiloReka(card,i){
            SGEndreCounter + yourGameParameters.spellMana > 3 ? yourGameParameters.spellMana = 3 : yourGameParameters.spellMana += SGEndreCounter
            SendGameData(yourGameParameters)
        }
        function IvanEva(target,i){
            StunnEnemy(target,1,"your")
        }
        async function Izing(card,i){
            var isParagi = yourBoard.some(e=>e.name == "Paragi")
            if(isParagi){
                yourBoard[i].talent = "fürge támadás,kettős támadás"
                yourBoard[i].fieldEffects = ["kettős:0","asleep:"]
            }
            else{
                var Izing1 = Object.assign({}, Cards.IzigCard)
                var Izing2 = Object.assign({}, Cards.IzigCard)
                Izing1.talent = "fürge támadás"
                Izing1.fieldEffects = []
                Izing2.talent = "kettős támadás"
                Izing2.fieldEffects = ["kettős:0","asleep:"]
                EnableChoosingMode([Izing1,Izing2])
                const result = await getUserChoice();
                console.log("IZINGLOG: ",result)
                yourBoard[i] = result
                //yourBoard[i].fieldEffects.push("asleep:")
                console.log("IZINGLOG: ",yourBoard)
                DeleteChoosingMode()
            }
            
            SendGameData(yourGameParameters)
        }
        function Kinyo(card){
            giveDobi(".attack += 2")

            card.abilityType = "death"
            card.ability = "KinyoDeath"
            SendGameData(yourGameParameters)
            
        }
        async function KinyoDeath(card){
            console.log("UWULOG: kinyodeatzh");
            var targets = Array.from(enemyBoard)
            targets.push(enemyGameParameters)

        
            if(targets.some(element => element !== "")){
                for(let i = 0; i<enemyBoard.length; i++){
                if(enemyBoard[i] != ""){
                    selectableCardDoms.push(enemyBoardDoms[i])
                }
                }
                selectableCardDoms.push(enemyPlayerNameDom)
                selectableCardDoms = selectableCardDoms


                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()

                var domID = result.i

                DealDmg(result.target,result.i,2,"enemy")

                SendGameData(enemyGameParameters)
                
                DeleteSelectTargetMode()
            }
            
        }
        function KocsiAndi(card){
            yourBoard.forEach(element => {
                if(element != ""){
                    if(element.aligment.includes("lelkiismeretes")){
                    DrawOne()
                }
                }
            });
            giveDobi(".cost -= 1")

        }
        function Kopasz(card){
            yourHand.push(Cards.gravitacioCard)
            cardsInYourHandClass.push("cardTemplate")
            yourHand = yourHand
            SendGameData(yourGameParameters)
        }
        async function Kuti(card){
            card.abilityType = "onkill"
            card.ability = "KutiOnkill"
            console.log("KUTILOG: ",yourBoard);
            SendGameData(yourGameParameters)

            var targets = Array.from(yourBoard)
            console.log("KUTILOG: ",targets);
            console.log("KUTILOG: ",targets.some(element => element !== ""));
      
            if(targets.some(element => element !== "")){
                console.log("KUTILOG: bemm");
                for(let i = 0; i<yourBoard.length; i++){
                if(yourBoard[i] != ""){
                    selectableCardDoms.push(yourBoardDoms[i])
                }
                }
                selectableCardDoms = selectableCardDoms

                EnableTargetSelectionMode(targets)
                console.log("KUTILOG: enabled");
                const result = await getUserChoice()
                console.log("CHOOSELOG: ",result);

                yourBoard[result.i].health *= 2
                yourBoard = yourBoard

                SendGameData(yourGameParameters)
                
                DeleteSelectTargetMode()

                
            }
            
        }
        function KutiOnkill(card){
            yourHand.push(Cards.KutiDiplomaCard)
            cardsInYourHandClass.push("cardTemplate")
            console.log("HUGYOSFOS")
            yourHand = yourHand
            SendGameData(yourGameParameters)
        }
        async function KutiDiploma(card){
            EnableChoosingMode([Cards.KutiHumanCard,Cards.KutiRealCard,Cards.KutiSportCard])
            const result = await getUserChoice();
            console.log("CHOOSELOG: ",result);
            
            var index
            var preHealth
            var preAttack
            
            yourBoard.forEach(element => {
                if(element != ""){
                    if(element.name == "Kúti" || element.name == "Kúti humán" || element.name == "Kúti reál" || element.name == "Kúti sport"){
                        console.log("CHOOSELOG: ",element.name);
                        index = yourBoard.indexOf(element)
                        preHealth = yourBoard[index].health
                        preAttack = yourBoard[index].attack
                        yourBoard[index].name == "Kúti humán" && preHealth != 1 ? preHealth -= 1 : {}
                        yourBoard[index].name == "Kúti sport" && preAttack > 2 ? preAttack -= 2 : {}
                        yourBoard[index] = result
                    }
                }
            });

            yourBoard[index].fieldEffects.push("asleep:")

            yourBoard[index].health = preHealth
            yourBoard[index].attack = preAttack

            switch (result.name) {
                case 'Kúti humán':
                    yourBoard[index].health += 1
                    yourBoard[index].maxhealth += 1
                    yourBoardDoms[index].children[0].children[6].style.animation = "none"
                    yourBoardDoms[index].children[0].children[6].offsetHeight
                    yourBoardDoms[index].children[0].children[6].style.animation = "statHeal 1s"

                    spellDmgMulti += 1
                    
                break;
                case 'Kúti reál':
                    yourBoard[index].health == Cards.KutiCard.health
                    yourBoardDoms[index].children[0].children[6].style.animation = "none"
                    yourBoardDoms[index].children[0].children[6].offsetHeight
                    yourBoardDoms[index].children[0].children[6].style.animation = "statHeal 1s"

                    yourBoard[index].attack += 1
                    yourBoardDoms[index].children[0].children[5].style.animation = "none"
                    yourBoardDoms[index].children[0].children[5].offsetHeight
                    yourBoardDoms[index].children[0].children[5].style.animation = "statHeal 1s"

                    spellDmgMulti -= 1
                break;
                case 'Kúti sport':
                    yourBoard[index].attack += 2
                    yourBoardDoms[index].children[0].children[5].style.animation = "none"
                    yourBoardDoms[index].children[0].children[5].offsetHeight
                    yourBoardDoms[index].children[0].children[5].style.animation = "statHeal 1s"

                    spellDmgMulti -= 1
                    
                break;
                default:
                console.log('Invalid choice');
                // Handle invalid choice
            }
            

            yourBoard = yourBoard
            SendGameData(yourGameParameters)
            
            DeleteChoosingMode()
        }
        function LaciNeni(card,i){
            if(i>4){
                enemyBoard[i].attack = enemyBoard[i].health
                SendGameData(enemyGameParameters)
            }
            else{
                yourBoard[i-5].attack = yourBoard[i-5].health
                SendGameData(yourGameParameters)
            }
        }
        function Matos(card){
            DmgEnemyPlayer(2)

            card.abilityType = "death"
            card.ability = "MatosDeath"
            SendGameData(yourGameParameters)
        }
        function MatosDeath(){
            CreateSGEndre()
        }
        function Meszaros(card){
            giveDobi(".attack += 2")
            card.abilityType = "death"
            card.ability = "MeszarosDeath"
            SendGameData(yourGameParameters)
            
        }
        function MeszarosDeath(card){
            DrawOne()
        }
        function Moni(card,target,i){
            target.fieldEffects.push("bomba:99999")
        }
        function MezeskalacsKo(card,j){
            console.log("MEZESLOG: kint")
            for(i=0;i<yourBoard.length;i++){
                if(yourBoard[i] != ""){
                    Heal(yourBoard[i],yourBoardDoms[i].children[0],1,"your")                   
                }
            }
            console.log("MEZESLOG: vege",yourBoard)
            SendGameData(yourGameParameters)
        }
        function MrsFarkas(card,i){
            for(let j=0;j<yourBoard.length;j++){
                if(yourBoard[j].type == "ko"){
                    var mezesKo = {
                        attack: 0,
                        health: Math.ceil(2*turnCount/3),
                        type: "ko",
                        cost: 0,
                        abilityType: "onturnend",
                        ability: "MezeskalacsKo",
                        fieldEffects: []
                    }
                    
                    yourBoard[j] = mezesKo
                    console.log("MEZESLOG: ",yourBoard[j])
                }
            }
            yourBoard[i].abilityType = "boardcon"
            yourBoard[i].ability = "MrsFarkasBoardcon"

            var isFarkas = yourBoard.some(element => element.name == "Dr. Farkas")
            console.log("BOARDCON pre: ",isFarkas)
            isFarkas ? cardsToDrawNewTurn += 1 : {}
            SendGameData(yourGameParameters)

            MrsFarkasBoardcon(card,i)
        }
        async function MrsFarkasBoardcon(card,i){
            var isFarkas = yourBoard.some(element => element.name == "Dr. Farkas")
            console.log("BOARDCON pre: ",isFarkas)

            SendGameData(yourGameParameters)
            await waitForUpdate

            var isFarkasNew = yourBoard.some(element => element.name == "Dr. Farkas")
            if(isFarkasNew == true && isFarkas == false){
                cardsToDrawNewTurn += 1
            }
            else if(isFarkasNew == false && isFarkas == true){
                cardsToDrawNewTurn -= 1
            }
            console.log("BOARDCON VÉGE")
            SendGameData(yourGameParameters)
            var isMsFarkas = yourBoard.some(element => element.name == "Mrs. Farkas")
            isMsFarkas == true ? MrsFarkasBoardcon(card,i) : {}
            
        }
        function Tabi(card,j){
            var bonusAtk
            for(let i=0;i<yourBoard.length;i++){
                if(yourBoard[i] != ""){
                    if(yourBoard[i].aligment.includes("tunya")){
                        bonusAtk += 1
                    }
                }
            }
            card.attack += bonusAtk
            yourBoardDoms[j].children[0].children[5].style.animation = 'none'
            yourBoardDoms[j].children[0].children[5].offsetHeight
            yourBoardDoms[j].children[0].children[5].style.animation = 'statHeal 1s'
            SendGameData(yourGameParameters)
        }
        let isTomiSummonLocation = false
        let tomiPlaces = []
        function Tomi(card,i){
            tomiPlaces[0] = i

            if(yourBoard.some(e => e == "")){
            SummoningLocation(true)
            isTomiSummonLocation = true
            isTomiSummonLocation = isTomiSummonLocation

            yourBoardPhs.fill("")
            for (let i = 0; i<yourBoardPhs.length;i++){
                if(yourBoard[i] == ""){
                    yourBoardPhs[i] = Cards.TomiCloneCard
                }
            }
            yourBoardPhs = yourBoardPhs
            }
            card.abilityType = "onturnstart"
            card.ability = "TomiOfferSwitch"
            SendGameData(yourGameParameters)
        }
        function TomiSwitch(wether){
            if(wether){
                yourBoard[tomiPlaces[1]] = Cards.TomiCard
                yourBoard[tomiPlaces[0]] = Cards.TomiCloneCard
                console.log("TOMILOG: ",yourBoard[tomiPlaces[0]].fieldEffects.some(e => e.includes("asleep:")),yourBoard[tomiPlaces[1]].fieldEffects.some(e => e.includes("asleep:")))
                //yourBoard[tomiPlaces[1]].fieldEffects.some(e => e.includes("asleep:")) == false && yourBoard[tomiPlaces[1]].talents.includes("fürge") == false ? yourBoard[tomiPlaces[1]].fieldEffects.push("asleep:") : {}
                //yourBoard[tomiPlaces[0]].fieldEffects.some(e => e.includes("asleep:")) == false && yourBoard[tomiPlaces[0]].talents.includes("fürge") == false ? yourBoard[tomiPlaces[0]].fieldEffects.push("asleep:") : {}
                
                var pre1 = tomiPlaces[0]
                var pre2 = tomiPlaces[1]
                tomiPlaces = [pre2,pre1]
                console.log("TOMILOG: ",yourBoard,tomiPlaces)
            }
            isTomiSummonLocation = false
            SummoningLocation(false)
            isTomiSummonLocation = isTomiSummonLocation

            SendGameData(yourGameParameters)
        }
        function TomiCloneDeath(card,i){
            console.log("TOMILOG klon death kivül")
            if(!isYourTurn){
                console.log("TOMILOG klon death",yourBoard[tomiPlaces[0]])
                yourBoard[tomiPlaces[0]].fieldEffects.push("invinsible")
                
                SendGameData(yourGameParameters)
            }
        }
        function TomiOfferSwitch(card,i){
            yourBoard[tomiPlaces[0]].fieldEffects.some(e=>e.includes("invinsible")) ? yourBoard[i].fieldEffects.splice(yourBoard[i].fieldEffects.indexOf("invinsible"),1) : {}
            console.log("TOMILOG: ",yourBoard.some(element => element.name == "Dr. Tamás Klónja"))
            if(yourBoard.some(element => element.name == "Dr. Tamás Klónja")){
                SummoningLocation(true)
                isTomiSummonLocation = true
                isTomiSummonLocation = isTomiSummonLocation
            }
            else{
                Tomi(card,i)
            }
        }
        function TothKaresz(){
            giveDobi(".attack += 1")
            giveDobi(".health += 1")
            giveDobi(".maxhealth += 1")
        }
        let isTritzCoinFlip = false
        let tritzCoinFlips = []
        function Tritz(){

            isTritzCoinFlip = true
            isTritzCoinFlip = isTritzCoinFlip

            tritzCoinFlips = []
            tritzCoinFlips = tritzCoinFlips
        }
        function TritzFlip(){
            async function TritzMetamorfozis(){
                var targets = Array.from(yourBoard)
                
                if(targets.some(element => element !== '')){
                    for(let i = 0; i<targets.length; i++){
                        if(targets[i] != ''){
                            selectableCardDoms.push(yourBoardDoms[i])
                        }
                    }
                    selectableCardDoms = selectableCardDoms
                
                    EnableTargetSelectionMode(targets)
                    const result = await getUserChoice()
                    var domID = result.i
                
                    Evolve(result.target,result.i,1)

                    SendGameData(yourGameParameters)
                    Tritz()
                
                    DeleteSelectTargetMode()
                }
            }

            isTritzCoinFlip = true
            isTritzCoinFlip = isTritzCoinFlip

            tritzCoinFlips = []
            tritzCoinFlips = tritzCoinFlips

            function CoinFlip(){
                Math.random() >= 0.5 ? tritzCoinFlips.push(tFej) : tritzCoinFlips.push(tIras)
                tritzCoinFlips = tritzCoinFlips
            }
            setTimeout(() => {
                CoinFlip()
            }, 0*700);
            setTimeout(() => {
                CoinFlip()
            }, 1*700);
            setTimeout(() => {
                CoinFlip()
            }, 2*700);
            setTimeout(() => {
                CoinFlip()
            }, 3*700);
            setTimeout(() => {
                CoinFlip()
            }, 4*700);
            

            setTimeout(() => {
                var coinCounter = 0
                tritzCoinFlips.forEach(coin => {
                    coin == tFej ? coinCounter++ : {}
                })
                if(coinCounter >= 2){
                    TritzMetamorfozis()
                }
                isTritzCoinFlip = false
                    isTritzCoinFlip = isTritzCoinFlip

                tritzCoinFlips = []
                tritzCoinFlips = tritzCoinFlips
            }, 5*700);
            
            

        }
        function NagyOra(card,i){
            card.health += 1
            yourBoardDoms[i].children[0].children[6].style.animation = 'none'
            yourBoardDoms[i].children[0].children[6].offsetHeight
            yourBoardDoms[i].children[0].children[6].style.animation = 'statHeal 1s'

            SendGameData(yourGameParameters)
        }
        function NagyT(card){
            card.source = NagyTS
            card.attack = Math.ceil(card.attack*0.5)
            card.health = card.attack

            yourBoard = yourBoard
            SendGameData(yourGameParameters)
        }
        async function Rixer(card,i){
            var targets = Array.from(yourBoard).concat(Array.from(enemyBoard))
            
            if(targets.some(element => element !== '')){
                selectableCardDoms = Array.from(yourBoardDoms).concat(Array.from(enemyBoardDoms))
                selectableCardDoms = selectableCardDoms
            
                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()
                var domID = result.i
                result.side == 'your' ? domID = domID : domID += yourBoard.length
            
                DealDmg(result.target,result.i,4,result.side)

                SendGameData(yourGameParameters)
                SendGameData(enemyGameParameters)
            
                DeleteSelectTargetMode()
            }
        }
        function Rozgonyi(card,j){
            for(let i=0;i<yourBoard.length;i++){
                if(yourBoard[i] != ""){
                    if(yourBoard[i].szak.includes("reál")){
                        yourBoard[i].health += 1
                        yourBoard[i].maxhealth += 1
                        yourBoardDoms[i].children[0].children[6].style.animation = 'none'
                        yourBoardDoms[i].children[0].children[6].offsetHeight
                        yourBoardDoms[i].children[0].children[6].style.animation = 'statHeal 1s'
                    }
                }
            }
            SendGameData(yourGameParameters)
        }
        function Sagine(card){
            yourHand.push(Cards.CsontvazCard)
            cardsInYourHandClass.push("cardTemplate")
            yourHand = yourHand
            SendGameData(yourGameParameters)
        }
        function Sisak(card,i){
            card.ability = "SisakBoardcon"
            card.abilityType = "boardcon"

            if(i%5 != 4){
                if(yourBoard[i+1] != ""){
                if(!yourBoard[i+1].aligment.includes("tunya")){
                    var pre = yourBoard[i+1].aligment
                    yourBoard[i+1].aligment = `${pre},tunya`
                }}
                
            }
            if(i%5 != 0){
                if(yourBoard[i-1] != ""){
                if(!yourBoard[i-1].aligment.includes("tunya")){
                    var pre = yourBoard[i-1].aligment
                    yourBoard[i-1].aligment = `${pre},tunya`
                }}
                
            }
            SendGameData(yourGameParameters)

            SisakBoardcon(card,i)
        }
        async function SisakBoardcon(card,i){

            await waitForUpdate

            var isSisak = yourBoard.some(e => e.name == "Sisák")
            if(isSisak){
                if(i%5 != 4){ //NINCS BALLÓRA HELY
                    for(let j=0;j<yourBoard.length;j++){
                        if(j == i){
                            if(!yourBoard[i+1].aligment.includes("tunya")){
                                var pre = yourBoard[i+1].aligment
                                yourBoard[i+1].aligment = `${pre},tunya`
                            } 
                        }
                        else{
                            var ogCard = Cards.allCardsArr.find(e => e.name == yourBoard[j].name)
                            ogCard.talent.includes("tunya") == false && yourBoard[j].talent.includes("tunya") == true ? yourBoard[j].talent.replace(",tunya","") : {}
                        }
                    }
                }
                if(i%5 != 0){ //NINCS BALLÓRA HELY
                    for(let j=0;j<yourBoard.length;j++){
                        if(j == i){
                            if(!yourBoard[i-1].aligment.includes("tunya")){
                                var pre = yourBoard[i-1].aligment
                                yourBoard[i-1].aligment = `${pre},tunya`
                            } 
                        }
                        else{
                            var ogCard = Cards.allCardsArr.find(e => e.name == yourBoard[j].name)
                            ogCard.talent.includes("tunya") == false && yourBoard[j].talent.includes("tunya") == true ? yourBoard[j].talent.replace(",tunya","") : {}
                        }
                    }
                }
                SendGameData(yourGameParameters)
                SisakBoardcon(card,i)
            }
            
            
        }
        function Szaszak(card,i){
            giveDobi(".attack += 3")
            giveDobi(".health += 3")
            giveDobi(".maxhealth += 3")
        }
        function Weisz(){
            const maxCost = yourGameParameters.remaningDeck.reduce((max, obj) => (obj.cost > max ? obj.cost : max), yourGameParameters.remaningDeck[0].cost);
            console.log("WEISZLOG: MAX",maxCost)
            var maxCostCards = []
            yourGameParameters.remaningDeck.forEach(element => {
                element.cost == maxCost ? maxCostCards.push(element) : {}
            });
            var randomCard = maxCostCards[Math.floor(Math.random() * (maxCostCards))];
            yourHand.push(randomCard)
            cardsInYourHandClass.push("cardTemplate")
            

        }
        //#endregion
        //#region DIAKS
        function Abigel(){
            for(let i=0;i<yourHand.length;i++){
                if(yourHand[i].type == "character"){
                    yourHand[i].attack += 1
                    yourHand[i].health += 1
                    yourHand[i].maxhealth += 1

                    cardsInHandDoms[i].children[5].style.animation = "none"
                    cardsInHandDoms[i].children[5].offsetHeight
                    cardsInHandDoms[i].children[5].style.animation = "statHeal 1s"
                    cardsInHandDoms[i].children[6].style.animation = "none"
                    cardsInHandDoms[i].children[6].offsetHeight
                    cardsInHandDoms[i].children[6].style.animation = "statHeal 1s"
                }
            }
            SendGameData(yourGameParameters)
        }
        function Arho(card,i){
            CreateSGEndre()
        }
        function Balo(card,i){
            SummonLocationChoosing(Cards.NokedliCard)
        }
        function Eszter(card,i){
            console.log("a")
            var cardToPush = Object.assign({},card)
            cardToPush.health = 1
            cardToPush.maxhealth = 1
            yourHand.push(cardToPush )
            cardsInYourHandClass.push("cardTemplate")
        }
        function Gitta(card,i){
            yourBoard[i].attack += 1
            
            yourBoardDoms[i].children[0].children[5].style.animation = "none"
            yourBoardDoms[i].children[0].children[5].offsetHeight
            yourBoardDoms[i].children[0].children[5].style.animation = "statHeal 1s"

            SendGameData(yourGameParameters)
        }
        async function Juli(card){
            var isParagi = yourBoard.some(e=>e.name == "Paragi")
            if(isParagi){
                var targets = Array.from(enemyBoard)
            
                if(targets.some(element => element !== '')){
                    for(let i = 0; i<targets.length; i++){
                        if(targets[i] != ''){
                            selectableCardDoms.push(enemyBoardDoms[i])
                        }
                    }
                    selectableCardDoms = selectableCardDoms
                
                    EnableTargetSelectionMode(targets)
                    const result = await getUserChoice()
                    var domID = result.i
                    StunnEnemy(result.target,1,result.side)
                    SendGameData(enemyGameParameters)
                    DeleteSelectTargetMode()

                    CreateSGEndre()
                }
            }
            else{
                var Juli1 = Object.assign({}, Cards.JuliCard)
                var Juli2 = Object.assign({}, Cards.JuliCard)
                Juli1.description = "<b>Kábíts el</b> (1) egy kártyát"
                Juli2.description = "Készíts egy <b>'Ságvári Endre szobor'</b> kártyát egy szabadon választott üres mezőre a térfeleden"
                EnableChoosingMode([Juli1,Juli2])
                const result = await getUserChoice();
                DeleteChoosingMode()
                if(result.description == Juli1.description){
                    var targets = Array.from(enemyBoard)
            
                    if(targets.some(element => element !== '')){
                        for(let i = 0; i<targets.length; i++){
                            if(targets[i] != ''){
                                selectableCardDoms.push(enemyBoardDoms[i])
                            }
                        }
                        selectableCardDoms = selectableCardDoms
                    
                        EnableTargetSelectionMode(targets)
                        const result2 = await getUserChoice()
                        var domID = result2.i
                        StunnEnemy(result2.target,1,result2.side)
                        SendGameData(enemyGameParameters)
                        DeleteSelectTargetMode()
                    }
                }else {
                    CreateSGEndre()
                }
                
            }
            
            SendGameData(yourGameParameters)
        
        }
        function Miklos(){
            CreateSGEndre()
            setTimeout(() => {

                function CheckDone(){
                    if(isSummonLocationChoosing == true){
                        setTimeout(() => {
                            CheckDone()
                        }, 1000);
                    }
                    else{
                        CreateSGEndre()
                    }
                }
                CheckDone()
            },1000);
        }
        async function NagyBenedek(){
            var targets = Array.from(yourBoard)
            
            if(targets.some(element => element !== '')){
                for(let i = 0; i<targets.length; i++){
                    if(targets[i] != ''){
                        selectableCardDoms.push(yourBoardDoms[i])
                    }
                }
                selectableCardDoms = selectableCardDoms
            
                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()
                var domID = result.i
            
                result.target.attack += 2
                yourBoardDoms[domID].children[0].children[5].style.animation = "none"
                yourBoardDoms[domID].children[0].children[5].offsetHeight
                yourBoardDoms[domID].children[0].children[5].style.animation = "statHeal 1s"

                SendGameData(yourGameParameters)
            
                DeleteSelectTargetMode()
            }
        }
        function NagyGyorgyBalazs(card,i){
            i%5 != 4 && yourBoard[i+1] != "" ? Evolve(yourBoard[i+1].cost,i+1,1) : {}
            i%5 != 0 && yourBoard[i-1] != "" ? Evolve(yourBoard[i-1].cost,i-1,1) : {}
            i>4 && yourBoard[i-5] != "" ? Evolve(yourBoard[i-5].cost,i-5,1) : {}
            i<5 && yourBoard[i+5] != "" ? Evolve(yourBoard[i+5].cost,i-5,1) : {}
        }
        function Reka(){
            if(yourBoard.some(e => e.name == "Barni")){
                yourKo += 1
                SendGameData(yourGameParameters)
            }
        }
     
        function Vendel(){
            DrawOne()
        }
        function VBalint(){
            var Cost2Candidets = []
            Cards.allCardsArr.forEach(element => {
                element.cost == 2 && element.type == "character" ? Cost2Candidets.push(element) : {}
            });
            var random = Cost2Candidets[Math.floor(Math.random() * Cost2Candidets.length)]
            random.talent.includes("fürge") == false ? random.fieldEffects.push("asleep:") : {}
            if(yourBoard.some(e => e == "")){
                function CheckPlaceing(index){
                    index == yourBoard.length ? index = 1 : {}
                    yourBoard[index] == "" ? yourBoard[index] = random : CheckPlaceing(index+1)
                }
                CheckPlaceing(0)
            }
        }
        function Zalan(card){
            yourHand.push(Cards.palacsintaFeszCard)
            cardsInYourHandClass.push("cardTemplate")
            yourHand = yourHand

            card.abilityType = "onatk"
            card.ability = "ZalanOnatk"
            SendGameData(yourGameParameters)
        }
        function ZalanOnatk(){
            giveDobi(".attack += 2")
            giveDobi(".health += 2")
            giveDobi(".maxhealth += 2")
        }
        function Zeno(deadCard){
            var protoCard = Cards.allCardsArr.find(e => e.name == deadCard.name)
            yourHand.push(protoCard)
            cardsInYourHandClass.push("cardTemplate")

            SendGameData(yourGameParameters)
        }
        //#endregion
        //#region dökösök
        let dokATablan = []
        async function Dokosok(){
            console.log("DÖKLOG: start",dokATablan,yourBoard)
            var dokATablanNew = []
            yourBoard.forEach(element => {
                console.log("DÖKLOG: BENNT")
                if(element != ""){
                    if(element.type == "character"){
                    console.log("DÖKLOG: ",element,yourBoard)
                    element.bonusTraits.some(e => e == "dök") ? dokATablanNew.push(element) : {}
                }}
            });
            dokATablan = dokATablanNew
            console.log("DÖKLOG: ",dokATablan)
            await waitForUpdate
            console.log("DÖKLOG UPDATE")
            Dokosok()
        }

        async function Regina(){
            var dok = dokATablan.filter(obj => obj.name !== "Redzsina");
            console.log("REGLOG: ",dok,dokATablan)
            for(let i=0;i<dok.length;i++){
                var preTalent = dok[i].talent
                preTalent.includes("életel") == false ? dok[i].talent = `${preTalent}, életelszívás-1` : {}
                console.log("REGLOG",dok,yourBoard,dokATablan)
            }
            SendGameData(yourGameParameters)
            await waitForUpdate
            var isRegina = yourBoard.some(e=>e.name == "Redzsina")
            console.log("REGLOG: isregina ",isRegina)
            if(isRegina){
                
                setTimeout(() => {
                    Regina()
                },100)  
            }
            else{
                for(let i = 0;i<yourBoard.length;i++){
                    if(yourBoard[i] != ""){
                        if(dok.some(e => e.name == yourBoard[i].name)){
                            var ogCard = Cards.allCardsArr.find(e => e.name == yourBoard[i].name)
                            if(!ogCard.talent.includes("életel")){
                                var newTalent = yourBoard[i].talent.replace(", életelszívás-1","")
                                yourBoard[i].talent = newTalent
                                console.log("REGLOG death: ",ogCard,yourBoard[i].talent.replace(', életelszívás-1',""),yourBOard[i],yourBoard)
                            }
                            
                        }
                    }
                }
                SendGameData(yourGameParameters)
            }
        }
        async function Rebecca(){
            var dok = dokATablan.filter(obj => obj.name !== "Manccinelli Rebecca");
            for(let i=0;i<dok.length;i++){
                dok[i].attack += 2
            }
            SendGameData(yourGameParameters)
            await waitForUpdate
            var isRegina = yourBoard.some(e=>e.name == "Manccinelli Rebecca")
            if(isRegina){
                setTimeout(() => {
                    Rebecca()
                },100)  
            }
            else{
                for(let i = 0;i<yourBoard.length;i++){
                    if(yourBoard[i] != ""){
                        if(dok.some(e => e.name == yourBoard[i].name)){
                            yourBoard[i].attack -2 >= 0 ? yourBoard[i].attack -= 2 : yourBoard[i].attack = 0
                        }
                    }
                }
                SendGameData(yourGameParameters)
            }
        }
        async function TBotond(){
            var dok = dokATablan.filter(obj => obj.name !== "Tanács Botond");
            for(let i=0;i<dok.length;i++){
                dok[i].health += 3
                dok[i].maxhealth += 3
            }
            SendGameData(yourGameParameters)
            await waitForUpdate
            var isRegina = yourBoard.some(e=>e.name == "Tanács Botond")
            if(isRegina){
                setTimeout(() => {
                    TBotond()
                },100)  
            }
            else{
                for(let i = 0;i<yourBoard.length;i++){
                    if(yourBoard[i] != ""){
                        if(dok.some(e => e.name == yourBoard[i].name)){
                            yourBoard[i].maxhealth -= 3
                            DealDmg(yourBoard[i],i,3,"your")
                        }
                    }
                }
                SendGameData(yourGameParameters)
            }
        }
        function ZsPeter(card,i){
            var dokLength = dokATablan.length -1
            card.health += dokLength
            card.maxhealth += dokLength*2
            
            SendGameData(yourGameParameters)
        }
        async function GLevente(){
            var dok = dokATablan.filter(obj => obj.name !== "Gál Levente");

            for(let i=0;i<dok.length;i++){
                var preTalent = dok[i].aligment
                preTalent.includes("veszett") == false ? dok[i].aligment = `${preTalent}, veszett` : {}

            }
            SendGameData(yourGameParameters)
            await waitForUpdate
            var isRegina = yourBoard.some(e=>e.name == "Gál Levente")

            if(isRegina){
                
                setTimeout(() => {
                    GLevente()
                },100)  
            }
            else{
                for(let i = 0;i<yourBoard.length;i++){
                    if(yourBoard[i] != ""){
                        if(!ogCard.aligment.includes("veszett")){
                                var newTalent = yourBoard[i].aligment.replace(", veszett","")
                                yourBoard[i].aligment = newTalen
                        }
                    }
                }
                SendGameData(yourGameParameters)
            }
        }
        async function BKinga(){
            var dok = dokATablan.filter(obj => obj.name !== "Boros Kinga");
            for(let i=0;i<dok.length;i++){
                dok[i].attack += 4
            }
            SendGameData(yourGameParameters)
            await waitForUpdate
            var isRegina = yourBoard.some(e=>e.name == "Boros Kinga")
            if(isRegina){
                setTimeout(() => {
                    BKinga()
                },100)  
            }
            else{
                for(let i = 0;i<yourBoard.length;i++){
                    if(yourBoard[i] != ""){
                        if(dok.some(e => e.name == yourBoard[i].name)){
                            yourBoard[i].attack -4 >= 0 ? yourBoard[i].attack -= 4 : yourBoard[i].attack = 0
                        }
                    }
                }
                SendGameData(yourGameParameters)
            }
        }
        async function MReka(){
            var dok = dokATablan.filter(obj => obj.name !== "Molnár Réka");
            for(let i=0;i<dok.length;i++){
                dok[i].attack += 5
            }
            SendGameData(yourGameParameters)
            await waitForUpdate
            var isRegina = yourBoard.some(e=>e.name == "Molnár Réka")
            if(isRegina){
                setTimeout(() => {
                    MReka()
                },100)  
            }
            else{
                for(let i = 0;i<yourBoard.length;i++){
                    if(yourBoard[i] != ""){
                        if(dok.some(e => e.name == yourBoard[i].name)){
                            yourBoard[i].attack -5 >= 0 ? yourBoard[i].attack -= 5 : yourBoard[i].attack = 0
                        }
                    }
                }
                SendGameData(yourGameParameters)
            }
        }
        async function KDomonkos(){
            var dok = dokATablan.filter(obj => obj.name !== "Kasza Domonkos");

            for(let i=0;i<dok.length;i++){
                var preTalent = dok[i].talent
                preTalent.includes("robbanó támadás") == false ? dok[i].talent = `${preTalent}, robbanó támadás` : {}

            }
            SendGameData(yourGameParameters)
            await waitForUpdate
            var isRegina = yourBoard.some(e=>e.name == "Kasza Domonkos")

            if(isRegina){
                
                setTimeout(() => {
                    KDomonkos()
                },100)  
            }
            else{
                for(let i = 0;i<yourBoard.length;i++){
                    if(yourBoard[i] != ""){
                        if(dok.some(e => e.name == yourBoard[i].name)){
                            var ogCard = Cards.allCardsArr.find(e => e.name == yourBoard[i].name)
                            if(!ogCard.talent.includes("robbanó támadás")){
                                var newTalent = yourBoard[i].talent.replace(", robbanó támadás","")
                                yourBoard[i].talent = newTalent
                            }
                            
                        }
                    }
                }
                SendGameData(yourGameParameters)
            }
        }
        //#endregion
        //#region SPELLEK
        async function Acelpajzs(){
            var targets = Array.from(yourBoard).concat(Array.from(enemyBoard))
            
            if(targets.some(element => element !== '')){
                selectableCardDoms = Array.from(yourBoardDoms).concat(Array.from(enemyBoardDoms))
                selectableCardDoms = selectableCardDoms
                
                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()
                var domID = result.i
                
                result.target.fieldEffects.includes("barrier") == false ? result.target.fieldEffects.push("barrier") : {}
                
                SendGameData(enemyGameParameters)
                SendGameData(yourGameParameters)
                
                DeleteSelectTargetMode()
            }
        }
        function Atomrobbanas(){
            for(let i=0;i<yourBoard.length;i++){
                if(yourBoard[i] != ""){
                    yourBoard.fieldEffects.some(e=>e.includes("spellshield")) ? DealDmg(yourBoard[i],i,99999,"your") : {}
                }
                if(enemyBoard[i] != ""){
                    enemyBoard.fieldEffects.some(e=>e.includes("spellshield")) ? DealDmg(enemyBoard[i],i,99999,"enemy") : {}
                }
            }
        }
        async function Alazatossag(){
            var targets = Array.from(enemyBoard)
            
            if(targets.some(element => element !== '')){
                for(let i = 0; i<targets.length; i++){
                    if(targets[i] != ''){
                        selectableCardDoms.push(enemyBoardDoms[i])
                    }
                }
                selectableCardDoms = selectableCardDoms
            
                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()
                var domID = result.i
            
                targets[domID].attack = 1

                enemyBoardDoms[domID].children[0].children[5].style.animation = "none"
                enemyBoardDoms[domID].children[0].children[5].offsetHeight
                enemyBoardDoms[domID].children[0].children[5].style.animation = "statDmg 1s"

                SendGameData(enemyGameParameters)
            
                DeleteSelectTargetMode()
            }
        }
        async function CsereBere(){
            var targets = Array.from(yourBoard)
            
            if(targets.some(element => element !== '')){
                for(let i = 0; i<targets.length; i++){
                    if(targets[i] != ''){
                        selectableCardDoms.push(yourBoardDoms[i])
                    }
                }
                selectableCardDoms = selectableCardDoms
            
                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()
                var domID = result.i
            
                var preAttack = targets[domID].attack
                var preHealth = targets[domID].health
                targets[domID].attack = preHealth
                targets[domID].health = preAttack

                yourBoardDoms[domID].children[0].children[5].style.animation = "none"
                yourBoardDoms[domID].children[0].children[6].style.animation = "none"
                yourBoardDoms[domID].children[0].children[5].offsetHeight
                yourBoardDoms[domID].children[0].children[6].offsetHeight
                if(preAttack >= preHealth){
                    yourBoardDoms[domID].children[0].children[5].style.animation = "statHeal 1s"
                    yourBoardDoms[domID].children[0].children[6].style.animation = "statDmg 1s"
                }
                else{
                    yourBoardDoms[domID].children[0].children[6].style.animation = "statHeal 1s"
                    yourBoardDoms[domID].children[0].children[5].style.animation = "statDmg 1s"
                }

                SendGameData(yourGameParameters)
            
                DeleteSelectTargetMode()
            }
        }
        function Ebed(){
            for(let i=0;i<enemyBoard.length;i++){
                if(enemyBoard[i] != ""){
                    enemyBoard[i].bonusTraits.some(e => e == "diák") ? StunnEnemy(enemyBoard[i],1,"enemy") : {}
                }
            }
        }
        async function ElloptakAKabatod(){
            var targets = Array.from(yourBoard).concat(Array.from(enemyBoard))
            
            if(targets.some(element => element !== '')){

                selectableCardDoms = Array.from(yourBoardDoms).concat(Array.from(enemyBoardDoms))
                selectableCardDoms = selectableCardDoms
            
                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()
                var domID = result.i
                result.side == "your" ? domID = domID : domID += yourBoard.length
            
                var Sindex = targets[domID].fieldEffects.findIndex(element => element.includes('spellshield'));
                if(Sindex === -1){
                    DealDmg(result.target,result.i,3,result.side,"spell")
                    console.log("SPELLEKLOG: ",selectableCardDoms,selectableCardDoms[domID])
                    FreezEnemy(result.target,selectableCardDoms[domID],1,result.side)
                }
                else{
                    result.target.fieldEffects.splice(Sindex,1)
                }
                SendGameData(yourGameParameters)
                SendGameData(enemyGameParameters)
            
                DeleteSelectTargetMode()
            }
        }
        async function Enyem(){
            var targets = Array.from(enemyBoard)
            
            if(targets.some(element => element !== '')){
                for(let i = 0; i<targets.length; i++){
                    if(targets[i] != ''){
                        selectableCardDoms.push(enemyBoardDoms[i])
                    }
                }
                selectableCardDoms = selectableCardDoms
            
                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()
                var domID = result.i
                
                var Sindex = targets[domID].fieldEffects.findIndex(element => element.includes('spellshield'));
                if(Sindex === -1){
                    SummonLocationChoosing(result.target)
                }
                else{
                    result.target.fieldEffects.splice(Sindex,1)
                }

                SendGameData(enemyGameParameters)
            
                DeleteSelectTargetMode()
            }
        }
        async function EzVagyAz(){
            var isParagi = yourBoard.some(e=>e.name == "Paragi")
            if(isParagi){
                var targets = Array.from(yourBoard)
            
                if(targets.some(element => element !== '')){
                    for(let i = 0; i<targets.length; i++){
                        if(targets[i] != ''){
                            selectableCardDoms.push(yourBoardDoms[i])
                        }
                    }
                    selectableCardDoms = selectableCardDoms
                
                    EnableTargetSelectionMode(targets)
                    const result2 = await getUserChoice()
                    var domID = result2.i

                    result2.target.attack += 3
                    result2.target.health += 3
                    result2.target.maxhealth += 3

                    yourBoardDoms[result.i].children[0].children[5].style.animation = "none"
                    yourBoardDoms[result.i].children[0].children[5].offsetHeight
                    yourBoardDoms[result.i].children[0].children[5].style.animation = "statHeal 1s"
                    yourBoardDoms[result.i].children[0].children[6].style.animation = "none"
                    yourBoardDoms[result.i].children[0].children[6].offsetHeight
                    yourBoardDoms[result.i].children[0].children[6].style.animation = "statHeal 1s"
                    
                    DeleteSelectTargetMode()
                } 
            }
            else{
                var choice1 = Cards.ezVagyAzCard
                var choice2 = Cards.ezVagyAzCard
                choice1.description = "Egy szabadon választott kártyának a térfeleden +3atk"
                choice2.description = "Egy szabadon választott kártyának a térfeleden +3hp"
                EnableChoosingMode([choice1,choice2])
                const result = await getUserChoice();
                DeleteChoosingMode()
                var targets = Array.from(yourBoard)
            
                if(targets.some(element => element !== '')){
                    for(let i = 0; i<targets.length; i++){
                        if(targets[i] != ''){
                            selectableCardDoms.push(yourBoardDoms[i])
                        }
                    }
                    selectableCardDoms = selectableCardDoms
                
                    EnableTargetSelectionMode(targets)
                    const result2 = await getUserChoice()
                    var domID = result2.i
                    if(result2.target.description == choice1.description){
                        result2.target.attack += 3

                        yourBoardDoms[result.i].children[0].children[5].style.animation = "none"
                        yourBoardDoms[result.i].children[0].children[5].offsetHeight
                        yourBoardDoms[result.i].children[0].children[5].style.animation = "statHeal 1s"
                    }else {
                        result2.target.health += 3
                        result2.target.maxhealth += 3

                        yourBoardDoms[result.i].children[0].children[6].style.animation = "none"
                        yourBoardDoms[result.i].children[0].children[6].offsetHeight
                        yourBoardDoms[result.i].children[0].children[6].style.animation = "statHeal 1s"
                    }
                    
                    SendGameData(yourGameParameters)
                    DeleteSelectTargetMode()
                } 
            }
    
            SendGameData(yourGameParameters)
        }
        async function Fakard(){
            var targets = Array.from(yourBoard).concat(Array.from(enemyBoard))
            
            if(targets.some(element => element !== '')){
                selectableCardDoms = Array.from(yourBoardDoms).concat(Array.from(enemyBoardDoms))
                selectableCardDoms = selectableCardDoms
                
                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()
                var domID = result.i
                result.side == "your" ? domID = domID : domID += yourBoard.length
                
                result.target.attack += 1
                if(result.side == "your"){
                    yourBoardDoms[result.i].children[0].children[5].style.animation = "none"
                    yourBoardDoms[result.i].children[0].children[5].offsetHeight
                    yourBoardDoms[result.i].children[0].children[5].style.animation = "statHeal 1s"
                }
                else {
                    enemyBoardDoms[result.i].children[0].children[5].style.animation = "none"
                    enemyBoardDoms[result.i].children[0].children[5].offsetHeight
                    enemyBoardDoms[result.i].children[0].children[5].style.animation = "statHeal 1s"
                }

                SendGameData(enemyGameParameters)
                SendGameData(yourGameParameters)
                
                DeleteSelectTargetMode()
            }
        }
        async function Feleles(){
            var targets = Array.from(yourBoard).concat(Array.from(enemyBoard))
            
            if(targets.some(element => element !== '')){
                selectableCardDoms = Array.from(yourBoardDoms).concat(Array.from(enemyBoardDoms))
                selectableCardDoms = selectableCardDoms
                
                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()
                var domID = result.i
                result.side == "your" ? domID = domID : domID += yourBoard.length
                
                var Sindex = targets[domID].fieldEffects.findIndex(element => element.includes('spellshield'));
                if(Sindex === -1){
                    result.target.bonusTraits.some(e => e.includes("diák")) ? DealDmg(result.target,result.i,5,result.side,"spell") : DealDmg(result.target,result.i,2,result.side,"spell")
                }
                else{
                    result.target.fieldEffects.splice(Sindex,1)
                }

                SendGameData(enemyGameParameters)
                SendGameData(yourGameParameters)
                
                DeleteSelectTargetMode()
            }
        }
        function Falanx(){
            for(let i = 5;i<yourBoard.length;i++){
                if(yourBoard[i] != "" && yourBoard[i-(yourBoard.length/2)] == ""){
                    var ko = {
                        attack: 0,
                        health: Math.ceil(2*turnCount/3),
                        type: "ko",
                        cost: 0
                    }
                    yourBoard[i-(yourBoard.length/2)] = ko
                }
            }
            SendGameData(yourGameParameters)
        }
        function IdeAManaddal(){
            if(enemyGameParameters.mana >= 2){
                enemyGameParameters.mana -= 2
                yourGameParameters.mana += 2
            }
            else{
                yourGameParameters.mana = enemyGameParameters.mana
                enemyGameParameters.mana = 0
            }
            SendGameData(enemyGameParameters)
            SendGameData(yourGameParameters)
        }
        function JavitoDolgozat(){
            yourHand.splice(Math.floor(Math.random() * yourHand.length),1)
            cardsInYourHandClass.pop()
            DrawOne()
            DrawOne()
            DrawOne()

            SendGameData(yourGameParameters)
        }
        function JegkremAzUdvaron(){
            yourBoard.forEach(element => {
                if(element != ""){
                    if(element.aligment.includes("tunya")){
                    yourGameParameters.mana += 1
                }
                }
            });
            SendGameData(yourGameParameters)
        }
        async function InstantMerevedes(){
            var targets = Array.from(yourBoard).concat(Array.from(enemyBoard))
            
            if(targets.some(element => element !== '')){
                selectableCardDoms = Array.from(yourBoardDoms).concat(Array.from(enemyBoardDoms))
                selectableCardDoms = selectableCardDoms
            
                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()
                var domID = result.i
                result.side == "your" ? domID = domID : domID += yourBoard.length
                
                var Sindex = targets[domID].fieldEffects.findIndex(element => element.includes('spellshield'));
                if(Sindex === -1){
                    result.target.type = "ko"
                    result.target.attack = 0
                }
                else{
                    result.target.fieldEffects.splice(Sindex,1)
                }
                
                SendGameData(yourGameParameters)
                SendGameData(enemyGameParameters)
            
                DeleteSelectTargetMode()
            }
        }
        async function Kaloda(){
            var targets = Array.from(yourBoard).concat(Array.from(enemyBoard))
            
            if(targets.some(element => element !== '')){
                selectableCardDoms = Array.from(yourBoardDoms).concat(Array.from(enemyBoardDoms))
                selectableCardDoms = selectableCardDoms
                
                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()
                var domID = result.i
                result.side == "your" ? domID = domID : domID += yourBoard.length
                
                var Sindex = targets[domID].fieldEffects.findIndex(element => element.includes('spellshield'));
                if(Sindex === -1){
                    SilenceEnemy(result.target,1,result.side)
                }
                else{
                    result.target.fieldEffects.splice(Sindex,1)
                }
                console.log("SPELLLOG: ",yourBoard);
                
                SendGameData(yourGameParameters)
                SendGameData(enemyGameParameters)
                
                DeleteSelectTargetMode()
            }
        }
        function KiosztjakADogat(){
            var random = yourGameParameters.remaningCards[Math.floor(Math.random() * yourGameParameters.remaningCards.length)]
            VisualAnimationEnabler(random)
            var randomDmg = random.cost
            for(let i=0; i<enemyBoard.length;i++){
                enemyBoard[i] != "" ? DealDmg(enemyBoard[i],i,randomDmg,"enemy","spell") : {}
            }
            
        }
        async function Kiteres(){
            var targets = Array.from(yourBoard)
            
            if(targets.some(element => element !== '')){
                for(let i = 0; i<targets.length; i++){
                    if(targets[i] != ''){
                        selectableCardDoms.push(yourBoardDoms[i])
                    }
                }
                selectableCardDoms = selectableCardDoms
            
                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()
                var domID = result.i

                SummonLocationChoosing(result.target)
                yourBoard[domID] = ""

                SendGameData(yourGameParameters)
            
                DeleteSelectTargetMode()
            }
        }
        function Kommunizmus(){
            for(let i = 0;i<yourBoard.length;i++){
                if(yourBoard[i] != ""){
                    yourBoard[i].health = 1
                    yourBoardDoms[i].children[0].children[6].style.animation = "none"
                    yourBoardDoms[i].children[0].children[6].offsetHeight
                    yourBoardDoms[i].children[0].children[6].style.animation = "statDmg 1s"
                }
                if(enemyBoard[i] != ""){
                    enemyBoard[i].health = 1
                    enemyBoardDoms[i].children[0].children[6].style.animation = "none"
                    enemyBoardDoms[i].children[0].children[6].offsetHeight
                    enemyBoardDoms[i].children[0].children[6].style.animation = "statDmg 1s"
                }
            }
        }
        function Leltarazas(){
            for(let i = 0;i<yourBoard.length;i++){
                if(yourBoard[i] != ""){
                    var Sindex = yourBoard[i].fieldEffects.findIndex(element => element.includes('spellshield'));
                    if(Sindex === -1){
                        yourBoard[i].fieldEffects.push("silence:1")
                        DealDmg(yourBoard[i],i,99999,"your")
                        DrawOne()
                        DrawOne()
                        DrawOne()
                    }
                    else{
                        yourBoard[i].fieldEffects.splice(Sindex,1)
                    }
                }
            }
        }
        async function Lyukasora(card){
            var isParagi = yourBoard.some(e=>e.name == "Paragi")
            if(isParagi){
                var targets = Array.from(yourBoard)
            
                if(targets.some(element => element !== '')){
                    for(let i = 0; i<targets.length; i++){
                        if(targets[i] != ''){
                            selectableCardDoms.push(yourBoardDoms[i])
                        }
                    }
                    selectableCardDoms = selectableCardDoms
                
                    EnableTargetSelectionMode(targets)
                    const result = await getUserChoice()
                    var domID = result.i
                    
                    Heal(result.target,yourBoardDoms[domID],3,"your")

                    var frozen = result.target.fieldEffects.findIndex(e => e.includes("frozen"))
                    var stunn = result.target.fieldEffects.findIndex(e => e.includes("stunn"))
                    var silence = result.target.fieldEffects.findIndex(e => e.includes("silence"))
                    var bomba = result.target.fieldEffects.findIndex(e => e.includes("bomba"))
                    frozen != -1 ? result.target.fieldEffects.splice(frozen,1) : {}
                    stunn != -1 ? result.target.fieldEffects.splice(stunn,1) : {}
                    silence != -1 ? result.target.fieldEffects.splice(silence,1) : {}
                    bomba != -1 ? result.target.fieldEffects.splice(bomba,1) : {}

                    SendGameData(yourGameParameters)
                    DeleteSelectTargetMode()
                }
            }
            else{
                var Lyukas1 = Object.assign({}, Cards.lyukasoraCard)
                var Lyukas2 = Object.assign({}, Cards.lyukasoraCard)
                Lyukas1.description = "Levesz minden gyengítő hatást egy szabadon választott térfeleden lévő célpontról."
                Lyukas2.description = "Gyógyít 3 életerőpontot egy szabadon választott térfeleden lévő célpontról."
                EnableChoosingMode([Lyukas1,Lyukas2])
                const result = await getUserChoice();
                DeleteChoosingMode()


                var targets = Array.from(yourBoard)
            
                if(targets.some(element => element !== '')){
                    for(let i = 0; i<targets.length; i++){
                        if(targets[i] != ''){
                            selectableCardDoms.push(yourBoardDoms[i])
                        }
                    }
                    selectableCardDoms = selectableCardDoms
                
                    EnableTargetSelectionMode(targets)
                    const result = await getUserChoice()
                    var domID = result.i
                    
                    if(result.description == Lyukas1.description){
                        Heal(result.target,yourBoardDoms[domID],3,"your")
                    }
                    else{
                        var frozen = result.target.fieldEffects.findIndex(e => e.includes("frozen"))
                        var stunn = result.target.fieldEffects.findIndex(e => e.includes("stunn"))
                        var silence = result.target.fieldEffects.findIndex(e => e.includes("silence"))
                        var bomba = result.target.fieldEffects.findIndex(e => e.includes("bomba"))
                        frozen != -1 ? result.target.fieldEffects.splice(frozen,1) : {}
                        stunn != -1 ? result.target.fieldEffects.splice(stunn,1) : {}
                        silence != -1 ? result.target.fieldEffects.splice(silence,1) : {}
                        bomba != -1 ? result.target.fieldEffects.splice(bomba,1) : {}
                    }   
                    DeleteSelectTargetMode()
                }
                
            }
            
            SendGameData(yourGameParameters)
        
        }
        function GOsztalyEltorlese(){
            for(let i=0;i<enemyBoard.length;i++){
                enemyBoard[i] != "" ? DealDmg(enemyBoard[i],i,99999,"enemy") : {}
            }
        }
        function Gravitacio(){
            for(let i= 0;i<enemyBoard.length/2;i++){
                if(enemyBoard[i] != ""){
                    if(enemyBoard[i+5] != ""){
                        DealDmg(enemyBoard[i+5],i+5,9999999,"enemy")
                    }
                    else{
                        if(i%5 != 4){
                            DealDmg(enemyBoard[i+1],i+1,Math.floor(enemyBoard[i].health/2),"enemy")
                        }
                        if(i%5 != 0){
                            DealDmg(enemyBoard[i-1],i-1,Math.floor(enemyBoard[i].health/2),"enemy")
                        }
                    }
                    enemyBoard[i+5] = enemyBoard[i]
                    enemyBoard[i] = ""
                }
                
            }
            SendGameData(enemyGameParameters)
        }
        async function Metamorfozis(){
            var targets = Array.from(yourBoard)
            
            if(targets.some(element => element !== '')){
                for(let i = 0; i<targets.length; i++){
                    if(targets[i] != ''){
                        selectableCardDoms.push(yourBoardDoms[i])
                    }
                }
                selectableCardDoms = selectableCardDoms
            
                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()
                var domID = result.i
            
                Evolve(result.target,result.i,1)
                var fleetMeta = Cards.metamorfozisCard
                fleetMeta.name = "Elillanó metamorfózis"
                yourHand.push(fleetMeta)
                cardsInYourHandClass.push("cardTemplate")

                SendGameData(yourGameParameters)
            
                DeleteSelectTargetMode()
            }
        }
        async function Mitózis(){
            var targets = Array.from(yourBoard)
            
            if(targets.some(element => element !== '')){
                for(let i = 0; i<targets.length; i++){
                    if(targets[i] != ''){
                        selectableCardDoms.push(yourBoardDoms[i])
                    }
                }
                selectableCardDoms = selectableCardDoms
            
                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()
                var domID = result.i
                

                SummonLocationChoosing(result.target)
                

                SendGameData(yourGameParameters)
            
                DeleteSelectTargetMode()
            }
        }
        function Mezeskalacs(){
            for(let j=0;j<yourBoard.length;j++){
                if(yourBoard[j].type == "ko"){
                    var mezesKo = {
                        attack: 0,
                        health: Math.ceil(2*turnCount/3),
                        type: "ko",
                        cost: 0,
                        abilityType: "onturnend",
                        ability: "MezeskalacsKo",
                        fieldEffects: []
                    }
                    
                    yourBoard[j] = mezesKo
                }
            }
        }
        async function Nagytestver(){
            var targets = Array.from(yourBoard).concat(Array.from(enemyBoard))
            
            if(targets.some(element => element !== '')){
                selectableCardDoms = Array.from(yourBoardDoms).concat(Array.from(enemyBoardDoms))
                selectableCardDoms = selectableCardDoms
                
                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()
                var domID = result.i
                result.side == "your" ? domID = domID : domID += yourBoard.length
                
                var numberOfUnits
                targets.forEach(element => {
                    element != "" ? numberOfUnits++ : {}
                })
                result.target.attack += numberOfUnits
                if(result.side == "your"){
                    yourBoardDoms[result.i].children[0].children[5].style.animation = "none"
                    yourBoardDoms[result.i].children[0].children[5].offsetHeight
                    yourBoardDoms[result.i].children[0].children[5].style.animation = "statHeal 1s"
                }
                else {
                    enemyBoardDoms[result.i].children[0].children[5].style.animation = "none"
                    enemyBoardDoms[result.i].children[0].children[5].offsetHeight
                    enemyBoardDoms[result.i].children[0].children[5].style.animation = "statHeal 1s"
                }

                SendGameData(enemyGameParameters)
                SendGameData(yourGameParameters)
                
                DeleteSelectTargetMode()
            }
        }
        function NemSzelloztettek(){
            for(let i= 0; i<enemyBoard.length;i++){
                enemyBoard[i] != "" ? DealDmg(enemyBoard[i],i,1,"enemy","spell") : {}
            }
            DmgEnemyPlayer(1)
            SendGameData(enemyGameParameters)
        }
        function NemTudod(){
            for(let i = 0;i<enemyBoard.length;i++){
                if(enemyBoard[i] != ""){
                    var preHealth = enemyBoard[i].health
                    DealDmg(enemyBoard[i],i,1,"enemy","spell")
                    if(preHealth == 1){
                        setTimeout(() => {
                        NemTudod()
                    }, 1000);
                        
                    }
                }
            }
        }
        function NincsFutes(){
            for(let i=0;i<enemyBoard.length;i++){
                if(enemyBoard[i] != ""){
                    var Sindex = enemyBoard[i].fieldEffects.findIndex(element => element.includes('spellshield'));
                    if(Sindex === -1){
                        FreezEnemy(enemyBoard[i],enemyBoardDoms[i],1,"enemy")
                    }
                    else{
                        result.target.fieldEffects.splice(Sindex,1)
                    }
                }
            }
        }
        async function NokedliLeszel(){
            var targets = Array.from(yourBoard).concat(Array.from(enemyBoard))
            
            if(targets.some(element => element !== '')){
                selectableCardDoms = Array.from(yourBoardDoms).concat(Array.from(enemyBoardDoms))
                selectableCardDoms = selectableCardDoms
                console.log("SELECTABLELOG: ",selectableCardDoms)
            
                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()
                var domID = result.i
                result.side == "your" ? domID = domID : domID += yourBoard.length
                
                var Sindex = targets[domID].fieldEffects.findIndex(element => element.includes('spellshield'));
                if(Sindex === -1){
                    eval(`${result.side}Board[result.i] = Cards.NokedliCard`)
                    eval(`${result.side}Board[result.i].fieldEffects.push('asleep:')`)
                }
                else{
                    result.target.fieldEffects.splice(Sindex,1)
                }
            
                SendGameData(yourGameParameters)
                SendGameData(enemyGameParameters)
            
                DeleteSelectTargetMode()
            }
        }
        async function NokedliVagy(){
            var targets = []
            for(let i=0;i<yourBoard.length;i++){
                if(yourBoard[i].attack <= 4){
                    targets.push(yourBoard[i])
                }
                if(enemyBoard[i].attack <= 4){
                    targets.push(enemyBoard[i])
                }
            }
            
            if(targets.some(element => element !== '')){
                for(let i=0;i<yourBoard.length;i++){
                    if(yourBoard[i].attack <= 4){
                        selectableCardDoms.push(yourBoardDoms[i])
                    }
                    if(enemyBoard[i].attack <= 4){
                        selectableCardDoms.push(enemyBoardDoms[i])
                    }
                }
                selectableCardDoms = selectableCardDoms
            
                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()
                var domID = result.i
                result.side == 'your' ? domID = domID : domID += yourBoard.length

                var Sindex = result.target.fieldEffects.findIndex(element => element.includes('spellshield'));
                if(Sindex === -1){
                    result.target.fieldEffects.push("silence:1")
                    DealDmg(result.target,result.i,99999,result.side)
                    
                }
                else{
                    result.target.fieldEffects.splice(Sindex,1)
                }
            
                SendGameData(yourGameParameters)
                SendGameData(enemyGameParameters)
            
                DeleteSelectTargetMode()
            }
        }
        function Osztalytalalkozo(){
            var oregCandid = []
            
            Cards.allCardsArr.forEach(element => {
                element.bonusTraits.some(e => e == "öreg ságváris") ? oregCandid.push(element) : {}
            });
            if(orgCandid != []){
                yourHand.push(oregCandid[Math.floor(Math.random() * oregCandid.length)])
                cardsInYourHandClass.push("cardTemplate")

                SendGameData(yourGameParameters)
            }
        }
        function PalacsintaFesz(){
            for(let i =0;i<yourBoard.length;i++){
                if(yourBoard[i] != ""){
                    Heal(yourBoard[i],yourBoardDoms[i],2,"your")
                }
            }
        }
        async function PirosLampa(){
            var targets = Array.from(enemyBoard)
            
            if(targets.some(element => element !== '')){
                for(let i = 0; i<targets.length; i++){
                    if(targets[i] != ''){
                        selectableCardDoms.push(enemyBoardDoms[i])
                    }
                }
                selectableCardDoms = selectableCardDoms
            
                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()
                var domID = result.i
            
                var Sindex = targets[domID].fieldEffects.findIndex(element => element.includes('spellshield'));
                if(Sindex === -1){
                    StunnEnemy(result.target,1,result.side)
                }
                else{
                    result.target.fieldEffects.splice(Sindex,1)
                }

                SendGameData(enemyGameParameters)
            
                DeleteSelectTargetMode()
            }
        }
        function Puskazas(){
            isInChoosingMode = true
            isInChoosingMode = isInChoosingMode
            cardChoosingModeOptions = Array.from(enemyGameParameters.remaningDeck).slice(-5)
            cardChoosingModeOptions = cardChoosingModeOptions
            setTimeout(() => {
                isInChoosingMode = false
                isInChoosingMode = isInChoosingMode
                cardChoosingModeOptions = []
                cardChoosingModeOptions = cardChoosingModeOptions
            },5000)
        }
        function Rng(){
            var targets = []
            for(let i=0;i<enemyBoard.length;i++){
                if(enemyBoard[i] != ""){
                    targets.push(i)
                }
            }
            targets.push(enemyGameParameters)
            
            function dmg(){
                let random = targets[Math.floor(Math.random()*targets.length)]
                if(random.type == "character" || random.type == "ko"){
                    var Sindex = enemyBoard[random].fieldEffects.findIndex(element => element.includes('spellshield'));
                    if(Sindex !== -1){
                        DealDmg(enemyBoard[random],random1,1,"enemy","spell")
                    }
                    else{
                        enemyBoard[random].fieldEffects.splice(Sindex,1)
                    }
                }
                else{
                    DmgEnemyPlayer(1)
                }
            }
            for(let i=0;i<3;i++){
                setTimeout(() => {
                    dmg()
                },700)
            }
            
        }
        async function SagvarizmusEjszakaja(){
            var targets = Array.from(yourBoard)
            
            if(targets.some(element => element !== '')){
                for(let i = 0; i<targets.length; i++){
                    if(targets[i] != ''){
                        selectableCardDoms.push(yourBoardDoms[i])
                    }
                }
                selectableCardDoms = selectableCardDoms
            
                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()
                var domID = result.i
            
                var Sindex = targets[domID].fieldEffects.findIndex(element => element.includes('spellshield'));
                if(Sindex === -1){
                    result.target.attack *= 2
                    yourBoardDoms[result.i].children[0].children[5].style.animation = "none"
                    yourBoardDoms[result.i].children[0].children[5].offsetHeight
                    yourBoardDoms[result.i].children[0].children[5].style.animation = "statHeal 1s"
                }
                else{
                    result.target.fieldEffects.splice(Sindex,1)
                }

                SendGameData(yourGameParameters)
            
                DeleteSelectTargetMode()
            }
        }
        function SaraSzurkolotabor(){
            for(let i = 0;i<yourBoard.length;i++){
                if(yourBoard[i] != ""){
                    yourBoard[i].health += 1
                    yourBoard[i].maxhealth += 1
                    yourBoard[i].attack += 1

                    yourBoardDoms[i].children[0].children[6].style.animation = "none"
                    yourBoardDoms[i].children[0].children[6].offsetHeight
                    yourBoardDoms[i].children[0].children[6].style.animation = "statDmg 1s"
                    yourBoardDoms[i].children[0].children[5].style.animation = "none"
                    yourBoardDoms[i].children[0].children[5].offsetHeight
                    yourBoardDoms[i].children[0].children[5].style.animation = "statDmg 1s"
                }
            }
        }
        function SaraToborzas(){
            DrawOne()
            DrawOne()
            SendGameData(yourGameParameters)
        }
        function Sitabor(){
            for(let i=0;i<yourBoard.length;i++){
                if(yourBoard[i] != ""){
                    if(yourBoard[i].aligment.includes("tunya")){
                    Evolve(yourBoard[i].cost,i,1)
                    }
                }
            }
        }
        function SportSzelet(){
            yourGameParameters.mana += 1
            SendGameData(yourGameParameters)
        }
        async function Szoborfaragas(card){
            var isParagi = yourBoard.some(e=>e.name == "Paragi")
            if(isParagi){
                CreateSGEndre()
                ShuffleIntoDeck(Cards.szoborfaragasCard)
            }
            else{
                var choice1 = Cards.szoborfaragasCard
                var choice2 = Cards.szoborfaragasCard
                choice1.description = "Készíts egy <b>'Ságvári Endre szobor'</b> kártyát a térfeledre "
                choice2.description = "Keverj három <b>'Szoborfaragás'</b> kártyát a paklidba"
                EnableChoosingMode([choice1,choice2])
                const result = await getUserChoice();
                console.log("CHOOSELOG: ",result);
                if(choice1.description == result.description){
                    CreateSGEndre()
                }
                else{
                    ShuffleIntoDeck(Cards.szoborfaragasCard)
                }
                
                SendGameData(yourGameParameters)
                
                DeleteChoosingMode()
            }
        }
        function TanariErtekezlet(){
            yourGameParameters.yourBuildings.push(Cards.TanariSzobaCard)
            SendGameData(yourGameParameters)
        }
        function Tanevnyito(){
            for(let i= 0; i<yourBoard.length;i++){
                yourBoard[i] != "" ? Evolve(yourBoard[i],i,1) : {}
            }
        }
        function TelenSzelloztetnek(){
            for(let i=0;i<enemyBoard.length;i++){
                if(enemyBoard[i] != ""){
                    var Sindex = enemyBoard[i].fieldEffects.findIndex(element => element.includes('spellshield'));
                    if(Sindex === -1){
                        FreezEnemy(enemyBoard[i],enemyBoardDoms[i],1,"enemy")
                        DealDmg(enemyBoard[i],i,3,"enemy","spell")
                    }
                    else{
                        enemyBoard[i].fieldEffects.splice(Sindex,1)
                    }
                }
            }
        }
        async function Tuzgolyo(){
            var targets = Array.from(yourBoard).concat(Array.from(enemyBoard))
            targets.push(enemyGameParameters)
            if(targets.some(element => element !== '')){
                selectableCardDoms = Array.from(yourBoardDoms).concat(Array.from(enemyBoardDoms))
                selectableCardDoms.push(enemyPlayerNameDom)
                selectableCardDoms = selectableCardDoms
            
                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()
                if(result.target.type == "player"){
                    DmgEnemyPlayer(4)
                }
                else{
                    var domID = result.i
                    result.side == 'your' ? domID = domID : domID += yourBoard.length
                    
                    var Sindex = targets[domID].fieldEffects.findIndex(element => element.includes('spellshield'));
                    if(Sindex === -1){
                        DealDmg(result.target,result.i,4,result.side,"spell")
                    }
                    else{
                        result.target.fieldEffects.splice(Sindex,1)
                    }
                }
                SendGameData(yourGameParameters)
                SendGameData(enemyGameParameters)
            
                DeleteSelectTargetMode()
            }
        }
        async function Meteor(){
            var targets = Array.from(enemyBoard)
            
            if(targets.some(element => element !== '')){
                for(let i = 0; i<targets.length; i++){
                    if(targets[i] != ''){
                        selectableCardDoms.push(enemyBoardDoms[i])
                    }
                }
                selectableCardDoms = selectableCardDoms
            
                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()
                var domID = result.i
                
                //target
                var Sindex = targets[domID].fieldEffects.findIndex(element => element.includes('spellshield'));
                if(Sindex === -1){
                    DealDmg(result.target,result.i,5,result.side,"spell")
                }
                else{
                    result.target.fieldEffects.splice(Sindex,1)
                }

                //sides
                if(domID%5 != 4){ //ha a szélén van akkor ne menjen tovább, jobbral + balról is if
                    if(enemyBoard[domID+1] != ""){
                        var Sindex2 = targets[domID+1].fieldEffects.findIndex(element => element.includes('spellshield'));
                        if(Sindex2 === -1){
                            DealDmg(enemyBoard[domID+1],result.i+1,5,result.side,"spell")
                        }
                        else{
                            enemyBoard[domID+1].fieldEffects.splice(Sindex,1)
                        }
                    }
                }
                if(domID%5 != 0){
                    if(enemyBoard[domID-1] != ""){
                        var Sindex3 = targets[domID-1].fieldEffects.findIndex(element => element.includes('spellshield'));
                        if(Sindex3 === -1){
                            DealDmg(enemyBoard[domID-1],result.i-1,5,result.side,"spell")
                        }
                        else{
                            enemyBoard[domID-1].fieldEffects.splice(Sindex,1)
                        }
                    }
                    
                } 
            
                SendGameData(enemyGameParameters)
            
                DeleteSelectTargetMode()
            }
        }
        async function Varazskoponyeg(){
            var targets = Array.from(yourBoard).concat(Array.from(enemyBoard))
            
            if(targets.some(element => element !== '')){
                selectableCardDoms = Array.from(yourBoardDoms).concat(Array.from(enemyBoardDoms))
                selectableCardDoms = selectableCardDoms
                
                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()
                var domID = result.i
                result.side == "your" ? domID = domID : domID += yourBoard.length
                
                var Sindex = targets[domID].fieldEffects.findIndex(element => element.includes('spellshield'));
                if(Sindex === -1){
                    result.target.fieldEffects.push("spellshield")
                }
                
                SendGameData(yourGameParameters)
                SendGameData(enemyGameParameters)
                
                DeleteSelectTargetMode()
            }
        }
        function Varazskotet(){
            var random = Math.floor(Math.random() * Cards.spellCardsArr.length)
            yourHand.push(spellCardsArr[random])
            cardsInYourHandClass.push("cardTemplate")
        }
        async function VisszaAKezembe(){
            var targets = Array.from(yourBoard)
            
            if(targets.some(element => element !== '')){
                for(let i = 0; i<targets.length; i++){
                    if(targets[i] != ''){
                        selectableCardDoms.push(yourBoardDoms[i])
                    }
                }
                selectableCardDoms = selectableCardDoms
            
                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()
                var domID = result.i

                var Sindex = targets[domID].fieldEffects.findIndex(element => element.includes('spellshield'));
                if(Sindex === -1){
                    yourBoard[result.i] = ""
                    var originalIndex = Cards.allCardsArr.findIndex(element => element.name == result.target.name);
                    yourHand.push(allCardsArr[originalIndex])
                    cardsInYourHandClass.push("cardTemplate")
                }
                else{
                    result.target.fieldEffects.splice(Sindex,1)
                }
            
                SendGameData(yourGameParameters)
            
                DeleteSelectTargetMode()
            }
        }
        //#endregion
        //#region EXTRA CHARACTERS
        async function Jeff(card){
            var isParagi = yourBoard.some(e=>e.name == "Paragi")
            if(isParagi){
                await waitForUpdate

                SummonLocationChoosing(Cards.BoldizsarCard)
                await waitForUpdate

                SummonLocationChoosing(Cards.DoloresCard)
                await waitForUpdate

                SummonLocationChoosing(Cards.DavidCard)
                await waitForUpdate

                SummonLocationChoosing(Cards.JennyCard)
            
            }
            else{
                EnableChoosingMode([Cards.BoldizsarCard,Cards.DoloresCard,Cards.DavidCard,Cards.JennyCard])
                const result = await getUserChoice();
                DeleteChoosingMode()

                SummonLocationChoosing(result)
                
            }
            card.ability = "JeffOnturnend"
            card.abilityType ="ontrunend"
            
            SendGameData(yourGameParameters)
        
        }
        function JeffOnturnend(){
            for(let i=0;i<yourBoard.length;i++){
                yourBOard[i].bonusTraits.some(e=>e.includes("sportos")) ? Heal(yourBoard[i],yourBoardDoms[i],2,"your") : {}
            }
        }
        let sutik = [Cards.rakocziTurosCard,Cards.banankenyerCard,Cards.csokitortaCard,Cards.dobostortaCard,Cards.piskotatekercsCard]
        function Dolores(){
            yourHand.push(sutik[Math.floor(Math.random()*sutik.length)])
            cardsInYourHandClass.push("cardTemplate")

            yourHand = yourHand
            SendGameData(yourGameParameters)
        
        }
        function Charmander(){
            yourHand.push(Cards.CharmanderLangjaCard)
            cardsInYourHandClass.push("cardTemplate")

            yourHand = yourHand
            SendGameData(yourGameParameters)
        }
        function Carmeleon(){
            yourHand.push(Cards.CharmeleonLangjaCard)
            cardsInYourHandClass.push("cardTemplate")

            yourHand = yourHand
            SendGameData(yourGameParameters)
        }
        function Charizard(card){
            yourHand.push(Cards.CharizardLangjaCard)
            cardsInYourHandClass.push("cardTemplate")

            yourHand = yourHand
            SendGameData(yourGameParameters)
        }
        function MegaCharizardX(card){
            yourHand.push(Cards.MegaCharizardXLangjaCard)
            cardsInYourHandClass.push("cardTemplate")

            yourHand = yourHand
            SendGameData(yourGameParameters)
        }
        function FeherNo(card,i){
            if(yourBoard[i+1].fieldEffects(e => e == "fiú") && yourBoard[i-1].fieldEffects(e => e == "fiú")){
                yourBoard[i].attack += 3
                yourBoard[i].health += 3
                yourBoard[i].maxhealth += 3

                yourBoardDoms[i].children[0].children[6].style.animation = "none"
                yourBoardDoms[i].children[0].children[6].offsetHeight
                yourBoardDoms[i].children[0].children[6].style.animation = "statHeal 1s"

                yourBoardDoms[i].children[0].children[5].style.animation = "none"
                yourBoardDoms[i].children[0].children[5].offsetHeight
                yourBoardDoms[i].children[0].children[5].style.animation = "statHeal 1s"

                SendGameData(yourGameParameters)
            }
            card.ability = "FeherNoBoardcon"
            FeherNoBoardcon(card,i)
        }
        async function FeherNoBoardcon(card,i){
            var isMrsFarkas = yourBoard[i+1].fieldEffects(e => e == "fiú") && yourBoard[i-1].fieldEffects(e => e == "fiú")
            console.log("BOARDCON pre: ",isMrsFarkas)
            SendGameData(yourGameParameters)

            await waitForUpdate

            var isMrsFarkasNew = yourBoard[i+1].fieldEffects(e => e == "fiú") && yourBoard[i-1].fieldEffects(e => e == "fiú")
            if(isMrsFarkasNew){
                if(yourBoard[i+1].health <= 0){isMrsFarkasNew = false}
                if(yourBoard[i-1].health <= 0){isMrsFarkasNew = false}
            }
            console.log("BOARDCON pre: ",isMrsFarkasNew)

            if(isMrsFarkas == true && isMrsFarkasNew == false){
                yourBoard[i].attack -= 3
                DealDmg(yourBoard[i],i,3,"your")

                yourBoardDoms[i].children[0].children[5].style.animation = "none"
                yourBoardDoms[i].children[0].children[5].offsetHeight
                yourBoardDoms[i].children[0].children[5].style.animation = "statDmg 1s"

                SendGameData(yourGameParameters)
            }
            else if(isMrsFarkas == false && isMrsFarkasNew == true){
                yourBoard[i].attack += 3
                yourBoard[i].health += 3
                yourBoard[i].maxhealth += 3

                yourBoardDoms[i].children[0].children[6].style.animation = "none"
                yourBoardDoms[i].children[0].children[6].offsetHeight
                yourBoardDoms[i].children[0].children[6].style.animation = "statHeal 1s"

                yourBoardDoms[i].children[0].children[5].style.animation = "none"
                yourBoardDoms[i].children[0].children[5].offsetHeight
                yourBoardDoms[i].children[0].children[5].style.animation = "statHeal 1s"

                SendGameData(yourGameParameters)
            }
            console.log("BOARDCON VÉGE")
            SendGameData(yourGameParameters)
            var isMrFarkas = yourBoard.some(element => element.name == "Apró Fehér Nő")
            isMrFarkas == true ? FeherNoBoardcon(card,i) : {}
            
        }

        function BufesMoni(){
            yourGameParameters.yourBuildings.push(Cards.BufeCard)
            SendGameData(yourGameParameters)
        }
        function Erzsi(){
            yourGameParameters.yourBuildings.push(Cards.PortaCard)
            SendGameData(yourGameParameters)
        }
        //#endregion
        //#region EXTRA SPELLS
        async function PiskotaTekercs(){
            var targets = Array.from(yourBoard)
            
            if(targets.some(element => element !== '')){
                selectableCardDoms = Array.from(yourBoardDoms)
                selectableCardDoms = selectableCardDoms
                
                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()
                var domID = result.i
                
                Evolve(result.target,result.i,2)
                
                
                DeleteSelectTargetMode()
            }
        }
        async function Dobostorta(){
            var targets = Array.from(yourBoard)
            
            if(targets.some(element => element !== '')){
                selectableCardDoms = Array.from(yourBoardDoms)
                selectableCardDoms = selectableCardDoms
                
                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()
                var domID = result.i
                
                result.target.fieldEffects.some(e => e != "spellShield") ? result.target.fieldEffects.push("spellShield") : {}
                
                SendGameData(yourGameParameters)
                
                DeleteSelectTargetMode()
            }
        }
        async function Csokitorta(){
            var targets = Array.from(yourBoard)
            
            if(targets.some(element => element !== '')){
                selectableCardDoms = Array.from(yourBoardDoms)
                selectableCardDoms = selectableCardDoms
                
                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()
                var domID = result.i
                
                result.target.fieldEffects.some(e => e != "barrier") ? result.target.fieldEffects.push("barrier") : {}
                
                SendGameData(yourGameParameters)
                
                DeleteSelectTargetMode()
            }
        }
        async function BananKenyer(){
            var targets = Array.from(yourBoard)
            
            if(targets.some(element => element !== '')){
                selectableCardDoms = Array.from(yourBoardDoms)
                selectableCardDoms = selectableCardDoms
                
                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()
                var domID = result.i
                
                result.target.attack += 2
                yourBoardDoms[result.i].children[0].children[5].style.animation = "none"
                yourBoardDoms[result.i].children[0].children[5].offsetHeight
                yourBoardDoms[result.i].children[0].children[5].style.animation = "statHeal 1s"
                
                SendGameData(yourGameParameters)
                
                DeleteSelectTargetMode()
            }
        }
        async function RakocziTuros(){
            var targets = Array.from(yourBoard)
            
            if(targets.some(element => element !== '')){
                selectableCardDoms = Array.from(yourBoardDoms)
                selectableCardDoms = selectableCardDoms
                
                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()
                var domID = result.i
                
                result.target.attack += 2
                
                
                SendGameData(yourGameParameters)
                
                DeleteSelectTargetMode()
            }
        }

        async function CharmanderLangja(){
            var targets = Array.from(yourBoard).concat(Array.from(enemyBoard))
            targets.push(enemyGameParameters)
            if(targets.some(element => element !== '')){
                selectableCardDoms = Array.from(yourBoardDoms).concat(Array.from(enemyBoardDoms))
                selectableCardDoms.push(enemyPlayerNameDom)
                selectableCardDoms = selectableCardDoms
            
                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()
                if(result.target.type == "player"){
                    DmgEnemyPlayer(5)
                }
                else{
                    var domID = result.i
                    result.side == 'your' ? domID = domID : domID += yourBoard.length
                    
                    var Sindex = targets[domID].fieldEffects.findIndex(element => element.includes('spellshield'));
                    if(Sindex === -1){
                        DealDmg(result.target,result.i,5,result.side,"spell")
                    }
                    else{
                        result.target.fieldEffects.splice(Sindex,1)
                    }
                }
                SendGameData(yourGameParameters)
                SendGameData(enemyGameParameters)
            
                DeleteSelectTargetMode()
            }
        }
        async function CharmeleonLangja(){
            var targets = Array.from(yourBoard).concat(Array.from(enemyBoard))
            targets.push(enemyGameParameters)
            if(targets.some(element => element !== '')){
                selectableCardDoms = Array.from(yourBoardDoms).concat(Array.from(enemyBoardDoms))
                selectableCardDoms.push(enemyPlayerNameDom)
                selectableCardDoms = selectableCardDoms
            
                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()
                if(result.target.type == "player"){
                    DmgEnemyPlayer(5)
                }
                else{
                    var domID = result.i
                    result.side == 'your' ? domID = domID : domID += yourBoard.length
                    
                    var Sindex = targets[domID].fieldEffects.findIndex(element => element.includes('spellshield'));
                    if(Sindex === -1){
                        DealDmg(result.target,result.i,5,result.side,"spell")
                    }
                    else{
                        result.target.fieldEffects.splice(Sindex,1)
                    }
                }
                SendGameData(yourGameParameters)
                SendGameData(enemyGameParameters)
            
                DeleteSelectTargetMode()
            }
        }
        async function CharizardLangja(){
            var targets = Array.from(yourBoard).concat(Array.from(enemyBoard))
            targets.push(enemyGameParameters)
            if(targets.some(element => element !== '')){
                selectableCardDoms = Array.from(yourBoardDoms).concat(Array.from(enemyBoardDoms))
                selectableCardDoms.push(enemyPlayerNameDom)
                selectableCardDoms = selectableCardDoms
            
                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()
                if(result.target.type == "player"){
                    DmgEnemyPlayer(7)
                }
                else{
                    var domID = result.i
                    result.side == 'your' ? domID = domID : domID += yourBoard.length
                    
                    var Sindex = targets[domID].fieldEffects.findIndex(element => element.includes('spellshield'));
                    if(Sindex === -1){
                        DealDmg(result.target,result.i,7,result.side,"spell")
                    }
                    else{
                        result.target.fieldEffects.splice(Sindex,1)
                    }
                }
                SendGameData(yourGameParameters)
                SendGameData(enemyGameParameters)
            
                DeleteSelectTargetMode()
            }
        }
        async function MegaCharizardXLangja(){
            var targets = Array.from(yourBoard).concat(Array.from(enemyBoard))
            targets.push(enemyGameParameters)
            if(targets.some(element => element !== '')){
                selectableCardDoms = Array.from(yourBoardDoms).concat(Array.from(enemyBoardDoms))
                selectableCardDoms.push(enemyPlayerNameDom)
                selectableCardDoms = selectableCardDoms
            
                EnableTargetSelectionMode(targets)
                const result = await getUserChoice()
                if(result.target.type == "player"){
                    DmgEnemyPlayer(8)
                }
                else{
                    var domID = result.i
                    result.side == 'your' ? domID = domID : domID += yourBoard.length
                    
                    var Sindex = targets[domID].fieldEffects.findIndex(element => element.includes('spellshield'));
                    if(Sindex === -1){
                        DealDmg(result.target,result.i,7,result.side,"spell")
                    }
                    else{
                        result.target.fieldEffects.splice(Sindex,1)
                    }
                }
                SendGameData(yourGameParameters)
                SendGameData(enemyGameParameters)
            
                DeleteSelectTargetMode()
            }
        }

        let frenchCardNumbers = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"]
        let frenchCardPool = []
        for(let i=0;i<13;i++){
            frenchCardPool.push([cClub,frenchCardNumbers[i]])
            frenchCardPool.push([cHeart,frenchCardNumbers[i]])
            frenchCardPool.push([cDiamond,frenchCardNumbers[i]])
            frenchCardPool.push([cSpade,frenchCardNumbers[i]])
        }
        let pickedFrenchCard = []
        let szaszShuffle = false
        let frenchCardDom
        function PikkDama(){
            console.log("PICKLOG: benn")
            szaszShuffle = true
            szaszShuffle = szaszShuffle
            
            if(yourGameParameters.spellMana > 0 || yourGameParameters.mana > 0){
                if(yourGameParameters.spellMana > 0){
                    yourGameParameters.spellMana -= 1
                }
                else{
                    //yourGameParameters.mana -= 1
                }
                var randomCardI = Math.floor(Math.random()*frenchCardPool.length)
                var randomCard = frenchCardPool[randomCardI]
                frenchCardPool.splice(randomCardI,1)
                pickedFrenchCard.push({icon: randomCard[0],number: randomCard[1]})

                pickedFrenchCard = pickedFrenchCard
                console.log("DAMALOG: ",randomCard)
                if(randomCard[1] == "Q" && randomCard[0] == cSpade){
                    setTimeout(() => {
                    console.log("DAMALOG: PIKKDAMA OMG")
                    console.log("DAMALOG: ",`frenchCard${pickedFrenchCard.length-1}`);
                    var lastCardPikk =  document.getElementById(`frenchCard${pickedFrenchCard.length-1}`)
                   lastCardPikk.style.animation = "pikkDamaBingo 2s forwards"
                },100)
                    setTimeout(() => {
                        szaszShuffle = false
                        szaszShuffle = szaszShuffle
                        pickedFrenchCard = []

                        for(let i=0;i<yourHand.length;i++){
                            if(yourHand[i].name == "Szász Levente"){
                                yourHand[i].cost = 0
                            }
                        }
                    },2100)
                    
                }

                SendGameData(yourGameParameters)
            }
            else{
                szaszShuffle = false
                szaszShuffle = szaszShuffle
                pickedFrenchCard = []

                yourHand.push(Cards.pikkDamaCard)
                cardsInYourHandClass.push("cardTemplate")
            } 
        }
        function ClosePikkDamaTab(){
            
                szaszShuffle = false
                    szaszShuffle = szaszShuffle
                    pickedFrenchCard = []

                    yourHand.push(Cards.pikkDamaCard)
                    cardsInYourHandClass.push("cardTemplate")
                    yourHand = yourHand
                    SendGameData(yourGameParameters)
                
        }
        function Mag(){
            for(let i=0;i<yourBoard.length;i++){
                if(yourBoard[i] != ""){
                    yourBoard[i].bonusTraits.some(e => e.includes("humános")) ? Evolve(yourBoard[i],i,2) : {}
                }
            }
        }
        //#endregion
        
        //#region bonus functions
        function giveDobi(what){
            for(let i = 0; i<yourBoard.length;i++){
                if(yourBoard[i] != ""){
                if(yourBoard[i].name == "Dobi"){
                    eval(`yourBoard[i]${what}`)
                    
                    VisualAnimationEnabler(yourBoard[i])
                }
            }
            }

            for(let i = 0; i<yourGameParameters.remaningDeck.length;i++){
                if(yourGameParameters.remaningDeck[i].name == "Dobi"){
                    eval(`yourGameParameters.remaningDeck[i]${what}`)
                    
                    VisualAnimationEnabler(yourGameParameters.remaningDeck[i])
                    console.log(yourGameParameters.remaningDeck);
                }
            }
            for(let i = 0; i<yourHand.length;i++){
                if(yourHand[i].name == "Dobi"){
                    eval(`yyourHand[i]${what}`)
                    
                    VisualAnimationEnabler(yourHand[i])
                }
            }    
        }
        let SGEndreCounter = 0
        function CreateSGEndre(){
            SGEndreCounter += 1
            var newSGEndre = Cards.SGEndreCard

            newSGEndre.attack = SGEndreCounter
            newSGEndre.health = SGEndreCounter
            newSGEndre.cost = SGEndreCounter

            SummonLocationChoosing(newSGEndre)
        }
        function GiveAttack(card,cardDom,amount){
            card.attack += amount

            cardDom.children[0].children[5].style.animation = "none"
            cardDom.children[0].children[5].offsetHeight
            cardDom.children[0].children[5].style.animation = "statHeal 1s"

            var index = card.fieldEffects.findIndex(element => element.includes("frozen"));
            if(index !== -1){
                var preAttack = card.fieldEffects[index].substring(card.fieldEffects[index].indexOf("-")+1)
                card.fieldEffects[index] = `${card.fieldEffects[index].substring(card.fieldEffects[index].indexOf("-"),-1)}-${Number(preAttack)+amount}`
            }
            enemyBoard = enemyBoard
            SendGameData(enemyGameParameters)
        }
        function FreezEnemy(card,cardDom,turns,side){
            console.log("SPELLEKLOG: ",card,cardDom,turns)
            var index = card.fieldEffects.findIndex(element => element.includes("frozen"));
            if(index !== -1){
                var preTurns = card.fieldEffects[index].substring(card.fieldEffects[index].indexOf(":")+1,card.fieldEffects[index].indexOf("-"))
                var preAttackInd = card.fieldEffects[index].substring(card.fieldEffects[index].indexOf("-"))
                card.fieldEffects[index] = `frozen:${Number(preTurns)+turns}${preAttackInd}`

            }
            else{
                card.fieldEffects.push(`frozen:${turns}-${card.attack}`)
            }

            card.attack = 0

            cardDom.children[0].children[5].style.animation = "none"
            cardDom.children[0].children[5].offsetHeight
            cardDom.children[0].children[5].style.animation = "statDmg 1s"

            SendGameData(yourGameParameters)
            SendGameData(enemyGameParameters)
        }
        function StunnEnemy(card,turns,side){
            console.log("SPELLEKLOG: ",card,turns)
            var index = card.fieldEffects.findIndex(element => element.includes("stunned"));
            if(index !== -1){
                var preTurns = card.fieldEffects[index].substring(card.fieldEffects[index].indexOf(":")+1,card.fieldEffects[index].indexOf("-"))
                card.fieldEffects[index] = `stunned:${Number(preTurns)+turns}`

            }
            else{
                card.fieldEffects.push(`stunned:${turns}`)
            }
            SendGameData(yourGameParameters)
            SendGameData(enemyGameParameters)
        }
        function SilenceEnemy(card,turns,side){
            console.log("SPELLEKLOG: ",card,turns)
            var index = card.fieldEffects.findIndex(element => element.includes("silence"));
            if(index !== -1){
                var preTurns = card.fieldEffects[index].substring(card.fieldEffects[index].indexOf(":")+1,card.fieldEffects[index].indexOf("-"))
                card.fieldEffects[index] = `silence:${Number(preTurns)+turns}`

            }
            else{
                card.fieldEffects.push(`silenced:${turns}`)
            }
            SendGameData(yourGameParameters)
            SendGameData(enemyGameParameters)
        }
        function DealDmg(card,i,amount,side,source){
            if(card.type == "player" && side == "enemy"){
                DmgEnemyPlayer(amount)
                return
            }else{
                source == "spell" ? amount *= spellDmgMulti : {}
                card.health -= amount
                if(card.health <= 0){
                    CardDmgAnimationClient(`td${i}`,"halál",side,card.type)
                }
                else{
                    CardDmgAnimationClient(`td${i}`,"sebzés",side,card.type)
                }
            }
            
        }
        function Heal(card,dom,amount,side){
            if(card.health + amount > card.maxhealth ){
                card.health = card.maxhealth
                dom.children[6].style.animation = "none"
                dom.children[6].offsetHeight
                dom.children[6].style.animation = "statHeal 1s"
            }
            else if(card.health + amount < card.maxhealth){
                card.health += amount
                dom.children[6].style.animation = "none"
                dom.children[6].offsetHeight
                dom.children[6].style.animation = "statHeal 1s"
            }
            
            side == "your" ? SendGameData(yourGameParameters) : SendGameData(enemyGameParameters)
        }
        function Evolve(card,i,amount){
            var cost = card.cost
            var evolveCandidets = []
            Cards.allCardsArr.forEach(element => {
                element.cost == cost+amount && element.type == "character" ? evolveCandidets.push(element) : {}
            });
            var random = evolveCandidets[Math.floor(Math.random() * evolveCandidets.length)]
            random.talent.includes("fürge") == false ? random.fieldEffects.push("asleep:") : {}
            console.log("EVOLVELOG: ",random,evolveCandidets)
            if(card.name == "Szakonyi Marcell" && yourBoard.some(e => e == "")){
                function CheckPlaceing(index){
                    index == yourBoard.length ? index = 1 : {}
                    yourBoard[index] == "" ? yourBoard[index] = random : CheckPlaceing(index+1)
                }
                CheckPlaceing(i+1)
            }
            else{
                yourBoard[i] = random
            }
            
            if(yourBoard.some(e => e.name == "Németh Veronika")){
                ShuffleIntoDeck(Cards.tanevnyitoCard)
            }
            for(let i = 0; i<yourGameParameters.remaningDeck.length;i++){
                if(yourGameParameters.remaningDeck[i].name == "Szász Levente"){
                    yourGameParameters.remaningDeck[i].cost += 1
                    yourGameParameters.remaningDeck[i].attack += 2
                    yourGameParameters.remaningDeck[i].health += 1
                    yourGameParameters.remaningDeck[i].maxhealth += 1
                    VisualAnimationEnabler(yourGameParameters.remaningDeck[i])
                }
            }
            for(let i = 0; i<yourHand.length;i++){
                if(yourHand[i].name == "Szász Levente"){
                    yourHand[i].cost += 1
                    yourHand[i].attack += 2
                    yourHand[i].health += 1
                    yourHand[i].maxhealth += 1
                    VisualAnimationEnabler(yourHand[i])
                }
            }    
            SendGameData(yourGameParameters)
        }
        function ShuffleIntoDeck(card){
            const randomIndex = Math.floor(Math.random() * (yourGameParameters.remaningDeck.length + 1));
            yourGameParameters.remaningDeck.splice(randomIndex, 0, card);
            SendGameData(yourGameParameters)
        }
        function SummonLocationChoosing(what){
            if(yourBoard.some(e => e =="")){
                SummoningLocation(true)

                yourBoardPhs.fill("")
                for (let i = 0; i<yourBoardPhs.length+1;i++){
                    if(yourBoard[i] == ""){
                        yourBoardPhs[i] = what
                    }
                }
                yourBoardPhs = yourBoardPhs
            }
            
        }
        //#endregion
        

    //#endregion
    function DmgEnemyPlayer(amount){
        enemyGameParameters.health -= amount
        SendGameData(enemyGameParameters)
        if(enemyGameParameters.health <= 0){
            setTimeout(() => {
                EndGame()
            }, 1000);
        }
    }

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

        yourBoard = yourGameParameters.yourBoard
        yourBoard = yourBoard

        yourGameParameters.yourBuildings = yourGameParameters.yourBuildings
        enemyGameParameters.yourBuildings = enemyGameParameters.yourBuildings

        yourGameParameters.secretSpells = yourGameParameters.secretSpells
        enemyGameParameters.secretSpells = enemyGameParameters.secretSpells
        console.log("SECRETLOG: ",yourGameParameters.secretSpells, secretHoverState)
        
    }
    let isWinScreen = false
    let isYourWin = false
    let winLogo = defeat
    function EndGameEvent(event){
        event.data == "victory" ? isYourWin = true : isYourWin = false
        isYourWin = isYourWin

        isYourWin == true ? winLogo = win : winLogo = defeat
        winLogo = winLogo

        isWinScreen = true
        isWinScreen = isWinScreen

    }
    for(let i=1;i <30;i++){
        xpToLevelUp[i] = Math.ceil((100*i)**1.2)
    }
    console.log(xpToLevelUp)
    function GainXp(){  

        winNotes = true
        winNotes = winNotes
        setTimeout(() => {
            document.getElementById("gainsXP").style.animation = "gainsAnim 0.3s 0.5s forwards"
            document.getElementById("gainsGC").style.animation = "gainsAnim 0.3s 0.6s forwards"
            document.getElementById("gainsS").style.animation = "gainsAnim 0.3s 0.7s forwards"

            var winLogoDom = document.getElementById("winLogo")
            winLogoDom.style.animation = "none"
            winLogoDom.offsetHeight
            winLogoDom.style.animation = "winLogoShift 1s forwards"

            document.getElementById("winScreen").style.animation = "winScreenDarken 1s forwards"
        }, 100);
        
        function GainXpAnim(xp){
            if(gainedXp < xp){
                gainedXp++
                gainedXp = gainedXp
                setTimeout(() => {
                    GainXpAnim(xp)
                }, 10);
            }
        }
        function GainShardAnim(xp){
            if(gainedShards < xp){
                gainedShards++
                gainedShards = gainedShards
                setTimeout(() => {
                    GainShardAnim(xp)
                }, 10);
            }
        }
        function GainGCAnim(xp){
            if(gainedGachaCurrency < xp){
                gainedGachaCurrency++
                gainedGachaCurrency = gainedGachaCurrency
                setTimeout(() => {
                    GainGCAnim(xp)
                }, 10);
            }
        }

        if(isYourWin){
            GainXpAnim(100)
            setTimeout(() => {
                GainGCAnim(200)
            }, 900);
            setTimeout(() => {
                GainShardAnim(100) 
            }, 1800);
            
            
            localUserData.xp += 100
        }
        else{
            GainXpAnim(50)
            setTimeout(() => {
                GainGCAnim(50)
            }, 400);
            localUserData.xp += 50
        }       
        console.log("1: ",localUserData.xp)
        
        CheckLevelUp()
    }
    function CheckLevelUp(){
        if(localUserData.xp >= xpToLevelUp[Number(localUserData.level)]){
            localUserData.level = Number(localUserData.level + 1)
            //sendData("level",localUserData.level,localUserData.id,"account")
            LOGBarLength = "0%"
        }
        
        lBarLength = `${((localUserData.xp-xpToLevelUp[Number(localUserData.level)-1])/(xpToLevelUp[Number(localUserData.level)]-xpToLevelUp[Number(localUserData.level)-1]))*100}%`
        console.log("2: ",localUserData.xp,localUserData.level,(localUserData.xp-xpToLevelUp[Number(localUserData.level)-1]),lBarLength)

        setTimeout(() => {
            document.getElementById("levelBar").style.animation = "levelBarAnim 0.7s forwards"
        }, 500);
        //sendData("gachaCurrency",localUserData.gachaCurrency,localUserData.id,"account")
        //sendData("shards",localUserData.shards,localUserData.id,"account")
        //sendData("xp",localUserData.xp,localUserData.id,"account")
        localStorage.setItem("userData", JSON.stringify(localUserData));  
    }
</script>
{#if !pageLoaded}
<div id="loadingScreen">
  <img src={loadingScreen} alt="loading..." style="width: 15vw; display: block; margin-top:15%; margin-left:auto; margin-right:auto;">
  <h1 style="font-family: cursive; display: block; text-align:center;">LOADING...</h1>
</div>
{/if}

{#if isWinScreen}
    <div id="winScreen">
        <img src={winLogo} alt="idkmilettlmao" id="winLogo">
        {#if winNotes}
        <div id="winNotesCont">
            <div id="winNotes">
                <div id="profileCont">
                    <img id="profilePic" class="profilePicComp" src={profilePics[localUserData.profilPic-1]} alt="border">
                    <img id="profileBorder" class="profilePicComp" src={pBorders[localUserData.border-1]} alt="border">
                </div>
                <div id="profileName">{localUserData.username}</div>
                <div id="profileLevel">Szint: {localUserData.level}</div>
                <div id="profileXp">TP szintlépéshez: {xpToLevelUp[localUserData.level]-localUserData.xp}</div>
                <div id="levelCont">
                    <img class="levelBar" id="levelBarFg" src={levelBarBg} alt="level">
                    <div id="levelBar" style="--lBarLength: {lBarLength}; --LOGBarLength: {LOGBarLength}"></div>
                    <img class="levelBar" id="levelBarBg" src={levelBarFg} alt="level">
                </div>
                <div id="gainsCont">
                    <div id="gainsXP" style="opacity: 0;">TP: {gainedXp}</div>
                    <div id="gainsGC" style="opacity: 0;"><img class="gainedIcon" src={gachaCurrencyIcon} alt="GachaCurrency: ">  {gainedGachaCurrency}</div>
                    <div id="gainsS" style="opacity: 0;"><img class="gainedIcon" src={shardIcon} alt="Shard: ">  {gainedShards}</div>
                </div>
    
                <div class="optionButtonCont" style="filter:hue-rotate(-90deg);">
                    <div style="position: relative;">
                    <button class="optionButtonShadow"></button>
                    <button class="optionButton" on:click={() => GoToPage("../mainmenuScreen")}>Tovább</button>
                    </div>
                </div>
            </div>
        </div>
        {:else}
        <div id="winGoBackButton" style="filter:hue-rotate(-90deg);">
            <div style="position: relative;">
            <button class="optionButtonShadow"></button>
            <button class="optionButton" on:click={GainXp}>Tovább</button>
            </div>
        </div>
        {/if}
    </div>
{/if}

<div id="background"></div>
{#each allCardsInGame as card,i}
<audio controls id="music" style="display: none;"  src={card.audio}   bind:this={voicelines[card.name]}></audio>
{/each}

{#if isChooseStaringHandScreen}
    <div id="startingHandChooser">
        {#each startingHandTargets as option,i}
        <div id="cardChoosingModeCont">
            {#if option.type == "character"} 
                    <div class="previewInChoosingMode" on:click={() => SelectDeleteStartingCard([option,i])} on:keydown role="button" tabindex="">
                        <img draggable="false" class="cardTemplateChoosingMode" id="cardBackgroundChoosingMode" src={cardBackground} style="--colorr: {backgroundColorByCost[(option.stars)-3]};" alt="cardBg">
                        <div id="rarityBGChoosingMode" style="background: {backgroundColorByCost[(option.stars)-3]}; "></div>
                        <img draggable="false" id="curCardInViewChoosingMode" src={option.source} alt="">
                        <img draggable="false" class="cardTemplateChoosingMode" src={cardForeground} alt="cardBg">
                        <div id="curCardDescChoosingMode" class="noScrollers">{@html option.description}</div>
                        <div class="curCardStatsChoosingMode" style="left: calc(var(--cardsChoosingModeScale)*1vw*7.4);">{option.attack}</div>
                        <div class="curCardStatsChoosingMode" style="left: calc(var(--cardsChoosingModeScale)*1vw*21.5)">{option.health}</div>
                        <div class="curCardCostChoosingMode">{option.cost}</div>
                        <div class="curCardNameChoosingMode">{option.name}</div>
                        
                        {#if option.talent != ""}
                        {#if option.talent.includes(",")}
                        <div class="curCardMultipleIconsContainerChoosingMode">
                            {#each option.talent.split(",") as icon, i}
                            <div style="width:{(0.65*5.2)/option.talent.split(",").length}vw; margin:auto">
                                <img style="width:calc(var(--cardsChoosingModeScale)*1vw*3.1)" src={talentIcons[icon.replace(" ","")]} alt="talent">
                            </div>
                            {/each}
                        </div>
                        {:else}
                            <div class="curCardTalentChoosingMode">{option.talent.replace("támadás","")}</div>
                            <img style="left: calc(var(--cardsChoosingModeScale)*1vw*10);" class="curCardTalentIconChoosingMode" src={talentIcons[option.talent.replace(" ","")]} alt="talent">
                            {/if}
                        {/if}

                        {#if option.aligment != ""}
                        {#if option.aligment.includes(",")}
                        {#each option.aligment.split(",") as aligment,i}
                            <img style="top: {0.65*9.8 + i* 4.5*0.65}vw; background-color: {aligmentBackgroundColors[aligment]}; border-radius: 0.5vw;" class="curCardAligChoosingMode" src={aligmentIcons[aligment]} alt="aligment">
                        {/each}
                        {:else}
                            <img style="background-color: {aligmentBackgroundColors[option.aligment]}; border-radius: 0.5vw;" class="curCardAligChoosingMode" src={aligmentIcons[option.aligment]} alt="aligment">
                        {/if}
                        {/if}

                        <div id="curCardRarityChoosingMode" style="{starsColorByCost[(option.stars)-3]}; top: 0">
                            {#each Array(Number(option.stars)) as card,index}
                                <span style="font-size: calc(var(--cardsChoosingModeScale)*2.4vw">★</span>
                            {/each}
                        </div>

                        {#if deletedStartingCards.some(e=> e[1] == i) && !switchedStartingHandOnce}
                        <img draggable="false" class="cardTemplateChoosingMode" src={reshuffleOverlay} alt="cardBg">
                        {/if}

                    </div>
            {:else if option.type == "spell"}

                <div class="previewInChoosingMode" on:click={() => SelectDeleteStartingCard([option,i])} on:keydown role="button" tabindex="">
                    <img draggable="false" class="cardTemplateChoosingMode" id="cardBackgroundChoosingMode" src={spellBackground} style="--colorr: {backgroundColorByCost[(option.stars)-3]};" alt="cardBg">
                    <div id="rarityBGChoosingMode" style="background: {backgroundColorByCost[(option.stars)-3]}; "></div>
                    <img draggable="false" id="curCardInViewChoosingMode" src={option.source} alt="">
                    <img draggable="false" class="cardTemplateChoosingMode" src={spellForeground} alt="cardBg">
                    <div id="curCardDescChoosingMode" class="noScrollers">{@html option.description}</div>
                    <div class="curCardCostChoosingMode" style="top: calc(var(--cardsChoosingModeScale)*1vw*4);">{option.cost}</div>
                    <div class="curCardNameChoosingMode">{option.name}</div>

                    <div id="curCardRarityChoosingMode" style="{starsColorByCost[(option.stars)-3]}; top: 0">
                        {#each Array(Number(option.stars)) as card,index}
                            <span style="font-size: calc(var(--cardsChoosingModeScale)*2.4vw">★</span>
                        {/each}
                    </div>

                    {#if deletedStartingCards.some(e=> e[1] == i) && !switchedStartingHandOnce}
                    <img draggable="false" class="cardTemplateChoosingMode" src={reshuffleOverlay} alt="cardBg">
                    {/if}
                </div>
            {/if}
            
        </div>
        {/each}
    </div>
    {#if !switchedStartingHandOnce}
    <div id="startingHandChoosers">
    <button on:click={VerifyStartingHand} >MEGERŐSÍT</button> 
    <button on:click={ReshuffleStartingHand} >KICSERÉL</button>
    </div>
    {/if}
{/if}

<div id="gamePlayFiledCont">
    <div id="playerHps">
        <div class="playerNameCont" id="enemyPlayerName" on:click={()=> SelectTargetCard(enemyGameParameters,10,"enemy")} bind:this={enemyPlayerNameDom} class:cardOnBoardInSelectMode={selectableCardDoms.includes(enemyPlayerNameDom)} class:cardOnBoardInTargetMode={attackableCardsDoms.includes(enemyPlayerNameDom)} on:keydown role="button" tabindex="">{enemyGameParameters.username}</div>

        <div class="playerHpCont" id="enemyPlayerHp">{enemyGameParameters.health}</div>
        <div class="playerHpCont" id="yourPlayerHp">{yourGameParameters.health}</div>

        <div class="playerNameCont" id="yourPlayerName" on:click={()=> SelectTargetCard(yourGameParameters,11,"your")} bind:this={yourPlayerNameDom} class:cardOnBoardInSelectMode={selectableCardDoms.includes(yourPlayerNameDom)} on:keydown role="button" tabindex="">{yourGameParameters.username}</div>
    </div>
    <div id="board">
        <div id="enemyHand" class="handCont">
            {#each enemyGameParameters.currentHand as card,i}
                <div id="enemyHandCardCont" style="--enemyCardNum: {enemyGameParameters.currentHand.length};transform: rotate({-22.5+(45/enemyGameParameters.currentHand.length)*(i+1)}deg);top:{(enemyGameParameters.currentHand.length-(i))/3}vw;">
                    <img class="cardTemplate" style="width: 9vw;" src={cardBack} alt="enemy Card">
                </div>
            {/each}
        </div>
        <div id="playField" class:selectingGameplayfield={isSelectTargetMode || isSummonLocationChoosing}>
            <img class="scribble" style="top: 7%; left: 11%; width: 25vw;" src={scribble1} alt="scribble in a book">
            <img class="scribble" style="top: 7%; right: 11%; width: 22vw;" src={scribble2} alt="scribble in a book">
            <img class="scribble" style="bottom: 7%; left: 11%; width: 22vw;" src={scribble3} alt="scribble in a book">
            <img class="scribble" style="bottom: 7%; right: 11%; width: 15vw;" src={scribble4} alt="scribble in a book">
            <img class="scribble" style="top: 50%; right: 11%; width: 5vw;" src={scribble5} alt="scribble in a book">

            {#each Array(enemyBoard.length/2) as card,i}
                <div class="boardsCells kotarget" id="etd{i}" style="top: 22%; left:{10+i*15}%"bind:this={enemyBoardDoms[i]}>
                {#if enemyBoardPhs[i] != ""}
                    <div class="BoardTierTwo ko" on:click={() => KoPlacedByClick(i,"enemySide")} class:pointerEventsNone={cellPointerEvents == false} class:pointerEventsAuto={cellPointerEvents == true} style="filter: grayscale(0.5) contrast(50%);opacity: 0.7;" on:keydown role="button" tabindex="">{enemyBoardPhs[i].health}</div>
                {/if}

                {#if enemyBoard[i] != ""}
                    {#if enemyBoard[i].type == "character"}
                        <div on:click={() => SelectTargetCard(enemyBoard[i],i,"enemy")} class="BoardTierTwo" id="cardPreviewListCont" class:cardOnBoardInSelectMode={selectableCardDoms.includes(enemyBoardDoms[i])} class:cardOnBoardInTargetMode={attackableCardsDoms.includes(document.getElementById(`etd${i}`))}  class:NotcardOnBoardInTargetMode={isCardOnBoardInAttackingMode && !attackableCardsDoms.includes(document.getElementById(`etd${i}`))} style="--AnimTargetTop: {AnimTargetTop}; --AnimTargetLeft: {AnimTargetLeft}; --AnimAttackerTop: {AnimAttackerTop}; --AnimAttackerLeft: {AnimAttackerLeft}; --AnimAttackerXRot: {AnimAttackerXRot};--AnimAttackerMarginTop: {AnimAttackerMarginTop};" on:keydown role="button" tabindex="">
                            <img draggable="false" style="width: calc(var(--cardOnBoardScale)*1vw*12.5); position:absolute"  src={cardV2Background} alt="cardBg">
                            <div id="rarityBGList" style="background: {backgroundColorByCost[(enemyBoard[i].stars)-3]}; "></div>
                            <img draggable="false" class = "cardButton" src={enemyBoard[i].source} alt="preview"/>
                            <button class="cardListFrame" alt="cardBg"></button>
                            <div class="curCardStatsList" style="left: calc(var(--cardOnBoardScale)*1vw*2.68);">{enemyBoard[i].attack}</div>
                            <div class="curCardStatsList" style="left: calc(var(--cardOnBoardScale)*1vw*9.65);">{enemyBoard[i].health}</div>
                            <div class="curCardCostList">{enemyBoard[i].cost}</div>
                            <div class="curCardNameList">{enemyBoard[i].name}</div>

                            {#if enemyBoard[i].fieldEffects != ""}
                                    {#each enemyBoard[i].fieldEffects as effect,j}
                                        {#if !effect.includes("kettős")}
                                        <img class="curCardFieldEffectList" style="top: calc(var(--cardOnBoardScale)*1vw*{1.9+ j*3.1});" src={fieldEffectIcons[effect.substring(effect.indexOf(":"),-1)]} alt="effect">
                                        {/if}
                                    {/each}
                            {/if}

                            {#if enemyBoard[i].aligment != ""}
                            {#if enemyBoard[i].aligment.includes(",")}
                                    {#each enemyBoard[i].aligment.split(",") as aligment,j}
                                    <div class="curAligListCont" style="background-color: {aligmentBackgroundColors[aligment]}; border-radius: 0.5vw; top: calc(var(--cardOnBoardScale)*1vw*{4.8 + j* 2.55});"></div>
                                    <img style="top: calc(var(--cardOnBoardScale)*1vw*{4.8 + j* 2.55});" class="curCardAligList" src={aligmentIcons[aligment]} alt="aligment">
                                    {/each}
                                {:else}
                                    <div class="curAligListCont" style="background-color: {aligmentBackgroundColors[enemyBoard[i].aligment]}; border-radius: 0.5vw;"></div>
                                    <img class="curCardAligList" src={aligmentIcons[enemyBoard[i].aligment]} alt="aligment">
                            {/if}
                            {/if}


                            {#if enemyBoard[i].talent != ""}
                                    {#if enemyBoard[i].talent.includes(",")}
                                        <div class="curCardMultipleIconsContainerList">
                                            {#each enemyBoard[i].talent.split(",") as icon, j}
                                            <div style="width:calc(var(--cardOnBoardScale)*1vw*{0.57*3.9/enemyBoard[i].talent.split(",").length}); margin:auto">
                                                <img style="width:calc(var(--cardOnBoardScale)*1vw*1.4);" src={talentIcons[icon.replace(" ","")]} alt="talent">
                                            </div>
                                            {/each}
                                        </div>
                                        {:else}
                                        <div class="curCardTalentList">{enemyBoard[i].talent.replace("támadás","")}</div>
                                        <img style="left:calc(var(--cardOnBoardScale)*1vw*3.8);" class="curCardTalentIconList" src={talentIcons[enemyBoard[i].talent.replace(" ","")]} alt="talent">
                                    {/if}
                            {/if} 
                
                            <div class="curCardRarityList" style="{starsColorByCost[(enemyBoard[i].stars)-3]}">
                                {#each Array(Number(enemyBoard[i].stars)) as card,index}
                                    <span style="font-size: calc(var(--cardOnBoardScale)*1vw*1);">★</span>
                                {/each}
                            </div>
                        </div>
                    {:else if enemyBoard[i].type == "ko"}
                        <div on:click={() => SelectTargetCard(enemyBoard[i],i,"enemy")} class="BoardTierTwo ko" class:cardOnBoardInSelectMode={selectableCardDoms.includes(enemyBoardDoms[i])} class:cardOnBoardInTargetMode={attackableCardsDoms.includes(document.getElementById(`etd${i}`))}  class:NotKoOnBoardInTargetMode={isCardOnBoardInAttackingMode && !attackableCardsDoms.includes(document.getElementById(`etd${i}`))} style="--AnimTargetTop: {AnimTargetTop}; --AnimTargetLeft: {AnimTargetLeft}; --AnimAttackerTop: {AnimAttackerTop}; --AnimAttackerLeft: {AnimAttackerLeft}; --AnimAttackerXRot: {AnimAttackerXRot};--AnimAttackerMarginTop: {AnimAttackerMarginTop};" on:keydown role="button" tabindex="">{enemyBoard[i].health}</div>
                    {/if}
                {/if}
                </div>
            {/each}

            {#each Array((enemyBoard.length)/2) as cell,i}
                <div class="boardsCells kotarget" id="etd{(enemyBoard.length)/2+i}" style="top: 5%; left:{10+8+i*15}%"  bind:this={enemyBoardDoms[i+(enemyBoard.length/2)]}>
                {#if enemyBoardPhs[(enemyBoardPhs.length)/2+i] != ""}
                    <div on:click={() => KoPlacedByClick((enemyBoardPhs.length)/2+i,"enemySide")} class:pointerEventsNone={cellPointerEvents == false} class:pointerEventsAuto={cellPointerEvents == true} style="filter: grayscale(0.5) contrast(50%);opacity: 0.7;" class="ko" on:keydown role="button" tabindex="">{enemyBoardPhs[(enemyBoardPhs.length)/2+i].health}</div>
                {/if}

                {#if enemyBoard[(enemyBoard.length)/2+i] != ""}
                    {#if enemyBoard[(enemyBoard.length)/2+i].type == "character"}
                    <div on:click={() => SelectTargetCard(enemyBoard[(enemyBoard.length)/2+i],(enemyBoard.length)/2+i,"enemy")} id="cardPreviewListCont" class:cardOnBoardInSelectMode={selectableCardDoms.includes(enemyBoardDoms[(enemyBoard.length)/2+i])}  class:cardOnBoardInTargetMode={attackableCardsDoms.includes(document.getElementById(`etd${i+(enemyBoard.length/2)}`))}  class:NotcardOnBoardInTargetMode={isCardOnBoardInAttackingMode && !attackableCardsDoms.includes(document.getElementById(`etd${i+(enemyBoard.length/2)}`))} style="--AnimTargetTop: {AnimTargetTop}; --AnimTargetLeft: {AnimTargetLeft}; --AnimAttackerTop: {AnimAttackerTop}; --AnimAttackerLeft: {AnimAttackerLeft}; --AnimAttackerXRot: {AnimAttackerXRot};--AnimAttackerMarginTop: {AnimAttackerMarginTop};"on:keydown role="button" tabindex="">
                        <img draggable="false" style="width: calc(var(--cardOnBoardScale)*1vw*12.5); position:absolute"  src={cardV2Background} alt="cardBg">
                        <div id="rarityBGList" style="background: {backgroundColorByCost[(enemyBoard[i+(enemyBoard.length)/2].stars)-3]}; "></div>
                        <img draggable="false" class = "cardButton" src={enemyBoard[i+(enemyBoard.length)/2].source} alt="preview"/>
                        <button class="cardListFrame" alt="cardBg"></button>
                        <div class="curCardStatsList" style="left: calc(var(--cardOnBoardScale)*1vw*2.68);">{enemyBoard[i+(enemyBoard.length)/2].attack}</div>
                        <div class="curCardStatsList" style="left: calc(var(--cardOnBoardScale)*1vw*9.65);">{enemyBoard[i+(enemyBoard.length)/2].health}</div>
                        <div class="curCardCostList">{enemyBoard[i+(enemyBoard.length)/2].cost}</div>
                        <div class="curCardNameList">{enemyBoard[i+(enemyBoard.length)/2].name}</div>

                        {#if enemyBoard[(enemyBoard.length)/2+i].fieldEffects != ""}
                                    {#each enemyBoard[(enemyBoard.length)/2+i].fieldEffects as effect,j}
                                        {#if !effect.includes("kettős")}
                                        <img class="curCardFieldEffectList" style="top: calc(var(--cardOnBoardScale)*1vw*{1.9+ j*3.1});" src={fieldEffectIcons[effect.substring(effect.indexOf(":"),-1)]} alt="effect">
                                        {/if}
                                    {/each}
                        {/if}

                        {#if enemyBoard[(enemyBoard.length)/2+i].aligment != ""}
                        {#if enemyBoard[(enemyBoard.length)/2+i].aligment.includes(",")}
                            {#each enemyBoard[(enemyBoard.length)/2+i].aligment.split(",") as aligment,j}
                            <div class="curAligListCont" style="background-color: {aligmentBackgroundColors[aligment]}; border-radius: 0.5vw; top: calc(var(--cardOnBoardScale)*1vw*{4.8 + j* 2.55});"></div>
                            <img style="top: calc(var(--cardOnBoardScale)*1vw*{4.8 + j* 2.55});" class="curCardAligList" src={aligmentIcons[aligment]} alt="aligment">
                            {/each}
                        {:else}
                            <div class="curAligListCont" style="background-color: {aligmentBackgroundColors[enemyBoard[(enemyBoard.length)/2+i].aligment]}; border-radius: 0.5vw;"></div>
                            <img class="curCardAligList" src={aligmentIcons[enemyBoard[(enemyBoard.length)/2+i].aligment]} alt="aligment">
                        {/if}
                        {/if}

                        {#if enemyBoard[(enemyBoard.length)/2+i].talent != ""}
                                    {#if enemyBoard[(enemyBoard.length)/2+i].talent.includes(",")}
                                        <div class="curCardMultipleIconsContainerList">
                                            {#each enemyBoard[(enemyBoard.length)/2+i].talent.split(",") as icon, j}
                                            <div style="width:calc(var(--cardOnBoardScale)*1vw*{0.57*3.9/enemyBoard[(enemyBoard.length)/2+i].talent.split(",").length}); margin:auto">
                                                <img style="width:calc(var(--cardOnBoardScale)*1vw*1.4);" src={talentIcons[icon.replace(" ","")]} alt="talent">
                                            </div>
                                            {/each}
                                        </div>
                                        {:else}
                                        <div class="curCardTalentList">{enemyBoard[(enemyBoard.length)/2+i].talent.replace("támadás","")}</div>
                                        <img style="left:calc(var(--cardOnBoardScale)*1vw*3.8);" class="curCardTalentIconList" src={talentIcons[enemyBoard[(enemyBoard.length)/2+i].talent.replace(" ","")]} alt="talent">
                                    {/if}
                        {/if} 
            
                        <div class="curCardRarityList" style="{starsColorByCost[(enemyBoard[i+(enemyBoard.length)/2].stars)-3]}">
                            {#each Array(Number(enemyBoard[i+(enemyBoard.length)/2].stars)) as card,index}
                                <span style="font-size: calc(var(--cardOnBoardScale)*1vw*1);">★</span>
                            {/each}
                        </div>
                    </div>
                    {:else if enemyBoard[(enemyBoard.length)/2+i].type == "ko"}
                        <div on:click={() => SelectTargetCard(enemyBoard[(enemyBoard.length)/2+i],(enemyBoard.length)/2+i,"enemy")} class="ko" class:cardOnBoardInSelectMode={selectableCardDoms.includes(enemyBoardDoms[(enemyBoard.length)/2+i])} class:cardOnBoardInTargetMode={attackableCardsDoms.includes(document.getElementById(`etd${i+(enemyBoard.length/2)}`))}  class:NotKoOnBoardInTargetMode={isCardOnBoardInAttackingMode && !attackableCardsDoms.includes(document.getElementById(`etd${i+(enemyBoard.length/2)}`))} style="--AnimTargetTop: {AnimTargetTop}; --AnimTargetLeft: {AnimTargetLeft}; --AnimAttackerTop: {AnimAttackerTop}; --AnimAttackerLeft: {AnimAttackerLeft}; --AnimAttackerXRot: {AnimAttackerXRot};--AnimAttackerMarginTop: {AnimAttackerMarginTop};" on:keydown role="button" tabindex="">{enemyBoard[(enemyBoard.length)/2+i].health}</div>
                    {/if}
                {/if}

                </div>
            {/each}


            {#each Array((yourBoard.length)/2) as cell,i}
                <div class="target boardsCells" id="td{i}" style="bottom: 22%; left:{10+8+i*15}%" bind:this={yourBoardDoms[i]}>
                {#if yourBoardPhs[i] != ""}
                    {#if yourBoardPhs[i].type == "character"}
                        <div on:click={() => PlaceByClick(yourBoardPhs[i],i)} id="cardPreviewListCont" class:isPlacingModePh={isCardInYourHandInPlacingMode} class:pointerEventsNone={cellPointerEvents == false} class:pointerEventsAuto={cellPointerEvents == true} style="filter: grayscale(0.5) contrast(50%);opacity: 0.7;" on:keydown role="button" tabindex="">
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
                        <div on:click={() => KoPlacedByClick(i,"yourSide")} class:pointerEventsNone={cellPointerEvents == false} class:pointerEventsAuto={cellPointerEvents == true} style="filter: grayscale(0.5) contrast(50%);opacity: 0.7;" class:isPlacingModePh={isKoInPlacingMode} class="ko" on:keydown role="button" tabindex="">{yourBoardPhs[i].health}</div>
                    {/if}
                {/if}

                {#if yourBoard[i] != ""}
                    {#if yourBoard[i].type == "character"}
                        <div on:click={() => SelectTargetCard(yourBoard[i],i,"your")} class:cardOnBoardInSelectMode={selectableCardDoms.includes(yourBoardDoms[i])} class:cardAwake={!yourBoard[i].fieldEffects.some(element => element.includes("frozen")) && !yourBoard[i].fieldEffects.some(element => element.includes("stunned")) && !yourBoard[i].fieldEffects.includes("asleep:") && isYourTurn && !isSelectTargetMode} style="--AnimTargetTop: {AnimTargetTop}; --AnimTargetLeft: {AnimTargetLeft}; --AnimAttackerTop: {AnimAttackerTop}; --AnimAttackerLeft: {AnimAttackerLeft}; --AnimAttackerXRot: {AnimAttackerXRot};--AnimAttackerMarginTop: {AnimAttackerMarginTop};"  class:cardInAttackingMode={cardInAttackingMode == yourBoard[i]}  id="cardPreviewListCont" on:keydown role="button" tabindex="">
                            <img draggable="false" style="width: calc(var(--cardOnBoardScale)*1vw*12.5); position:absolute" src={cardV2Background} alt="cardBg">
                            <div id="rarityBGList" style="background: {backgroundColorByCost[(yourBoard[i].stars)-3]}; "></div>
                            <img draggable="false" class = "cardButton" src={yourBoard[i].source} alt="preview"/>
                            <button class="cardListFrame" alt="cardBg"></button>

                            <div>
                            {#if yourBoard[i].fieldEffects != ""}
                                {#each yourBoard[i].fieldEffects as effect,j}
                                    {#if !effect.includes("kettős") && !effect.includes("asleep")}
                                    <img class="cardListFrame" src={fieldEffectOverlays[effect.substring(effect.indexOf(":"),-1)]} alt="overlay">
                                    <img class="cardListFrame" style="mix-blend-mode: screen;" src={fieldEffectGifs[effect.substring(effect.indexOf(":"),-1)]} alt="overlay">
                                    {/if}
                                {/each}
                            {/if}
                            </div>
                            <div class="curCardStatsList" style="left: calc(var(--cardOnBoardScale)*1vw*2.68);">{yourBoard[i].attack}</div>
                            <div class="curCardStatsList" style="left: calc(var(--cardOnBoardScale)*1vw*9.65);">{yourBoard[i].health}</div>

                            <div class="curCardCostList">{yourBoard[i].cost}</div>
                            <div class="curCardNameList">{yourBoard[i].name}</div>
                            


                            {#if yourBoard[i].fieldEffects != ""}
                                {#each yourBoard[i].fieldEffects as effect,j}
                                    {#if !effect.includes("kettős")}
                                    <img class="curCardFieldEffectList" style="top: calc(var(--cardOnBoardScale)*1vw*{1.9+ j*3.1});" src={fieldEffectIcons[effect.substring(effect.indexOf(":"),-1)]} alt="effect">
                                    {/if}
                                {/each}
                            {/if}

                            {#if yourBoard[i].aligment != ""}
                            {#if yourBoard[i].aligment.includes(",")}
                                {#each yourBoard[i].aligment.split(",") as aligment,j}
                                <div class="curAligListCont" style="background-color: {aligmentBackgroundColors[aligment]}; border-radius: 0.5vw; top: calc(var(--cardOnBoardScale)*1vw*{4.8 + j* 2.55});"></div>
                                <img style="top: calc(var(--cardOnBoardScale)*1vw*{4.8 + j* 2.55});" class="curCardAligList" src={aligmentIcons[aligment]} alt="aligment">
                                {/each}
                            {:else}
                                <div class="curAligListCont" style="background-color: {aligmentBackgroundColors[yourBoard[i].aligment]}; border-radius: 0.5vw;"></div>
                                <img class="curCardAligList" src={aligmentIcons[yourBoard[i].aligment]} alt="aligment">
                            {/if}
                            {/if}

                            {#if yourBoard[i].talent != ""}
                                {#if yourBoard[i].talent.includes(",")}
                                    <div class="curCardMultipleIconsContainerList">
                                        {#each yourBoard[i].talent.split(",") as icon, j}
                                        <div style="width:calc(var(--cardOnBoardScale)*1vw*{0.57*3.9/yourBoard[i].talent.split(",").length}); margin:auto">
                                            <img style="width:calc(var(--cardOnBoardScale)*1vw*1.4);" src={talentIcons[icon.replace(" ","")]} alt="talent">
                                        </div>
                                        {/each}
                                    </div>
                                    {:else}
                                    <div class="curCardTalentList">{yourBoard[i].talent.replace("támadás","")}</div>
                                    <img style="left:calc(var(--cardOnBoardScale)*1vw*3.8);" class="curCardTalentIconList" src={talentIcons[yourBoard[i].talent.replace(" ","")]} alt="talent">
                                    {/if}
                            {/if} 

                            <div class="curCardRarityList" style="{starsColorByCost[(yourBoard[i].stars)-3]}">
                                {#each Array(Number(yourBoard[i].stars)) as card,index}
                                    <span style="font-size: calc(var(--cardOnBoardScale)*1vw*1);">★</span>
                                {/each}
                            </div>
                        </div>
                    {:else if yourBoard[i].type == "ko"}
                        <div class="ko" on:click={() => SelectTargetCard(yourBoard[i],i,"your")} class:cardOnBoardInSelectMode={selectableCardDoms.includes(yourBoardDoms[i])} style="--AnimTargetTop: {AnimTargetTop}; --AnimTargetLeft: {AnimTargetLeft}; --AnimAttackerTop: {AnimAttackerTop}; --AnimAttackerLeft: {AnimAttackerLeft}; --AnimAttackerXRot: {AnimAttackerXRot};--AnimAttackerMarginTop: {AnimAttackerMarginTop};" on:keydown role="button" tabindex="">{yourBoard[i].health}</div>
                    {/if}
                {/if}
                </div>
            {/each}

            {#each Array((yourBoard.length)/2) as cell,i}
                <div class="target boardsCells" id="td{i+(yourBoard.length)/2}" style="bottom: 5%; left:{10+i*15}%" bind:this={yourBoardDoms[i+(yourBoard.length/2)]}>
                {#if yourBoardPhs[i+(yourBoardPhs.length)/2] != ""}
                    {#if yourBoardPhs[i+(yourBoardPhs.length)/2].type == "character"}
                        <div class="BoardTierTwo" on:click={() => PlaceByClick(yourBoardPhs[i+(yourBoard.length)/2],i+(yourBoard.length)/2)} id="cardPreviewListCont" class:pointerEventsNone={cellPointerEvents == false} class:pointerEventsAuto={cellPointerEvents == true}  class:isPlacingModePh={isCardInYourHandInPlacingMode} style="filter: grayscale(0.5) contrast(50%);opacity: 0.7;" on:keydown role="button" tabindex="">
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
                        <div class="BoardTierTwo ko" on:click={() => KoPlacedByClick((i + (yourBoard.length/2)),"yourSide")} class:pointerEventsNone={cellPointerEvents == false} class:pointerEventsAuto={cellPointerEvents == true} style="filter: grayscale(0.5) contrast(50%);opacity: 0.7;" class:isPlacingModePh={isKoInPlacingMode}  on:keydown role="button" tabindex="">{yourBoardPhs[i+(yourBoardPhs.length)/2].health}</div>
                    {/if}
                {/if}

                {#if yourBoard[i+(yourBoard.length)/2] != ""}
                    {#if yourBoard[i+(yourBoard.length)/2].type == "character"}
                        <div class="BoardTierTwo" on:click={() => SelectTargetCard(yourBoard[i+(yourBoard.length)/2],i+(yourBoard.length)/2,"your")} class:cardOnBoardInSelectMode={selectableCardDoms.includes(yourBoardDoms[i+(yourBoard.length)/2])}  class:cardAwake={!yourBoard[i+(yourBoard.length)/2].fieldEffects.some(element => element.includes("frozen")) && !yourBoard[i+(yourBoard.length)/2].fieldEffects.some(element => element.includes("stunned")) && !yourBoard[i+(yourBoard.length)/2].fieldEffects.includes("asleep:") && isYourTurn && !isSelectTargetMode} style="--AnimTargetTop: {AnimTargetTop}; --AnimTargetLeft: {AnimTargetLeft}; --AnimAttackerTop: {AnimAttackerTop}; --AnimAttackerLeft: {AnimAttackerLeft}; --AnimAttackerXRot: {AnimAttackerXRot};--AnimAttackerMarginTop: {AnimAttackerMarginTop};" class:cardInAttackingMode={cardInAttackingMode == yourBoard[i+(yourBoard.length/2)]}  id="cardPreviewListCont" on:keydown role="button" tabindex="">
                            <img draggable="false" style="width: calc(var(--cardOnBoardScale)*1vw*12.5); position:absolute" src={cardV2Background} alt="cardBg">
                            <div id="rarityBGList" style="background: {backgroundColorByCost[(yourBoard[i+(yourBoard.length)/2].stars)-3]}; "></div>
                            <img draggable="false" class = "cardButton" src={yourBoard[i+(yourBoard.length)/2].source} alt="preview"/>
                            <button class="cardListFrame" alt="cardBg"></button>

                            <div>
                            {#if yourBoard[i+(yourBoard.length)/2].fieldEffects != ""}
                                {#each yourBoard[i+(yourBoard.length)/2].fieldEffects as effect,j}
                                    {#if !effect.includes("kettős")}
                                    <img class="curCardFieldEffectList" style="top: calc(var(--cardOnBoardScale)*1vw*{1.9+ j*3.1});" src={fieldEffectIcons[effect.substring(effect.indexOf(":"),-1)]} alt="effect">
                                    {/if}
                                {/each}
                            {/if}
                            </div>
                            <div class="curCardStatsList" style="left: calc(var(--cardOnBoardScale)*1vw*2.68);">{yourBoard[i+(yourBoard.length)/2].attack}</div>
                            <div class="curCardStatsList" style="left: calc(var(--cardOnBoardScale)*1vw*9.65);">{yourBoard[i+(yourBoard.length)/2].health}</div>
                            <div class="curCardCostList">{yourBoard[i+(yourBoard.length)/2].cost}</div>
                            <div class="curCardNameList">{yourBoard[i+(yourBoard.length)/2].name}</div>


                            
                            {#if yourBoard[i+(yourBoard.length)/2].aligment != ""}
                            {#if yourBoard[i+(yourBoard.length)/2].aligment.includes(",")}
                                {#each yourBoard[i+(yourBoard.length)/2].aligment.split(",") as aligment,j}
                                <div class="curAligListCont" style="background-color: {aligmentBackgroundColors[aligment]}; border-radius: 0.5vw; top: calc(var(--cardOnBoardScale)*1vw*{4.8 + j* 2.55});"></div>
                                <img style="top: calc(var(--cardOnBoardScale)*1vw*{4.8 + j* 2.55});" class="curCardAligList" src={aligmentIcons[aligment]} alt="aligment">
                                {/each}
                            {:else}
                                <div class="curAligListCont" style="background-color: {aligmentBackgroundColors[yourBoard[i+(yourBoard.length)/2].aligment]}; border-radius: 0.5vw;"></div>
                                <img class="curCardAligList" src={aligmentIcons[yourBoard[i+(yourBoard.length)/2].aligment]} alt="aligment">
                            {/if}
                            {/if}

                            {#if yourBoard[i+(yourBoard.length)/2].talent != ""}
                                {#if yourBoard[i+(yourBoard.length)/2].talent.includes(",")}
                                    <div class="curCardMultipleIconsContainerList">
                                        {#each yourBoard[i+(yourBoard.length)/2].talent.split(",") as icon, j}
                                        <div style="width:calc(var(--cardOnBoardScale)*1vw*{0.57*3.9/yourBoard[i+(yourBoard.length)/2].talent.split(",").length}); margin:auto">
                                            <img style="width:calc(var(--cardOnBoardScale)*1vw*1.4);" src={talentIcons[icon.replace(" ","")]} alt="talent">
                                        </div>
                                        {/each}
                                    </div>
                                    {:else}
                                    <div class="curCardTalentList">{yourBoard[i+(yourBoard.length)/2].talent.replace("támadás","")}</div>
                                    <img style="left:calc(var(--cardOnBoardScale)*1vw*3.8);" class="curCardTalentIconList" src={talentIcons[yourBoard[i+(yourBoard.length)/2].talent.replace(" ","")]} alt="talent">
                                    {/if}
                            {/if}      

                            <div class="curCardRarityList" style="{starsColorByCost[(yourBoard[i+(yourBoard.length)/2].stars)-3]}">
                                {#each Array(Number(yourBoard[i+(yourBoard.length)/2].stars)) as card,index}
                                    <span style="font-size: calc(var(--cardOnBoardScale)*1vw*1);">★</span>
                                {/each}
                            </div>
                        </div>
                    {:else if yourBoard[i+(yourBoard.length)/2].type == "ko"}
                        <div class="ko BoardTierTwo" on:click={() => SelectTargetCard(yourBoard[i+(yourBoard.length)/2],i+(yourBoard.length)/2,"your")} class:cardOnBoardInSelectMode={selectableCardDoms.includes(yourBoardDoms[i+(yourBoard.length)/2])} style="--AnimTargetTop: {AnimTargetTop}; --AnimTargetLeft: {AnimTargetLeft}; --AnimAttackerTop: {AnimAttackerTop}; --AnimAttackerLeft: {AnimAttackerLeft}; --AnimAttackerXRot: {AnimAttackerXRot};--AnimAttackerMarginTop: {AnimAttackerMarginTop};" on:keydown role="button" tabindex="">{yourBoard[i+(yourBoard.length)/2].health}</div>
                    {/if}
                {/if} 
                </div>
            {/each}

            <div id="spellTargetDiv" class:displayBlock={dragged != "" && dragged.type == "spell"} class:displayNone={dragged == "" || dragged.tpye != "spell"}><span style="margin-top:10vh; display:block; pointer-events: none;">play spell</span></div>

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

                    {#if card.talent != ""}
                        {#if card.talent.includes(",")}
                        <div class="curCardMultipleIconsContainer">
                            {#each card.talent.split(",") as icon, i}
                            <div style="width:{(0.4*5.2)/card.talent.split(",").length}vw; margin:auto">
                                <img style="width:calc(var(--cardsScale)*1vw*3.1)" src={talentIcons[icon.replace(" ","")]} alt="talent">
                            </div>
                            {/each}
                        </div>
                        {:else}
                            <div class="curCardTalent">{card.talent.replace("támadás","")}</div>
                            <img style="left: calc(var(--cardsScale)*1vw*10);" class="curCardTalentIcon" src={talentIcons[card.talent.replace(" ","")]} alt="talent">
                            {/if}
                        {/if}

                    {#if card.aligment != ""}
                    {#if card.aligment.includes(",")}
                    {#each card.aligment.split(",") as aligment,i}
                        <img style="top: {0.4*9.8 + i* 4.5*0.4}vw; background-color: {aligmentBackgroundColors[aligment]}; border-radius: 0.5vw;" class="curCardAlig" src={aligmentIcons[aligment]} alt="aligment">
                    {/each}
                    {:else}
                        <img style="background-color: {aligmentBackgroundColors[card.aligment]}; border-radius: 0.5vw;" class="curCardAlig" src={aligmentIcons[card.aligment]} alt="aligment">
                    {/if}
                    {/if}
                    
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

        <div class="buildingFlexCont" style="top:48vh;">
            {#each yourGameParameters.yourBuildings as building,i}
            <div class="buildingCont">
                
                <img draggable="false" class="buildingPic" src={building.source} alt="buidlingPic">
                <img draggable="false" class="buildingFG" src={buildingFG} alt="buidling">
                <div class="buildingName">{building.name}</div>
            </div><br>
            {/each}
        </div>
        <div class="buildingFlexCont" style="top:15vh;">
            {#each enemyGameParameters.yourBuildings as building,i}
            <div class="buildingCont">
                
                <img draggable="false" class="buildingPic" src={building.source} alt="buidlingPic">
                <img draggable="false" class="buildingFG" src={buildingFG} alt="buidling">
                <div class="buildingName">{building.name}</div>
            </div><br>
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
            
            <button on:click={ClickEndTurn} id="endTurnButton" class:notYourTurnBattleIndicator={!isYourTurn || isSelectTargetMode || isInChoosingMode}>
                END TURN 
            </button>
            <div style="bottom:0;" id="yourBattleStateIndicator" class="battleStateIndicatorCont" class:notYourTurnBattleIndicator={!isYourTurn} class:rallyTurn={isYourRally} class:defendTurn={!isYourRally}>

            </div>
        </div>

    </div>
    <div id="actionLog" on:click={OpenBattleLog} class:actionLogHidden={!logOpen} class:actionLogDisplayed={logOpen} on:keydown role="button" tabindex="">
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

                            {#if lastCardPlayed.aligment != ""}
                            {#if lastCardPlayed.aligment.includes(",")}
                            {#each lastCardPlayed.aligment.split(",") as aligment,i}
                                <img style="top: {0.8*9.8 + i* 4.5*0.8}vw; background-color: {aligmentBackgroundColors[aligment]}; border-radius: 0.5vw;" class="curCardAligLog" src={aligmentIcons[aligment]} alt="aligment">
                            {/each}
                            {:else}
                                <img style="background-color: {aligmentBackgroundColors[lastCardPlayed.aligment]}; border-radius: 0.5vw;" class="curCardAligLog" src={aligmentIcons[lastCardPlayed.aligment]} alt="aligment">
                            {/if}
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
    </div>
    <div id="actionLogControllers" class:displayNone={!logOpen} class:displayBlock={logOpen}>
        <button class="actionButtonClass hover-underline-animation" style="left: 4vw;" on:click={PrevBattleLog}>Prev</button>
        <button class="actionButtonClass hover-underline-animation" style="left: 15vw;" on:click={NextBattleLog}>Next</button>
    </div>

    <div id="secretCont">
        <div class="secretSpells" id="yourSecrets">
            {#each yourGameParameters.secretSpells as spell,i}
                <button class="secret" style="background-image: url({secretIcons[i]})" on:mouseenter={() => AdjustSecretHover(true,i)} on:mouseleave={() => AdjustSecretHover(false,i)} ></button><br>
            {/each}
        </div>
    </div>
    <div id="secretHover">
        {#each yourGameParameters.secretSpells as hover,i}
            {#if secretHoverState[i]}
            <div class="previewInVA" style="position:absolute; left:0; top: {i*4}vw;">
                <img draggable="false" class="cardTemplateVA" id="cardBackgroundVA" src={spellBackground} style="--colorr: {backgroundColorByCost[(hover.stars)-3]};" alt="cardBg">
                <div id="rarityBGVA" style="background: {backgroundColorByCost[(hover.stars)-3]}; "></div>
                <img draggable="false" id="curCardInViewVA" src={hover.source} alt="">
                <img draggable="false" class="cardTemplateVA" src={spellForeground} alt="cardBg">
                <div id="curCardDescVA" class="noScrollers">{@html hover.description}</div>
                <div class="curCardCostVA">{hover.cost}</div>
                <div class="curCardNameVA">{hover.name}</div>


                <div id="curCardRarityVA" style="{starsColorByCost[(hover.stars)-3]}; top: 0">
                    {#each Array(Number(hover.stars)) as card,index}
                        <span style="font-size: calc(var(--cardsVAScale)*2.4vw">★</span>
                    {/each}
                </div>
            </div>
            {/if}
        {/each}
    </div>


    {#if isInChoosingMode}
    <div id="choosingMode">
        {#each cardChoosingModeOptions as option,i}
        <div id="cardChoosingModeCont">
            {#if option.type == "character"}
                    
                    <div class="previewInChoosingMode" on:click={() => ChoosingModeResult(option)} on:keydown role="button" tabindex="">
                        <img draggable="false" class="cardTemplateChoosingMode" id="cardBackgroundChoosingMode" src={cardBackground} style="--colorr: {backgroundColorByCost[(option.stars)-3]};" alt="cardBg">
                        <div id="rarityBGChoosingMode" style="background: {backgroundColorByCost[(option.stars)-3]}; "></div>
                        <img draggable="false" id="curCardInViewChoosingMode" src={option.source} alt="">
                        <img draggable="false" class="cardTemplateChoosingMode" src={cardForeground} alt="cardBg">
                        <div id="curCardDescChoosingMode" class="noScrollers">{@html option.description}</div>
                        <div class="curCardStatsChoosingMode" style="left: calc(var(--cardsChoosingModeScale)*1vw*7.4);">{option.attack}</div>
                        <div class="curCardStatsChoosingMode" style="left: calc(var(--cardsChoosingModeScale)*1vw*21.5)">{option.health}</div>
                        <div class="curCardCostChoosingMode">{option.cost}</div>
                        <div class="curCardNameChoosingMode">{option.name}</div>
                        
                        {#if option.talent != ""}
                        {#if option.talent.includes(",")}
                        <div class="curCardMultipleIconsContainerChoosingMode">
                            {#each option.talent.split(",") as icon, i}
                            <div style="width:{(0.65*5.2)/option.talent.split(",").length}vw; margin:auto">
                                <img style="width:calc(var(--cardsChoosingModeScale)*1vw*3.1)" src={talentIcons[icon.replace(" ","")]} alt="talent">
                            </div>
                            {/each}
                        </div>
                        {:else}
                            <div class="curCardTalentChoosingMode">{option.talent.replace("támadás","")}</div>
                            <img style="left: calc(var(--cardsChoosingModeScale)*1vw*10);" class="curCardTalentIconChoosingMode" src={talentIcons[option.talent.replace(" ","")]} alt="talent">
                            {/if}
                        {/if}

                        {#if option.aligment != ""}
                        {#if option.aligment.includes(",")}
                        {#each option.aligment.split(",") as aligment,i}
                            <img style="top: {0.65*9.8 + i* 4.5*0.65}vw; background-color: {aligmentBackgroundColors[aligment]}; border-radius: 0.5vw;" class="curCardAligChoosingMode" src={aligmentIcons[aligment]} alt="aligment">
                        {/each}
                        {:else}
                            <img style="background-color: {aligmentBackgroundColors[option.aligment]}; border-radius: 0.5vw;" class="curCardAligChoosingMode" src={aligmentIcons[option.aligment]} alt="aligment">
                        {/if}
                        {/if}

                        <div id="curCardRarityChoosingMode" style="{starsColorByCost[(option.stars)-3]}; top: 0">
                            {#each Array(Number(option.stars)) as card,index}
                                <span style="font-size: calc(var(--cardsChoosingModeScale)*2.4vw">★</span>
                            {/each}
                        </div>
                    </div>
            {:else if option.type == "spell"}

                <div class="previewInChoosingMode" on:click={() => ChoosingModeResult(option)} on:keydown role="button" tabindex="">
                    <img draggable="false" class="cardTemplateChoosingMode" id="cardBackgroundChoosingMode" src={spellBackground} style="--colorr: {backgroundColorByCost[(option.stars)-3]};" alt="cardBg">
                    <div id="rarityBGChoosingMode" style="background: {backgroundColorByCost[(option.stars)-3]}; "></div>
                    <img draggable="false" id="curCardInViewChoosingMode" src={option.source} alt="">
                    <img draggable="false" class="cardTemplateChoosingMode" src={spellForeground} alt="cardBg">
                    <div id="curCardDescChoosingMode" class="noScrollers">{@html option.description}</div>
                    <div class="curCardCostChoosingMode" style="top: calc(var(--cardsChoosingModeScale)*1vw*4);">{option.cost}</div>
                    <div class="curCardNameChoosingMode">{option.name}</div>

                    <div id="curCardRarityChoosingMode" style="{starsColorByCost[(option.stars)-3]}; top: 0">
                        {#each Array(Number(option.stars)) as card,index}
                            <span style="font-size: calc(var(--cardsChoosingModeScale)*2.4vw">★</span>
                        {/each}
                    </div>
                </div>
            {/if}
        </div>
        {/each}
    </div> 
    {/if}
    {#if isSelectTargetMode || isSummonLocationChoosing}
        <div id="selectingModeBG"></div>
    {/if}
    {#if isSummonLocationChoosingEnemy}
        <div id="selectingModeBGEnemy"></div>
    {/if}
    
    <div id="guideText">
        {#if isInChoosingMode}
        VÁLASSZ EGY KÁRTYÁT
        {/if}
        {#if isSelectTargetMode}
        VÁLASSZ EGY CÉLPONTOT
        {/if}
        {#if isSummonLocationChoosingEnemy}
        <span style="margin-top: 25vh">AZ ELLENSÉG IDÉZÉSI HELYET VÁLASZT</span>
        {/if}
    </div>
    {#if isTomiSummonLocation}
    <div class="tomiCsere">
        <button on:click={()=>TomiSwitch(true)}>CSRÉLD MEG</button>
        <button on:click={()=>TomiSwitch(false)}>nE CSERÉLD MEG</button>
    </div>
    {/if}
    <div id="visualInteractionInicators" bind:this={visualAnimDom}>
        {#if isVisualAnimation}
        <div id="previewInVACont">
        <div class="previewInVA">
            <img draggable="false" class="cardTemplateVA" id="cardBackgroundVA" src={cardBackground} style="--colorr: {backgroundColorByCost[(visualAnimCard.stars)-3]};" alt="cardBg">
            <div id="rarityBGVA" style="background: {backgroundColorByCost[(visualAnimCard.stars)-3]}; "></div>
            <img draggable="false" id="curCardInViewVA" src={visualAnimCard.source} alt="">
            <img draggable="false" class="cardTemplateVA" src={cardForeground} alt="cardBg">
            <div id="curCardDescVA" class="noScrollers">{@html visualAnimCard.description}</div>
            <div class="curCardStatsVA" style="left: calc(var(--cardsVAScale)*1vw*7.4);">{visualAnimCard.attack}</div>
            <div class="curCardStatsVA" style="left: calc(var(--cardsVAScale)*1vw*21.5)">{visualAnimCard.health}</div>
            <div class="curCardCostVA">{visualAnimCard.cost}</div>
            <div class="curCardNameVA">{visualAnimCard.name}</div>
            
            {#if visualAnimCard.talent != ""}
            {#if visualAnimCard.talent.includes(",")}
            <div class="curCardMultipleIconsContainerVA">
                {#each visualAnimCard.talent.split(",") as icon, i}
                <div style="width:{(0.8*5.2)/visualAnimCard.talent.split(",").length}vw; margin:auto">
                    <img style="width:calc(var(--cardsVAScale)*1vw*1.4)" src={talentIcons[icon.replace(" ","")]} alt="talent">
                </div>
                {/each}
            </div>
            {:else}
                <div class="curCardTalentVA">{visualAnimCard.talent.replace("támadás","")}</div>
                <img style="left: calc(var(--cardsVAScale)*1vw*10);" class="curCardTalentIconVA" src={talentIcons[visualAnimCard.talent.replace(" ","")]} alt="talent">
                {/if}
            {/if}

            {#if visualAnimCard.aligment.includes(",")}
            {#each visualAnimCard.aligment.split(",") as aligment,i}
                <img style="top: {0.8*9.8 + i* 4.5*0.8}vw; background-color: {aligmentBackgroundColors[aligment]}; border-radius: 0.5vw;" class="curCardAligVA" src={aligmentIcons[aligment]} alt="aligment">
            {/each}
            {:else}
                <img style="background-color: {aligmentBackgroundColors[visualAnimCard.aligment]}; border-radius: 0.5vw;" class="curCardAligVA" src={aligmentIcons[visualAnimCard.aligment]} alt="aligment">
            {/if}

            <div id="curCardRarityVA" style="{starsColorByCost[(visualAnimCard.stars)-3]}; top: 0">
                {#each Array(Number(visualAnimCard.stars)) as card,index}
                    <span style="font-size: calc(var(--cardsVAScale)*2.4vw">★</span>
                {/each}
            </div>
        </div>
         </div>
        {/if}
    </div>

    {#if szaszShuffle}
    <div id="szaszShuffleBG">
        <img id="shuffleGif" src={cardShuffling} alt="shuff shuff">
        <div id="frenchCardCont">
            {#each pickedFrenchCard as card,i}
                <div id="frenchCard{i}" class="frenchCard">
                    <img class="frenchCardIcon" style="left:1vw; top:1vw;" src={card.icon} alt="icon">
                    <img class="frenchCardIcon" style="right:1vw; bottom:1vw;" src={card.icon} alt="icon">
                    {#if card.icon == cClub || card.icon == cSpade}
                    <div class="frenchCardNumber">{card.number}</div>
                    {:else}
                    <div class="frenchCardNumber" style="color:red">{card.number}</div>
                    {/if}
                </div>
            {/each}
        </div>
        <div style="position: absolute; top: 15vh; left: 69vw;">
            <button on:click={PikkDama} style=" margin-bottom: 5vh;">Újra</button><br>
            <button on:click={ClosePikkDamaTab}>Vissza</button>
        </div>
        
    </div>
    {/if}
    {#if isTritzCoinFlip}
    <div id="tritzCoinFlipBG">
        <div style="position:absolute;left:45vw;top:20vh;">
        <button on:click={TritzFlip}>FLIP</button>
        <button on:click={() => {
            isTritzCoinFlip = false
            isTritzCoinFlip = isTritzCoinFlip

            tritzCoinFlips = []
            tritzCoinFlips = tritzCoinFlips
        }}>Exit</button></div>
        <div id="TritzCoinCont">
            {#each tritzCoinFlips as coin,i}
            <div class="tritzCoinPerspCont">
                <img class="tritzCoin" src={coin} alt="fej/iras">
            </div>
            {/each}
        </div>
    </div>
{/if}
</div>

<button style="z-index: 100; position:absolute" id="fullScreenButton" on:click={requestFullScreen}>[]</button>

<style>
    @font-face {
            font-family: 'SevenSwords';
            src: url('../../lib/assets/fonts/zh-cn.ttf');
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
    #winScreen{
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left:0;
        z-index: 15;
        background-color: #29252593;
        
    }
    @keyframes -global-winScreenDarken{
        0%{
            background-color: #29252593;
        }
        100%{
            background-color: #141111EF;
        }
    }
    #winLogo{
        position:absolute;
        width:40vw;
        top: 30vh;
        left:30vw;
        opacity:0;
        animation: winAnim 2s 1s forwards;
    }
    @keyframes -global-winLogoShift{
        0%{
            opacity:1;
            left:30vw;
        }
        100%{
            opacity:1;
            left:5vw;
        }
    }
    #winGoBackButton{
        position:absolute;
        top: 70vh;
        left:45vw;
        opacity:0;
        animation: winAnim 2s 1s forwards;
    }
    @keyframes -global-winAnim{
        0%{
            opacity:0;
        }
        100%{
            opacity:1;
        }
    }
    #winNotesCont{
        position: absolute;
        top: 10vh;

        animation: winNotesAnim 0.5s forwards ease-out;
    }
    @keyframes winNotesAnim{
        0%{
            left: 100vw;
        }
        100%{
            left: 50vw;
        }
    }
    #winNotes{
        background-image: url(../../lib/assets/gameplay/pad.png);
        background-size: 100% 100%;
        width: 80vw;
        height:80vh;
        position: relative;

    }
    #profileName{
        font-family: "ShadowLight";
        font-size: 2vw;
        position:absolute;
        left:32%;
        top: 27%;
    }
    #profileLevel{
        font-family: "ShadowLight";
        font-size: 1.9vw;
        position:absolute;
        left:13%;
        top: 50%;
    }
    #profileXp{
        font-family: "ShadowLight";
        font-size: 1vw;
        position:absolute;
        left:16%;
        top: 64%;
    }
    #profileCont{
        position: absolute;
        top:17%;
        left:13%;
        width:12vw;
    }
    #profileBorder{
        position: absolute;
        width: 100%;
    }
    #profilePic{
        position: absolute;
        width:70%;
        left:15%;
        top:2vh;
        border-radius: 50%;
    }

    #gainsCont{
        position: absolute;
        font-family: "ShadowLight";
        font-size: 1.5vw;
        position:absolute;
        left:13%;
        top: 70%;
    }
    .gainedIcon{
        width:2vw;
    }
    @keyframes -global-gainsAnim{
        0%{
            opacity: 1;
            margin-left:-10vw;
        }
        100%{
            opacity: 1;
            margin-left:0vw;
        }
    }


    #levelCont{
        position: absolute;
        top:60%;
        left: 13%;
        width: 35%;
        background-color: violet;
    }
    .levelBar{
        position: absolute;
        width: 100%;
    }
    #levelBar{
        position: absolute;
        height: 1.7vh;
        left:2%;
        top:7%;
        width: var(--LOGBarLength);
        background: linear-gradient(0.25turn, #1774ee, #3dbb3d, #d38328);
        border-radius: 2vw;
    }
    @keyframes -global-levelBarAnim{
        0%{
            width: var(--LOGBarLength);
        }
        100%{
            width: var(--lBarLength);
        }
    }

    .optionButtonCont{
        position: absolute;
        top: 77%;
        left: 27%;
        opacity: 0;
        animation: tovabbButtonAnim 0.5s 3s forwards;
    }
    @keyframes tovabbButtonAnim{
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
    .optionButton{
        width:13.5vw;
        height:5vw;
        
        background: url(../../lib/assets/mainmenu/optionButton.png);
        background-size: 100% 100%;

        border: none;

        margin-bottom:1vw;
        font-family: "sgGachaFont";
        font-size: 0.8vw;

        position:absolute;
    }
    .optionButtonShadow{
        width:13.5vw;
        height:5vw;
        
        background: url(../../lib/assets/mainmenu/optionButtonShadow.png);
        background-size: 100% 100%;

        border: none;
        position: absolute;
    }
    .optionButton:hover{
        cursor: pointer;
        transform: scale(1.1);
        margin-left: -0.6vw;
        margin-top: -0.6vw;
    }



    :root{
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        overflow: hidden; /* This will hide any content that overflows the body */
        margin: 0; /* Remove default margin to ensure full coverage */
        padding: 0; /* Remove default padding to ensure full coverage */
    }
    .displayNone{display: none;}
    .displayBlock{display: block;}
    .pointerEventsNone{pointer-events:none;}
    .pointerEventsAuto{pointer-events:auto;}
    .tomiCsere{
        z-index: 100000;
        position: absolute;
        top:20vh;
        left: 40vw;
    }

    #guideText{
        margin-top: 20vh;
        text-align: center;
        width: 100vw;
        font-family: 'mainFont';
        color:black;
        position: fixed;
        z-index: 1000;

        animation: guideTextAnim 2s infinite;
    }
    @keyframes guideTextAnim {
        0%{
            scale: 1;
        }
        50%{
            scale: 1.1;
        }
        100%{
            scale: 1;
        }
    }

    .secretSpells{
        position:absolute;
        width: 10vw;
        left: 10vw;
        top: 48vh;
    }
    .secret{
        width:3.3vw;
        height: 3.3vw;
        background-color: transparent;
        border:none;
        background-size: 100% 100%;
        margin: 0.1vw;
    }
    .secret:hover{
        cursor:pointer;
    }
    #secretHover{
        position:absolute;
        left: 16vw;
        top: 40vh;
    }

    .buildingFlexCont{
        position:absolute;
        background-color: rgba(238, 130, 238, 0.103);
        width: calc(var(--buildingScale)*15*1vw);
        height: calc(var(--buildingScale)*40*1vh);
        left: 78vw;
    }
    .buildingCont{
        width: calc(var(--buildingScale)*10*1vw);
        position: relative;
        margin-bottom: calc(var(--buildingScale)*13.5*1vw);
    }
    .buildingFG{
        width: calc(var(--buildingScale)*10*1vw);
        position: absolute;

    }
    .buildingPic{
        width: calc(var(--buildingScale)*8.4*1vw);
        height: calc(var(--buildingScale)*12*1vw);
        position: absolute;
        border-radius: calc(var(--buildingScale)*5*1vw);
        left: calc(var(--buildingScale)*0.8*1vw);
        top: calc(var(--buildingScale)*0.2*1vw);
    }
    .buildingName{
        position: absolute;
        top: calc(var(--buildingScale)*9.8*1vw);
        width: calc(var(--buildingScale)*10*1vw);
        text-align: center;
        font-size: calc(var(--buildingScale)*1*1vw);
        color: rgba(247, 240, 221, 0.778);
        font-family: Impact;
    }

    #startingHandChooser{
        width: 100vw;
        height: 100vh;
        box-sizing: border-box;

        position: fixed;
        top:0;
        left:0;
        display: flex;
        
        z-index: 15;
        background-color: #29252593;

        text-align: center;
        padding-top: 30vh;
    }
    #startingHandChoosers{
        z-index:16;
        position:absolute;
        left:45vw;
        top:70vh;
    }

    #selectingModeBG{
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left:0;
        background-color: rgba(37, 86, 109, 0.377);
        z-index: 15;
    }
    #selectingModeBGEnemy{
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left:0;
        background-color: rgba(37, 86, 109, 0.377);
        z-index: 1500;
    }
    .selectingGameplayfield{
        z-index: 9999;
    }
    #choosingMode{
        width: 100vw;
        height: 100vh;
        box-sizing: border-box;

        position: fixed;
        top:0;
        left:0;
        display: flex;
        
        z-index: 15;
        background-color: #7ad35136;

        text-align: center;
        padding-top: 30vh;
    }
    #cardChoosingModeCont{
        width:100vw;
        height: 50vh;
        padding:0;
        display: flex;
    }

    #visualInteractionInicators{
        position: absolute;
        bottom: 30vh;
        z-index: 1000;
    }
    @keyframes -global-visualIndicatorAnim{
        0%{
            opacity: 0;
            bottom: 20vh;
        }
        20%{
            opacity: 1;
            bottom: 30vh;
        }
        25%{
            opacity: 1;
            bottom: 30vh;
        }
        50%{
            opacity: 1;
            bottom: 28vh;
        }
        75%{
            opacity: 1;
            bottom: 30vh;
        }
        80%{
            opacity: 1;
            bottom: 30vh;
        }
        100%{
            opacity: 0;
            bottom: 20vh;
        }
    }
    @media screen and (min-width: 836px) {
        #visualInteractionInicators{
        left: 12.5vw;
        }
    }
    @media screen and (max-width: 836px) {
        #visualInteractionInicators{
        left: 57vw;
        }
    }



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
            
            transform: rotateX(0deg);
            top:var(--AnimAttackerTop);
            left:var(--AnimAttackerLeft);
        }
        20%{
            transform: rotateX(var(--AnimAttackerXRot));

            top:var(--AnimAttackerTop);
            left:var(--AnimAttackerLeft);
        }
        60%{
            transform: rotateX(var(--AnimAttackerXRot));
            margin-top: var(--AnimAttackerMarginTop);
            top:var(--AnimAttackerTop);
            left:var(--AnimAttackerLeft);
        }
        80%{
            margin-top:0vh;
            transform: rotateX(0deg);
        }
        100%{
            
            transform: rotateX(0deg);
            top:var(--AnimTargetTop);
            left:var(--AnimTargetLeft);
        }
    }

    @keyframes -global-statDmg{
        0%{
            color: white;
            font-size: calc(var(--cardOnBoardScale)*1vw*1.9);
        }
        1%{
            color: red;
            font-size: calc(var(--cardOnBoardScale)*1vw*2.1);
        }
        99%{
            color: red;
            font-size: calc(var(--cardOnBoardScale)*1vw*2.1);
        }
        100%{
            color: white;
            font-size: calc(var(--cardOnBoardScale)*1vw*1.9);
        }
    }
    @keyframes -global-statHeal{
        0%{
            color: white;
            font-size: calc(var(--cardOnBoardScale)*1vw*1.9);
        }
        1%{
            color: green;
            font-size: calc(var(--cardOnBoardScale)*1vw*2.1);
        }
        99%{
            color: green;
            font-size: calc(var(--cardOnBoardScale)*1vw*2.1);
        }
        100%{
            color: white;
            font-size: calc(var(--cardOnBoardScale)*1vw*1.9);
        }
    }


    #tritzCoinFlipBG{
        position:absolute;
        top:0;
        left:0;
        width:100vw;
        height:100vh;
        margin:0;
        padding:0;
        z-index:16;

        background-color: rgba(42, 100, 64, 0.74);
    }
    #TritzCoinCont{
        position:absolute;
        width: 55vw;
        left:22.5vw;
        top:39vh;

        display:flex;
        
    }
    .tritzCoinPerspCont{
        perspective: 10vw; /* Adjust the perspective value as needed */
        perspective-origin: 50% 50%;
    }
    .tritzCoin{
        margin: 2vw;
        width:7vw;
        animation: tritzCoin 1s forwards;
    }
    @keyframes tritzCoin {
        0%{
            transform: rotateX(0deg);
            margin-top: 0vh;
        }
        50%{
            transform: rotateX(180deg);
            margin-top: -10vh;
        }
        100%{
            transform: rotateX(360deg);
            margin-top: 0vh;
        }
    }
    #szaszShuffleBG{
        position:absolute;
        top:0;
        left:0;
        width:100vw;
        height:100vh;
        margin:0;
        padding:0;
        z-index:16;

        background-color: rgba(100, 55, 42, 0.74);
    }
    #shuffleGif{
        width:30vw;
        height:30vh;
        position:absolute;
        left:35vw;
        top:6vh;
    }
    #frenchCardCont{
        position:absolute;
        width: 80vw;
        left:10vw;
        top:39vh;

        display:grid;
        grid-template-rows: auto auto; /* Two rows */
        grid-template-columns: repeat(7, 1fr); /* Eight columns with equal width */
        
    }
    .frenchCard{
        margin:1vw;
        width: 10vw;
        height: 15vw;
        background-color: antiquewhite;
        border-radius: 1vw;

        z-index:17;
        animation: frenchCardInAnim 0.5s forwards;
        position: relative;
    }
    .frenchCardIcon{
        width: 2vw;
        position:absolute;  
    }
    .frenchCardNumber{
        position: absolute;
        font-size:5vw;
        left:35%;
        top:30%;
    }
    @keyframes frenchCardInAnim {
        0%{
            opacity: 0;
            margin-top:10vh;
            scale: 0.6;
        }
        80%{
            opacity: 1;
            margin-top:-3vh;
            scale: 1;
        }
        100%{
            opacity: 1;
            margin-top:0vh;
            scale: 1;
        }
    }
    @keyframes -global-pikkDamaBingo {
        0%{
            background-color: antiquewhite;
            scale: 1;
        }
        50%{
            background-color: green;
            scale: 1.2;
        }
        100%{
            background-color: antiquewhite;
            scale: 1;
        }
    }



    .cardAwake{
        filter: drop-shadow(-0.3vw -0.3vw 0.1vw rgb(49, 199, 4)) drop-shadow(0.25vw 0.25vw 0.1vw rgb(49, 199, 4));
    }
    .cardInAttackingMode{
        transform: scale(1.1);
        filter: drop-shadow(-0.3vw -0.3vw 0.1vw rgb(27, 78, 173)) drop-shadow(0.3vw 0.3vw 0.1vw rgb(27, 78, 173));
    }
    .NotcardOnBoardInTargetMode{
        transform: scale(0.95);
        filter: grayscale(0.7) brightness(65%);
    }
    .NotKoOnBoardInTargetMode{
        transform: scale(0.95);
        filter: brightness(40%) contrast(60%);
    }
    .cardOnBoardInTargetMode{
        filter: drop-shadow(-0.4vw -0.4vw 0.1vw rgb(167, 36, 36)) drop-shadow(0.4vw 0.4vw 0.1vw rgb(167, 36, 36));
    }
    .cardOnBoardInTargetMode:hover {
        transform: scale(1.1);
        cursor: pointer;
    }

    .cardOnBoardInSelectMode{
        filter: drop-shadow(-0.3vw -0.3vw 0.1vw rgb(0, 140, 255)) drop-shadow(0.3vw 0.3vw 0.1vw rgb(0, 140, 255));
        scale: 1.1;
        z-index: 9999;
    }
    .cardOnBoardInSelectMode:hover {
        transform: scale(1.1);
        cursor: pointer;
    }



    #actionLog{
        position: absolute;

        width: 25.5vw;
        height: 58vh;

        top: 20vh;
        left: 2.5vw;

        background-image: url("../../lib/assets/gameplay/ActionLog.png");
        background-size: 100% 100%;

        padding-top: 1vh;
        padding-left: 1vw;
    }
    #actionLog:hover{
        cursor: pointer;
    }
    #logOpenClose{
        position: absolute;
        bottom: 0;
    }
    .actionButtonClass{
        border: none;
        background: transparent;
        font-family: "ShadowLight";
        font-size: 1.5vw;

        position: absolute;
        top: 66vh;

        z-index: 11;
        opacity: 0.7;
    }
    .actionButtonClass:hover{
        cursor: pointer;
        opacity: 1;
    }
    .hover-underline-animation {
        display: inline-block;
        position: relative;
    }
    .hover-underline-animation:after {
        content: '';
        position: absolute;
        width: 90%;
        transform: scaleX(0);
        height: 0.5vh;
        border-radius: 10vw;
        bottom: 0;
        left: 0;
        background-image: linear-gradient(90deg, #ff7474, #ffb56a, #ffff6e, #78ff78, #7979ff, #c379ff, #ff80ff);
        transform-origin: bottom right;
        transition: transform 0.25s ease-out;
    }
    .hover-underline-animation:hover:after {
        transform: scaleX(1);
        transform-origin: bottom left;
    }

    .actionLogHidden{
        z-index: -10;
    }
    .actionLogHidden:hover{
        margin-left: -1vw;
        cursor: pointer;
    }
    .actionLogDisplayed{
        z-index: 10;
    }


    .playerNameCont{
        height: 7vh;
        width: 10vw;

        font-size: 2vw;
        font-family: "sgGachaFont";
        text-align: center;

        background-image: url("../../lib/assets/gameplay/playerSprite.png");
        background-size: 100% 100%;

        position: absolute;
    }
    .playerHpCont{

        position: absolute;

        width: 10vw;
        height: 15vh;

        font-size: 4.5vw;
        font-family: "ShadowLight";
        text-align: center;;
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


    .scribble{
        position: absolute;
        display: block;
        pointer-events: none;
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
        background-size: 100% 100%;
        width: 80vw;
        height: 66vh;

        position: absolute;
        left: 7vw;
        top: 15vh;
    }
    @media screen and (min-width: 836px) {
        :root {
        --cardsScale: 0.4;
        --cardOnBoardScale: 0.57;
        --cardsLogScale: 0.6;
        --cardsChoosingModeScale: 0.65;
        --cardsVAScale: 0.33;
        --buildingScale: 0.5;
    
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
        --cardsLogScale: 0.6;
        --cardsChoosingModeScale: 0.65;
        --cardsVAScale: 0.25;
    
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
        width: 15vw;

    }
    .handCont{
        width: 40vw;
        height: 15vh;

        position: absolute;
        left: 28vw;

        display: flex;
        padding-bottom: 6vh;
    }
    #enemySide{
        margin-top: 3.5vh;
    }


    .gameFiledSides{
        width: 74vw;
        height: 29.5vh; 
        position: relative;
    }
    .boardRows{
        width: 74vw;
        height: 16.25vh;
        position: absolute;
        margin-left: 8vw;
        margin-right: 8vw;
    }
    .boardsCells{
        position:absolute;

        perspective: 10vw; /* Adjust the perspective value as needed */
        perspective-origin: 50% 50%;

        z-index:15;

        width:calc(var(--cardOnBoardScale)*1vw*14.3);
        height: calc(var(--cardOnBoardScale)*1vw*17);
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
    .curCardMultipleIconsContainer{
        position: absolute;
        top: calc(var(--cardsScale)*1vw*20);
        left: calc(var(--cardsScale)*1vw*11);
        width: calc(var(--cardsScale)*1vw*8);
        height: calc(var(--cardsScale)*1vw*2);
        display:flex;
        flex-wrap:nowrap;
        align-content:space-around;
    }
    .curCardTalentIcon{
        position: absolute;
        width: calc(var(--cardsScale)*1vw*3.1);
        top: calc(var(--cardsScale)*1vw*19.6);
        left: calc(var(--cardsScale)*1vw*10.3);
    }
    .curCardTalent{
        position: absolute;
        font-family: "talentFont";
        color: antiquewhite;
        font-size: calc(var(--cardsScale)*1vw*1.2);
        top: calc(var(--cardsScale)*1vw*21.4);
        left: calc(var(--cardsScale)*1vw*13.5);
        width: calc(var(--cardsScale)*1vw*6);
        height: calc(var(--cardsScale)*1vw*1.7);
        padding-left:calc(var(--cardsScale)*1vw*1.9*var(--cardsScale));
    }
    .curCardAlig{
        position: absolute;
        width: calc(var(--cardsScale)*1vw*4);
        left: calc(var(--cardsScale)*1vw*5.8);
        top: calc(var(--cardsScale)*1vw*10);
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
    .curCardMultipleIconsContainerList{
        position: absolute;
        top: calc(var(--cardOnBoardScale)*1vw*13.5);
        left: calc(var(--cardOnBoardScale)*1vw*3.9);
        width: calc(var(--cardOnBoardScale)*1vw*5.2);
        height: calc(var(--cardOnBoardScale)*1vw*2);
        display:flex;
        flex-wrap:nowrap;
        align-content:space-around;
    }
    .curCardAligList{
        position: absolute;
        width: calc(var(--cardOnBoardScale)*1vw*2.2);
        left: calc(var(--cardOnBoardScale)*1vw*1.8);
        top: calc(var(--cardOnBoardScale)*1vw*4.8);

    }
    .curAligListCont{
        position: absolute;
        width: calc(var(--cardOnBoardScale)*1vw*2.2);
        height: calc(var(--cardOnBoardScale)*1vw*2.2);
        left: calc(var(--cardOnBoardScale)*1vw*1.8);
        top: calc(var(--cardOnBoardScale)*1vw*4.8);

        opacity: 0.7;
    }
    @keyframes -global-aligActivateImg{
        0%{
            scale: 1;
        }
        10%{
            scale: 1.1;
            filter: brightness(100%);
        }
        40%{
            scale: 2.7;
            filter: brightness(200%);
        }
        100%{
            scale: 1;
            filter: brightness(100%);
        }
    }
    @keyframes -global-aligActivateConttunya{
        0%{
            opacity: 0.6;
            box-shadow: 0 0 0 0 rgba(113, 166, 117, 0.6);
        }
        10%{
            opacity: 0.7;
            filter: brightness(100%);
            box-shadow: 0 0 0.01vw 0.01vw rgba(113, 166, 117, 0.7);
            scale: 1;
        }
        40%{
            opacity: 0.8;
            filter: brightness(110%);
            box-shadow: 0 0 0.2vw 0.1vw rgba(113, 166, 117, 0.8);
            scale: 1.3;
        }
        100%{
            opacity: 0.6;
            filter: brightness(100%);
            box-shadow: 0 0 0 0 rgba(113, 166, 117, 0.6);
            scale: 1;
        }
    }
    @keyframes -global-aligActivateContlelkiismeretes{
        0%{
            opacity: 0.6;
            box-shadow: 0 0 0 0 rgba(113, 145, 166, 0.6);
        }
        10%{
            opacity: 0.7;
            filter: brightness(100%);
            box-shadow: 0 0 0.01vw 0.01vw rgba(113, 145, 166, 0.7);
            scale: 1;
        }
        40%{
            opacity: 0.8;
            filter: brightness(110%);
            box-shadow: 0 0 0.2vw 0.1vw rgba(113, 145, 166, 0.8);
            scale: 1.3;
        }
        100%{
            opacity: 0.6;
            filter: brightness(100%);
            box-shadow: 0 0 0 0 rgba(113, 145, 166, 0.6);
            scale: 1;
        }
    }
    @keyframes -global-aligActivateContvérszomjas{
        0%{
            opacity: 0.6;
            box-shadow: 0 0 0 0 rgba(166, 113, 118, 0.6);
        }
        10%{
            opacity: 0.7;
            filter: brightness(100%);
            box-shadow: 0 0 0.01vw 0.01vw rgba(166, 113, 118, 0.7);
            scale: 1;
        }
        40%{
            opacity: 0.8;
            filter: brightness(110%);
            box-shadow: 0 0 0.2vw 0.1vw rgba(166, 113, 118, 0.8);
            scale: 1.3;
        }
        100%{
            opacity: 0.6;
            filter: brightness(100%);
            box-shadow: 0 0 0 0 rgba(166, 113, 118, 0.6);
            scale: 1;
        }
    }
    @keyframes -global-aligActivateContveszett{
        0%{
            opacity: 0.6;
            box-shadow: 0 0 0 0 rgba(133, 113, 166, 0.6);
        }
        10%{
            opacity: 0.7;
            filter: brightness(100%);
            box-shadow: 0 0 0.01vw 0.01vw rgba(133, 113, 166, 0.7);
            scale: 1;
        }
        40%{
            opacity: 0.8;
            filter: brightness(110%);
            box-shadow: 0 0 0.2vw 0.1vw rgba(133, 113, 166, 0.8);
            scale: 1.3;
        }
        100%{
            opacity: 0.6;
            filter: brightness(100%);
            box-shadow: 0 0 0 0 rgba(133, 113, 166, 0.6);
            scale: 1;
        }
    }
    .curCardFieldEffectList{
        position: absolute;
        width: calc(var(--cardOnBoardScale)*1vw*3);
        left: calc(var(--cardOnBoardScale)*1vw*10.2);
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
            top: -10vh;
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
        max-width: 51vh;
        position: absolute;
        left: 0;
    }
    #rarityBGLog{
        position: absolute;
        width: calc(var(--cardsLogScale)*1vw*20);
        height: calc(var(--cardsLogScale)*1vw*20);
        max-width: 23.8vh;

        left: calc(var(--cardsLogScale)*1vw*6);
        top: calc(var(--cardsLogScale)*1vw*2.5);

        opacity: 0.35;
    }
    #curCardInViewLog{
        position: absolute;
        width: calc(var(--cardsLogScale)*1vw*14);
        max-width: 16.66vh;
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
        max-width: 9.8vw;
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
        max-width: 2.975vh;
        height: calc(var(--cardsLogScale)*1vw*2);
        display:flex;
        flex-wrap:nowrap;
        align-content:space-around;
    }
    .curCardTalentIconLog{
        position: absolute;
        width: calc(var(--cardsLogScale)*1vw*3.1);
        max-width: 5.27vh;
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
        max-width: 10.2vh;
        height: calc(var(--cardsLogScale)*1vw*1.7);
        padding-left:calc(var(--cardsLogScale)*1vw*1.9*var(--cardsLogScale));
    }
    .curCardAligLog{
        position: absolute;
        width: calc(var(--cardsLogScale)*1vw*4);
        left: calc(var(--cardsLogScale)*1vw*5.8);
        top: calc(var(--cardsLogScale)*1vw*10);
    }

    .previewInChoosingMode{
        position: relative;
        border: none;
        background: none;
    }
    .previewInChoosingMode:hover{
        cursor: pointer;
        scale: 1.05;
        filter: drop-shadow(-0.6vw -0.6vw 3px rgba(113, 148, 223, 0.719)) drop-shadow(0.6vw 0.6vw 3px rgba(113, 148, 223, 0.719));

    }
    .cardTemplateChoosingMode{
        width: calc(var(--cardsChoosingModeScale)*1vw*30);
        position: absolute;
        left: 0;
    }
    #rarityBGChoosingMode{
        position: absolute;
        width: calc(var(--cardsChoosingModeScale)*1vw*20);
        height: calc(var(--cardsChoosingModeScale)*1vw*20);

        left: calc(var(--cardsChoosingModeScale)*1vw*6);
        top: calc(var(--cardsChoosingModeScale)*1vw*2.5);

        opacity: 0.35;
    }
    #curCardInViewChoosingMode{
        position: absolute;
        width: calc(var(--cardsChoosingModeScale)*1vw*14);
        left: calc(var(--cardsChoosingModeScale)*1vw*8.5);
        top: calc(var(--cardsChoosingModeScale)*1vw*5);

        box-shadow: 0 0 calc(var(--cardsChoosingModeScale)*1vw*1.3) rgba(0, 0, 0, 0.735);
    }
    .curCardStatsChoosingMode{
        font-size: calc(var(--cardsChoosingModeScale)*1vw*3);
        font-family: 'SevenSwords';
        color: white;
        text-shadow:
                -0.08vw -0.08vw 0 #000, /* Top-left shadow */
                0.08vw -0.08vw 0 #000, /* Top-right shadow */
                -0.08vw 0.08vw 0 #000, /* Bottom-left shadow */
                0.08vw 0.08vw 0 #000; /* Bottom-right shadow */

        position: absolute;
        top: calc(var(--cardsChoosingModeScale)*1vw*26.7);
    }
    .curCardCostChoosingMode{
        font-size: calc(var(--cardsChoosingModeScale)*1vw*5);
        font-weight: bold;
        font: italic;
        font-family: 'ShadowLight';
        color: rgb(184, 11, 11);

        position: absolute;
        top: calc(var(--cardsChoosingModeScale)*1vw*2.5);
        left: calc(var(--cardsChoosingModeScale)*1vw*7);
    }
    .curCardNameChoosingMode{
        font-size: calc(var(--cardsChoosingModeScale)*1vw*2);
        font-family: Impact;
        color: rgba(247, 240, 221, 0.778);
        text-shadow: 0 0 calc(var(--cardsChoosingModeScale)*1vw*1) rgba(0, 0, 0, 0.536);

        position: absolute;
        top: calc(var(--cardsChoosingModeScale)*1vw*18.2);
        left: calc(var(--cardsChoosingModeScale)*1vw*5.5);

        text-align: center;
        width: calc(var(--cardsChoosingModeScale)*1vw*20);
    }
    #curCardDescChoosingMode{
        font-family: Arial, Helvetica, sans-serif;
        color: rgba(0, 0, 0, 0.778);
        font-weight: bold;
        font-size: calc(var(--cardsChoosingModeScale)*1vw*1.3);

        position: absolute;
        top: calc(var(--cardsChoosingModeScale)*1vw*23);
        left: calc(var(--cardsChoosingModeScale)*1vw*8.3);

        width: calc(var(--cardsChoosingModeScale)*1vw*14);
        text-align: center;
        overflow: auto;
        height: calc(var(--cardsChoosingModeScale)*1vw*6);
    }
    #curCardRarityChoosingMode{
        position: absolute;
        left: calc(var(--cardsChoosingModeScale)*1vw*8.5);
        width: calc(var(--cardsChoosingModeScale)*1vw*13.8);
        text-align: center;
        mix-blend-mode: screen;
    }
    .curCardMultipleIconsContainerChoosingMode{
        position: absolute;
        top: calc(var(--cardsChoosingModeScale)*1vw*19.6);
        left: calc(var(--cardsChoosingModeScale)*1vw*10.3);
        width: calc(var(--cardsChoosingModeScale)*1vw*5.2);
        height: calc(var(--cardsChoosingModeScale)*1vw*2);
        display:flex;
        flex-wrap:nowrap;
        align-content:space-around;
    }
    .curCardTalentIconChoosingMode{
        position: absolute;
        width: calc(var(--cardsChoosingModeScale)*1vw*3.1);
        top: calc(var(--cardsChoosingModeScale)*1vw*19.6);
        left: calc(var(--cardsChoosingModeScale)*1vw*10.3);
    }
    .curCardTalentChoosingMode{
        position: absolute;
        font-family: "talentFont";
        color: antiquewhite;
        font-size: calc(var(--cardsChoosingModeScale)*1vw*1.2);
        top: calc(var(--cardsChoosingModeScale)*1vw*21.4);
        left: calc(var(--cardsChoosingModeScale)*1vw*13.5);
        width: calc(var(--cardsChoosingModeScale)*1vw*6);
        height: calc(var(--cardsChoosingModeScale)*1vw*1.7);
        padding-left:calc(var(--cardsChoosingModeScale)*1vw*1.9*var(--cardsChoosingModeScale));
    }
    .curCardAligChoosingMode{
        position: absolute;
        width: calc(var(--cardsChoosingModeScale)*1vw*4);
        left: calc(var(--cardsChoosingModeScale)*1vw*5.8);
        top: calc(var(--cardsChoosingModeScale)*1vw*10);
    }


    .previewInVA{
        position: relative;
        border: none;
        margin: none;
        background: none;
    }
    .cardTemplateVA{
        width: calc(var(--cardsVAScale)*1vw*30);
        position: absolute;
        left: 0;
    }
    #rarityBGVA{
        position: absolute;
        width: calc(var(--cardsVAScale)*1vw*20);
        height: calc(var(--cardsVAScale)*1vw*20);

        left: calc(var(--cardsVAScale)*1vw*6);
        top: calc(var(--cardsVAScale)*1vw*2.5);

        opacity: 0.35;
    }
    #curCardInViewVA{
        position: absolute;
        width: calc(var(--cardsVAScale)*1vw*14);
        left: calc(var(--cardsVAScale)*1vw*8.5);
        top: calc(var(--cardsVAScale)*1vw*5);

        box-shadow: 0 0 calc(var(--cardsVAScale)*1vw*1.3) rgba(0, 0, 0, 0.735);
    }
    .curCardStatsVA{
        font-size: calc(var(--cardsVAScale)*1vw*3);
        font-family: 'SevenSwords';
        color: white;
        text-shadow:
                -0.08vw -0.08vw 0 #000, /* Top-left shadow */
                0.08vw -0.08vw 0 #000, /* Top-right shadow */
                -0.08vw 0.08vw 0 #000, /* Bottom-left shadow */
                0.08vw 0.08vw 0 #000; /* Bottom-right shadow */

        position: absolute;
        top: calc(var(--cardsVAScale)*1vw*26.7);
    }
    .curCardCostVA{
        font-size: calc(var(--cardsVAScale)*1vw*5);
        font-weight: bold;
        font: italic;
        font-family: 'ShadowLight';
        color: rgb(184, 11, 11);

        position: absolute;
        top: calc(var(--cardsVAScale)*1vw*2.5);
        left: calc(var(--cardsVAScale)*1vw*7);
    }
    .curCardNameVA{
        font-size: calc(var(--cardsVAScale)*1vw*2);
        font-family: Impact;
        color: rgba(247, 240, 221, 0.778);
        text-shadow: 0 0 calc(var(--cardsVAScale)*1vw*1) rgba(0, 0, 0, 0.536);

        position: absolute;
        top: calc(var(--cardsVAScale)*1vw*18.2);
        left: calc(var(--cardsVAScale)*1vw*5.5);

        text-align: center;
        width: calc(var(--cardsVAScale)*1vw*20);
    }
    #curCardDescVA{
        font-family: Arial, Helvetica, sans-serif;
        color: rgba(0, 0, 0, 0.778);
        font-weight: bold;
        font-size: calc(var(--cardsVAScale)*1vw*1.3);

        position: absolute;
        top: calc(var(--cardsVAScale)*1vw*23);
        left: calc(var(--cardsVAScale)*1vw*8.3);

        width: calc(var(--cardsVAScale)*1vw*14);
        max-width: 9.8vw;
        text-align: center;
        overflow: auto;
        height: calc(var(--cardsVAScale)*1vw*6);
    }
    #curCardRarityVA{
        position: absolute;
        left: calc(var(--cardsVAScale)*1vw*8.5);
        width: calc(var(--cardsVAScale)*1vw*13.8);
        text-align: center;
        mix-blend-mode: screen;
    }
    .curCardMultipleIconsContainerVA{
        position: absolute;
        top: calc(var(--cardsVAScale)*1vw*13.5);
        left: calc(var(--cardsVAScale)*1vw*3.9);
        width: calc(var(--cardsVAScale)*1vw*5.2);
        height: calc(var(--cardsVAScale)*1vw*2);
        display:flex;
        flex-wrap:nowrap;
        align-content:space-around;
    }
    .curCardTalentIconVA{
        position: absolute;
        width: calc(var(--cardsVAScale)*1vw*3.1);
        top: calc(var(--cardsVAScale)*1vw*19.6);
        left: calc(var(--cardsVAScale)*1vw*10.3);
    }
    .curCardTalentVA{
        position: absolute;
        font-family: "talentFont";
        color: antiquewhite;
        font-size: calc(var(--cardsVAScale)*1vw*1.2);
        top: calc(var(--cardsVAScale)*1vw*21.4);
        left: calc(var(--cardsVAScale)*1vw*13.5);
        width: calc(var(--cardsVAScale)*1vw*6);
        height: calc(var(--cardsVAScale)*1vw*1.7);
        padding-left:calc(var(--cardsVAScale)*1vw*1.9*var(--cardsVAScale));
    }
    .curCardAligVA{
        position: absolute;
        width: calc(var(--cardsVAScale)*1vw*4);
        left: calc(var(--cardsVAScale)*1vw*5.8);
        top: calc(var(--cardsVAScale)*1vw*10);
    }
</style>
