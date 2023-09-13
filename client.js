let responseData = '';
let ip = "10.7.147.201"

export function sendData(selectedColumn,dataToSend,id,tableName) { //export == public, we import it in the main.svelte

    fetch(`http://${ip}:3000/sendData`, { //the "function" id i talked about in server ("sendData" here)
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ column: selectedColumn, data: dataToSend, id: id, table:tableName}), //body is the shit we send, the rest is costums, here its an object
    })
    .then(response => { //this .then(respons...) is again just syntax and costums, doesnt really matter that much in POST
        if (response.ok) {
        console.log("data sent: "+ dataToSend);
        } else {
        throw new Error('Failed to send data to server');
        }
    })
    .catch(error => {
        console.error(error);
    });
}

export function getData(tableName) { //i dont really understand this, but it works
  fetch(`http://${ip}:3000/getData`, { //the "function" id i talked about in server ("sendData" here)
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify({table: tableName}), //body is the shit we send, the rest is costums, here its an object
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
    console.log("data got from " + tableName);
    console.log(data); // Access the message sent by the server
  })
  .catch(error => {
    console.error(error);
  });
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