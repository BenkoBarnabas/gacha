let responseData = '';

export function sendData(selectedColumn,dataToSend,id) { //export == public, we import it in the main.svelte

    fetch('http://localhost:3000/sendData', { //the "function" id i talked about in server ("sendData" here)
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ column: selectedColumn, data: dataToSend, id: id}), //body is the shit we send, the rest is costums, here its an object
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

export function getData() { //i dont really understand this, but it works
    fetch('http://localhost:3000/getData')
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Failed to fetch data');
    })
    .then(data => {
      responseData = data
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
    return responseData; //all i know is that this lines writes it to the screen :skull:
}

export function DeleteAll(){
    fetch('http://localhost:3000/api/delete-all-rows', {
        method: 'DELETE',
      })
    .then(response => response.json())
    console.log("deleted All");
}

export function AddEmptyRow(){
    fetch('http://localhost:3000/api/add-row', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({}), //we send nothing, cos it an empty row, can be adjusted to send the data to the different rows via an array usually
    })
}