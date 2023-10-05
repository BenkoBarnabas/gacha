<script>
    import {sendData, getData, responsData, Cpity4S, Cpity5S, CpityUR, sendSocketValue, AddEmptyRow} from "../../client"

    var loginScreen = true
    let userId = "1"
    let username = "barnix"
    
    let usersInLobby = {
        lobby: []
    }
    function LoadCurrentLobby(){
        sendData("username",username,userId,"lobby")
        setTimeout(() => {
            sendSocketValue("*",userId,"lobby",usersInLobby)
            //console.log(usersInLobby.lobby);
        }, 100);
        loginScreen = false
        loginScreen = loginScreen
        usersInLobby = usersInLobby
        //f()
        
    }
    function f(){
        setTimeout(() => {
            sendSocketValue("*",userId,"lobby",usersInLobby)
            usersInLobby = usersInLobby
            console.log(usersInLobby);
            f()
        }, 100);
    }
    $: {
        sendSocketValue("*",userId,"lobby",usersInLobby)
            usersInLobby = usersInLobby
            console.log(usersInLobby);
    }


</script>
<div id="background"></div>
<a href="../gameplayScreen">gameplay</a>

{#if loginScreen}
    <input type="text" placeholder="give a id" bind:value={userId}>
    <input type="text" placeholder="give a username" bind:value={username}>
    <button on:click={LoadCurrentLobby}>log in</button>
{:else}
    {#each usersInLobby.lobby as lobbyMembers}
        id: {lobbyMembers.id}  username: {lobbyMembers.username} {usersInLobby.lobby.length}<br>
    {/each}
{/if}

<button on:click={() => AddEmptyRow("lobby")}>add r</button>




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