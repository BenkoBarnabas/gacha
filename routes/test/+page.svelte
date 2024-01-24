<script>
    import { onMount } from 'svelte';
    import cardBack from "../../lib/assets/global/cardBack.png"

    let deckCoverDoms = []
    function deckCoverAnim(n){
        for(let i=0;i<3;i++){
            deckCoverDoms[n].children[i].style.animation =`pakliCoverCard${3-i}hover 0.7s forwards`
        }
    }
    function deckCoverAnimClose(n){
        for(let i=0;i<3;i++){
            deckCoverDoms[n].children[i].style.animation = "none"
            deckCoverDoms[n].children[i].offsetHeight
        }
    }
</script>
<div class="pakliCover" bind:this={deckCoverDoms[0]} on:mouseenter={()=> deckCoverAnim(0)} on:mouseleave={() => deckCoverAnimClose(0)}>
    <img class="pakliCoverCard3" src={cardBack} alt="[]">
    <img class="pakliCoverCard2" src={cardBack} alt="[]">
    <img class="pakliCoverCard1" src={cardBack} alt="[]">
</div>
<style>
    .pakliCover{
        width: 8vw;
        background-color: violet;
        position: relative;
        margin-top: 30vh;
        margin-left:20vw;
    }
    .pakliCoverCard1{
        width: 80%;
        transform: rotate(0deg);
        position: absolute;

        left:10%
    }
    .pakliCoverCard2{
        width: 60%;
        transform: rotate(-5deg);
        position: absolute;
        left:2%;
        top:1vh;
    }
    .pakliCoverCard3{
        width: 40%;
        transform: rotate(-10deg);
        position: absolute;
        top:5vh;
        left:0;
    }
    @keyframes -global-pakliCoverCard1hover{
        100%{
            width: 80%;
            transform: rotate(3deg);
            position: absolute;

            left:10%
        }
    }
    @keyframes -global-pakliCoverCard2hover{
        100%{
            width: 60%;
            transform: rotate(-20deg);
            position: absolute;
            left:0;
            top:1vh;
        }
    }
    @keyframes -global-pakliCoverCard3hover{
        100%{
            width: 40%;
            transform: rotate(-40deg);
            position: absolute;
            top:6vh;
        }
    }
</style>

