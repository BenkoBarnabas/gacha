<script>
    import { onMount } from 'svelte';
    

</script>

<div id="playField">

    {#each Array(5) as cell,i}
        <div id="etd{i}" class="boardsCells" style="top: 5%; left:{10+8+i*15}%">
            <div id="cardPreviewListCont"></div>
        </div>
    {/each}
    {#each Array(5) as cell,i}
        <div id="etd{i+6}" class="boardsCells" style="top: 22%; left:{10+i*15}%">
            <div id="cardPreviewListCont"></div>
        </div>
    {/each}

    {#each Array(5) as cell,i}
        <div id="td{i}" class="boardsCells" style="bottom: 5%; left:{10+i*15}%">
            <div id="cardPreviewListCont"></div>
        </div>
    {/each}
    {#each Array(5) as cell,i}
        <div id="td{i+6}" class="boardsCells" style="bottom: 22%; left:{10+8+i*15}%">
            <div id="cardPreviewListCont"></div>
        </div>
    {/each}
</div>

<style>
    #cardPreviewListCont{
        width: 8.151vw;
        height: 9.69vw;
        background-color: violet;
        border: 2px solid black;
    }
    #playField{
        background: url(../../lib/assets/gameplay/pad.png);
        background-size: 100% 100%;
        width: 80vw;
        height: 66vh;

        position: absolute;
        left: 7vw;
        top: 15vh;
    }
    .gameFiledSides{
        width: 74vw;
        height: 29.5vh; 
        position: relative;
    }
    .boardRows{
        width: 74vw;
        height: 16.25vh;
        position: absolute;
        margin-left: 8vw;
        margin-right: 8vw;
    }
    .boardsCells{
        position: absolute;
    }
    .tierOne{
        top: 0;
    }
    .tierTwo{
        top: 11vh;
    }
    .BoardTierTwo{
        display: block;
        float: right;
    }

    
    
</style>

