<script>
  import {sendData, getData, DeleteAll, AddEmptyRow, responsData} from "../client.js" //we import all the functions

  let dataToSend = ["alma","cica"]
  let selectedColumn = "history"
  let id = "1"
  let tableName = "rolls"

  //console.log("log: " + getData("history","1","rolls"));
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

<a href="/gachaScreen">sepd ur money here</a><br>
<a href="/collectionScreen">view your cards here</a>

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