<script>
  import {sendData, getData, DeleteAll, AddEmptyRow} from "../client.js" //we import all the functions

  let dataToSend = ""
  let selectedColumn = "history"
  let id = "1"
  let tableName = "rolls"

</script>

<main>
<h1>Svelte App with Node.js and Express.js</h1>
<input type="text" bind:value={dataToSend} placeholder="Enter data">
<input type="text" bind:value={selectedColumn} placeholder="Enter column name">
<input type="text" bind:value={id} placeholder="Enter id">
<input type="text" bind:value={tableName} placeholder="Enter table name">
<button on:click={() => sendData(selectedColumn,dataToSend,id,tableName)}>Send Data to Server</button>
<button on:click={() => getData(selectedColumn,id,tableName)}>Get Data from Server</button>
<button on:click={() => DeleteAll(tableName)}>DeleteAll</button>
<button on:click={() => AddEmptyRow(tableName)}>Add empty row</button>
</main>


<div class = "links">
  <a href="/gachaScreen">sepd ur money here</a><br>
  <a href="/collectionScreen">view your cards here</a>
</div>

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

:global(.links){
    position:absolute;
    top:5vh;
    left:88vw;
}

:global(.rollScreen){    /*the grey-ish background of the roll screen */ 
    z-index: 2;
    width: 100vw;
    height: 100vh;
    background-color: rgba(44, 44, 63, 0.884);
    position: absolute;
    text-align: center;
}

:global(#bannerChoosers) {   /*container foor the banner selector buttons */
    text-align: center;
}

:global(.bannerIcon) {   /*the selectors itself */
    height: 8vh;
    width: 12.6vh;
    background-size: 12.6vh 8vh;
    margin: 10px;
}
:global(.bannerIcon:hover) {
    transform: scale(1.06);
    cursor: pointer;
}
</style>