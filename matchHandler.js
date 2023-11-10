import * as Client from "./client"
import * as Cards from "./card"

import "./routes/matchScreen/+page.svelte"

//MATCH HANDLING
export let currentMatch = {
    player1: undefined,
    player2: undefined
}
export let currentOpponentId = ""

let yourGameID = ""
let opponentGameID = ""
let gameKey = ""

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
        window.location.href = "./gameplayScreen"
    }
}


Client.socket.on('connect', () => {
    console.log(`Connected with ID: ${Client.socket.id}`);
    console.log("loaded");


    Client.socket.on(gameKey, msg => {
        console.log("msg");
        if(msg.includes("Ready")){
            if(msg.includes(opponentGameID)){
                console.log("game msg got: ",msg);
            opponentIsReady = true
            console.log(youAreReady, opponentIsReady);
            if(youAreReady && opponentIsReady){
                
                console.log("LETS GOOOOOOOOOOOOOOOOOOOOOOOOO");
                window.location.href = "./gameplayScreen"
            }
            }
        }
        else{
            msg = JSON.parse(msg)
            if(msg.gameId != yourGameID){
                //enemyGameParameters = msg
                console.log("from server, enemyGameParamters: ",msg);
                localStorage.setItem("opponentGameParams", JSON.stringify(msg));
            }
        }
        
    })
});


export function SendGameData(data){
    Client.socket.emit(gameKey, JSON.stringify(data))
}



