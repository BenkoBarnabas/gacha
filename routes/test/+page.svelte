<script>
    let particleContainer
    import { onMount } from 'svelte';
    import * as Cards from "../../card"
    onMount(() => {
        particleContainer = document.getElementById("particle-container");

        document.addEventListener("click", (event) => {
            for(let i = 0; i <6; i++){
                createParticle(event.clientX, event.clientY);
            }
        });
        document.addEventListener("mousedown", (event) => {
            createParticle(event.clientX, event.clientY);
        });
    });

    import cardBackground from "../../lib/assets/global/cardV1BG.png"
    import cardForeground from "../../lib/assets/global/cardV1Top.png"
    import cardV2Background from "../../lib/assets/global/cardV2BG.png"
    import cardV2BackgroundRed from "../../lib/assets/global/cardV2BGRed.png"

    import spellForeground from "../../lib/assets/global/spellV1Top.png"
    import spellV2Foreground from "../../lib/assets/global/spellV2Top.png"

    var backgroundColorByCost = ["#2672ed","#8626ed","#ed7c26","linear-gradient(180deg, rgb(235, 160, 160), rgb(240, 216, 171), rgb(233, 233, 169), rgb(174, 236, 174), rgb(168, 213, 240), rgb(200, 155, 231), rgb(235, 159, 235))"]
    var starsColorByCost = ["color: #2672ed;","color: #8626ed;","color: #ed7c26;","background-image: linear-gradient(90deg, rgb(235, 160, 160), rgb(240, 216, 171), rgb(233, 233, 169), rgb(174, 236, 174), rgb(168, 213, 240), rgb(200, 155, 231), rgb(235, 159, 235));-webkit-background-clip: text;background-clip: text;color: transparent;"]
    import qucikAtk from "../../lib/assets/global/quickAtk.png"
    import doubleAtk from "../../lib/assets/global/doubleAtk.png"
    import blastAtk from "../../lib/assets/global/blastAtk.png"
    import lifeSteal from "../../lib/assets/global/lifeSteal.png"
    import thorns from "../../lib/assets/global/thorns.png"
    import challanger from "../../lib/assets/global/challanger.png"
    let talentIcons = {
        kihívó: challanger,
        kettőstámadás: doubleAtk,
        tövisesbőr: thorns,
        fürgetámadás: qucikAtk,
        robbanótámadás: blastAtk,
        életelszívás_1: lifeSteal,
        életelszívás_2: lifeSteal,
        életelszívás_3: lifeSteal
    }

    import tunya from "../../lib/assets/gameplay/tunya.png"
    import lelkiismeretes from "../../lib/assets/gameplay/lelkiismeretes.png"
    import vérszomjas from "../../lib/assets/gameplay/vérszomjas.png"
    import veszett from "../../lib/assets/gameplay/veszett.png"

    let aligmentIcons = {
        tunya: tunya,
        lelkiismeretes: lelkiismeretes,
        vérszomjas: vérszomjas,
        veszett: veszett
    }
    let aligmentBackgroundColors = {
        tunya: "rgba(113, 166, 117, 0.6)",
        lelkiismeretes: "rgba(113, 145, 166, 0.6)",
        vérszomjas: "rgba(166, 113, 118, 0.6)",
        veszett: "rgba(133, 113, 166, 0.6)"
    }
    let root
    let Atop
    let Aleft


    function move(card){
        console.log(card);
        Atop = "50vw"
        Aleft = "20vw"
        card.style.animation = "none"
        card.offsetHeight;
        card.style.animation = "move 2s"
    }

// Function to create a new particle at the specified coordinates
function createParticle(x, y) {
    x -= 10
    y -= 10
    var dirx
    var diry
    Math.random()>0.5 ? dirx = -1 : dirx = 1
    Math.random()>0.5 ? diry = -1 : diry = 1


    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.position = "absolute"
    particle.style.left = `${x + Math.random()*10*dirx}px`;
    particle.style.top = `${y + Math.random()*10*diry}px`;
    particle.style.width = `${Math.random()+0.2}vw`; // Random size
    particle.style.height = particle.style.width;
    particle.style.opacity = Math.random();
    particle.style.background = "red"
    particle.style.borderRadius = "50%"

    // Append the particle to the container
    particleContainer.appendChild(particle);

    moveParticleContorller(particle,x,y)

    // Remove the particle after a short delay
    setTimeout(() => {
        //particle.remove();
    }, 1000);
}
function moveParticleContorller(particle,left,top){
    var i = 0
    var dirx
    var diry
    Math.random()>0.5 ? dirx = -1 : dirx = 1
    Math.random()>0.5 ? diry = -1 : diry = 1

    var op = 1
    moveParticle(particle,left,top,dirx,diry,i,op)
}
function moveParticle(particle,left,top,dirx,diry,i,op){
    if (i < 12){
        left += dirx
        top += diry
        particle.style.left = `${left}px`
        particle.style.top = `${top}px`

        op -= .07
        particle.style.opacity = op
        i++
        setTimeout(() => {
            moveParticle(particle,left,top,dirx,diry,i,op)
        }, 50);
    }
    else{
        particle.remove();
    }
}
</script>

<div id="root" bind:this={root}></div>
<div id="particle-container"></div>

<button on:click={()=> move(document.getElementById("cont"))}>moe</button>
<div  id="cont" style="--top: {Atop}; --left: {Aleft};position: absolute; width:10vw; height:10vw; background-color:aquamarine"></div>

<style>



#particle-container {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
}
:root {
        --cardsScale: 0.4;
        --cardOnBoardScale: 2;
    }


@keyframes -global-move {
    0%{
        top: 0;
        left: 0;
    }
    100%{
        top: var(--top);
        left: var(--left);
    }
}








    @font-face {
            font-family: 'SevenSwords';
            src: url('../../lib/assets/fonts/SEVESBRG.ttf');
    }
    @font-face {
        font-family: 'ShadowLight';
        src: url('../../lib/assets/fonts/ShadowsIntoLight-Regular.ttf');
    }
    @font-face {
      font-family: 'mainFont';
      src: url('../../lib/assets/fonts/zh-cn.ttf');
    }

    
    .spellListFrame{
        width: calc(var(--cardOnBoardScale)*1vw*12.5);
        height: calc(var(--cardOnBoardScale)*1vw*15.8754);
        position:absolute;
        background-image: url("../../lib/assets/global/spellV2Top.png");
        background-size: cover;
        background-position: center;
        background-color: transparent;
        border: none;
    }
    .curCardMultipleIconsContainer{
        position: absolute;
        top: calc(var(--cardOnBoardScale)*1vw*13.5);
        left: calc(var(--cardOnBoardScale)*1vw*3.9);
        width: calc(var(--cardOnBoardScale)*1vw*5.2);
        height: calc(var(--cardOnBoardScale)*1vw*2);
        display:flex;
        flex-wrap:nowrap;
        align-content:space-around;
}
    #cardPreviewListCont{
        position: relative;
        width:calc(var(--cardOnBoardScale)*1vw*14.3);
        height: calc(var(--cardOnBoardScale)*1vw*17);
        display:inline-block;
        padding: 0;
        margin: 0;
        
    }
    .cardListFrame{
        width: calc(var(--cardOnBoardScale)*1vw*12.5);
        height: calc(var(--cardOnBoardScale)*1vw*15.8754);
        position:absolute;
        background-image: url("../../lib/assets/global/cardV2Top.png");
        background-size: cover;
        background-position: center;
        background-color: transparent;
        border: none;
    }
    #rarityBGList{
        position: absolute;
        width: calc(var(--cardOnBoardScale)*1vw*10);
        height: calc(var(--cardOnBoardScale)*1vw*13);
        left: calc(var(--cardOnBoardScale)*1vw*1);
        top: calc(var(--cardOnBoardScale)*1vw*1);

        opacity: 0.35;
        background-blend-mode:saturation;
    }
    .cardButton{
        width:calc(var(--cardOnBoardScale)*1vw*7.5);

        border: none;

        background-size:cover;
        box-shadow: 0 0 1.3vw rgba(0, 0, 0, 0.735);

        position: absolute;

        left: calc(var(--cardOnBoardScale)*1vw*2.97);
        top: calc(var(--cardOnBoardScale)*1vw*2.5);
    }
    .curCardStatsList{
        font-size: calc(var(--cardOnBoardScale)*1vw*1.9);
        font-family: 'SevenSwords';
        color: white;
        text-shadow:
                -0.08vw -0.08vw 0 #000, /* Top-left shadow */
                0.08vw -0.08vw 0 #000, /* Top-right shadow */
                -0.08vw 0.08vw 0 #000, /* Bottom-left shadow */
                0.08vw 0.08vw 0 #000; /* Bottom-right shadow */

        position: absolute;
        top: calc(var(--cardOnBoardScale)*1vw*13.3);
    }
    .curCardCostList{
        font-size: calc(var(--cardOnBoardScale)*1vw*3);
        font-weight: bold;
        font: italic;
        font-family: 'ShadowLight';
        color: rgb(184, 11, 11);

        position: absolute;
        top: calc(var(--cardOnBoardScale)*1vw*1);
        left: calc(var(--cardOnBoardScale)*1vw*2.5);
    }
    .curCardNameList{
        font-size: calc(var(--cardOnBoardScale)*1vw*1);
        font-family: Impact;
        color: rgba(247, 240, 221, 0.778);
        text-shadow: 0 0 calc(var(--cardOnBoardScale)*1vw*1) rgba(0, 0, 0, 0.536);

        position: absolute;
        top: calc(var(--cardOnBoardScale)*1vw*12.8);
        left: calc(var(--cardOnBoardScale)*1vw*2);

        text-align: center;
        width: calc(var(--cardOnBoardScale)*1vw*9.5);
    }
    .curCardRarityList{
        width: calc(var(--cardOnBoardScale)*1vw*6);
        text-align: center;
        mix-blend-mode: screen;

        position: absolute;
        left: calc(var(--cardOnBoardScale)*1vw*3.7);
        top: 0;
    }
    .curCardTalentIconList{
        position: absolute;
        width: calc(var(--cardOnBoardScale)*1vw*1.4);
        top: calc(var(--cardOnBoardScale)*1vw*13.4);
    }
    .curCardTalentList{
        position: absolute;
        font-family: "talentFont";
        color: antiquewhite;
        font-size: calc(var(--cardOnBoardScale)*1vw*0.7);
        top: calc(var(--cardOnBoardScale)*1vw*14);
        left: calc(var(--cardOnBoardScale)*1vw*3.9);
        width: calc(var(--cardOnBoardScale)*1vw*3.6);
        height: calc(var(--cardOnBoardScale)*1vw*1);
        padding-left:calc(var(--cardOnBoardScale)*1vw*1.9);
    }
    .curCardAligList{
        position: absolute;
        width: calc(var(--cardOnBoardScale)*1vw*2.2);
        left: calc(var(--cardOnBoardScale)*1vw*1.8);
        top: calc(var(--cardOnBoardScale)*1vw*4.8);
    }
</style>

