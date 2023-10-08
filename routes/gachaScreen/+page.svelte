<script>

    //IMPORT ALL THE NECCESARY ASSETS HERE
    import * as Cards from "../../card"
    
    import ticketIcon from "../../lib/assets/global/ticketIcon.png"
    import gachaCurrencyIcon from "../../lib/assets/global/currencyIcon.png"
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

    import infoBox from "../../lib/assets/gacha/infoBox.png"

    //server functions, db control
    import {sendData, getData, responsData, Cpity4S, Cpity5S, CpityUR, sendSocketValue,userData} from "../../client"


    //get the shit u need fomr the database 

    let userId = "1" //ph obvs

    var pity4S = 0
    var pity5S = 0
    var pityUR = 0
    let pullHistory = ""

    getData("history",userId,"rolls") //the one can be adjusted later depending on the ip of the PC (the user who playing)
    console.log("1. get data");
    setTimeout(() => {
        pullHistory = responsData.split(',');
    }, 1000);
    //^^^when u inicialize(? im tired) the gacha screen ull ave the history immidiately kinda
    getData("pity4S",userId,"rolls") 
    setTimeout(() => {
        pity4S = Cpity4S
        //console.log(pity4S);
        
    }, 1000);
    getData("pity5S",userId,"rolls") 
    setTimeout(() => {
        pity5S = Cpity5S
        //console.log(pity5S);
        
    }, 1000);
    getData("pityUR",userId,"rolls") 
    setTimeout(() => {
        pityUR = CpityUR
        //console.log(pityUR);
    }, 1000);

    //var tickets = getData("tickets",userId,"account")

    //console.log(tickets);




    //VARIABLE DECLARATION
    //
    var whichBanner = true //if SW banner active true : false
    let bannerName = "Senior Wisdom"
    var isRolling = false //the rolls screen will be visible if true
    var rollIsSkippable = false //cant skip (close the roll window) without the animations fully loaded in, can cause bugs
    var isHistory = false
    var isInfo = false
    var isBannerUp = true

    var pullNum //number of pulls 1/10
    var lastPullBatch= Array(10).fill("a"); //the standard pulls are always 3star, only changed if you get 4/5 stars,
    //                                          contains the name of the asset for the 3star pull
    var lastPulls = []

    var lastPullBatchVisibilityClass = [ //used in #each cycle for all the varibales that will be relevant for the individual pulls, id, classname (for animation), src image
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
        
        featuredAnimationClass.fill("featuredCards")
        whichBanner = param
        whichBanner = whichBanner //svelte only updates and #if statement that uses a variable when its declared again, weirdge
        if(whichBanner){
            bannerName = "Senior Wisdom"
        }
        else {
            bannerName = "Youthful Curiosity"
        }

        for (let i =0; i<6; i++){ //animatie the featured characters on the side when banner changes
            (async () => {
        await wait((i+1)*100);
            FeaturedAnimation(i)
        })();
        }

    }

    var featuredAnimationClass = Array(5).fill("featuredCards")
    function FeaturedAnimation(i){
        (async () => {
        await wait((i+1)*100);
        featuredAnimationClass[i] = "featuredCharsAnimClass"
        })();
    }
    ActivateBanner(false)

    function RandomFeatured(rarity){
        return rarity[Math.floor(Math.random() * rarity.length)].source
    }


    function CalculatePulls(num){ //loads the pull cards and already calculates their content
        if (userData.tickets >= num){
            userData.tickets -= num
            sendData("tickets",userData.tickets,userId,"account")
        }
        else {
            userData.gachaCurrency -= num*200
            sendData("gachaCurrency",userData.gachaCurrency,userId,"account")
        }
        isBannerUp = false
        isBannerUp = isBannerUp
        isRolling = true
        setTimeout(() => {rollIsSkippable = true}, num*100+700); //deleyed close button pops up
        pullNum = num

        for (let i = 0; i < num; i++) {
            if (Math.floor(Math.random() * 100) >= 98 || pity5S == 50){ //returns a number between 0-100, 2% esély hogy 5*

                if (Math.floor(Math.random() * 100) >= 80 || pityUR == 3){ //ha 5*-t kapsz 20% esély hogy UR lesz belőle

                    if (whichBanner){  //tanar banner active
                        var yourCard = Cards.URTanars[Math.floor(Math.random() * Cards.URTanars.length)] //gives back the object of yoour card
                    }
                    else{
                        var yourCard = Cards.URDiaks[Math.floor(Math.random() * Cards.URDiaks.length)]
                    }

                    lastPullBatch[i] = yourCard.gachaSRC

                    lastPulls[i] = yourCard.name + " (UR)"+":"+yourCard.type+":"+bannerName
                    console.log("u got:"+lastPulls[i]);
                    console.log("UR woooooooooooo");
                    pityUR = 0
                    pity5S = 0
                }
                else{
                    if (whichBanner){  //tanar banner active
                    var yourCard = Cards.FiveStarTanars[Math.floor(Math.random() * Cards.FiveStarTanars.length)] //gives back the object of yoour card
                    }
                    else{
                        var yourCard = Cards.FiveStarDiaks[Math.floor(Math.random() * Cards.FiveStarDiaks.length)]
                    }

                    lastPullBatch[i] = yourCard.gachaSRC

                    lastPulls[i] = yourCard.name + " (" + yourCard.stars + "*)"+":"+yourCard.type+":"+bannerName
                    console.log("u got:"+lastPulls[i]);
                    console.log("5 star");
                    pityUR += 1
                    pity5S = 0
                }
            }
            else if (Math.floor(Math.random() * 100) >= 85 || pity4S == 10){ //returns a number between 0-100, 15% esély hogy 4*
                if (whichBanner){  //tanar banner active
                    var yourCard = Cards.FourStarTanars[Math.floor(Math.random() * Cards.FourStarTanars.length)] //gives back the object of yoour card
                }
                else{
                    var yourCard = Cards.FourStarDiaks[Math.floor(Math.random() * Cards.FourStarDiaks.length)]
                }

                lastPullBatch[i] = yourCard.gachaSRC
                
                lastPulls[i] = yourCard.name + " (" + yourCard.stars + "*)"+":"+yourCard.type+":"+bannerName
                console.log("u got:"+lastPulls[i]);
                console.log("4 star");
                pity4S = 0
            }
            else { //3*
                if (whichBanner){  //tanar banner active
                    var yourCard = Cards.ThreeStarTanars[Math.floor(Math.random() * Cards.ThreeStarTanars.length)] //gives back the object of yoour card
                }
                else{
                    var yourCard = Cards.ThreeStarDiaks[Math.floor(Math.random() * Cards.ThreeStarDiaks.length)]
                }
                
                lastPulls[i] = yourCard.name + " (" + yourCard.stars + "*)"+":"+yourCard.type+":"+bannerName

                lastPullBatch[i] = yourCard.gachaSRC
                console.log("u got:"+lastPulls[i]);
            }

            pity4S += 1
            pity5S += 1
            console.log("4pity: "+pity4S+" 5pity: "+pity5S+" URpity: "+pityUR);
            DoPullAnimation(i)
            DoShineAnimation(i,yourCard.stars)
            
        }
        sendData("history",pullHistory+","+String(lastPulls),userId,"rolls")

        //send back the pity
        sendData("pity4S",pity4S,userId,"rolls")
        sendData("pity5S",pity5S,userId,"rolls")
        sendData("pityUR",pityUR,userId,"rolls")

        getData("history",userId,"rolls") //this updates the responsData
        setTimeout(() => {
        pullHistory = responsData.split(',');
        }, 1000);
    }

    function DoPullAnimation(i) {
        (async () => {
        await wait((i+1)*100);
        lastPullBatchVisibilityClass[i].name = "rollCardVisible shine-effect-on"
        })();
        //az #each cycleben minden card class-a eredetiled rollCard, egy 0 opacity de stylized <img>
        //az async function 100ms késéssel mindegyik #each img-et (pullt) "rollCardVisible" classra állítja
        //ennek az opcaity-je már 1 így meg fognak jelenni a kártyák egymás után, +egy animáció is elindul mikor ebbe a class-ba lépnek
    }
    function DoShineAnimation(i,rarity) {
        (async () => {
        await wait((i+1)*100);
        lastPullBatchVisibilityClass[i].name = "rollCardVisible rollAnim" + rarity
        console.log("class set");
        })();
    }

    function ClosePull(){ //sets everything to their base value so the animation and the pull reveal could play again next time
        isRolling = false
        isRolling = isRolling //closes the pull window
        isBannerUp = true
        isBannerUp = isBannerUp
        rollIsSkippable = false

        for(let i = 0; i<10; i++){
            lastPullBatchVisibilityClass[i].name = "rollCard"
            lastPullBatchVisibilityClass[i].src = rollCard
        }
        lastPullBatch.fill("a")

    }

    function ShowPulls(i) {
        lastPullBatchVisibilityClass[i].src = lastPullBatch[i] //when clicked it switched the src of the #each image to roll3/4/5star that we caluclated in CalulatePulls()
    }
    
    var pullHistoryTableForm = []

    function LoadHistory(){
        pullHistory = responsData.split(','); //updates res data
        console.log(pullHistory);
        for (let i = 0; i < pullHistory.length; i++){
            pullHistoryTableForm[i] = pullHistory[i].split(':')
        }
        console.log(pullHistoryTableForm);

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

    var cardPoolTab = true;
    var starsColorByCost = [["UR","linear-gradient(90deg, #ff7474, #ffb56a, #ffff6e, #78ff78, #7979ff, #c379ff, #ff80ff)"],["SSR","#ed7c26"],["SR","#8626ed"],["R","#2672ed"]]
    function ChangeInfoTab(param){
        cardPoolTab = param
        cardPoolTab = cardPoolTab
    }
    function LoadInfo(){
        isInfo= true
        isInfo = isInfo
        isBannerUp = false
        isBannerUp = isBannerUp

        const button = document.getElementById("focusedOnLoad");
        if (button) {
            button.click();
        }
    }
    function CloseInfoScreen(){
        isInfo= false
        isInfo = isInfo
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
        {#each Array(pullNum) as _,index (lastPullBatchVisibilityClass[index].id)}
        <!-- a pul cardok -->
        <button on:click={() => ShowPulls(index)} class="{lastPullBatchVisibilityClass[index].name} shine-effect" style='--rollsrc: url({lastPullBatchVisibilityClass[index].src});'></button>
        
        {/each}
        </div>

    </div>
    <!-- close pull button -->
    {#if rollIsSkippable}
    <button class="closeButton" on:click={ClosePull}></button>
    {/if}
{/if}

{#if isHistory}
<div class="historyScreen"><!-- the white background -->
    <div class="historyBody"> <!-- the container for the entire history book image thingy -->
        <div class="historyContainer"> <!-- the template for the history box -->
        <div class="historyScroll"> <!-- the scorralbe part inside  -->
        <table class="historyTable"><!-- the table for the data -->
            <tr>
                <th>Card</th>
                <th>Type</th>
                <th>Banner Name</th>
            </tr>
            {#each pullHistoryTableForm.reverse() as item, index}
            <tr>
                {#each pullHistoryTableForm[index] as cell}
                <td>
                    <p class="historyText" class:historyText4S={cell.includes("4")} class:historyText5S={cell.includes("5")} class:historyTextUR={cell.includes("UR")}>{cell}</p>
                </td>
                {/each}
            </tr>
            {/each}
        </table>
        </div>
        </div>
        <div class="historyTitle">Gacha Történelmed</div>
        <div class="pityCounter">{50-pity5S}</div>
    </div>

    <button class="closeButton" on:click={CloseHistoryScreen}></button>
</div>
{/if}

{#if isInfo}
<div class="historyScreen"><!-- the white background -->
    <div class="historyBody"> <!-- the container for the entire history book image thingy -->
        <div class="historyContainer"> <!-- the template for the history box -->
        <div class="historyScroll" style="padding-left: 4vw; text-align:left;" id="infoScroll"> <!-- the scorralbe part inside  -->
            <div id="infoScreenHeader">
                <button class="infoTabButton hover-underline-animation" id="focusedOnLoad" style="border-right: 0.2vw solid black; border-radius: 0.2vw;" on:click={() => ChangeInfoTab(true)} >Item Pool</button>
                <button class="infoTabButton hover-underline-animation" on:click={() => ChangeInfoTab(false)}>Details</button>
            </div>
            
            {#if cardPoolTab}
            <span style="font-size:1.9vw;">Extra esély az alábbi kártyákra:</span>

            {#each [Cards.URTanars, Cards.FiveStarTanars, Cards.FourStarTanars, Cards.ThreeStarTanars] as rarity, i}
                
                <div class="rarityLine" style="color: white; background:{starsColorByCost[i][1]}">
                    {starsColorByCost[i][0]}
                    {#each Array(rarity[0].stars) as star}
                         * 
                    {/each}
                    CARDS:
                </div>
                
                <div style="width: 30vw; margin-bottom:5vw;">
                    {#each rarity as char, i}
                    {#if i%4 == 0}
                    <br>
                    <td>
                        <img src={char.source} alt="kártyi" style="width: 7vw; height: 7vw; background-size:contain"><br>
                        {char.name}
                    </td>
                    {:else}
                        <td>
                            <img src={char.source} alt="kártyi" style="width: 7vw; height: 7vw; background-size:contain"><br>
                            {char.name}
                        </td>
                    {/if}
                {/each}
                </div>
                
            {/each}
            {:else}
            körte
            {/if}
        </div>
        </div>
        <div class="historyTitle">{bannerName}</div>
        <div class="pityCounter">{50-pity5S}</div>
    </div>

    <button class="closeButton" on:click={CloseInfoScreen}></button>
</div>
{/if}

{#if isBannerUp}

<div id="header">
    <table style="width:100vw;">
        <tr>
            <td style="width: 30vw; padding-left:1.5vw;text-align:center">
                <div class="pageTitle">«( Karakter Gacha )»</div>
            </td>
            <td style="width: 40vw; text-align:center;">
                    <!-- buttons to choose the active banner -->
                    <button style="background: URL({SNCover}), no-repeat; " class="bannerIcon" on:click={() => ActivateBanner(true)}></button>
                    <button style="background: URL({YCCover}), no-repeat;" class="bannerIcon" on:click={() => ActivateBanner(false)}></button>
            </td>
            <td style="width: 30vw; padding-right:1.5vw;text-align:center">
                <div class="accountInfoHeader">
                    <td>
                        <div class="accountInfoBubbles"><img src={gachaCurrencyIcon} alt="gCurrency" style="width:1vw; height:1vw;"> {userData.gachaCurrency}</div>
                    </td>
                    <td>
                        <div class="accountInfoBubbles"><img src={ticketIcon} alt="tickets" style="width:1vw; height:1vw;"> {userData.tickets}</div>
                    </td>
                    <td>
                        <button class="closeButton" on:click={() => GoToPage("../")}></button>
                    </td>
                </div>
            </td>
        </tr>
    </table>
</div>


<!-- the banner covers -->
<div id="banner">  
    <!-- the first layer of the bannerPic, background -->
    <!-- conditional class: ha whichBanner true (senior wisdom) akkor átálítja a classt banner2-re és a banner background barnás lesz -->
    <img class="bannerBg" class:banner2={whichBanner} src={bannerText} alt="banners text assets">
    
    
    <!-- the second layer of the bannerPic, featured banner character -->
    <!-- a banner cover zénó/farkas + a hozzáillő banner name (senior wisdom/youthful curiosity) (tanár/diák banner) -->
    {#if whichBanner}

        <h1 class ="bannerName"><span style="color: brown">Senior</span><br>Bölcsesség</h1>
        <img class="characterPic" src={SN} alt="Senior Wisdom"/>
        <h2 class="featuredName">Dobby (UR)</h2>

        <div class="featuredCards">
            {#each Array(3) as char,index}
                <div style="width: 6vw; position:absolute; left:{((2**index)*4)-5}vw; top:{9-(index+1)*3}vw; transform: rotate({-20+(index*20)}deg);">
                    <img style="width: 6vw;" class="{featuredAnimationClass[index]}" src={RandomFeatured(Cards.FiveStarTanars)} alt="featured4S">
                </div> 
            {/each}
            <br>
            {#each Array(2) as char,index}
                <div style="width: 5vw; position:absolute; left:{10+index*4}vw; top:{3+9-(index+1)*3}vw; transform: rotate({-20+(index*30)}deg);">
                    <img style="width: 5vw;" class={featuredAnimationClass[index]} src={RandomFeatured(Cards.FourStarTanars)} alt="featured4S">
                </div> 
            {/each}
        </div>

    {:else}

        <h1 class ="bannerName"><span style="color: blue">Fiatal</span><br>Kíváncsiság</h1>
        <img class="characterPic" src={YC} alt="Youthful Curiosity"/>
        <h2 class="featuredName">Zénó (UR)</h2>

        <div class="featuredCards">
            {#each Array(3) as char,index}
                <div style="width: 6vw; position:absolute; left:{((2**index)*4)-5}vw; top:{9-(index+1)*3}vw; transform: rotate({-20+(index*20)}deg);">
                    <img style="width: 6vw;" class={featuredAnimationClass[index]} src={RandomFeatured(Cards.FiveStarDiaks)} alt="featured4S">
                </div> 
            {/each}
            <br>
            {#each Array(2) as char,index}
                <div style="width: 5vw; position:absolute; left:{10+index*4}vw; top:{3+9-(index+1)*3}vw; transform: rotate({-20+(index*30)}deg);">
                    <img style="width: 5vw;" class={featuredAnimationClass[index]} src={RandomFeatured(Cards.FourStarDiaks)} alt="featured4S">
                </div> 
            {/each}
        </div>
    {/if}

    <!-- the third layer of the bannerPic, the white background -->
    <img class="bannerBg" style="z-index: -2;" src={bannerBG} alt="banners background">

    <!-- rainbow stars on top for visuals -->
    <img id="bannerStars" src={stars} alt="stars">

    <!-- single and multi buttons -->
    <div id="pullButtonDiv">
        <button class="buttonStandardStyle" on:click={() => CalculatePulls(1)}>1 Nyitása</button><br>
        <button class="buttonStandardStyle" on:click={() => CalculatePulls(10)}>10 Nyitása</button>
    </div>

    <div id="infoButtonDiv">
        <button class="buttonStandardStyle" on:click={LoadInfo}>Info</button><br>
        <button class="buttonStandardStyle" on:click={LoadHistory}>Gacha Történelmed</button>
    </div>
</div>
{/if}

<style>
    @font-face {
            font-family: 'ShadowLight';
            src: url('../../lib/assets/fonts/ShadowsIntoLight-Regular.ttf');
    }
    @font-face {
            font-family: 'TitleFont';
            src: url('../../lib/assets/fonts/Raleway-VariableFont_wght.ttf');
    }

    :root {
        --blueAnim: url('../../lib/assets/gacha/blueAnimation.png');
    }

    .shine-effect { /*dont move it, if u move it, it doesnt work i have no idea, just dont ask me i-*/
        padding: 10px 20px;
        position: relative;
        overflow: hidden;
        transition: background-color 0.3s ease-in-out;
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

    #infoScreenHeader{
        padding: 1vw;
        text-align: left;
    }
    .rarityLine{
        width: 30vw;
        height: 1.7vw;

        margin-top:1vw;
        margin-bottom: 1vw;

        font-family: monospace;
        font-size: 1.2vw;
        font:bold;

        padding-left:3vw;
        padding-top: 0.25vw;
        
        text-shadow:
                -0.08vw -0.08vw 0 #000, /* Top-left shadow */
                0.08vw -0.08vw 0 #000, /* Top-right shadow */
                -0.08vw 0.08vw 0 #000, /* Bottom-left shadow */
                0.08vw 0.08vw 0 #000; /* Bottom-right shadow */;
    }
    .infoTabButton{
        font-family: 'ShadowLight';
        padding-right: 1vw;
        margin-right: 1.5vw;
        font-size: 2.5vw;

        background: none;
        border:none;

        opacity: 0.3;
    }
    .infoTabButton:focus{
        opacity: 1;
    }
    .infoTabButton:hover{
        cursor: pointer;
    }
    .hover-underline-animation {
        display: inline-block;
        position: relative;
    }
    .hover-underline-animation:after {
        content: '';
        position: absolute;
        width: 90%;
        transform: scaleX(0);
        height: 0.5vh;
        border-radius: 10vw;
        bottom: 0;
        left: 0;
        background-image: linear-gradient(90deg, #ff7474, #ffb56a, #ffff6e, #78ff78, #7979ff, #c379ff, #ff80ff);
        transform-origin: bottom right;
        transition: transform 0.25s ease-out;
    }
    .hover-underline-animation:hover:after {
        transform: scaleX(1);
        transform-origin: bottom left;
    }



    #header {
        margin-top: 2vw;
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
    .buttonArrowStyle{ 
        background: url(../../lib/assets/gacha/rainArrow.png) no-repeat;
        background-size: 100%;
        border:none;
        width: 10vw;
        height: 3vw;
        text-align: center;
        font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        font-size: 2vw;
        color: rgb(103, 102, 91);
    }
    .buttonArrowStyle:hover{
        transform: scale(1.06);
        animation: hueChange 1s linear infinite;
        cursor: pointer;
    }
    :global(.accountInfoBubbles){
        background-image: url(../../lib/assets/global/accountInfoIcon.png);
        background-size: 100% 100%;
        color: black;
        font-family: impact;

        padding: 0.2vw;
        padding-left: 1vw;

        width:6.2vw;
    }



    /*HISTORY SCREEN SECTION*/
    .historyScreen{    /*the grey-ish background of the roll screen */ 
        z-index: 2;
        width: 100vw;
        height: 100vh;
        text-align: center;
        padding: 0;
        background-color: rgba(250, 235, 215, 0.604);
    }
    .historyBody{
        width: 85vw;

        position: relative;
        margin: auto;
        top: 4vw;
    }
    .historyContainer{
        width: 80vw;
        height: 41.297vw;

        background: url(../../lib/assets/gacha/infoBox.png) no-repeat;
        background-size: cover;

        position: absolute;
        left: 2.5vw;
        top: 4vw;

    }
    .historyScroll{   /*a flexbox containing all the cards */ 
        z-index: 2;
        width: 53vw;
        height: 30vw;

        overflow: auto;
        margin: auto;
        margin-top: 7vw;
        font-family: 'ShadowLight';
    }
    .historyTable{
        margin: auto;
    }
    td {
        padding-left: 1vw;
        padding-right: 1vw;
    }
    th {
        font-size: 1.7vw;
    }

    .historyTitle{
        background-color: blueviolet;
        height: 2.7vw;
        width: 13.2vw;

        padding-left: 0.5vw;
        padding-right: 0.5vw;
        border-radius: 3vw;

        position:absolute;
        top: 2vw;
        left: 3vw;

        text-align: center;
        font-size: 1.3vw;
        padding-top:0.7vw;
    }
    .pityCounter{

        padding-left: 0.5vw;
        padding-right: 0.5vw;
        border-radius: 3vw;

        text-align: center;

        position:absolute;
        top: 31vw;
        left: 59vw;

        font-size: 5vw;
        text-align: center;
        font-family: 'ShadowLight';
        font-weight: 100;
        font:italic;
    }

    .historyText{
        font-family: 'ShadowLight';
        font-weight: bold;
        font-size: 1.3vw;
    }
    .historyText4S{
        color: rgb(131, 12, 201);
    }
    .historyText5S{
        color: #cc6f18;
    }
    .historyTextUR{
        font-weight: bold;
        background-image: linear-gradient(90deg, rgb(236, 97, 97), orange, yellow, rgb(0, 219, 0), rgb(79, 186, 248), rgb(160, 63, 230), violet);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: hueChange 5s linear infinite;
    }

    @keyframes rainbow {
    0% {
        background-position: 0% 50%;
    }
    100% {
        background-position: 100% 50%;
    }
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
        background-size: 6vw 0vw;
        margin: auto;
        padding: 0;
        opacity: 0;
        background-image: var(--rollsrc);
        border: none;
        background-color: transparent;
    }
    .rollCardVisible {  /*the pull card itself, visible version */ 
        width: 6vw;
        margin: auto;
        padding: 0;
        opacity: 0;
        z-index: 2; 
        transition: filter 0.3s ease;
        background-image: var(--rollsrc);
        border: none;
        background-color: transparent;
    }
    .rollAnim3{
        animation-name: pullAnimation, blueAnim;
        animation-duration: .25s, 1s; /* Adjust timing as needed */
        animation-delay: .3s, .5s;
        animation-fill-mode: forwards, forwards;
    }
    .rollAnim4{
        animation-name: pullAnimation, purpleAnim;
        animation-duration: .25s, 1s; /* Adjust timing as needed */
        animation-delay: .3s, .5s;
        animation-fill-mode: forwards, forwards;
    }
    .rollAnim5{
        animation-name: pullAnimation, orangeAnim;
        animation-duration: .25s, 1s; /* Adjust timing as needed */
        animation-delay: .3s, .5s;
        animation-fill-mode: forwards, forwards;
    }
    .rollAnim6{
        animation-name: pullAnimation, rainbowAnim;
        animation-duration: .25s, 1s; /* Adjust timing as needed */
        animation-delay: .3s, .5s;
        animation-fill-mode: forwards, forwards;
    }

    @keyframes pullAnimation {  /*the animation for the pull cards */ 
    0% {
        height: 0vw;
        opacity: 0;
        background-size: 6vw 0vw;
    }
    30% {
        height: 16.8627777vw;
        background-size: 6vw 16.8627777vw;
    }
    100% {
        height: 33.7255554vw;
        background-size: 6vw 33.7255554vw;
        opacity: 1;
    }
    }
    @keyframes blueAnim {
        0% {
            background: url("../../lib/assets/gacha/rollBg.png");
            height: 33.7255554vw;
            background-size: 6vw 33.7255554vw;
            opacity: 1;
        }
        50% {
            background: url("../../lib/assets/gacha/blueAnimation.png");
            height: 33.7255554vw;
            background-size: 6vw 33.7255554vw;
            opacity: 1;
        }
        100% {
            height: 33.7255554vw;
            background-size: 6vw 33.7255554vw;
            opacity: 1;
        }
    }
    @keyframes purpleAnim {
        0% {
            background: url("../../lib/assets/gacha/rollBg.png");
            height: 33.7255554vw;
            background-size: 6vw 33.7255554vw;
            opacity: 1;
        }
        50% {
            background: url("../../lib/assets/gacha/purpleAnimation.png");
            height: 33.7255554vw;
            background-size: 6vw 33.7255554vw;
            opacity: 1;
        }
        100% {
            height: 33.7255554vw;
            background-size: 6vw 33.7255554vw;
            opacity: 1;
        }
    }
    @keyframes orangeAnim {
        0% {
            background: url("../../lib/assets/gacha/rollBg.png");
            height: 33.7255554vw;
            background-size: 6vw 33.7255554vw;
            opacity: 1;
        }
        50% {
            background: url("../../lib/assets/gacha/orangeAnimation.png");
            height: 33.7255554vw;
            background-size: 6vw 33.7255554vw;
            opacity: 1;
        }
        100% {
            height: 33.7255554vw;
            background-size: 6vw 33.7255554vw;
            opacity: 1;
        }
    }
    @keyframes rainbowAnim {
        0% {
            background: url("../../lib/assets/gacha/rollBg.png");
            height: 33.7255554vw;
            background-size: 6vw 33.7255554vw;
            opacity: 1;
        }
        50% {
            background: url("../../lib/assets/gacha/rainbowAnimation.png");
            height: 33.7255554vw;
            background-size: 6vw 33.7255554vw;
            opacity: 1;
        }
        100% {
            height: 33.7255554vw;
            background-size: 6vw 33.7255554vw;
            opacity: 1;
        }
    }

    .rollCardVisible:hover{
        transform: scale(1.1);
        filter: brightness(120%);
        cursor: pointer;
    }
    /* the shine animation, very cool */
    .shine-effect::before {
    content: "";
    position: absolute;
    top: -100%;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, transparent, rgb(255, 255, 255), transparent);
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    pointer-events: none;
    }

    .shine-effect-on::before {
        top: 100%;
        opacity: 1;
        transition: top 0.6s ease-in-out, opacity 0.6s ease-in-out; /* Slower animation for top-down shine */
    }



    /*BANNER SECTION */ 
    /* (kinda scuffed with the absolute postition but it works im 90% sure with all screen sizes... i think)*/ 
    #banner {   /*container for the whole banner composition */ 
        margin: auto;
        position: relative;
        width: 100vw;
        margin-top: 4.5vh;
    }
    .characterPic {  /*banner featured cover pic */ 
        position: absolute;
        animation: characterPicAnim 1s ease-out forwards;
        top: 5vh;
        z-index: -1;
        width: 22vw;
    }

    @keyframes characterPicAnim {
        0% {
            left: 32vw;
            opacity: 0;
        }
        100% {
            opacity: 1;
            left: 36vw;
        }
    }
    .featuredCards{
        position: absolute;
        top: 5vh;
        width: 22vw;
        left: 60vw;
        opacity: 1;
    }
    .featuredCharsAnimClass{
        animation: FadeIn 1s forwards;
    }
    @keyframes FadeIn {
        0% {
            margin-bottom: 5vw;
            opacity: 0;
        }
        100% {
            margin-bottom: 0;
            opacity: 1;
        }
    }
    .bannerName {   /*banner name */ 
        position: absolute;
        left: 22vw;
        top: 2.6vw;
        font-size: 2.35vw;
    }
    .featuredName {   /*banner name */ 
        position: absolute;
        left: 48.9vw;
        top: 21.2vw;
        font-size: 2vw;
        background-image: linear-gradient(90deg, rgb(235, 160, 160), rgb(240, 216, 171), rgb(233, 233, 169), rgb(174, 236, 174), rgb(168, 213, 240), rgb(200, 155, 231), rgb(235, 159, 235));
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: hueChange 5s linear infinite;
        font-weight: 100;
        letter-spacing: .1vw;
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
        top: 22vw;
        
    }
    #infoButtonDiv{
        position: absolute;
        left:15vw;
        top: 27.5vw;
        scale: 1.1;
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

    .buttonStandardStyle{   /*the 1/10 pull buttons itselves */ 
        background: url(../../lib/assets/gacha/pullButton.png) ;
        background-size: 100%;
        border:none;
        width: 10vw;
        height: 3vw;
        text-align: center;
        font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        font-size: 1vw;
        color: rgb(103, 102, 91);
    }
    .buttonStandardStyle:hover{
        transform: scale(1.06);
        animation: hueChange 1s linear infinite;
        cursor: pointer;
    }

    .closeButton{
        background-image: url("../../lib/assets/global/closeIcon.png");
        background-size: 100% 100%;
        width: 3.5vw;
        height: 3vw;
        background-color: transparent;
        border: none;
        position: absolute;
        top: 3vw;
        left: 90vw;
        z-index: 2;
    }
    .closeButton:hover{
        transform: scale(1.1);
        cursor: pointer;
    }

</style>