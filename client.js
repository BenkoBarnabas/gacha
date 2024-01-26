let ip = "10.7.105.209";
//let ip = "localhost";
//let ip = "192.168.0.16//";

let isFullScreen = false
export function requestFullScreen() {
  if(!isFullScreen){
      const elem = document.documentElement; // Whole document
      if (elem.requestFullscreen) {
          elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen(); // Firefox
      } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen(); // Chrome, Safari, and Opera
      } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen(); // IE/Edge
      }
      isFullScreen = true
  }
  else{
      if (document.exitFullscreen) {
          document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen(); // Firefox
      } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen(); // Chrome, Safari, and Opera
      } else if (document.msExitFullscreen) {
          document.msExitFullscreen(); // IE/Edge
      }
      isFullScreen = false
  }
}


export let userData = {
  id: "",
  username: "",
  email: "",
  password: "",
  level: "",
  xp: "",
  gachaCurrency: "",
  tickets: ""
}
export let pullData = {
  pity4S: "",
  pity5S: "",
  pityUR: "",
  pullHistory: "",
  id: ""
}
export let deckData = {
  id: "",
  deckarray1: "",
  deckarray2: "",
  deckarray3: "",
  deckarray4: ""
}

export function getUserDataFromLocalStorage(data, key){
  console.log(data);
  console.log(key);
  switch (key) {
    case "userData":
      userData = data
      console.log("hello john doe: ",userData);
      break;
    case "pullData":
      pullData = data
      console.log("hello john doe: ",pullData);
      break;
    case "deckData":
      deckData = data
      console.log("hello john doe: ",deckData);
      break;
    default:
      break;
  }
}

  
// ES modules
import io from "socket.io-client";

export const socket = io(`http://${ip}:3000` , { transports : ['websocket'] }); // Replace with your server's URL
export let clientID

socket.on('connect', () => {
  console.log(`Connected with ID: ${socket.id}`);
  clientID = socket.id
});

socket.on('disconnect', () => {
  console.log(`Disonnected with ID: ${socket.id}`);
});



export function sendSocketValue(columnName,id,tableName,storage){
  const query = {
    column: columnName,
    id: id,
    table: tableName,
  }
  console.log("client send: ",query);
  if(tableName == "account" ||tableName == "deck"){
    socket.emit(columnName,query)
    console.log("account, deck");
  }
  //socket.emit(columnName, query)

  if(columnName != "*" && tableName == "account" ||tableName == "deck"){
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

export function getAccountData(email){
  var data = {
    email: email,
    id: clientID
  }
  socket.emit("getAccountData", data)
  socket.on("getAccountData", data =>{
    if(data.id == clientID){
      console.log("GETDATALOG: ",data);
      userData = data["account"]
      pullData = data["rolls"]
      deckData = data["deck"]
    
      if (pullData.history === "" || pullData.history == undefined || pullData.history == null){
        pullData.history = []
      }
      if (userData.cards == "" || userData.cards == undefined || userData.cards == null){
        userData.cards = ""
      }

      else{
        if (typeof pullData.history != "object"){
          pullData.history= pullData.history.split(',');
        }
      }
      
      for(let i = 0; i<4;i++){
        if(deckData[`deckarray${i}`] == null){
          deckData[`deckarray${i}`] = []
        }
      }
      console.log("account data: ",userData);
      console.log("rolls data: ",pullData);
      console.log("deck data: ",deckData);
      
      

      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("pullData", JSON.stringify(pullData));
      localStorage.setItem("deckData", JSON.stringify(deckData));
      //localUserData = JSON.parse(localStorage.getItem("userData"))
    }
  })
}

export function makeNewAccount(email,password,username){
  var info = {email: email, password: password, username: username, id: clientID}
  socket.emit("makeNewAccount", info)
  socket.on("makeNewAccount", data =>{
    if(data.id == clientID){
      userData = data
      delete userData.id
    console.log("account data: ",userData);
    }
  })
}
export function verifyEmail(email,username) { 

  fetch(`http://${ip}:3000/verifyEmail`, { 
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify({email: email,username:username}),
  })
  .catch(error => {
    console.error(error);
  });
}
export let clientVerificationCode
export function verifyCode(email,code,password,username) { 
  console.log(email,code);
  fetch(`http://${ip}:3000/verifyCode`, { 
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify({email: email,code:code,password: password,username: username}),
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to send data');
    }
  })
  .then(data => {
    console.log(data);
    if(data == "wrong code"){
      window.alert("Hibás kód!")
    }
    else{
      console.log("succsessful login");
      clientVerificationCode = data
      console.log(clientVerificationCode);
    }
  })
  .catch(error => {
    console.error(error);
  });
}


export function setProfilePicture(formData){
  console.log("formDAta: ",formData);
  fetch(`http://${ip}:3000/upload-profile-picture`, {
        method: 'POST',
        body: {file: formData, id: userData.id}
      })
      .then(response => response.json())
      .then(data => {
        console.log(data); // Handle the response from the server
      })
      .catch(error => {
        console.error(error);
      });
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