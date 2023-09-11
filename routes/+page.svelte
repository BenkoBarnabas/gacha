
<script>
  import {sendData, getData } from "../server.js"

  let dataToSend = "";
  var respons = ""
  function getData2() {
    respons = getData()
  }
</script>

<main>
<h1>Svelte App with Node.js and Express.js</h1>
<input type="text" bind:value={dataToSend} placeholder="Enter data">
<button on:click={() => sendData(dataToSend)}>Send Data to Server</button>
<button on:click={() => getData2()}>Get Data from Server</button>
<p>{respons}</p>
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