<script>
    /*DOCUMENTATION:
    09.10 | beta gacha (v1.0)

    BANNER SECTION
    -2 banners to select from
    -working styles (css) for both
    -final design will be slightly changed

    ROLL SCREEN SECTION
    -beta animations (single pull animation is slighly glichy)
    -20%/5% for 4/5 star rates (can be changed) no UR added yet
    -no difference between items in the same rarity yet (every 3/4/5* is concidered the same)
    -very much just placehoarder designs
    */


    //IMPORT ALL THE NECCESARY ASSETS HERE

    //banner assets
    import SN from "../../lib/assets/gacha/SeniorWisdom.png" //senior wisdom banner cover, Farki (can be cahnged)
    import YC from "../../lib/assets/gacha/YouthfulCuriosity.png" //yuouthful curiosity banner cover, zénó (can be changed)
    import SNCover from "../../lib/assets/gacha/SWCover.png" //cover for the buttons for switching banners
    import YCCover from "../../lib/assets/gacha/YCCover.png" //^^^
    import bannerBG from "../../lib/assets/gacha/bannerBg.png" //the banner picture is 3 layers, background, cover image, text
    import bannerText from "../../lib/assets/gacha/bannerText.png"
    import stars from "../../lib/assets/gacha/stars.png"

    //pull assets
    import rollCard from "../../lib/assets/gacha/rollBg.png" //the base card before revealing the pull content
    import roll5star from "../../lib/assets/gacha/roll5star.png" //5
    import roll4star from "../../lib/assets/gacha/roll4star.png" //4
    import roll3star from "../../lib/assets/gacha/roll3star.png" //3 star content cover (beta)


    //VARIABLE DECLARATION
    //
    var whichBanner = true //if SN banner active true : false
    var isRolling = false //the rolls screen will be visible if true

    var pullNum //number of pulls 1/10
    var yourPulls= Array(10).fill(roll3star); //the standard pulls are always 3star, only changed if you get 4/5 stars,
    //                                          contains the name of the asset for the 3star pull
    
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
        pullNum = num

        for (let i = 0; i < 10; i++) {
            if (Math.floor(Math.random() * 100) >= 95){ //returns a number between 0-100, 5% esély hogy 5*
                yourPulls[i] = roll5star
                console.log("5 star");
            }
            else if (Math.floor(Math.random() * 100) >= 80){ //returns a number between 0-100, 20% esély hogy 4*
                yourPulls[i] = roll4star
                console.log("4 star");
            }
            DoPullAnimation(i)
        }
        console.log(yourPulls);
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
        for(let i = 0; i<10; i++){
            yourPullsVisibilityClass[i].name = "rollCard"
            yourPullsVisibilityClass[i].src = rollCard
        }
        yourPulls.fill(roll3star)

    }

    function ShowPulls(i) {
        yourPullsVisibilityClass[i].src = yourPulls[i] //when clicked it switched the src of the #each image to roll3/4/5star that we caluclated in CalulatePulls()
    }

</script>

<!-- roll screen az #if-ben -->
{#if isRolling}
    <div id="rollScreen">
        <div id="rollsDiv"></div>

        <div id="rollContainer">
        {#each Array(pullNum) as _,index (yourPullsVisibilityClass[index].id)}
        <!-- a pul cardok (a híres #each cycle) -->
        <img on:click={() => ShowPulls(index)} class={yourPullsVisibilityClass[index].name} src={yourPullsVisibilityClass[index].src} alt="rollCard">
        {/each}
        </div>
        
    </div>
    <!-- close pull button -->
    <button style="position: absolute; margin:0; z-index:4; left:90vw;" on:click={ClosePull}>X</button>
{/if}

<h1 style="margin-left:6vw; font-size:5vmin;">Gacha gacha gacha</h1>

<div id="bannerChoosers">
    <!-- buttons to choose the active banner -->
    <button style="background: URL({SNCover});" class="bannerIcon" on:click={() => ActivateBanner(true)}></button>
    <button style="background: URL({YCCover});" class="bannerIcon" on:click={() => ActivateBanner(false)}></button>
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
        <button class="pullButtons" on:click={() => CalculatePulls(1)}>Pull 1</button><br>
        <button class="pullButtons" on:click={() => CalculatePulls(10)}>Pull 10</button>
    </div>
</div>



<style>

    :global(body){  /*body styling format of svelte */ 
        background-color: rgb(216, 205, 190);
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;  /*font can be changed, it stays impact (for now) cos its defo not a genshin impact copy */ 
    }

    /*TWO MAJOR SCREENS, THE BANNER PICTURE AND THE ROLL SCREEN ITSELF */ 


    /*ROLL SCREEN SECTION */ 
    /* */ 
    #rollScreen{    /*the grey-ish background of the roll screen */ 
        z-index: 2;
        width: 100vw;
        height: 100vh;
        background-color: rgba(44, 44, 63, 0.826);
        position: absolute;
        text-align: center;
        padding-top: 14vh;
        
    }
    #rollsDiv{  /*the grey line, for visual purposes only kinda */ 
        background-color: rgba(44, 46, 67, 0.852);
        margin-top: 14vh;
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
    #rollContainer{   /*a flexbox containing all the cards */ 
        z-index: 2;
        padding-top: 0;
        padding-inline: 0;
        margin-inline: 0;
        display: flex;  /* its styled for any number of pulls*/ 
        margin: auto;
        width: 80vw;
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
        height: 100vh;
    }
    .chracterPic {  /*banner featured cover pic */ 
        position: absolute;
        left: 35%;
        top: 5%;
        z-index: -1;
        width: 22vw;
    }
    .bannerName {   /*banner name */ 
        position: absolute;
        left: 22%;
        top: 6%;
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
        left:72%;
        top: 43.5%;
        
    }
    .pullButtons{   /*the 1/10 pull buttons itselves */ 
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
    }

    .bannerIcon {   /*the selectors itself */
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