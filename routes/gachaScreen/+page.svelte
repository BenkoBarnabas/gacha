<script>
    import SN from "../../lib/assets/gacha/SeniorWisdom.png"
    import YC from "../../lib/assets/gacha/YouthfulCuriosity.png"
    import SNCover from "../../lib/assets/gacha/SWCover.png"
    import YCCover from "../../lib/assets/gacha/YCCover.png"
    import bannerBG from "../../lib/assets/gacha/bannerBg.png"
    import bannerText from "../../lib/assets/gacha/bannerText.png"
    import rollCard from "../../lib/assets/gacha/rollBg.png"
    import stars from "../../lib/assets/gacha/stars.png"

    import roll5star from "../../lib/assets/gacha/roll5star.png"
    import roll4star from "../../lib/assets/gacha/roll4star.png"
    import roll3star from "../../lib/assets/gacha/roll3star.png"

    var whichBanner = true //if SN banner active true : false
    var isRolling = false
    var pullNum
    var yourPulls= Array(10).fill(roll3star);
    var yourPullsVisibilityClass = [
    {id: 0, name: 'rollCard', src: rollCard},
    {id: 1, name: 'rollCard', src: rollCard},
    {id: 2, name: 'rollCard', src: rollCard},
    {id: 3, name: 'rollCard', src: rollCard},
    {id: 4, name: 'rollCard', src: rollCard},
    {id: 5, name: 'rollCard', src: rollCard},
    {id: 6, name: 'rollCard', src: rollCard},
    {id: 7, name: 'rollCard', src: rollCard},
    {id: 8, name: 'rollCard', src: rollCard},
    {id: 9, name: 'rollCard', src: rollCard}
    ];


    function wait(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }

    function ActivateBanner(param){
        whichBanner = param
        whichBanner = whichBanner
    }

    function ShowPull(num){
        isRolling = true
        pullNum = num

        for (let i = 0; i < 10; i++) {
            if (Math.floor(Math.random() * 10) >= 9){
                yourPulls[i] = roll5star
                console.log("5 star");
            }
            else if (Math.floor(Math.random() * 10) >= 8){
                yourPulls[i] = roll4star
                console.log("4 star");
            }
            DoPullAnimation(i)
        }
        console.log(yourPulls);
    }

    function DoPullAnimation(i) {
        //setTimeout(() => {
                //yourPullsVisibilityClass[i].name = "rollCardVisible"
            //}, 1000);
        (async () => {
        await wait((i+1)*100);
        yourPullsVisibilityClass[i].name = "rollCardVisible"
        })();
    }

    function ClosePull(){
        isRolling = false
        isRolling = isRolling
        for(let i = 0; i<10; i++){
            yourPullsVisibilityClass[i].name = "rollCard"
            yourPullsVisibilityClass[i].src = rollCard
        }
        yourPulls.fill(roll3star)

    }

    function CalculatePulls(i) {
        yourPullsVisibilityClass[i].src = yourPulls[i]
    }

</script>
{#if isRolling}
    <div id="rollScreen">
        <div id="rollsDiv"></div>

        <div id="rollContainer">
        {#each Array(pullNum) as _,index (yourPullsVisibilityClass[index].id)}
        <img on:click={() => CalculatePulls(index)} class={yourPullsVisibilityClass[index].name} src={yourPullsVisibilityClass[index].src} alt="rollCard">
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
    <img id="bannerStars" src={stars} alt="stars">

    <div id="pullButtonDiv">
        <button class="pullButtons" on:click={() => ShowPull(1)}>Pull 1</button><br>
        <button class="pullButtons" on:click={() => ShowPull(10)}>Pull 10</button>
    </div>
</div>



<style>

    :global(body){
        background-color: rgb(216, 205, 190);
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    }

    #rollScreen{
        z-index: 2;
        width: 100vw;
        height: 100vh;
        background-color: rgba(44, 44, 63, 0.826);
        position: absolute;
        text-align: center;
        padding-top: 14vh;
        
    }
    #rollContainer{
        z-index: 2;
        padding-top: 0;
        padding-inline: 0;
        margin-inline: 0;
        display: flex;
        margin: auto;
        width: 80vw;
    }
    #rollsDiv{
        background-color: rgba(44, 46, 67, 0.852);
        margin-top: 14vh;
        margin-left: 10vw;
        animation: rollsDivAnimation .4s linear forwards;
        position:absolute;
        z-index: 0;
    }
    @keyframes rollsDivAnimation {
    0% {
        height: 0vw;
        width: 2vw;
        margin-top: 36vh;
        margin-left: 49vw;
    }
    50% {
        height: 36vh;
        width: 2vw;
        margin-top: 14vh;
        margin-left: 49vw;
    }
    100% {
        height: 36vh;
        width: 80vw;
        margin-top: 14vh;
        margin-left: 10vw;
    }
    }

    .rollCard{
        width: 6vw;
        margin: auto;
        padding: 0;
        opacity: 0;
    }
    .rollCardVisible {
        width: 6vw;
        margin: auto;
        padding: 0;
        opacity: 0;
        animation: pullAnimation .25s linear forwards;
        animation-delay: .3s;
        z-index: 2; 
    }

    @keyframes pullAnimation {
    0% {
        height: 0vw;
        opacity: 0;
    }
    30% {
        height: 16.8627777vw;
    }
    100% {
        height: 33.7255554vw;
        opacity: 1;
    }
    }
    .rollCardVisible:hover{
        transform: scale(1.1);
        filter: hue-rotate(-10deg);
        cursor: pointer;
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
        animation: hueChange 1s linear infinite;
    }

    @keyframes hueChange {
    0% {
        filter: hue-rotate(0deg);
    }
    100% {
        filter: hue-rotate(360deg);
    }
    }

    #bannerStars{
        position: absolute;
        left: 17vw;
        top: 0;
        width: 66vw;
        animation: hueChange 1s linear infinite;
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