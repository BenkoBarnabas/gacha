<script>
    function GoToPage(filePath) {
        window.location = filePath; // Navigate to the parent directory
    }
    import { onMount } from 'svelte';
    import * as Cards from "../../card"
    let isYourWin =true
    let borderNumber = 6
    import levelBarBg from "../../lib/assets/global/LevelupbarBg.png"
    import levelBarFg from "../../lib/assets/global/LevelupbarBorder.png"

    import ProfilePic from "../../lib/assets/profile/PP.jpg"

    import pBorder1 from "../../lib/assets/profile/border1.png"
    import pBorder2 from "../../lib/assets/profile/border2.png"
    import pBorder3 from "../../lib/assets/profile/border3.png"
    import pBorder4 from "../../lib/assets/profile/border4.png"
    import pBorder5 from "../../lib/assets/profile/border5.png"
    import pBorder6 from "../../lib/assets/profile/border6.png"
    let pBorders = [pBorder1,pBorder2,pBorder3,pBorder4,pBorder5,pBorder6]

    import gachaCurrencyIcon from "../../lib/assets/global/currencyIcon.png"
    import shardIcon from "../../lib/assets/global/shardIcon.png"
    
    import * as Client from "../../client"
    let localUserData

    let winNotes = false
    let xpToLevelUp = [0]
    let lBarLength = 0
    let LOGBarLength = 0
    let gainedXp = 0
    let gainedShards = 0
    let gainedGachaCurrency = 0
    onMount(() => {
      localUserData = JSON.parse(localStorage.getItem("userData"))
      if (localUserData) {
        //localPullData = JSON.parse(localStorage.getItem("userData"))
        Client.getUserDataFromLocalStorage(localUserData, "userData")
        localUserData = localUserData
      } else {
        console.log("Username not found in local storage.");
      }

      LOGBarLength = `${((localUserData.xp-xpToLevelUp[Number(localUserData.level)-1])/(xpToLevelUp[Number(localUserData.level)]-xpToLevelUp[Number(localUserData.level)-1]))*100}%`

    });


    for(let i=1;i <30;i++){
        xpToLevelUp[i] = Math.ceil((100*i)**1.2)
    }
    console.log(xpToLevelUp)
    function GainXp(){  
        winNotes = true
        winNotes = winNotes
        setTimeout(() => {
            document.getElementById("gainsXP").style.animation = "gainsAnim 0.3s 0.5s forwards"
            document.getElementById("gainsGC").style.animation = "gainsAnim 0.3s 0.6s forwards"
            document.getElementById("gainsS").style.animation = "gainsAnim 0.3s 0.7s forwards"
        }, 100);
        
        function GainXpAnim(xp){
            if(gainedXp < xp){
                gainedXp++
                gainedXp = gainedXp
                setTimeout(() => {
                    GainXpAnim(xp)
                }, 10);
            }
        }
        function GainShardAnim(xp){
            if(gainedShards < xp){
                gainedShards++
                gainedShards = gainedShards
                setTimeout(() => {
                    GainShardAnim(xp)
                }, 10);
            }
        }
        function GainGCAnim(xp){
            if(gainedGachaCurrency < xp){
                gainedGachaCurrency++
                gainedGachaCurrency = gainedGachaCurrency
                setTimeout(() => {
                    GainGCAnim(xp)
                }, 10);
            }
        }

        if(isYourWin){
            GainXpAnim(100)
            setTimeout(() => {
                GainGCAnim(200)
            }, 900);
            setTimeout(() => {
                GainShardAnim(100) 
            }, 1800);
            
            
            localUserData.xp += 100
        }
        else{
            GainXpAnim(50)
            setTimeout(() => {
                GainGCAnim(50)
            }, 400);
            localUserData.xp += 50
        }       
        console.log("1: ",localUserData.xp)
        
        CheckLevelUp()
    }
    function CheckLevelUp(){
        if(localUserData.xp >= xpToLevelUp[Number(localUserData.level)]){
            localUserData.level = Number(localUserData.level + 1)
            //sendData("level",localUserData.level,localUserData.id,"account")
            LOGBarLength = "0%"
        }
        
        lBarLength = `${((localUserData.xp-xpToLevelUp[Number(localUserData.level)-1])/(xpToLevelUp[Number(localUserData.level)]-xpToLevelUp[Number(localUserData.level)-1]))*100}%`
        console.log("2: ",localUserData.xp,localUserData.level,(localUserData.xp-xpToLevelUp[Number(localUserData.level)-1]),lBarLength)

        setTimeout(() => {
            document.getElementById("levelBar").style.animation = "levelBarAnim 0.7s forwards"
        }, 500);
        //sendData("gachaCurrency",localUserData.gachaCurrency,localUserData.id,"account")
        //sendData("shards",localUserData.shards,localUserData.id,"account")
        //sendData("xp",localUserData.xp,localUserData.id,"account")
        localStorage.setItem("userData", JSON.stringify(localUserData));
        
    }

</script>

<div id="winScreen">
    <button on:click={GainXp}>bbb</button>
    {#if winNotes}
    <div id="winNotesCont">
        <div id="winNotes">
            <div id="profileCont">
                <img id="profilePic" class="profilePicComp" src={ProfilePic} alt="border">
                <img id="profileBorder" class="profilePicComp" src={pBorders[borderNumber-1]} alt="border">
            </div>
            <div id="profileName">{localUserData.username}</div>
            <div id="profileLevel">Szint: {localUserData.level}</div>
            <div id="profileXp">TP szintlépéshez: {xpToLevelUp[localUserData.level]-localUserData.xp}</div>
            <div id="levelCont">
                <img class="levelBar" id="levelBarFg" src={levelBarBg} alt="level">
                <div id="levelBar" style="--lBarLength: {lBarLength}; --LOGBarLength: {LOGBarLength}"></div>
                <img class="levelBar" id="levelBarBg" src={levelBarFg} alt="level">
            </div>
            <div id="gainsCont">
                <div id="gainsXP" style="opacity: 0;">TP: {gainedXp}</div>
                <div id="gainsGC" style="opacity: 0;"><img class="gainedIcon" src={gachaCurrencyIcon} alt="GachaCurrency: ">  {gainedGachaCurrency}</div>
                <div id="gainsS" style="opacity: 0;"><img class="gainedIcon" src={shardIcon} alt="Shard: ">  {gainedShards}</div>
            </div>

            <div class="optionButtonCont">
                <div style="position: relative;">
                <button class="optionButtonShadow"></button>
                <button class="optionButton" on:click={() => GoToPage("../mainmenuScreen")}>Tovább</button>
                </div>
            </div>
        </div>
    </div>
    {/if}
    
</div>

<style>
    :root{
        overflow: hidden; /* This will hide any content that overflows the body */
            margin: 0; /* Remove default margin to ensure full coverage */
            padding: 0; /* Remove default padding to ensure full coverage */
    }
    #winScreen{
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left:0;
        z-index: 15;
        background-color: #141111EF;
    }
    #winNotesCont{
        position: absolute;
        top: 10vh;

        animation: winNotesAnim 0.5s forwards ease-out;
    }
    @keyframes winNotesAnim{
        0%{
            left: 100vw;
        }
        100%{
            left: 50vw;
        }
    }
    #winNotes{
        background-image: url(../../lib/assets/gameplay/pad.png);
        background-size: 100% 100%;
        width: 80vw;
        height:80vh;
        position: relative;

    }
    #profileName{
        font-family: "ShadowLight";
        font-size: 2vw;
        position:absolute;
        left:32%;
        top: 27%;
    }
    #profileLevel{
        font-family: "ShadowLight";
        font-size: 1.9vw;
        position:absolute;
        left:13%;
        top: 50%;
    }
    #profileXp{
        font-family: "ShadowLight";
        font-size: 1vw;
        position:absolute;
        left:16%;
        top: 64%;
    }
    #profileCont{
        position: absolute;
        top:17%;
        left:13%;
        width:12vw;
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

    #gainsCont{
        position: absolute;
        font-family: "ShadowLight";
        font-size: 1.5vw;
        position:absolute;
        left:13%;
        top: 70%;
    }
    .gainedIcon{
        width:2vw;
    }
    @keyframes -global-gainsAnim{
        0%{
            opacity: 1;
            margin-left:-10vw;
        }
        100%{
            opacity: 1;
            margin-left:0vw;
        }
    }


    #levelCont{
        position: absolute;
        top:60%;
        left: 13%;
        width: 35%;
        background-color: violet;
    }
    .levelBar{
        position: absolute;
        width: 100%;
    }
    #levelBar{
        position: absolute;
        height: 1.7vh;
        left:2%;
        top:7%;
        width: var(--LOGBarLength);
        background: linear-gradient(0.25turn, #1774ee, #3dbb3d, #d38328);
        border-radius: 2vw;
    }
    @keyframes -global-levelBarAnim{
        0%{
            width: var(--LOGBarLength);
        }
        100%{
            width: var(--lBarLength);
        }
    }

    .optionButtonCont{
        position: absolute;
        top: 77%;
        left: 27%;
        opacity: 0;
        animation: tovabbButtonAnim 0.5s 3s forwards;
    }
    @keyframes tovabbButtonAnim{
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
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

        position:absolute;
    }
    .optionButtonShadow{
        width:13.5vw;
        height:5vw;
        
        background: url(../../lib/assets/mainmenu/optionButtonShadow.png);
        background-size: 100% 100%;

        border: none;
        position: absolute;
    }
    .optionButton:hover{
        cursor: pointer;
        transform: scale(1.1);
        margin-left: -0.6vw;
        margin-top: -0.6vw;
    }



    @font-face {
      font-family: 'sgGachaFont';
      src: url('../../lib/assets/fonts/MyFont-Regular.otf');
    }
    @font-face {
        font-family: 'ShadowLight';
        src: url('../../lib/assets/fonts/ShadowsIntoLight-Regular.ttf');
    }


</style>

