<script>
    import logo from "../../lib/assets/global/logoTextv3.png"
    import background from "../../lib/assets/global/background.mp4"
    import loadingScreen from "../../lib/assets/global/loadingScreen.gif"

    import tag from "../../lib//assets/mainmenu/tag.png"
    import tag2 from "../../lib//assets/mainmenu/tag2.png"

    import {userData,getUserDataFromLocalStorage, requestFullScreen,sendData} from "../../client"

    import levelBarBg from "../../lib/assets/global/LevelupbarBg.png"
    import levelBarFg from "../../lib/assets/global/LevelupbarBorder.png"

    import ProfilePic from "../../lib/assets/profile/PP.jpg"
    import ProfilePic2 from "../../lib/assets/profile/PP2.png"
    let profilePics = [ProfilePic,ProfilePic2]

    import pBorder1 from "../../lib/assets/profile/border1.png"
    import pBorder2 from "../../lib/assets/profile/border2.png"
    import pBorder3 from "../../lib/assets/profile/border3.png"
    import pBorder4 from "../../lib/assets/profile/border4.png"
    import pBorder5 from "../../lib/assets/profile/border5.png"
    import pBorder6 from "../../lib/assets/profile/border6.png"
    let pBorders = [pBorder1,pBorder2,pBorder3,pBorder4,pBorder5,pBorder6]

    let localUserData = userData
    let pageLoaded = false


    import { onMount } from 'svelte';
    onMount(() => {

        localUserData = JSON.parse(localStorage.getItem("userData"))
        if (localUserData) {
            //localUserData = JSON.parse(localStorage.getItem("userData"))
            getUserDataFromLocalStorage(localUserData, "userData")
        } else {
            console.log("Username not found in local storage.");
        }

        pageLoaded = true
        pageLoaded = pageLoaded
    });
    function GoToPage(filePath) {
        window.location = filePath; // Navigate to the parent directory
    }

    let isProfile = false
    let changedSettings = []
    function OpenProfile(){
        isProfile = true
        isProfile = isProfile
    }
    function CloseProfile(){

        changedSettings.includes("border") ? sendData("border",localUserData.border,localUserData.id,"account") : {}
        changedSettings.includes("ppic") ? sendData("profilPic",localUserData.profilPic,localUserData.id,"account") : {}
        changedSettings.includes("name") ? sendData("username",localUserData.username,localUserData.id,"account") : {}

        if(changedSettings.includes("pwd")){
            if(localUserData.password === passwordVerify){
                sendData("password",localUserData.password,localUserData.id,"account")

                isProfile = false;
                isProfile = isProfile
                localStorage.setItem("userData", JSON.stringify(localUserData));
                changedSettings = []
            }
            else{
                pwdMsg = "Jelszó nem egyezik"
                pwdMsg = pwdMsg
            }
        }
        else{
            isProfile = false;
            isProfile = isProfile
            localStorage.setItem("userData", JSON.stringify(localUserData));
            changedSettings = []
        }
        
    }

    function ChangeBorder(n){
        localUserData.border = n +1
        localUserData = localUserData
        changedSettings.includes("border") == false ? changedSettings.push("border") : {}
    }
    function ChangePPic(n){
        localUserData.profilPic = n +1
        localUserData = localUserData
        changedSettings.includes("ppic") == false ? changedSettings.push("ppic") : {}
    }
    function ChangeName(){
        changedSettings.includes("name") == false ? changedSettings.push("name") : {}
    }
    let passwordVerify = ""
    let pwdMsg = "Erősítse meg az új jelszavát"
    function ChangePwd(){
        changedSettings.includes("pwd") == false ? changedSettings.push("pwd") : {}
        changedSettings = changedSettings
    }
</script>

{#if !pageLoaded}
<div id="loadingScreen">
  <img src={loadingScreen} alt="loading..." style="width: 15vw; display: block; margin-top:15%; margin-left:auto; margin-right:auto;">
  <h1 style="font-family: cursive; display: block; text-align:center;">LOADING...</h1>
</div>
{/if}

<div id="background"></div>

{#if isProfile}
    <div class="optionMenu">
        <div class="optionCont">
            <div class="optionNameTextCont"><div class="optionNameText">Beállítások</div></div>
            <div id="settingsContent">
                <div id="profileCont">
                    <img id="profilePic" class="profilePicComp" src={profilePics[localUserData.profilPic-1]} alt="border">
                    <img id="profileBorder" class="profilePicComp" src={pBorders[localUserData.border-1]} alt="border">
                </div>
                <div id="settingsUserDataCont">
                    <div style="font-family: sgGachaFont; font-size: 1.5vw; margin-bottom: 2vh;">Felhasználónév: <input class="userDataInput" type="text" on:change={ChangeName} bind:value={localUserData.username} placeholder="{localUserData.username}"></div>
                    <div style="font-family: sgGachaFont; font-size: 1.2vw;">Jelszó: <input class="userDataInput" type="password" on:change={ChangePwd} bind:value={localUserData.password} placeholder="{localUserData.password}"></div>
                    {#if changedSettings.includes("pwd")}
                    <div style="font-family: sgGachaFont; font-size: 1vw;">Jelszó megerösítése: <input class="userDataInput" type="password" on:change={ChangePwd} bind:value={passwordVerify} placeholder=""></div>
                    <p style="color: red; margin-left: 2vw;">{pwdMsg}</p>
                    {/if}
                    <div style="font-family: mainFont; font-size: 1.2vw; margin-top: 4vh; text-align:center;">{localUserData.email}</div>
                </div>
                
                <div class="themeChangeText">Keret és profilkép megváltoztatása:</div>
                <div id="pborderButtonCont">
                {#each pBorders as border,i}
                    <button class="pborderButton" on:click={() => ChangeBorder(i)}><img draggable="false" style="width: 100%;" src={border} alt="border{i}"></button>
                {/each}
                </div>
                <div id="ppicButtonCont">
                    {#each profilePics as pic,i}
                        <button class="ppicButton" on:click={() => ChangePPic(i)}><img draggable="false" style="width: 100%;" src={pic} alt="border{i}"></button>
                    {/each}
                </div>
            </div>
        </div>
        <button class="closeButton" on:click={CloseProfile}>x</button>
    </div>
{/if}


<div id="header">
    <div id="logo"><img src={logo} alt="SG gacha" style="width: 16vw;"></div>
    <table id="headerTable">
        <tr>
            <td class="headerTd"><button id="homeButton" on:click={() => GoToPage("./mainmenuScreen")} ></button></td>
            <td class="headerTd"></td>
            <td class="headerTd">
                <div class="money" id="gachaCurrency" style="margin-right: 2vw;"><p style="margin-top:1.2vw;">{localUserData.gachaCurrency}</p></div>
                <div class="money" id="nameTag" style="position: relative;">
                    <div id="levelText">{localUserData.level}</div>
                    <p style="margin-top:1.2vw;">{localUserData.username}</p>
                </div>
                <button id="fullScreenButton" on:click={requestFullScreen}>[]</button>
            </td>
        </tr>
    </table>
</div>

<div id="main">
    <div id="content">
        <div on:click={OpenProfile} style="width: 31.5%; height: 50%; left: 2%; top: 2%;" class="contentPicsDiv" id="beallitas" on:keydown role="button" tabindex="">
                
            <div class="tag" style="background-image: url({tag}); filter: grayscale(0.9) hue-rotate(150deg);"><p class="tagText" style="top: 68%; left: 17%;">Beállítások</p></div>
            
        </div>
        <div style="width: 25.5%; height: 43%; left: 3.5%; bottom: 2%;" class="contentPicsDiv" id="kartyazz" on:keydown role="button" tabindex="">
                
            <div class="tag" style="background-image: url({tag}); filter:hue-rotate(30deg) brightness(1.2);"><p class="tagText" style="top: 68%; left: 17%;">Story mode</p></div>
            
        </div>
        <div on:click={() => GoToPage("./lobbyScreen")} style="width: 37.5%; height: 60%; left: 34.5%; top: 2%;" class="contentPicsDiv" id="kartyazz" on:keydown role="button" tabindex="">
                
            <div class="tag" style="background-image: url({tag}); filter:hue-rotate(-10deg);"><p class="tagText" style="top: 68%; left: 17%;">Kártyázz</p></div>
            
        </div>
        <div on:click={() => GoToPage("./gachaScreen")} style="width: 42%; height: 30%; left: 31%; bottom: 5%;" class="contentPicsDiv" id="szerencses" on:keydown role="button" tabindex="">
            
            <div class="tag" style="background-image: url({tag2}); filter:hue-rotate(-50deg);"><p class="tagText"  style="top: 47%; left: 12%;">Zsákbamacska</p></div>
            
        </div>
        <div on:click={() => GoToPage("./collectionScreen")} style="width: 25%; height: 45%; right: 2%; top: 2%;" class="contentPicsDiv" id="gyujtemeny" on:keydown role="button" tabindex="">
                
            <div class="tag" style="background-image: url({tag}); filter:hue-rotate(90deg);"><p class="tagText"  style="top: 64%; left: 17%;">Gyüjtemény</p></div>
            
        </div>
        <div on:click={() => GoToPage("./selectionScreen")} style="width: 24%; height: 48%; right:1%; bottom: 2%;" class="contentPicsDiv" id="paklim" on:keydown role="button" tabindex="">
            
            <div class="tag" style="background-image: url({tag}); filter:hue-rotate(180deg);"><p class="tagText"  style="top: 64.6%; left: 17%;">Paklim</p></div>
        </div>
    </div>
    <a href="../" style="font-family: Arial;font-weight:bold; color:black; font-size:1.5vw;">Admin</a>
</div>


<style>
    #background {
        background: url("../../lib/assets/global/diszterem.png");
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

        padding: 0;
        margin: 0;
    }
    :global(html){
        margin: 0;
        padding: 0;
    }
    #loadingScreen {
    z-index: 9999;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgb(228, 231, 242);
    }

    @font-face {
      font-family: 'sgGachaFont';
      src: url('../../lib/assets/fonts/MyFont-Regular.otf');
    }
    @font-face {
      font-family: 'mainFont';
      src: url('../../lib/assets/fonts/zh-cn.ttf');
    }
    #main{
        margin-top: 4vw;

        width: 86vw;
        height: 70vh;

        margin-left: auto;
        margin-right: auto;

        font-family: "sgGachaFont";
    }

    .optionMenu{
        background-color: #2c2c40af;
        width: 100vw;
        height: 100vh;
        position: absolute;
        z-index: 2;
        margin: 0;
        left: 0;
        top: 0;
        backdrop-filter: blur(0.5vw);
    }
    #settingsContent{
        width: 89%;
        height: 100%;
        position: absolute;
        top:0;
        right: 0;

        overflow: auto;
    }
    #settingsUserDataCont{
        position: absolute;
        background-color: violet;
        left: 32%;
        top: 12%;
    }
    .userDataInput{
        height: 4vh;
        font-size: 1vw;
        background: #5c5e8aEA;
        border:none;
    }


    #profileCont{
        position: absolute;
        left: 5vw;
        top: 5%;
        width: 15vw;
    }
    #profileBorder{
        position: absolute;
        width: 100%;
    }
    #profilePic{
        position: absolute;
        width:70%;
        left:15%;
        top:2vh;
        border-radius: 50%;
    }
    .themeChangeText{
        position: absolute;
        left: 4vw;
        top: 46%;
        font-size: 1.3vw;
        font-family: 'mainFont';
    }
    #ppicButtonCont{
        position: absolute;
        top: 79%;
        left: 4vw;
        display: flex;
    }
    .ppicButton{
        width: 8vw;
        background: transparent;
        border: none;
        margin-right: 2vw;
    }
    .ppicButton:hover{
        cursor: pointer;
        transform: scale(1.05);
    }
    #pborderButtonCont{
        position: absolute;
        top: 52%;
        left: 3vw;
        display: flex;
    }
    .pborderButton{
        width: 10vw;
        background: transparent;
        border: none;
    }
    .pborderButton:hover{
        cursor: pointer;
        transform: scale(1.05);
    }


    
    .optionCont{
        margin-left: auto;
        margin-right: auto;

        margin-top: 10vh;
        background-image: linear-gradient(rgba(25, 25, 41, 0.877), rgba(93, 93, 189, 0.717));

        width:80vw;
        height: 80vh;
        position: relative;
    }
    .optionNameTextCont{
        background-color: violet;
        width: 10.5%;
        height: 100%;
        position: relative;
    }
    .optionNameText{
        transform: rotate(-90deg);
        font-family: "sgGachaFont";
        font-size: 8vh;
        position: absolute;
        height: 100%;
        left:8vh;
        margin: auto;
    }



    #content{
        margin-left: auto;
        margin-right: auto;
        margin-top: 10vh;
        position: relative;

        width: 90vw;
        height: 70vh;
    }
    .contentPicsDiv { 
        background-size: cover;
        background-position: center;

        position: relative;
        box-shadow: 0.3vw 0.1vw 1vw #00000096;
        border-bottom-right-radius: 2%;
        border-top-left-radius: 2%;

        position: absolute;
    }
    #paklim{background-image: url('../../lib/assets/mainmenu/paklim.png');}
    #szerencses{background-image: url('../../lib/assets/mainmenu/szerencses.png');}
    #gyujtemeny{background-image: url('../../lib/assets/mainmenu/gyujtemeny.png');}
    #kartyazz{background-image: url('../../lib/assets/mainmenu/kartyazz.png');}
    #beallitas{background-image: url('../../lib/assets/mainmenu/beallitas.png');}
    
    .contentPicsDiv:hover {
        animation: zoomDiv 5s forwards ease-out;
        cursor: pointer; /* Change the cursor to a pointer on hover */
    }
    @keyframes zoomDiv{
        0%{
            background-size: 100%;
        }
        100%{
            background-size: 115%; 
        }
    }
    .tag{
        width: 100%;
        height: 100%;

        background-size: 100% 100%;
    }
    .tagText{
        position: absolute;

        font-size:0.93vw;


        color: white;
        text-shadow:
                -0.1vw -0.1vw 0 #000, /* Top-left shadow */
                0.1vw -0.1vw 0 #000, /* Top-right shadow */
                -0.1vw 0.1vw 0 #000, /* Bottom-left shadow */
                0.1vw 0.1vw 0 #000; /* Bottom-right shadow */
    }


    #header{
        
        margin: auto;

        width: 90vw;
        height: 12vh;

        font-family: "sgGachaFont";
    }
    #headerTable{

        width: 90vw;
        height: 12vh;

        font-family: 'sgGachaFont';
    }
    .headerTd{
        width: 30vw;
        text-align: center;
    }
    #homeButton{
        background: url(../../lib/assets/mainmenu/home.png);
        background-size: 100% 100%;
        width: 12vw;
        height: 4vw;

        float: left;

        border: none;
        font-family: "sgGachaFont";

        margin-left: 1vw;
    }
    #homeButton:hover{
        transform: scale(1.1);
    }
    #logo{
        width:1vw;
        position: absolute;

        left: 40vw;
        top:1vw;
    }
    .money{
        width: 9vw;
        height: 3.5vw;
        display: inline-block;
 
    }
    #gachaCurrency{
        background-image: url(../../lib/assets/global/headerMoney.png);
        background-size: 100% 100%;

        font-family: 'mainFont';
        font-size: 1.7vw;
    }
    #nameTag{
        background-image: url(../../lib/assets/global/headerProfile.png);
        background-size: 100% 100%;

    }
    @font-face {
        font-family: 'ShadowLight';
        src: url('../../lib/assets/fonts/ShadowsIntoLight-Regular.ttf');
    }
    #levelText{
        font-size: 2vw;
        font-weight: bold;
        font: italic;
        font-family: 'ShadowLight';
        color: rgb(184, 11, 11);
        text-shadow:
                -0.01vw -0.01vw 0 rgb(184, 11, 11), /* Top-left shadow */
                0.01vw -0.01vw 0 rgb(184, 11, 11), /* Top-right shadow */
                -0.01vw 0.01vw 0 rgb(184, 11, 11), /* Bottom-left shadow */
                0.01vw 0.01vw 0 rgb(184, 11, 11); /* Bottom-right shadow */

        position: absolute;
        top: 0%;
        left: 2.5%;
        text-align: center;

        width: 2.5vw;
        height: 2.5vw;

        padding: 0;
    }

    .closeButton{
        z-index: 3;
        position: absolute;

        left: 80%;
        top: 3%;
    }
    .closeButton:hover{
        cursor: pointer;
    }
    

</style>