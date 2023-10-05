<script>
    import {sendData, getData, responsData, Cpity4S, Cpity5S, CpityUR, sendSocketValue} from "../../client"

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
        
    }

    let almak = ["alam","körte","banán"]
    let csiga = 0
    $: {csiga = almak
    almak = almak
console.log("$: ",almak);}

</script>
<a href="../gameplayScreen">testGround</a>

{#if loginScreen}
    <input type="text" placeholder="give a id" bind:value={userId}>
    <input type="text" placeholder="give a username" bind:value={username}>
    <button on:click={LoadCurrentLobby}>log in</button>
{:else}
    {#each almak as alma}
        {alma} <br>
    {/each}
{/if}
<button on:click={() => almak.push("fuga")}>psuh</button>
<button on:click={() => console.log(csiga)}>csiag</button>


<style>

</style>