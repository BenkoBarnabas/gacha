<script>
    import logo from "../../lib/assets/global/logoTextv3.png"
    import background from "../../lib/assets/global/background.mp4"
    import loadingScreen from "../../lib/assets/global/loadingScreen.gif"

    import tag from "../../lib//assets/mainmenu/tag.png"
    import tag2 from "../../lib//assets/mainmenu/tag2.png"

    import {userData,getUserDataFromLocalStorage} from "../../client"

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



    let optionButtons = Array(4)
    function OptionButtonClick(element){
        console.log(element);
        element.style.animation = "optionButtonAnim 0.5s 0.1s";
        console.log("katt");

        switch (optionButtons.indexOf(element)) {
            case 0:
                console.log("profile");
                OpenProfile()
                break;
            case 1:
                console.log("settings");
                break;
            
            case 2:
                console.log("account");
                break;
            case 3:
                console.log("frineds");
                break;
        
            default:
                break;
        }

        
    }
    

    let isProfile = false
    let isAccount = false
    let isSettings = false
    let isFriends = false

    function OpenProfile(){
        isProfile = true
        isProfile = isProfile
    }
    function CloseProfile(){isProfile = false; isProfile = isProfile}


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
            <div class="optionNameTextCont"><div class="optionNameText">Profile</div></div>
            <div class="optionContent"></div>
        </div>
        <button class="closeButton" on:click={CloseProfile}>x</button>
    </div>
{/if}


<div id="header">
    <div id="logo"><img src={logo} alt="SG gacha" style="width: 16vw;"></div>
    <table id="headerTable">
        <tr>
            <td class="headerTd"><button id="homeButton" on:click={() => GoToPage("../mainmenuScreen")} ></button></td>
            <td class="headerTd"></td>
            <td class="headerTd">
                <div class="money" id="gachaCurrency" style="margin-right: 2vw;"><p style="margin-top:1.2vw;">{localUserData.gachaCurrency}</p></div>
                <div class="money" id="nameTag" style="position: relative;">
                    <div id="levelText">{localUserData.level}</div>
                    <p style="margin-top:1.2vw;">{localUserData.username}</p>
                </div>
            </td>
        </tr>
    </table>
</div>

<div id="main">
    <div id="settingsMenu" style="width: 16vw; background:azure;">

                <div class="optionButtonCont" style="top:7%; filter:hue-rotate(90deg);">
                    <button class="optionButtonShadow"></button>
                    <button class="optionButton" bind:this={optionButtons[0]} on:click={() => OptionButtonClick(optionButtons[0])}>
                        Profil
                    </button>
                </div>
                
                <div class="optionButtonCont" style="top:22%; filter:hue-rotate(180deg);">
                    <button class="optionButtonShadow"></button>
                    <button class="optionButton" bind:this={optionButtons[1]} on:click={() => OptionButtonClick(optionButtons[1])}>
                        Beállítások
                    </button>
                </div>


                <div class="optionButtonCont" style="top:65%; filter:hue-rotate(-90deg);">
                    <button class="optionButtonShadow"></button>
                    <button class="optionButton" bind:this={optionButtons[2]} on:click={() => OptionButtonClick(optionButtons[2])}>
                        Fiók
                    </button>
                </div>
                <div class="optionButtonCont" style="top:80%; filter:hue-rotate(0deg);">
                    <button class="optionButtonShadow"></button>
                    <button class="optionButton" bind:this={optionButtons[3]} on:click={() => OptionButtonClick(optionButtons[3])}>
                        Barátok
                    </button>
                </div>
        
    </div>
    <div id="content">
        <div id="contentCol1" style="width: 38vw; height:70vh; float:left">
            <div on:click={() => GoToPage("../lobbyScreen")} class="contentPicsDiv" id="kartyazz" style="height: 66%;margin-top:4%; width:100%; margin-bottom:2vw;" on:keydown role="button" tabindex="">
                
                <div class="tag" style="background-image: url({tag}); filter:hue-rotate(-10deg);"><p class="tagText" style="top: 68%; left: 17%;">Kártyázz</p></div>
                
            </div>
            <div on:click={() => GoToPage("../gachaScreen")} class="contentPicsDiv" id="szerencses" style="height: 30%; width:96%; margin-left:4%; " on:keydown role="button" tabindex="">
                
                <div class="tag" style="background-image: url({tag2}); filter:hue-rotate(-50deg);"><p class="tagText"  style="top: 47%; left: 12%;">Szerencsés húzás</p></div>
                
            </div>
        </div>
        <div id="contentCol2" style="width: 28vw; height:70vh; float:right">
            <div on:click={() => GoToPage("../collectionScreen")} class="contentPicsDiv" id="gyujtemeny" style="height: 50%; width:90%; margin-bottom:1vw;" on:keydown role="button" tabindex="">
                
                <div class="tag" style="background-image: url({tag}); filter:hue-rotate(90deg);"><p class="tagText"  style="top: 64%; left: 17%;">Gyüjtemény</p></div>
                
            </div>
            <div on:click={() => GoToPage("../selectionScreen")} class="contentPicsDiv" id="paklim" style="height: 50%; width:100%; margin-top:2vw;" on:keydown role="button" tabindex="">
                
                <div class="tag" style="background-image: url({tag}); filter:hue-rotate(180deg);"><p class="tagText"  style="top: 64.6%; left: 17%;">Paklim</p></div>
            </div>
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
    .optionCont{
        margin-left: auto;
        margin-right: auto;

        margin-top: 10vh;
        background-image: linear-gradient(rgba(25, 25, 41, 0.877), rgba(93, 93, 189, 0.717));

        width:80vw;
        height: 80vh;
    }
    .optionNameTextCont{
        background-color: violet;
        width: 12%;
        height: 100%;

    }
    .optionNameText{
        transform: rotate(-90deg);
        font-family: "sgGachaFont";
        font-size: 10vh;
        
        position: absolute;
        bottom: 40vh;
        left: 1%;
    }




    #settingsMenu{
        float: left;

        width: 18vw;
        height: 70vh;

        position: relative;
    }
    .optionButtonCont{
        position: absolute;
    }
    .optionButton{
        width:13.5vw;
        height:5vw;
        
        background: url(../../lib/assets/mainmenu/optionButton.png);
        background-size: 100% 100%;

        border: none;

        margin-bottom:1vw;
        font-family: "sgGachaFont";
        font-size: 0.8vw;
    }
    .optionButtonShadow{
        width:13.5vw;
        height:5vw;
        
        background: url(../../lib/assets/mainmenu/optionButtonShadow.png);
        background-size: 100% 100%;

        border: none;
        position: absolute;
        z-index: -1;
    }
    .optionButton:hover{
        cursor: pointer;
        transform: scale(1.1);
        margin-left: -0.6vw;
        margin-top: -0.6vw;
    }

    @keyframes -global-optionButtonAnim {
        0%{
            margin-left: 0.6vw;
            margin-top: 0vw;
        }
        49%{
            margin-left: 0.6vw;
            margin-top: 1vw;
        }
        50%{
            margin-left: -0.6vw;
            margin-top: -0.6vw;
        }
        90%{
            margin-left: -0.6vw;
            margin-top: -0.6vw;
        }
        100%{
            margin-left: 0vw;
            margin-top:0vw;
        }
    }


    #content{
        float: right;

        width: 68vw;
        height: 70vh;
        background-color: violet;
    }
    .contentPicsDiv { 
        background-size: cover;
        background-position: center;

        position: relative;
        box-shadow: 0.3vw 0.1vw 1vw #00000096;
        border-bottom-right-radius: 2%;
        border-top-left-radius: 2%;
    }
    #paklim{background-image: url('../../lib/assets/mainmenu/paklim.png');}
    #szerencses{background-image: url('../../lib/assets/mainmenu/szerencses.png');}
    #gyujtemeny{background-image: url('../../lib/assets/mainmenu/gyujtemeny.png');}
    #kartyazz{background-image: url('../../lib/assets/mainmenu/kartyazz.png');}
    
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
        
        background-color: rgba(137, 43, 226, 0.623);
        margin: auto;

        width: 90vw;
        height: 12vh;

        font-family: "sgGachaFont";
    }
    #headerTable{
        background-color: rgba(0, 255, 255, 0.573);

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