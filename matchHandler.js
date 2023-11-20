import * as Client from "./client"
import * as Cards from "./card"

import "./routes/matchScreen/+page.svelte"

let domLoaded = false

//MATCH HANDLING
export let currentMatch = {
    player1: undefined,
    player2: undefined
}
export let currentOpponentId = ""


let yourGameID = ""
let opponentGameID = ""
let gameKey = ""

export let yourGameParametersClient = {currentHand: []}
export let enemyGameParametersClient = {currentHand: []}


export function DomLoaded(){
    yourGameParametersClient = JSON.parse(localStorage.getItem("yourGameParams"))
    enemyGameParametersClient = JSON.parse(localStorage.getItem("opponentGameParams"))
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
    Client.socket.emit(gameKey,JSON.stringify(`${yourGameID}trueReady`))
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
let socketConnectedEvent
function WaitForDomPage(){
    if(!domLoaded && !connectedToSocket){
        setTimeout(() => {
            WaitForDomPage()
        }, 10);
    }
    else{
        socketConnectedEvent = new Event('socketConnected');
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
        
        if(msg.includes("Ready")){
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
        else{
            msg = JSON.parse(msg)
            if(msg.gameId != yourGameID){
                //enemyGameParameters = msg
                console.log("from server, enemyGameParamters: ",msg);
                localStorage.setItem("opponentGameParams", JSON.stringify(msg));
                enemyGameParametersClient = msg
            }
        }
        
    })
}
Client.socket.on('disconnect', () => {
    console.log(`Disonnected with ID: ${socket.id}`);
    Client.socket.emit("disconnect",`${yourGameID}DisconnectedWithSocket`)
});

export function SendGameData(data){
    Client.socket.emit(gameKey, JSON.stringify(data))
    console.log(`${Date.now()}: game data sent: `,yourGameID);
}


//MAIN
WaitForDomPage()



