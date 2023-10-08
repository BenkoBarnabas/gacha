<script>
    import {lobby, LoadLobby, ReloadLobby, clientID} from "../../client"

    let loginScreen = true
    let username = "barnix"


    
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
    


</script>


{#if loginScreen}
    <input type="telobbyt" placeholder="give a username" bind:value={username}>
    <button on:click={LoadCurrentLobby}>log in</button>
{:else}
    <div id="yourLobbyInfo">
        username: {username}<br> id: {clientID}
    </div>
    
    <div id="onlinePlayersCont">
        {#each usersInLobby as lobbyMembers}
        {#if lobbyMembers.id != clientID}
        <div class="onlinePlayer">
            username: {lobbyMembers.username}<br> id: {lobbyMembers.id}
        </div>
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