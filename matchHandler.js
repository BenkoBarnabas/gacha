import * as Client from "./client"

//MATCH HANDLING
export let currentMatch = {
    player1: undefined,
    player2: undefined
}
export let currentOpponentId = ""
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
        window.alert(`made match with: ${currentOpponentId}`)
        currentOpponentId = msg.replace(Client.clientID,"")
    }
    //window.alert("made match with: ",currentOpponentId)
})