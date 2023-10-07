<script>
    import {usersInLobby, LoadLobby, ReloadLobby} from "../../client"

    var loginScreen = true
    let userId = "1"
    let username = "barnix"
    
   
    function LoadCurrentLobby(){
        if (username != "" && userId != ""){
            LoadLobby({username: username, id: userId})
            loginScreen = false
            loginScreen = loginScreen
        }
        else{
            window.alert("írj is bele valamit haver")
        }
    }
    function RealodLobbyAndSvelte(){
        var pre = usersInLobby
        while(pre != usersInLobby){
            ReloadLobby()
            console.log("mmm");
        }
        console.log("okke");
        usersInLobby = usersInLobby
    }


</script>
<div id="background"></div>
<a href="../gameplayScreen">gameplay</a>

{#if loginScreen}
    <input type="teusersInLobbyt" placeholder="give a id" bind:value={userId}>
    <input type="teusersInLobbyt" placeholder="give a username" bind:value={username}>
    <button on:click={LoadCurrentLobby}>log in</button>
{:else}
    {#each usersInLobby as lobbyMembers}
        id: {lobbyMembers.id}  username: {lobbyMembers.username}<br>
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