<script>

    //IMPORT ALL THE NECCESARY ASSETS HERE
    import * as Cards from "../../card"

    console.log(Cards.tanarCardsArr);
   
    //banner assets
    import SN from "../../lib/assets/gacha/SeniorWisdom.png" //senior wisdom banner cover, Farki (can be cahnged)
    import YC from "../../lib/assets/gacha/YouthfulCuriosity.png" //yuouthful curiosity banner cover, zénó (can be changed)
    import SNCover from "../../lib/assets/gacha/SWCover.png" //cover for the buttons for switching banners
    import YCCover from "../../lib/assets/gacha/YCCover.png" //^^^
    import bannerBG from "../../lib/assets/gacha/bannerBg.png" //the banner picture is 3 layers, background, cover image, text
    import bannerText from "../../lib/assets/gacha/bannerText.png"
    import stars from "../../lib/assets/gacha/stars.png"
    //import rainbowBG from "../../lib/assets/gacha/pullButton.png"

    //pull assets
    import rollCard from "../../lib/assets/gacha/rollBg.png" //the base card before revealing the pull content
    import roll5star from "../../lib/assets/gacha/roll5star.png" //5
    import roll4star from "../../lib/assets/gacha/roll4star.png" //4
    import roll3star from "../../lib/assets/gacha/roll3star.png" //3 star content cover (beta)

    //server functions, db control
    import {sendData, getData, responsData} from "../../client"

    let userId = "1" //ph obvs

    getData("history",userId,"rolls") //the one can be adjusted later depending on the ip of the PC (the user who playing)
    let pullHistory = ""
    setTimeout(() => {
        pullHistory = responsData.split(',');
    }, 1000);
    //^^^when u inicialize(? im tired) the gacha screen ull ave the history immidiately kinda


    //VARIABLE DECLARATION
    //
    var whichBanner = true //if SN banner active true : false
    var isRolling = false //the rolls screen will be visible if true
    var rollIsSkippable = false //cant skip (close the roll window) without the animations fully loaded in, can cause bugs
    var isHistory = false
    var isBannerUp = true

    var pullNum //number of pulls 1/10
    var yourPulls= Array(10).fill(roll3star); //the standard pulls are always 3star, only changed if you get 4/5 stars,
    //                                          contains the name of the asset for the 3star pull
    var lastPulls = []

    var yourPullsVisibilityClass = [ //used in #each cycle for all the varibales that will be relevant for the individual pulls, id, classname (for animation), src image
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

    var screenRatio = window.innerWidth/window.innerHeight;
    var rollsCardSize = (100-(33.725554*screenRatio))/2

    console.log("sRatio: "+screenRatio);
    window.addEventListener('resize', ()=> {
        screenRatio = window.innerWidth/window.innerHeight;
        rollsCardSize = (100-(33.725554*screenRatio))/2
        console.log("sRatio: "+screenRatio);
    });

    var screenPixels = window.innerWidth
    var bgWidth = screenPixels + 7498

    function GoToPage(filePath) {
        window.location.href = filePath; // Navigate to the parent directory
    }

    //FUNCTIONS AND LOGIC
    //
    function wait(milliseconds) { //wait funcation, can be used in a for loop with async
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }

    function ActivateBanner(param){ //param is true/false
        whichBanner = param
        whichBanner = whichBanner //svelte only updates and #if statement that uses a variable when its declared again, weirdge
    }

    function CalculatePulls(num){ //loads the pull cards and already calculates their content
        isRolling = true
        setTimeout(() => {rollIsSkippable = true}, num*100+700); //deleyed close button pops up
        pullNum = num

        for (let i = 0; i < num; i++) {
            if (Math.floor(Math.random() * 100) >= 95){ //returns a number between 0-100, 5% esély hogy 5*
                yourPulls[i] = roll5star
                lastPulls[i] = "Dr. Farkas Zoltán (5*)"
                console.log("5 star");
            }
            else if (Math.floor(Math.random() * 100) >= 80){ //returns a number between 0-100, 20% esély hogy 4*
                yourPulls[i] = roll4star
                console.log("4 star");
                lastPulls[i] = "Egy 4*-os karakter (4*)"
            }
            else {
                lastPulls[i] = "Egy tábor (3*)"
            }
            console.log("+1");
            DoPullAnimation(i)
            
        }
        sendData("history",pullHistory+","+String(lastPulls),userId,"rolls")
        getData("history",userId,"rolls") //this updates the responsData
        setTimeout(() => {
        pullHistory = responsData.split(',');
        }, 1000);
        console.log("cal pull history: "+pullHistory);
    }

    function DoPullAnimation(i) {
        (async () => {
        await wait((i+1)*100);
        yourPullsVisibilityClass[i].name = "rollCardVisible"
        })();
        //az #each cycleben minden card class-a eredetiled rollCard, egy 0 opacity de stylized <img>
        //az async function 100ms késéssel mindegyik #each img-et (pullt) "rollCardVisible" classra állítja
        //ennek az opcaity-je már 1 így meg fognak jelenni a kártyák egymás után, +egy animáció is elindul mikor ebbe a class-ba lépnek
    }

    function ClosePull(){ //sets everything to their base value so the animation and the pull reveal could play again next time
        isRolling = false
        isRolling = isRolling //closes the pull window
        rollIsSkippable = false

        for(let i = 0; i<10; i++){
            yourPullsVisibilityClass[i].name = "rollCard"
            yourPullsVisibilityClass[i].src = rollCard
        }
        yourPulls.fill(roll3star)

    }

    function ShowPulls(i) {
        yourPullsVisibilityClass[i].src = yourPulls[i] //when clicked it switched the src of the #each image to roll3/4/5star that we caluclated in CalulatePulls()
    }

    function LoadHistory(){
        pullHistory = responsData.split(','); //updates res data
        console.log(pullHistory);
        isHistory= true
        isHistory = isHistory
        isBannerUp = false
        isBannerUp = isBannerUp
    }
    function CloseHistoryScreen(){
        isHistory = false
        isHistory = isHistory
        isBannerUp = true
        isBannerUp = isBannerUp
    }

</script>
<div style='--bgWidth:{bgWidth};'></div>

<!-- roll screen az #if-ben -->
{#if isRolling}
    <div id="rollScreen">
        <div id="rollsDiv"></div>

        <div id="rollContainer" style='--cardSize:{rollsCardSize};'>
        {#each Array(pullNum) as _,index (yourPullsVisibilityClass[index].id)}
        <!-- a pul cardok (a híres #each cycle) -->
        <img on:click={() => ShowPulls(index)} class={yourPullsVisibilityClass[index].name} src={yourPullsVisibilityClass[index].src} alt="rollCard">
        {/each}
        </div>
        
    </div>
    <!-- close pull button -->
    {#if rollIsSkippable}
    <button style="position: absolute; margin:0; z-index:4; left:91vw; top:10vh; border:none; background:none; font-size: 5vmin; color: rgb(133, 132, 131);" on:click={ClosePull}>X</button>
    {/if}
{/if}

{#if isHistory}
<div id="historyScreen">
    <h1 id="historyText">Your pull history</h1>
    <div id="historyScreenBG"></div>
    <div id="historyContainer">
    {#each pullHistory.reverse() as item}
    <p>{item}</p>
    {/each}
    </div>

    <button style="position: absolute; margin:0; z-index:4; left:91vw; top:10vh; border:none; background:none; font-size: 5vmin; color: black;" on:click={CloseHistoryScreen}>X</button>
</div>
{/if}


{#if isBannerUp}
<h1 style="margin-top:0; font-size:5vmin; text-align:center;">Gacha gacha gacha</h1>

<div id="header">
    <div id="backArrowCont">
        <button class="buttonArrowStyle" id="backArrow" on:click={() => GoToPage("../")}>Back</button>
    </div>
    
    <div id="bannerChoosers">
        <!-- buttons to choose the active banner -->
        <button style="background: URL({SNCover}), no-repeat; " class="bannerIcon" on:click={() => ActivateBanner(true)}></button>
        <button style="background: URL({YCCover}), no-repeat;" class="bannerIcon" on:click={() => ActivateBanner(false)}></button>
    </div>
</div>


<!-- the banner covers -->
<div id="banner">  
    <!-- the first layer of the bannerPic, background -->
    <!-- conditional class: ha whichBanner true (senior wisdom) akkor átálítja a classt banner2-re és a banner background barnás lesz -->
    <img class="bannerBg" class:banner2={whichBanner} src={bannerText} alt="banners text assets">
    
    
    <!-- the second layer of the bannerPic, featured banner character -->
    <!-- a banner cover zénó/farkas + a hozzáillő banner name (senior wisdom/youthful curiosity) (tanár/diák banner) -->
    {#if whichBanner}
        <h1 class ="bannerName"><span style="color: brown">Senior</span><br> Wisdom</h1>
        <img class="chracterPic" src={SN} alt="Senior Wisdom"/>
    {:else}
        <h1 class ="bannerName"><span style="color: blue">Youthful</span><br> Curiosity</h1>
        <img class="chracterPic" src={YC} alt="Youthful Curiosity"/>
    {/if}

    <!-- the third layer of the bannerPic, the white background -->
    <img class="bannerBg" style="z-index: -2;" src={bannerBG} alt="banners background">

    <!-- rainbow stars on top for visuals -->
    <img id="bannerStars" src={stars} alt="stars">

    <!-- single and multi buttons -->
    <div id="pullButtonDiv">
        <button class="buttonStandardStyle" on:click={() => CalculatePulls(1)}>Pull 1</button><br>
        <button class="buttonStandardStyle" on:click={() => CalculatePulls(10)}>Pull 10</button>
    </div>

    <div id="infoButtonDiv">
        <button class="buttonStandardStyle" >Information</button><br>
        <button class="buttonStandardStyle" on:click={LoadHistory}>History</button>
    </div>
</div>
{/if}


<style>

    :global(body){  /*body styling format of svelte */ 
        background: url(../../lib/assets/gacha/bacgkroundPanorama.png) no-repeat;
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;  /*font can be changed, it stays impact (for now) cos its defo not a genshin impact copy */
        animation: backgroundLoop 120s linear infinite;
        background-size: var(--bgWidth);
        margin: 0;
    }

    @keyframes backgroundLoop {  
    0% {
        background-position-x: left;
    }
    100% {
        background-position-x: right;
    }
    }
    :global(html){
        margin: 0;
        padding: 0;
        size: 0 0;
    }


    /*HISTORY SCREEN SECTION*/
    #historyScreen{    /*the grey-ish background of the roll screen */ 
        z-index: 2;
        width: 100vw;
        height: 100vh;
        text-align: center;
        position: absolute;
        padding: 0;
    }
    #historyScreenBG{
        width: 60vw; /* Set the desired width of your container */
        height: 80vh; /* Set the desired height of your container */
        background-color: rgba(44, 46, 67, 0.852);
        margin-top: 10vh;
        margin-left: 20vw;
        position:absolute;
        z-index: 0;
    }
    #historyContainer{   /*a flexbox containing all the cards */ 
        z-index: 2;
        width: 50vw; /* Set the desired width of your container */
        height: 57vh; /* Set the desired height of your container */

        border: 1.2vw solid transparent; /* Set the border width and make it transparent */
        border-image-source: url('../../lib/assets/gacha/rainBorder.png');
        border-image-slice: 10; /* Adjust the value as needed */
        border-image-repeat: round; /* Repeat the border image */
        border-radius: 10px;

        overflow: auto;
        margin-top: 24vh;
        margin-left: auto;
        margin-right:auto;

        background: url(../../lib/assets/gacha/CrystalTexture.png) no-repeat;
        background-size: cover;

        animation: hueChange 5s linear infinite;

        scrollbar-color: #dc1515 #fc8989;
    }
    #historyText{
        position:absolute;
        top: 10vh;
    }

        /* width */
    ::-webkit-scrollbar {
    width: 20px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
    border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: rgb(241, 99, 186);
    border-radius: 10px;
    border:1px solid black
    }



    /*ROLL SCREEN SECTION */ 
    /* */ 
    #rollScreen{    /*the grey-ish background of the roll screen */ 
        z-index: 2;
        width: 100vw;
        height: 100vh;
        background-color: rgba(44, 44, 63, 0.884);
        position: absolute;
        text-align: center;
    }
    #rollsDiv{  /*the grey line, for visual purposes only kinda */ 
        background-color: rgba(44, 46, 67, 0.852);
        margin-top: 35vh;
        margin-left: 10vw;
        animation: rollsDivAnimation .4s linear forwards;
        position:absolute;
        z-index: 0;
    }
    @keyframes rollsDivAnimation {  /*animation for the rollsDiv */ 
    0% {
        height: 0vw;
        width: 2vw;
        margin-top: 36vh;
        margin-left: 49vw;
    }
    50% {
        height: 30vh;
        width: 2vw;
        margin-top: 35vh;
        margin-left: 49vw;
    }
    100% {
        height: 30vh;
        width: 80vw;
        margin-top: 35vh;
        margin-left: 10vw;
    }
    }
    #rollContainer{   /*a flexbox containing all the cards */ 
        z-index: 2;
        padding-top: 0;
        padding-inline: 0;
        margin-inline: 0;
        display: flex;  /* its styled for any number of pulls*/ 
        margin: auto;
        width: 80vw;
        margin-top: calc(var(--cardSize)*1vh);
    }

    .rollCard{  /*the pull card itself, blank version */ 
        width: 6vw;
        margin: auto;
        padding: 0;
        opacity: 0;
    }
    .rollCardVisible {  /*the pull card itself, visible version */ 
        width: 6vw;
        margin: auto;
        padding: 0;
        opacity: 0;
        animation: pullAnimation .25s linear forwards;
        animation-delay: .3s;
        z-index: 2; 
    }

    @keyframes pullAnimation {  /*the animation for the pull cards */ 
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


    /*BANNER SECTION */ 
    /* (kinda scuffed with the absolute postition but it works im 90% sure with all screen sizes... i think)*/ 
    #banner {   /*container for the whole banner composition */ 
        margin: auto;
        position: relative;
        width: 100vw;
        margin-top: 4.5vh;
    }
    .chracterPic {  /*banner featured cover pic */ 
        position: absolute;
        left: 35vw;
        top: 5vh;
        z-index: -1;
        width: 22vw;
    }
    .bannerName {   /*banner name */ 
        position: absolute;
        left: 22vw;
        top: 3vh;
        font-size: 5vmin;
    }
    .bannerBg {   /* banner background*/ 
        position: absolute;
        left: 17vw;
        top: 0;
        width: 66vw;
    }
    .banner2{   /*the brownish background of seniour wisdom */ 
        content: url(../../lib/assets/gacha/bannerText2.png);
    }
    #pullButtonDiv{    /*a container for the two buttons (so i dont have to position them separatly + easier mass production for future buttons) */ 
        position: absolute;
        left:70vw;
        top: 35vh;
        
    }
    #infoButtonDiv{
        position: absolute;
        left:15vw;
        top: 27.5vw;
        scale: 1.1;
    }
    .buttonStandardStyle{   /*the 1/10 pull buttons itselves */ 
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
    .buttonStandardStyle:hover{
        transform: scale(1.06);
        animation: hueChange 1s linear infinite;
        cursor: pointer;
    }

    .buttonArrowStyle{ 
        background: url(../../lib/assets/gacha/rainArrow.png) no-repeat;
        background-size: 100%;
        border:none;
        width: 10vw;
        height: 3vw;
        text-align: center;
        font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        font-size: 2vmin;
        color: rgb(103, 102, 91);
    }

    .buttonArrowStyle:hover{
        transform: scale(1.06);
        animation: hueChange 1s linear infinite;
        cursor: pointer;
    }



    @keyframes hueChange {  /*weeeeeeeeeeeeeeeeee */ 
    0% {
        filter: hue-rotate(0deg);
    }
    100% {
        filter: hue-rotate(360deg);
    }
    }

    #bannerStars{   /*weeeeeeeeeeeeeeeeee pt2 */ 
        position: absolute;
        left: 17vw;
        top: 0;
        width: 66vw;
        animation: hueChange 1s linear infinite;
    }


    #bannerChoosers {   /*container foor the banner selector buttons */
        text-align: center;
        width: 40vw;
        margin: auto;
    }
    #backArrowCont {
        width: 10vw;
        float: left;
    }

    .bannerIcon {   /*the selectors itself */
        height: 8vh;
        width: 12.6vh;
        background-size: 12.6vh 8vh;
        margin: 10px;
    }
    .bannerIcon:hover {
        transform: scale(1.06);
        cursor: pointer;
    }

    #backArrow {
        margin-left: 3vw;
        margin-top: 1vw;
    }
</style>