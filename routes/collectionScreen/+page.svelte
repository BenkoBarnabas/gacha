<script>
    import Bizso from "../../lib/assets/collection/tanar/Bizso.png"
    import Farkas from "../../lib/assets/collection/tanar/Farkas.png"
    import Moni from "../../lib/assets/collection/tanar/Moni.png"
    import Nagyora from "../../lib/assets/collection/tanar/Nagyora.png"
    import Rozgonyi from "../../lib/assets/collection/tanar/Rozgonyi.png"
    import Tabi from "../../lib/assets/collection/tanar/Tabi.png"

    import Arho from "../../lib/assets/collection/diak/Arho.png"
    import Barni from "../../lib/assets/collection/diak/Barni.png"
    import Eszter from "../../lib/assets/collection/diak/Eszter.png"
    import Olivia from "../../lib/assets/collection/diak/Olivia.png"
    import Zalan from "../../lib/assets/collection/diak/Zalan.png"
    import Zeno from "../../lib/assets/collection/diak/Zeno.png"
    import Filozofia from "../../lib/assets/collection/spell/filozofia.png"
    import Gomboc from "../../lib/assets/collection/spell/gomboc.png"
    import Tz from "../../lib/assets/collection/spell/tz.png"

    import SNCover from "../../lib/assets/gacha/SWCover.png" //cover for the buttons for switching banners
    import YCCover from "../../lib/assets/gacha/YCCover.png" //^^^
    import SpellCover from "../../lib/assets/gacha/SpellCover.png"

    let selectedCollection = 1

    class diakCards {
        constructor(name, description, health, attack, source, stars, cost) {
            this.name = name;
            this.description = description;
            this.health = health;
            this.attack = attack;
            this.source = source;
            this.stars = stars;
            this.cost = cost;
        }
    }

    class tanarCards {
        constructor(name, description, health, attack, source, stars, cost) {
            this.name = name;
            this.description = description;
            this.health = health;
            this.attack = attack;
            this.source = source;
            this.stars = stars;
            this.cost = cost;
        }
    }
    const BizsoCard = new diakCards("Bizsó", "Kedvence egy jó python feladat. Ha szépen kéred, kienged a hátsó kijáraton. Szexi apuka.", 9, 5, Bizso, 4, 2); 
    const FarkasCard = new tanarCards("Dr. Farkas", "Filozófusszakállát évente vágja. Ennek ellenére mindig visszanő.", 17, 8, Farkas, 5, 4);
    const MoniCard = new tanarCards("Móni", "Hobbifilozófus. Képes 45 percig elemezni egy 10 soros lírai alkotást. Lenyűgöző!", 8, 6, Moni, 4, 2);
    const NagyoraCard = new tanarCards("Big D", "Average tank build. Not much to say.", 30, 4, Nagyora, 3, 5);
    const RozgonyiCard = new tanarCards("Rozgonyi", "Szeret sütni. Szeret még legózni és gombócot enni is. A fiát láthatólag annyira nem.", 17, 3, Rozgonyi, 3, 3);
    const TabiCard = new tanarCards("Tábi", "Tesitanár és röplabdaedző. Epic gamer szabadidejében. Sose hagyja ki az alkalmat, hogy politizáljon.", 6, 7, Tabi, 3, 2);

    const ArhoCard = new diakCards("Arhó", "7 évesen megfejtette a tudományt. Hisz a szabad akaratban.", 12, 6, Arho, 4, 3); 
    const BarniCard = new diakCards("Barni", "Szeretik a lányok, szeretik a fiúk, ő pedig a krumplis tésztát szereti.", 18, 7, Barni, 3, 4);
    const EszterCard = new diakCards("Eszter", "Nem tart otthon tyúkokat, de nagyon szeretne. Este 9-kor kizavarják a kollégium gépterméből.", 5, 5, Eszter, 4, 1);
    const OliviaCard = new diakCards("Olívia", "Lehelt már számtalanszon visszautasította. Oliver ikertestvére. Lehel ezt még nem tudja.", 12, 4, Olivia, 4, 2);
    const ZalanCard = new diakCards("Zalán", "Mindenki kedvenc DÖK elnöke. Volt. Fasza bőrdzseki!", 10, 5, Zalan, 3);
    const ZenoCard = new diakCards("Zénó", "SG DÖK elnök. Ha a terem hátsó sarkában valaki fulladozik a nevetéstől, ő az.", 10, 5, Zeno, 5);

    let tanarCardsArr = [BizsoCard, FarkasCard, MoniCard, NagyoraCard, RozgonyiCard, TabiCard]
    let diakCardsArr = [ArhoCard, BarniCard, EszterCard, OliviaCard, ZalanCard, ZenoCard]
        //spellek kellenek még de képességek frameworkje még nincs meg.

    let cardName
    let cardDescription
    let cardHealth
    let cardAttack
    let cardSource
    let cardStars = ""
    let cardCost

    let descriptionPage = false

    function handleClick(name, description, health, attack, source, stars, cost) {
        cardName = name
        cardDescription = description
        cardHealth = health
        cardAttack = attack
        cardSource = source
        cardStars = ""
        cardCost = cost
        
        for(let i = 0; i < stars; i++){
            cardStars = cardStars + "*"
        }
        descriptionPage = true
    }
</script>

<div id = "background"></div>
<h1 style="margin-top:3vh; font-size:5vmin; text-align:center; color:white">Collection</h1>
<div id="typeChoosers">
    <!-- buttons to choose the active banner -->
    <button style="background: URL({SNCover}), no-repeat; background-size:cover" class="bannerIcon" on:click={() => selectedCollection = 1}></button>
    <button style="background: URL({YCCover}), no-repeat; background-size:cover" class="bannerIcon" on:click={() => selectedCollection = 2}></button>
    <button style="background: URL({SpellCover}), no-repeat; background-size:cover" class="bannerIcon" on:click={() => selectedCollection = 3}></button>
</div>

{#if selectedCollection == 1}
    <h2>Tanárok</h2>
    <div class = "cardcollection" id = "tanarcollection">
        {#each tanarCardsArr as card}
            <button class = "cardButton" style="background-image: url({card.source})" on:click={() => handleClick(card.name, card.description, card.health, card.attack, card.source, card.stars, card.cost)}></button>
        {/each}
    </div>
{:else if selectedCollection == 2}
    <h2>Diákok</h2>
    <div class = "cardcollection" id = "diakcollection">
        {#each diakCardsArr as card}
            <button class = "cardButton" style="background-image: url({card.source})" on:click={() => handleClick(card.name, card.description, card.health, card.attack, card.source, card.stars, card.cost)}></button>
        {/each}
    </div>
{/if}

{#if descriptionPage}
    <div class = "bg">
        <h3>{"(" + cardCost + ")"} {cardName} {cardStars}</h3>
        <h4>{cardDescription}</h4>
        <p>Health: {cardHealth}</p>
        <p>Attack: {cardAttack}</p>
    </div>
{/if}

<div class = "links">
    <a href="/gachaScreen">sepd ur money here</a><br>
    <a href="./">main menu here</a>
</div>

<style>
    .cardButton{
        height:30vh;
        width:10vw;
        border: 0.5vmin solid goldenrod;
        border-radius: 5px; /* Add border radius for rounded corners */
        padding: 10px 10px; /* Add padding to the buttons */
        margin: 5px;
        background-size:cover;
    }

    .cardButton:hover{
        cursor:pointer;
        scale:1.02;
    }

    #background {
        background-image: url("../../lib/assets/collection/bg.png");
        overflow: hidden;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: cover; /* Adjust as needed: cover, contain, etc. */
        background-repeat: no-repeat;
        background-position: center center;
        z-index: -3;
    }

    .bg{
        background-color: rgba(224, 123, 157, 0.5);
        padding-inline:20px;
        padding-block: 10px;
        margin:50px;
    }

    h2{
        margin-block: 1vh;
        padding-inline:20px;
        text-align: center;
        background-color:rgba(255, 255, 255, 0.2)
    }
</style>