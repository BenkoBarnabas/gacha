<script >


  import {sendData, getData, DeleteAll, AddEmptyRow, sendSocketValue,  DeleteRow, getAccountData,makeNewAccount, userData, verifyEmail, verifyCode, clientID, getUserDataFromLocalStorage, setProfilePicture, requestFullScreen} from "../client.js" //we import all the functions
  import logo from "../lib/assets/global/logoTextv3.png"
  let dataToSend = ""
  let selectedColumn = "username"
  let id = "1"
  let tableName = "account"

  let localUserData

  import { onMount } from 'svelte';
    onMount(() => {
      localUserData = JSON.parse(localStorage.getItem("userData"))
      if (localUserData) {
        //localUserData = JSON.parse(localStorage.getItem("userData"))
        getUserDataFromLocalStorage(localUserData, "userData")
      } else {
        console.log("Username not found in local storage.");
      }


    });



  let isAdminUp = false
  function ChangeAdmin(){isAdminUp = !isAdminUp; isAdminUp = isAdminUp}

  

  let isAuthenticationUp = true
  let isLogin = true //false a sign up
  let isVerifying = false

  let email = "zseszti42@gmail.com"
  let password = "alma"
  let username = "esztix"
  let verificationCode = ""

  function ChangeAccountStatus(){isLogin = !isLogin; isLogin = isLogin}

  function Login(email, password){
    getAccountData(email)

    isAuthenticationUp = false
    isAuthenticationUp = isAuthenticationUp
  }
  function Signup(email,password,username){
    verifyEmail(email,username)
    //makeNewAccount(email,password,username)

    //isAuthenticationUp = false
    //isAuthenticationUp = isAuthenticationUp
    isVerifying = !isVerifying
    isVerifying = isVerifying
  }
  function Verify(code){
    verifyCode(email,code,password,username)
    console.log(code);
  }

</script>
{#if isAuthenticationUp}
<div id="authenticationBox">
  {#if isLogin}
    <div class="login" id="login">
      Lépj be a fiókodba<br>
      <input type="text" placeholder="email cím" bind:value={email}><br>
      <input type="password" placeholder="jelszó" bind:value={password}><br>
      <button id="bejBut" on:click={() =>Login(email,password)}>Bejelentkezés</button><br>
      <button class="accountStatusButton" on:click={ChangeAccountStatus}>Nincs fiókom :(</button>
    </div>
  {:else}
    {#if isVerifying}
    <div style="width: 30vw;position: absolute;left: 35vw;top: 1vw;background-color: aquamarine;" id="verify">
      Elküldünk egy ellenőrző kódot a következő email címre:<br>
      <span style="font-weight: bold;">{email}</span>
      <input type="text" placeholder="ellenőrző kód" bind:value={verificationCode}><br>
      <button on:click={() =>Verify(verificationCode)}>Ellenőrzés</button><br>
    </div>
    {:else}
      <div class="login" id="signup">
        Csinálj egy fiókot<br>
        <input type="text" placeholder="email cím" bind:value={email}><br>
        <input type="text" placeholder="felhasználónév" bind:value={username}><br>
        <input type="password" placeholder="jelszó" bind:value={password}><br>
        <button on:click={() =>Signup(email,password,username)}>Regisztráció</button><br>
        <button class="accountStatusButton" on:click={ChangeAccountStatus}>Már van fiókom :)</button>
      </div>
    {/if}
  {/if}
  
</div>
{/if}


{#if isAdminUp}
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
{/if}
<div id="mainLogo"><img id="mainLogoLogo" src={logo} alt="SG×Gacha"></div>

<div id = "background"></div>




<style>
  :root{
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;

  }
  #mainLogo{
    margin: auto;
    display: block;
    width: 20vw;
    margin-top: 5vh;

  }
  #mainLogoLogo{
    width: 20vw;
  }
  #bejBut{
    background: url(../lib/assets/mainmenu/home.png);
        background-size: 100% 100%;
        width: 12vw;
        height: 4vw;

        float: left;

        border: none;
        font-family: "sgGachaFont";

        margin-left: 1vw;
  }
  
  .login{
    width: 18vw;

    position: absolute;
    left: 41vw;
    top: 30vh;
    
    background: linear-gradient(to bottom,rgba(57, 141, 219, 0.528) 5%,rgba(134, 226, 176,0.527) 60%,rgba(188, 223, 132,0.527),rgba(224, 176, 137,0.527),rgba(223, 153, 186, 0.527));
    padding: 2vw;
    border-radius: 1vw;
  }
  .accountStatusButton{
    background: none;
    border: none;
    color: black;
    text-decoration: underline;
    text-align: center;
  }
  .accountStatusButton:hover{
    color: rgb(106, 104, 122);
  }





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
  #background {
        background: url("../lib/assets/global/background.gif");
        overflow: hidden;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-size: cover; /* Adjust as needed: cover, contain, etc. */
        background-repeat: no-repeat;
        background-position: center center;
        z-index: -3;
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




  /* Track */
  
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