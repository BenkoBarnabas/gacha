<script>
    let dataToSend = '';
    let responseData = '';
  
    function sendData() {
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
    }
  
    function getData() {
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
      })
      .catch(error => {
        console.error(error);
      });
    }
  </script>
  
  <main>
    <h1>Svelte App with Node.js and Express.js</h1>
    <input type="text" bind:value={dataToSend} placeholder="Enter data">
    <button on:click={sendData}>Send Data to Server</button>
    <button on:click={getData}>Get Data from Server</button>
    <p>{responseData}</p>
  </main>


    <a href="/gachaScreen">sepd ur money here</a>
  
  <style>
    main {
      text-align: center;
      padding: 2rem;
    }
  
    h1 {
      font-size: 1.5rem;
    }
  
    input,
    button {
      margin: 1rem;
      padding: 0.5rem;
    }
  </style>



