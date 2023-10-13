<script>
    import logo from "../../lib/assets/global/logoTextv2.png"
    import {userData,getUserDataFromLocalStorage} from "../../client"

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

</script>
<div id="background"></div>
<div id="header">
    <div id="logo"><img src={logo} alt="SG gacha" style="width: 16vw;"></div>
    <table id="headerTable">
        <tr>
            <td class="headerTd"><button id="homeButton">HOME</button></td>
            <td class="headerTd"></td>
            <td class="headerTd">
                <div class="money" id="gachaCurrency"><p style="margin-top:1.2vw;">asddf</p></div>
                <div class="money" id="nameTag"><p style="margin-top:1.2vw;">{userData.username}</p></div>
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
            <div class="zoom-div" id="kartyazz" style="height: 70%; width:100%; border: 10px solid white; margin-bottom:2vw;">
                
                <div class="tag" style="width: 28vw; height: 7vw;"><p class="tagText">Kartyazz</p></div>
            </div>
            <div class="zoom-div" id="szerencses" style="height: 30%; width:100%; border: 10px solid white; ">
                
                <div class="tag" style="filter:hue-rotate(-70deg); width: 28vw; height: 5vw;"><p class="tagText">Szerencses huzas</p></div>
            </div>
        </div>
        <div id="contentCol2" style="width: 28vw; height:38vw; float:right">
            <div class="zoom-div" id="gyujtemeny" style="height: 50%; width:100%; border: 10px solid white; margin-bottom:1vw;">
                
                <div class="tag" style="filter:hue-rotate(50deg); width: 20vw; height: 7vw;"><p class="tagText">Gyujtemen</p></div>
            </div>
            <div class="zoom-div" id="paklim" style="height: 50%; width:100%; border: 10px solid white; margin-top:2vw;">
                
                <div class="tag" style="filter:hue-rotate(-50deg); width: 20vw; height: 7vw;"><p class="tagText">Paklim</p></div>
            </div>
        </div>
    </div>
</div>
<style>
    @font-face {
      font-family: 'sgGachaFont';
      src: url('../../lib/assets/fonts/The Frontman.ttf');
    }
    #main{
        margin-top: 4vw;
        border: 2px solid black;

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
        background-color: brown;

        width: 68vw;
        height: 40vw;
    }
    .zoom-div { 
        background-size: cover;
        background-position: center;

        position: relative;
    }
    #paklim{background-image: url('../../lib/assets/mainmenu/paklim.png');}
    #szerencses{background-image: url('../../lib/assets/mainmenu/szerencses.png');}
    #gyujtemeny{background-image: url('../../lib/assets/mainmenu/gyujtemeny.png');}
    #kartyazz{background-image: url('../../lib/assets/mainmenu/kartyazz.png');}
    .zoom-div:hover {
        animation: zoomDiv 0.5s forwards ease-out;
        cursor: pointer; /* Change the cursor to a pointer on hover */
    }
    @keyframes zoomDiv{
        0%{
            background-size: 100%; /* Zoom in the background image by 10% on hover */
        }
        100%{
            background-size: 120%; /* Zoom in the background image by 10% on hover */
        }
    }
    .tag{
        background-image: url(../../lib/assets/mainmenu/tag.png);
        background-size: 100% 100%;

        position: absolute;
        bottom: 0;
    }
    .tagText{
        padding-top: 1vw;
        padding-left: 3vw;

        color: white;
        text-shadow:
                -0.1vw -0.1vw 0 #000, /* Top-left shadow */
                0.1vw -0.1vw 0 #000, /* Top-right shadow */
                -0.1vw 0.1vw 0 #000, /* Bottom-left shadow */
                0.1vw 0.1vw 0 #000; /* Bottom-right shadow */
    }


    #header{
        
        background-color: blueviolet;
        margin: auto;

        width: 90vw;
        height: 8vw;

        font-family: "sgGachaFont";
    }
    #headerTable{
        padding-top: 2vw;
        background-color: aqua;
        border: 2px solid black;
        width: 90vw;
        height: 6vw;

        font-family: 'sgGachaFont';
    }
    .headerTd{
        width: 30vw;
        text-align: center;
    }
    #homeButton{
        background: url(../../lib/assets/gacha/pullButton.png);
        background-size: 100% 100%;
        width: 8vw;
        height: 5vw;

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
        border: 2px solid black;

    }
    #nameTag{
        background-image: url(../../lib/assets/global/headerMoney.png);
        background-size: 100% 100%;
        border: 2px solid black;

    }
    #background {
        background-image: url("../../lib/assets/global/diszterem.png");
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

</style>