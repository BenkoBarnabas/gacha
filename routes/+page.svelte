<script>
  import {sendData, getData, DeleteAll, AddEmptyRow} from "../client.js" //we import all the functions

  let dataToSend = "cica"
  let selectedColumn = "col1"
  let id = ""
  var respons = ""

  function getData2() {
    respons = getData()
  }
</script>

<main>
<h1>Svelte App with Node.js and Express.js</h1>
<input type="text" bind:value={dataToSend} placeholder="Enter data">
<input type="text" bind:value={selectedColumn} placeholder="Enter column name">
<input type="text" bind:value={id} placeholder="Enter id">
<button on:click={() => sendData(selectedColumn,dataToSend,id)}>Send Data to Server</button>
<button on:click={() => getData2()}>Get Data from Server</button>
<button on:click={DeleteAll}>DeleteAll</button>
<button on:click={AddEmptyRow}>Add empty row</button>
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