<script>
    import SN from "../../lib/assets/gacha/SeniorWisdom.png"
    import YC from "../../lib/assets/gacha/YouthfulCuriosity.png"
    import SNCover from "../../lib/assets/gacha/SWCover.png"
    import YCCover from "../../lib/assets/gacha/YCCover.png"
    import bannerBG from "../../lib/assets/gacha/bannerBg.png"
    import bannerText from "../../lib/assets/gacha/bannerText.png"
    import rollCard from "../../lib/assets/gacha/rollBg.png"

    var whichBanner //if SN banner active true : false
    var isRolling = false
    var pullNum =10

    function ActivateBanner(param){
        whichBanner = param
        whichBanner = whichBanner
    }

    function Pull(num){
        isRolling = true
        pullNum = num
    }

    function ClosePull(){
        isRolling = false
        isRolling = isRolling
    }
</script>

{#if isRolling}
    <div id="rollScreen">
        <div id="rollsDiv"></div>



	
        <div id="rollContainer">
        {#each Array(pullNum) as _}
        <img class="rollCard" src={rollCard} alt="rollCard">
        {/each}
        </div>
    </div>
    <button style="position: absolute; margin:0; z-index:4; left:90vw;" on:click={ClosePull}>X</button>
{/if}

<h1 style="margin-left:6vw; font-size:5vmin;">Gacha gacha gacha</h1>

<div id="buttons">
    <button style="background: URL({SNCover});" class="bannerIcon" on:click={() => ActivateBanner(true)}></button>
    <button style="background: URL({YCCover});" class="bannerIcon" on:click={() => ActivateBanner(false)}></button>
</div>

<div id="banner">  

    <img class="bannerBg" class:banner2={whichBanner} src={bannerText} alt="banners text assets">
    
    {#if whichBanner}
        <h1 class ="bannerName"><span style="color: brown">Senior</span><br> Wisdom</h1>
        <img class="chracterPic" src={SN} alt="Senior Wisdom"/>
    {:else}
        <h1 class ="bannerName"><span style="color: blue">Youthful</span><br> Curiosity</h1>
        <img class="chracterPic" src={YC} alt="Youthful Curiosity"/>
    {/if}

    <img class="bannerBg" style="z-index: -2;" src={bannerBG} alt="banners background">

    <div id="pullButtonDiv">
        <button class="pullButtons" on:click={() => Pull(1)}>Pull 1</button><br>
        <button class="pullButtons" on:click={() => Pull(10)}>Pull 10</button>
    </div>
</div>



<style>

    :global(body){
        background-color: rgb(216, 205, 190);
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    }

    #rollScreen{
        z-index: 2;
        width: 100%;
        height: 100vh;
        background-color: rgba(44, 44, 63, 0.826);
        position: absolute;
        text-align: center;
        padding-top: 9vh;
        
    }
    #rollContainer{
        z-index: 2;
        padding: 5%;
        padding-top: 0;
        padding-inline: 0;
        margin-inline: 0;
        display: flex;
        margin: auto;
        width: 76%;
    }
    #rollsDiv{
        position: absolute;
        background-color: rgba(44, 46, 67, 0.852);
        width: 80vw;
        height: 36vh;
        left: 10vw;
        top: 30vh;
    }
    .rollCard{
        height: 76vh;
        z-index: 3;
        margin: auto;
        padding: 0;
    }


    #banner {
        margin: auto;
        position: relative;
        height: 100vh;
    }
    .chracterPic {
        position: absolute;
        left: 35%;
        top: 5%;
        z-index: -1;
        width: 22vw;
    }
    .bannerName {
        position: absolute;
        left: 22%;
        top: 6%;
        font-size: 5vmin;
    }
    .bannerBg {
        position: absolute;
        left: 17vw;
        top: 0;
        width: 66vw;
    }
    .banner2{
        content: url(../../lib/assets/gacha/bannerText2.png);
    }
    #pullButtonDiv{
        position: absolute;
        left:72%;
        top: 43.5%;
        
    }
    .pullButtons{
        background: url(../../lib/assets/gacha/pullButton.png) ;
        background-size: 100%;
        border:none;
        width: 10vw;
        height: 3vw;
        text-align: center;
        font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        font-size: 2vmin;
        color: rgb(103, 102, 91);
    }
    .pullButtons:hover{
        transform: scale(1.06);
        animation: hueChange 3s linear infinite;
    }

    @keyframes hueChange {
    0% {
        filter: hue-rotate(0deg);
    }
    100% {
        filter: hue-rotate(360deg);
    }
}


    #buttons {
        text-align: center;
    }

    .bannerIcon {
        height: 70px;
        width: 110.21px;
        background: no-repeat;
        background-size: 100%;
        margin: 10px;
    }
    .bannerIcon:hover {
        transform: scale(1.06);
    }
</style>