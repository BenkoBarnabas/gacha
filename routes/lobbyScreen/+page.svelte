<script>
	import { goto } from "$app/navigation";
    import {lobby, LoadLobby, ReloadLobby, clientID,userData} from "../../client"
    import {currentOpponentId, sendMatchRequest} from "../../matchHandler"

    let loginScreen = true
    let username = userData.username
    
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

    function update() {
    //logic
    SenseOpponentPresence()
    requestAnimationFrame(update)
    }
    function SenseOpponentPresence(){
        if(currentOpponentId != ""){
            console.log("went to page");
            GoToPage("../matchScreen")
            
        }
    }
    function GoToPage(filePath) {
        window.location.href = filePath; // Navigate to the parent directory
    }
    update()
    


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