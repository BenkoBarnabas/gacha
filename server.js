
let responseData = '';
export function sendData(dataToSend) {
    const data = JSON.stringify({ data: dataToSend });

    fetch('http://localhost:3000/sendData', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: data,
    })
    .then(response => {
        if (response.ok) {
        responseData = `Data sent to server: ${dataToSend}`;
        } else {
        throw new Error('Failed to send data to server');
        }
    })
    .catch(error => {
        console.error(error);
    });
    console.log(dataToSend);
}

export function getData() {
fetch('http://localhost:3000/getData')
.then(response => {
    if (response.ok) {
    return response.json();
    } else {
    throw new Error('Failed to fetch data from server');
    }
})
.then(data => {
    responseData = `Data received from server: ${data.data}`;
    console.log(responseData);
})
.catch(error => {
    console.error(error);
});
return responseData;
}