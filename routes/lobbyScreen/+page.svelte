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

<a href="../gameplayScreen">gameplay</a>

{#if loginScreen}
    <input type="telobbyt" placeholder="give a username" bind:value={username}>
    <button on:click={LoadCurrentLobby}>log in</button>
{:else}
    {#each usersInLobby as lobbyMembers}
        id: {lobbyMembers.id}  username: {lobbyMembers.username}<br>
    {/each}
{/if}

<button on:click={RealodLobbyAndSvelte}>Reload</button>



<style>

</style>