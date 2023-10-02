<script>

    import { onMount } from 'svelte';
    let move
    let target

    onMount(() => {


    move = document.getElementById("move");
    target = document.getElementById("target");
    let dragged = undefined

    move.addEventListener("dragstart", dragStart)
    
    target.addEventListener("drop", drop)
    target.addEventListener("dragover", (e) => {e.preventDefault()})

    function drop(event) {
        console.log(event);
        event.preventDefault()
        console.log(event.target);
        console.log(dragged);
        event.target.appendChild(dragged)
    }

    function dragStart(event) {
        console.log(event);
        dragged = event.target
    }


    
    });
</script>
<div id="target"></div>

<div id="move" draggable="true">
</div>
<style>
    #target{
        width: 200px;
        height: 200px;
        background-color: yellow;
    }

    #move{
        width:40px;
        height: 40px;
        background-color: aquamarine;
    }
</style>