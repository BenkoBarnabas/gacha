<script>
    import {lobby, LoadLobby, ReloadLobby, clientID,userData, getUserDataFromLocalStorage,requestFullScreen} from "../../client"
    import {SveltePageLoaded, currentOpponentId, sendMatchRequest, LobbyDomLoaded,DeclineMatchRequest, AcceptMatchRequest} from "../../matchHandler"

    import logo from "../../lib/assets/global/logoTextv3.png"


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
    let username
    
    import { onMount } from 'svelte';
    onMount(() => {
        localUserData = JSON.parse(localStorage.getItem("userData"))
        if (localUserData) {
            //localUserData = JSON.parse(localStorage.getItem("userData"))
            getUserDataFromLocalStorage(localUserData, "userData")
        } else {
            console.log("Username not found in local storage.");
        }
        username = localUserData.username

        LobbyDomLoaded()
        document.addEventListener("matchMadeEvent",MatchRequest)
        document.addEventListener("socketLoaded",LoadCurrentLobby)
        document.addEventListener("matchDeclinedEvent",MatchDeclinedEvent)

    });


    let loginScreen = true
    
    
    let usersInLobby= []
    function LoadCurrentLobby(){
        pageLoaded = true
        pageLoaded = pageLoaded
        LoadLobby({username: username, id: "",border: localUserData.border, profilPic: 1,level:localUserData.level})
            usersInLobby= Array.from(lobby)

            loginScreen = false
            loginScreen = loginScreen
    }
    
    function RealodLobbyAndSvelte(){
        ReloadLobby()
        usersInLobby= Array.from(lobby)
        while (usersInLobby== lobby){
            console.log("fasz");
            usersInLobby= Array.from(lobby)
            usersInLobby= usersInLobby
        }
    }

    function StartMatchWithPlayer(member){
        //id is the players clinetId u clicked on
        sendMatchRequest(member,{username: username, id: clientID,border: localUserData.border, profilPic: 1,level:localUserData.level})

        isMatchRequested = true
        isMatchRequested = isMatchRequested

        matchRequester = member

    }
    let isGotRequest = false
    let isMatchRequested = false
    let matchRequester = {username: "moni",id: "POBSOIJVPL-6L",level: 23,profilPic: 1,border:5}

    function MatchRequest(event){
        isGotRequest = true
        isGotRequest = isGotRequest
        matchRequester = event.data
        matchRequester = matchRequester

    }
    function AnswerMatchRequest(wether){
        if(wether){
            AcceptMatchRequest()
        }
        else{
            DeclineMatchRequest(matchRequester.id)
            MatchDeclinedEvent()
        }
    }
    function MatchDeclinedEvent(){
        matchRequester = {}
        matchRequester = matchRequester

        isGotRequest = false
        isGotRequest = isGotRequest
        isMatchRequested = false
        isMatchRequested = isMatchRequested

    }

    function GoToPage(filePath) {
        window.location.href = filePath; // Navigate to the parent directory
    }
    
</script>
{#if isGotRequest}
    <div id="matchRequest">
        <div id="matchRequestCont">
            <div id="matchRequestMsg"><b>{matchRequester.username}</b> JÁTÉKMEGHÍVÁST KÜLDÖTT</div>
            <div style="font-size: 1.2vw; margin-top: 1.5vh; margin-left: 50%;"><span style="font-size: 1.3vw;"><b>'{matchRequester.id}'</b></span> id-vel</div>
            <div id="profileCont"  style="scale: 1.5; left: 11%; top: 25%;">
                <img id="profilePic" class="profilePicComp" src={profilePics[matchRequester.profilPic-1]} alt="border">
                <img id="profileBorder" class="profilePicComp" src={pBorders[matchRequester.border-1]} alt="border">
            </div>
            <div style="position: absolute; left:18%; top: 78%; font-size: 3vw;"><b>{matchRequester.level}</b></div>

            <div class="optionButtonCont" style="filter:hue-rotate(0deg); top:40%;">
                <div style="position: relative;">
                <button class="optionButtonShadow"></button>
                <button class="optionButton" on:click={() => AnswerMatchRequest(true)}>Elfogad</button>
                </div>
            </div>
            <div class="optionButtonCont" style="filter:hue-rotate(270deg); top: 68%;">
                <div style="position: relative;">
                <button class="optionButtonShadow"></button>
                <button class="optionButton" on:click={() => AnswerMatchRequest(false)}>Elutasít</button>
                </div>
            </div>
        </div>
    </div>
{/if}
{#if isMatchRequested}
    <div id="matchRequest">
        <div id="matchRequestCont">
            <div id="matchRequestMsg">JÁTÉKMEGHÍVÁST KÜLDTÉL <b>{matchRequester.username}</b> játékosnak</div>
            <div style="font-size: 1.2vw; margin-top: 1.5vh; margin-left: 50%;"><span style="font-size: 1.3vw;"><b>'{matchRequester.id}'</b></span> id-vel</div>
            <div id="profileCont"  style="scale: 1.5; left: 11%; top: 25%;">
                <img id="profilePic" class="profilePicComp" src={profilePics[matchRequester.profilPic-1]} alt="border">
                <img id="profileBorder" class="profilePicComp" src={pBorders[matchRequester.border-1]} alt="border">
            </div>
            <div style="position: absolute; left:18%; top: 78%; font-size: 3vw;"><b>{matchRequester.level}</b></div>

            <div class="optionButtonCont" style="filter:hue-rotate(0deg); top:50%;">
                <div style="position: relative;">
                <button class="optionButtonShadow"></button>
                <button class="optionButton" on:click={() => AnswerMatchRequest(false)}>Megszakít</button>
                </div>
            </div>
        </div>
    </div>
{/if}

<div id="header">
    <div id="logo"><h1 style="margin-top:2vh; font-size:2.5vw; text-align:center; color:white;">Lobby</h1></div>
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

{#if !loginScreen}
    <div id="yourLobbyInfo" >
        <div id="profileCont"  style="scale: 1.2; left: 10%; top: 5%;">
            <img id="profilePic" class="profilePicComp" src={profilePics[localUserData.profilPic-1]} alt="border">
            <img id="profileBorder" class="profilePicComp" src={pBorders[localUserData.border-1]} alt="border">
        </div>
        <div style="font-size: 0.9vw; position:absolute; bottom: 5%; left: 8.5%;"><i>{clientID}</i></div>
        <div class="yourStats">
            <div style="font-family: sgGachaFont; font-size: 2vw;">{localUserData.username}</div>
            <div style="font-family: mainFont; font-size: 1vw;">{localUserData.level}. Szint</div><br>
            
            <button on:click={RealodLobbyAndSvelte}>Reload</button>
        </div>
    </div>
    
    <div id="onlinePlayersCont">
        {#each usersInLobby as lobbyMembers}
        {#if lobbyMembers.id != clientID}

        <div class="enemyPlayerCont"  on:click={() => StartMatchWithPlayer(lobbyMembers)} on:keydown role="button" tabindex="">
            <div id="profileCont">
                <img id="profilePic" class="profilePicComp" src={profilePics[lobbyMembers.profilPic-1]} alt="border">
                <img id="profileBorder" class="profilePicComp" src={pBorders[lobbyMembers.border-1]} alt="border">
            </div>
            <div class="enemyStats">
                <div style="font-family: sgGachaFont; font-size: 2vw;">{lobbyMembers.username}</div>
                <div style="font-family: mainFont; font-size: 1vw;">{lobbyMembers.level}. Szint</div><br>
                <div style="font-size: 0.8vw;"><i>{lobbyMembers.id}</i></div>
            </div>
        </div>

        {/if}
        {/each}
    </div>
{/if}

<div id = "background"></div>

<style>
    @font-face {
      font-family: 'sgGachaFont';
      src: url('../../lib/assets/fonts/MyFont-Regular.otf');
    }
    @font-face {
      font-family: 'mainFont';
      src: url('../../lib/assets/fonts/zh-cn.ttf');
    }
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
    }

    #matchRequest{
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left:0;
        z-index: 15;
        background-color: #23222993;
    }
    #matchRequestCont{
        position: absolute;
        width: 50vw;
        height: 40vh;
        background-color: darkcyan;
        border-radius: 4vw;
        border: 1.5vw solid rgb(25, 25, 34);
        left: 23.5vw;
        top: 23vh;

        scale: 0;
        animation: matchReq 0.4s forwards;
    }
    @keyframes matchReq{
        0%{
            scale: 0;
        }
        100%{
            scale: 1;
        }
    }
    #matchRequestMsg{
        text-align: center;
        font-size: 2vw;
        font-family: 'mainFont';
        margin-top: 4vh;
    }
    .optionButtonCont{
        position: absolute;
        left: 45%;
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



    #yourLobbyInfo{
        position: relative;
        width: 30vw;
        height: 30vh;
        max-height: 14vw;
        margin-bottom: 5vh;
        margin-left: auto;
        margin-right: auto;
        background-color: red;
    }
    .yourStats{
        position: absolute;
        left:50%;
        top: 20%;
        height: 80%;
        text-align: center;
    }
    #onlinePlayersCont{
        position: relative;
        background-color: violet;
        width: 90vw;
        height: 55vh;
        margin: auto;
        overflow: auto;
    }
    .enemyPlayerCont{
        background: linear-gradient(to right, transparent, #748996),url("../../lib/assets/global/logoHalf.png");
        background-size: auto 180%;
        background-repeat: no-repeat;
        background-position: right;
        height: 18vh;
        width: 40%;
        border-top-right-radius: 3vw;
        border-bottom-right-radius: 3vw;
        position: relative;
        margin-bottom: 4vh;
    }
    .enemyPlayerCont:hover{
        transform: scale(1.1);
        cursor: pointer;
    }
    .enemyStats{
        position: absolute;
        left:42%;
        top: 10%;
        height: 80%;
        text-align: center;
    }


    #profileCont{
        position: absolute;
        left: 5vw;
        width: 10vw;
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

        left: 44vw;
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
</style>