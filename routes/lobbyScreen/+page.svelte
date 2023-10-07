<script>
    import {lobby, LoadLobby, ReloadLobby} from "../../client"

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
<div id="background"></div>
<a href="../gameplayScreen">gameplay</a>

{#if loginScreen}
    <input type="telobbyt" placeholder="give a username" bind:value={username}>
    <button on:click={LoadCurrentLobby}>log in</button>
{:else}
    {#each usersInLobby as lobbyMembers}
        id: {lobbyMembers.id}  username: {lobbyMembers.username} {lobby.length}<br>
    {/each}
{/if}

<button on:click={RealodLobbyAndSvelte}>Reload</button>



<style>
#background{
        width: 100vw;
        height: 100vh;
        position: fixed;
        z-index: -1;
        background-image: url("../../lib/assets/gameplay/PHBG.jpg");
        background-size: 100% 100%;
    }
</style>