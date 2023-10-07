//let ip = "10.7.147.201";
let ip = "localhost";

let userId = "1" //ph obvs

// ES modules
import io from "socket.io-client";

const socket = io(`http://${ip}:3000` , { transports : ['websocket'] }); // Replace with your server's URL
export let clientID

socket.on('connect', () => {
  console.log(`Connected with ID: ${socket.id}`);
  clientID = socket.id
});

socket.on('disconnect', () => {
  console.log(`Disonnected with ID: ${socket.id}`);
});


let dataFromServer

export function sendSocketValue(columnName,id,tableName,storage){
  const query = {
    column: columnName,
    id: id,
    table: tableName,
  }
  console.log("client send: ",query);
  socket.emit(columnName, query)

  if(columnName != "*" && tableName == "account" || "deck"){
    socket.on(columnName, msg => {
      //console.log("client got: ",msg);
      console.log("megjött: "+columnName,msg);
      storage[columnName] = msg
      //console.log("stroage: ",storage.value);
    })
  }
  
}


export let lobby = []

export function LoadLobby(user){ //user: {username: "", id: ""}
  user.id = clientID
  console.log("connected user: ",user);
  socket.emit("loadLobby", user)

  socket.on("loadLobby", msg => {
    lobby = msg
    console.log("users in lobby after got: ", lobby);
  })
  lobby = lobby
}

export function ReloadLobby(){
  socket.emit("reloadLobby","hewo")

  socket.on("reloadLobby", msg => {
    lobby = msg
    //console.log("users in lobby: ", lobby);
  })
  lobby = lobby
}








export let responsData = ""
export var Cpity4S = 0 // C = client
export var Cpity5S = 0
export var CpityUR = 0

export function sendData(columnName,dataToSend,id,tableName) { //export == public, we import it in the main.svelte

    fetch(`http://${ip}:3000/sendData`, { //the "function" id i talked about in server ("sendData" here)
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ column: columnName, data: String(dataToSend), id: id, table:tableName}), //body is the shit we send, the rest is costums, here its an object
    })
    .then(response => { //this .then(respons...) is again just syntax and costums, doesnt really matter that much in POST
        if (response.ok) {
        } else {
        throw new Error('Failed to send data to server');
        }
    })
    .catch(error => {
        console.error(error);
    });
}

export function getData(columnName,id,tableName) { //i dont really understand this, but it works
  fetch(`http://${ip}:3000/getData`, { //the "function" id i talked about in server ("sendData" here)
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify({column: columnName, id: id,table: tableName}), //body is the shit we send, the rest is costums, here its an object
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to send data');
    }
  })
  .then(data => {
    // Handle the data received from the server
    if (id == "0"){
      responsData = data.data
    }
    else if (columnName == "*"){
      responsData = data.data[0];
    }
    else {
      if(columnName == "pity4S"){
        Cpity4S = data.data[0][columnName];
      }
      else if(columnName == "pity5S"){
        Cpity5S = data.data[0][columnName];
      }
      else if(columnName == "pityUR"){
        CpityUR = data.data[0][columnName];
      }
      else { //nagyon csúnya but thats literally the best i can do w the unconsistent respons time of the server :(
        responsData = data.data[0][columnName];
      }
    }
    console.log(responsData);
  })
  .catch(error => {
    console.error(error);
  });
  //console.log("res data: " + responsData);
}


export function DeleteAll(tableName){
  fetch(`http://${ip}:3000/delTable`, { //the "function" id i talked about in server ("sendData" here)
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({table:tableName}), //body is the shit we send, the rest is costums, here its an object
    })
}

export function DeleteRow(tableName,id){
  fetch(`http://${ip}:3000/delRow`, { //the "function" id i talked about in server ("sendData" here)
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({table:tableName, id: id}), //body is the shit we send, the rest is costums, here its an object
    })
}

export function AddEmptyRow(tableName){
  fetch(`http://${ip}:3000/api/add-row`, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify({table:tableName}),
  })
  .then(response => {
      if (response.ok) {
      console.log("added empty row");
      } else {
      throw new Error('Failed to send data to server');
      }
  })
  .catch(error => {
      console.error(error);
  });
}