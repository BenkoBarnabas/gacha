<script>
  import {sendData, getData, DeleteAll, AddEmptyRow, sendSocketValue,  DeleteRow} from "../client.js" //we import all the functions

  let dataToSend = ""
  let selectedColumn = "username"
  let id = "1"
  let tableName = "account"

  var query = {
    column: "tickets",
    id: 1,
    table: "account"
  }

  var fel = {
    value: ""
  }



</script>


<main>
<h1>Svelte Webes Applikáció Node.js és Express.js használatával<br>Nyomd le az F11 gombot a teljes élményhez!</h1>
<input type="text" bind:value={dataToSend} placeholder="Írd be az adatokat">
<input type="text" bind:value={selectedColumn} placeholder="Add meg az oszlop nevét">
<input type="text" bind:value={id} placeholder="Add meg az id-t">
<input type="text" bind:value={tableName} placeholder="Add meg a táblázat nevét">
<button on:click={() => sendData(selectedColumn,dataToSend,id,tableName)}>Küldés a Szervernek 1,2,3,4</button>
<button on:click={() => getData(selectedColumn,id,tableName, "gacha")}>Adatok Lekérdezése a Szervertől 2,3,4</button>
<button on:click={() => DeleteAll(tableName)}>Összes törlése 4</button>
<button on:click={() => DeleteRow(tableName,id)}>Egy sor törlése 3,4</button>
<button on:click={() => AddEmptyRow(tableName)}>Üres Rekord hozzáadása 4</button>

</main>


<div class = "links">
  <a href="/gachaScreen">itt fizess</a><br>
  <a href="/collectionScreen">kártyáid</a><br>
  <a href="/selectionScreen">paklid</a><br>
  <a href="/test">testGround</a>
</div>

<a href="/lobbyScreen" style="color: white; text-align:center;font-size:larger; ">JÁTTSZ JÁTTSZ JÁTTSZ!!! JÁTSZ TE ITT MOST</a>

<style>
main {
  text-align: center;
  padding: 2rem;
}

@font-face {
    font-family: 'mainFont';
    src: url('../lib/assets/fonts/zh-cn.ttf');
}


h1 {
  font-size: 1.5rem;
}

input,
button {
  margin: 1rem;
  padding: 0.5rem;
}

:global(body){
  font-family: "mainFont";
  color: rgb(37, 36, 39);
}
:global(body){  /*body styling format of svelte */ 
      background: url("../lib/assets/global/diszterem.png");
      background-size: 100% 100%;
      /*animation: backgroundLoop 120s linear infinite;*/
      background-size: var(--bgWidth);
      margin: 0;
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
    height: 4vw;
    width: 6vw;
    background-size: 100% 100%;
    margin: 10px;
}
:global(.bannerIcon:hover) {
    transform: scale(1.06);
    cursor: pointer;
}


  /* width */
:global(::-webkit-scrollbar) {
    width:2vw;
}

/* Track */
:global(::-webkit-scrollbar-track) {
    background-image: url("../lib/assets/global/scrollbarTrack.png");
    background-size: 100% 100%;
}

/* Handle */
:global(::-webkit-scrollbar-thumb) {
    background: url("../lib/assets/global/scrollbar.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
:global(::-webkit-scrollbar-button){
    width: 30px;
    height: 5vh;
}
:global(::-webkit-scrollbar-button:start) {
    background-image: url("../lib/assets/global/scrollbarUpArrow.png");
    background-size: 100% 100%;
}
:global(::-webkit-scrollbar-button:end) {
    background-image: url("../lib/assets/global/scrollbarDownArrow.png");
    background-size: 100% 100%;
}
:global(.accountInfoHeader){
    font-size: 1.3vw;
    color: antiquewhite;

    font-family: 'TitleFont';
    font-weight: 500;
    font: italic;
    text-align: center;
}
:global(.pageTitle){
    font-size: 1.3vw;
    color: antiquewhite;

    font-family: 'TitleFont';
    font-weight: 500;
    font: italic;
    text-align: center;

    width: 17vw;
    float: left;
}
</style>