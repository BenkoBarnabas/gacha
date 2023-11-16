<script>
    import {lobby, LoadLobby, ReloadLobby, clientID,userData, getUserDataFromLocalStorage} from "../../client"
    import {SveltePageLoaded, currentOpponentId, sendMatchRequest} from "../../matchHandler"


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

        SveltePageLoaded()

        pageLoaded = true
        pageLoaded = pageLoaded
    });


    let loginScreen = true
    
    
    let usersInLobby= []
    function LoadCurrentLobby(){
        if (username != ""){
            LoadLobby({username: username, id: ""})
            usersInLobby= Array.from(lobby)

            loginScreen = false
            loginScreen = loginScreen

        }
        else{
            window.alert("írj is bele valamit haver")
        }
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

    function StartMatchWithPlayer(id){
        //id is the players clinetId u clicked on
        sendMatchRequest(id)

    }
    let matchLoaded = false

    function update() {
        SenseOpponentPresence()
        requestAnimationFrame(update)
    }

    onMount(() => {
        update()
    });

    function SenseOpponentPresence(){
        if(currentOpponentId != "" && !matchLoaded){
            console.log("went to page");
            matchLoaded = true
            GoToPage("../matchScreen")
            
        }
    }
    function GoToPage(filePath) {
        window.location.href = filePath; // Navigate to the parent directory
    }
    
    


</script>


{#if loginScreen}
    <button on:click={LoadCurrentLobby}>log in</button>
{:else}
    <div id="yourLobbyInfo">
        username: {username}<br> id: {clientID}
    </div>
    
    <div id="onlinePlayersCont">
        {#each usersInLobby as lobbyMembers}
        {#if lobbyMembers.id != clientID}
        <button style="cursor: pointer;" class="onlinePlayer" on:click={() => StartMatchWithPlayer(lobbyMembers.id)}>
            username: {lobbyMembers.username}<br> id: {lobbyMembers.id}
        </button>
        {/if}
        {/each}
    </div>
{/if}

<button on:click={RealodLobbyAndSvelte}>Reload</button>
<br><br>
<a href="../gameplayScreen">gameplay</a>



<style>
    #yourLobbyInfo{
        height: 10vw;
        width: 13vw;
        background-color: rgb(230, 164, 21);
        border: 2px solid black;
    }
    #onlinePlayersCont{
        display: flex;
        background-color: blueviolet;
    }
    .onlinePlayer{
        height: 10vw;
        width: 13vw;
        background-color: aqua;
        border: 2px solid black;
        margin-right: 2vw;
    }
</style>