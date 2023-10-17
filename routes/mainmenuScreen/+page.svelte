<script>
    import logo from "../../lib/assets/global/logoTextv2.png"
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


</script>
{#if !pageLoaded}
<div id="loadingScreen">
  <img src={loadingScreen} alt="loading..." style="width: 15vw; display: block; margin-top:20vw; margin-left:auto; margin-right:auto;">
  <h1 style="font-family: cursive; display: block; text-align:center;">LOADING...</h1>
</div>
{/if}

<div id="background"></div>

<div id="header">
    <div id="logo"><img src={logo} alt="SG gacha" style="width: 16vw;"></div>
    <table id="headerTable">
        <tr>
            <td class="headerTd"><button id="homeButton" on:click={() => GoToPage("../")}></button></td>
            <td class="headerTd"></td>
            <td class="headerTd">
                <div class="money" id="gachaCurrency" style="margin-right: 2vw;"><p style="margin-top:1.2vw;">asddf</p></div>
                <div class="money" id="nameTag"><p style="margin-top:1.2vw;">{localUserData.username}</p></div>
            </td>
        </tr>
    </table>
    
</div>
<div id="main">
    <div id="settingsMenu">
        <div id="settingsMenuCol" style="width: 14vw; height:36vw; border:2px solid black; margin-left:auto;margin-right:auto;margin-top:2vw;">
            <div style="width:100%; height:5vw; border:2px solid black; margin-bottom:4vw; margin-top:1.5vw;">
                Profil
            </div>
            <div style="width:100%; height:5vw; border:2px solid black; margin-bottom:4vw;">
                Beallitasok
            </div>
            <div style="width:100%; height:5vw; border:2px solid black; margin-bottom:4vw;">
                Fiok
            </div>
            <div style="width:100%; height:5vw; border:2px solid black;">
                Baratok
            </div>
            
        </div>
    </div>
    <div id="content">
        <div id="contentCol1" style="width: 38vw; height:38vw; float:left">
            <div on:click={() => GoToPage("../lobbyScreen")} class="contentPicsDiv" id="kartyazz" style="height: 66%;margin-top:4%; width:100%; margin-bottom:2vw;" on:keydown role="button" tabindex="">
                
                <div class="tag" style="background-image: url({tag}); filter:hue-rotate(-10deg);"><p class="tagText" style="top: 68%; left: 17%;">Kártyázz</p></div>
                
            </div>
            <div on:click={() => GoToPage("../gachaScreen")} class="contentPicsDiv" id="szerencses" style="height: 30%; width:96%; margin-left:4%; " on:keydown role="button" tabindex="">
                
                <div class="tag" style="background-image: url({tag2}); filter:hue-rotate(-50deg);"><p class="tagText"  style="top: 47%; left: 12%;">Szerencsés húzás</p></div>
                
            </div>
        </div>
        <div id="contentCol2" style="width: 28vw; height:38vw; float:right">
            <div on:click={() => GoToPage("../collectionScreen")} class="contentPicsDiv" id="gyujtemeny" style="height: 50%; width:90%; margin-bottom:1vw;" on:keydown role="button" tabindex="">
                
                <div class="tag" style="background-image: url({tag}); filter:hue-rotate(90deg);"><p class="tagText"  style="top: 64%; left: 17%;">Gyüjtemény</p></div>
                
            </div>
            <div on:click={() => GoToPage("../selectionScreen")} class="contentPicsDiv" id="paklim" style="height: 50%; width:100%; margin-top:2vw;" on:keydown role="button" tabindex="">
                
                <div class="tag" style="background-image: url({tag}); filter:hue-rotate(180deg);"><p class="tagText"  style="top: 64.6%; left: 17%;">Paklim</p></div>
            </div>
        </div>
    </div>
</div>
<style>
    #background {
        background: url("../../lib/assets/global/background.gif");
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
    #loadingScreen {
    z-index: 9999;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgb(255, 255, 255);
    }

    @font-face {
      font-family: 'sgGachaFont';
      src: url('../../lib/assets/fonts/MyFont-Regular.otf');
    }
    #main{
        margin-top: 4vw;

        width: 86vw;
        height: 40vw;

        margin-left: auto;
        margin-right: auto;

        font-family: "sgGachaFont";
    }
    #settingsMenu{
        float: left;
        background-color: blueviolet;

        width: 18vw;
        height: 40vw;
    }
    #content{
        float: right;

        width: 68vw;
        height: 40vw;
    }
    .contentPicsDiv { 
        background-size: cover;
        background-position: center;

        position: relative;
        box-shadow: 0.3vw 0.1vw 1vw #00000096;
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
        
        background-color: rgba(137, 43, 226, 0.065);
        margin: auto;

        width: 90vw;
        height: 8vw;

        font-family: "sgGachaFont";
    }
    #headerTable{
        padding-top: 2vw;
        background-color: rgba(0, 255, 255, 0.076);

        width: 90vw;
        height: 6vw;

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
        height: 3vw;
        display: inline-block;
 
    }
    #gachaCurrency{
        background-image: url(../../lib/assets/global/headerMoney.png);
        background-size: 100% 100%;

    }
    #nameTag{
        background-image: url(../../lib/assets/global/headerProfile.png);
        background-size: 100% 100%;

    }
    

</style>