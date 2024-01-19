import * as Client from "./client"
import * as Cards from "./card"



import "./routes/matchScreen/+page.svelte"

let domLoaded = false
let gameplayScreenLoaded = false

//MATCH HANDLING
export let currentMatch = {
    player1: undefined,
    player2: undefined
}
export let currentOpponentId = ""


let yourGameID = ""
let opponentGameID = ""
let gameKey = ""

export let lastCardPlayedClient = ""

export let yourGameParametersClient = {isYourTurn: "",currentHand: [],remaningDeck: [], yourBoard: Array(10).fill(""), mana: 0, spellMana: 0, username: "", hp: 0, secretSpells: []}
export let enemyGameParametersClient = {isYourTurn: "",currentHand: [],remaningDeck: [], yourBoard: Array(10).fill(""), mana: 0, spellMana: 0, username: "", hp: 0, secretSpells: []}


export function DomLoaded(){
    yourGameParametersClient = JSON.parse(localStorage.getItem("yourGameParams"))
    enemyGameParametersClient = JSON.parse(localStorage.getItem("opponentGameParams"))
    console.log("enemy and your game paramts, clinet: ",yourGameParametersClient, enemyGameParametersClient);
    gameplayScreenLoaded = true
    yourGameParametersClient.mana = 10
}


export function GetGameIDs(you,opponent,gk){
    yourGameID = you
    opponentGameID = opponent
    gameKey = gk
}


export function sendMatchRequest(id){
    currentOpponentId = id
    console.log(Client.clientID+currentOpponentId);
    Client.socket.emit("makeMatchSocket",Client.clientID+currentOpponentId)
    Client.socket.on(Client.clientID+currentOpponentId, msg => {
      console.log(msg);
    })
}
Client.socket.on("makeMatchSocket", msg => {
    console.log("socket on makeMatch: ",msg);
    if(msg.includes(Client.clientID)){
        currentOpponentId = msg.replace(Client.clientID,"")

        
        localStorage.setItem("yourGameID", JSON.stringify(Client.clientID));
        localStorage.setItem("opponentGameID", JSON.stringify(currentOpponentId));
        localStorage.setItem("gameKey", JSON.stringify(msg))

        window.alert(`made match with: ${currentOpponentId}`)
    }
    //window.alert("made match with: ",currentOpponentId)
})


export let youAreReady = false
export let opponentIsReady = false
export function PlayerReady(){
    var msg = yourGameID + "trueReady"
    Client.socket.emit(gameKey,msg)
    youAreReady = true
    console.log("ready vagy te");

    if(youAreReady && opponentIsReady){
        console.log("LETS GOOOOOOOOOOOOOOOOOOOOOOOOO");
        Client.socket.emit("newPage",`${yourGameID}DisconnectedWithSocket`)
        window.location.href = "./gameplayScreen"

    }
}

export let connectedToSocket = false

Client.socket.on('connect', () => {
    console.log(`${Date.now()}: Connected with ID: ${Client.socket.id}`);
    connectedToSocket = true
});


export function SveltePageLoaded(){
    domLoaded = true
}
//events (for communication)
let socketConnectedEvent
let nextTurnEvent
let updateEvent
let actionLogEvent
let aligmentAnimEvent
let cardDmgAnimEvent
let summoningLocationEvent
let cardAttackAnimEvent

let bizsoEndTurnEvent

function WaitForDomPage(){
    if(!domLoaded && !connectedToSocket){
        setTimeout(() => {
            WaitForDomPage()
        }, 10);
    }
    else{
        socketConnectedEvent = new Event('socketConnected');
        nextTurnEvent = new Event("nextTurn")
        updateEvent = new Event("updateParams")
        actionLogEvent = new Event("actionLog")
        aligmentAnimEvent = new Event("cellAligmentAnim")
        cardDmgAnimEvent = new Event("cardDmgAnim")
        summoningLocationEvent = new Event("summoningLocationEvent")
        cardAttackAnimEvent = new Event("cardAttackAnimEvent")

        bizsoEndTurnEvent = new Event("bizsoEndTurn")
        ServerCode()
    }
}
function ServerCode(){
    console.log("ready for server code");
    yourGameID = JSON.parse(localStorage.getItem("yourGameID"))
    opponentGameID = JSON.parse(localStorage.getItem("opponentGameID"))
    gameKey = JSON.parse(localStorage.getItem("gameKey"))

    Client.socket.emit(gameKey,JSON.stringify(`${yourGameID}SocketConnectionEstablished`))

    Client.socket.on(gameKey, msg => {
        console.log("msg");
        
        if(msg.includes("trueReady")){
            console.log("Ready msg got: ",msg);
            if(msg.includes(opponentGameID)){
                
            opponentIsReady = true
            console.log(youAreReady, opponentIsReady);
            if(youAreReady && opponentIsReady){
                console.log("LETS GOOOOOOOOOOOOOOOOOOOOOOOOO");
                window.location.href = "./gameplayScreen"
            }
            }
        }
        else if(msg.includes("SocketConnectionEstablished")){
            console.log(`${Date.now()}: connected msg got: `,msg);
            console.log(opponentGameID);
            if(msg.includes(opponentGameID)){
                console.log(`${Date.now()}: opponent connected`);
                document.dispatchEvent(socketConnectedEvent);
            }
            
        }
        else if(msg.includes("isFirst")){
            console.log(msg);
            if(yourGameParametersClient.isYourTurn == ""){
                yourGameParametersClient.isYourTurn = true
            
                if(msg.includes(yourGameID)){
                    yourGameParametersClient.isYourTurn = true
                    enemyGameParametersClient.isYourTurn = false
                }
                else{
                    yourGameParametersClient.isYourTurn = false
                    enemyGameParametersClient.isYourTurn = true
                    
                }
                console.log("FIRSTLOG: ",msg,yourGameParametersClient,enemyGameParametersClient)
                localStorage.setItem("yourGameParams", JSON.stringify(yourGameParametersClient));
                localStorage.setItem("opponentGameParams", JSON.stringify(enemyGameParametersClient));
            }
            
        }
        else if(msg.includes("TurnEnded")){
            enemyGameParametersClient.isYourTurn = !enemyGameParametersClient.isYourTurn
            document.dispatchEvent(nextTurnEvent);
            document.dispatchEvent(updateEvent)
        }
        else if(msg.includes("ActionLog")){
            var side
            msg.includes(yourGameID) ? side = "your" : side = "enemy"
            var card = msg.replace("ActionLog","")
            var cardLegit
            side == "your" ? cardLegit = card.replace(yourGameID,"") : cardLegit = card.replace(opponentGameID,"")
            lastCardPlayedClient = {card: JSON.parse(cardLegit), side: side}
            document.dispatchEvent(actionLogEvent)
        }
        else if(msg.includes("CellAligmentAnimation")){
            aligmentAnimEvent.data = msg.replace("CellAligmentAnimation","")
            document.dispatchEvent(aligmentAnimEvent)
        }
        else if(msg.includes("CardDmgAnimation")){
            var params = JSON.parse(msg.replace("CardDmgAnimation",""))
            params.side == yourGameID ? params.side = "your" : params.side = "enemy"
            params.side == "enemy" ? params.domId = `e${params.domId}` : {}
            cardDmgAnimEvent.data = params
            document.dispatchEvent(cardDmgAnimEvent)
        }
        else if(msg.includes("BizsoEndTurn")){
            document.dispatchEvent(bizsoEndTurnEvent)
        }
        else if(msg.includes("SummoningLocationChoosing")){
            var data = JSON.parse(msg.replace("SummoningLocationChoosing",""))
            data.side == yourGameID ? data.side = "your" : data.side = "enemy"
            summoningLocationEvent.data = data

            document.dispatchEvent(summoningLocationEvent)
        }
        else if(msg.includes("CardAttackAnimation")){
            var data = JSON.parse(msg.replace("CardAttackAnimation",""))
            data.side == yourGameID ? data.side = "td" : data.side = "etd"
            cardAttackAnimEvent.data = data
            document.dispatchEvent(cardAttackAnimEvent)
        }
        else{
            msg = JSON.parse(msg)
            if(msg.gameId != yourGameID){
                //enemyGameParameters = msg
                console.log("from server, enemyGameParamters: ",msg);
                //localStorage.setItem("opponentGameParams", JSON.stringify(msg));
                enemyGameParametersClient = msg

                if(enemyGameParametersClient.yourBoard.length == 0){
                    console.log("üres vót");
                    enemyGameParametersClient.yourBoard = Array(10).fill("")
                }
            }
            else if(msg.gameId == yourGameID){
                console.log("from server, yourGameParamters: ",msg);
                //localStorage.setItem("yourGameParams", JSON.stringify(msg));
                yourGameParametersClient = msg

                if(yourGameParametersClient.yourBoard.length == 0){
                    console.log("üres vót");
                    yourGameParametersClient.yourBoard = Array(10).fill("")
                }
            }
            document.dispatchEvent(updateEvent)
            
        }
        
    })
}
Client.socket.on('disconnect', () => {
    //Client.socket.emit("disconnect",`${yourGameID}DisconnectedWithSocket`)
});

export function SendGameDataClient(data){
    data.gameId == yourGameID ? yourGameParametersClient = data : {}
    Client.socket.emit(gameKey, JSON.stringify(data))
    console.log(`${Date.now()}: game data sent: `,yourGameID);
}




//GAMEPLAY------------------------------------------
//-------------------------------------------------------------------------------------------
export function EndTurn(){
    Client.socket.emit(gameKey,"TurnEnded")
}

export function CardAttackAnimation(enemyi,youri){
    var msg = {
        attackerI: youri,
        defenderI: enemyi,
        side: yourGameID
    }
    console.log("ANIMLOG client: ",msg)
    
    Client.socket.emit(gameKey,`CardAttackAnimation${JSON.stringify(msg)}`)
}

export function LastActionLog(card){
    
    Client.socket.emit(gameKey,`${yourGameID}ActionLog${JSON.stringify(card)}`)
    console.log("ACTIONLOG: ",`ActionLog${JSON.stringify(card)}`);
}
export function CellAligmentAnimation(targetId){
    Client.socket.emit(gameKey,`CellAligmentAnimation${targetId}`)
}

export function CardDmgAnimationClient(domId,dmg,side,type){
    side == "your" ? side = yourGameID : side = opponentGameID
    var params = {
        domId: domId,
        dmg: dmg,
        side: side,
        type: type
    }
    Client.socket.emit(gameKey,`CardDmgAnimation${JSON.stringify(params)}`)
}

//gameplay abilties
export function BizsoEndTurnClient(){
    Client.socket.emit(gameKey,"BizsoEndTurn")
}

export function SummoningLocationClient(wether,side){
    var data ={
        side: yourGameID,
        wether: wether
    }
    Client.socket.emit(gameKey,`SummoningLocationChoosing${JSON.stringify(data)}`)
}














//MAIN
WaitForDomPage()





