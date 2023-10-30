import * as Client from "./client"

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


export let yourGameParameters = {
    selectedDeck: "",
    username: Client.userData.username,
    hp: 50,
    currentHand: "",
    remaningDeck: "",
    mana: 2,
    spellMana: 0,
    ko: 8,
    yourBoard: "",
}

export let youAreReady = false
export let opponentIsReady = false
export function PlayerReady(){
    Client.socket.emit(gameKey,`${yourGameID}trueReady`)
    youAreReady = true
    console.log("ready vagy te");

    if(youAreReady && opponentIsReady){
        console.log("LETS GOOOOOOOOOOOOOOOOOOOOOOOOO");
        window.location.href = "./gameplayScreen"
    }
}

export function SveltePageLoaded(){
    Client.socket.on(gameKey, msg => {
        console.log("game msg got: ",msg);
        if(msg.includes("Ready") && msg.includes(opponentGameID)){
            opponentIsReady = true
            console.log(youAreReady, opponentIsReady);
            if(youAreReady && opponentIsReady){
                console.log("LETS GOOOOOOOOOOOOOOOOOOOOOOOOO");
                window.location.href = "./gameplayScreen"
            }
        }
    })
}

