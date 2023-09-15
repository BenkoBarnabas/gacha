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
        constructor(name, description, health, attack, source, stars) {
            this.name = name;
            this.description = description;
            this.health = health;
            this.attack = attack;
            this.source = source;
            this.stars = stars;
        }
    }

    class tanarCards {
        constructor(name, description, health, attack, source, stars) {
            this.name = name;
            this.description = description;
            this.health = health;
            this.attack = attack;
            this.source = source;
            this.stars = stars;
        }
    }
    const BizsoCard = new diakCards("Bizsó", "Kedvence egy jó python feladat. Ha szépen kéred, kienged a hátsó kijáraton. Szexi apuka.", 10, 5, Bizso, 3); 
    const FarkasCard = new tanarCards("Dr. Farkas", "Filozófusszakállát évente vágja. Ennek ellenére mindig visszanő.", 10, 5, Farkas, 5);
    const MoniCard = new tanarCards("Móni", "Hobbifilozófus. Képes 45 percig elemezni egy 10 soros lírai alkotást. Lenyűgöző!", 10, 5, Moni, 4);
    const NagyoraCard = new tanarCards("Big D", "Average tank build. Not much to say.", 10, 5, Nagyora, 3);
    const RozgonyiCard = new tanarCards("Rozgonyi", "Szeret sütni. Szeret még legózni és gombócot enni is. A fiát láthatólag annyira nem.", 10, 5, Rozgonyi, 3);
    const TabiCard = new tanarCards("Tábi", "Tesitanár és röplabdaedző. Epic gamer szabadidejében. Sose hagyja ki az alkalmat, hogy politizáljon.", 10, 5, Tabi, 3);

    const ArhoCard = new diakCards("Arhó", "7 évesen megfejtette a tudományt. Hisz a szabad akaratban.", 10, 5, Arho, 3); 
    const BarniCard = new diakCards("Barni", "Szeretik a lányok, szeretik a fiúk, ő pedig a krumplis tésztát szereti.", 10, 5, Barni, 3);
    const EszterCard = new diakCards("Eszter", "Nem tart otthon tyúkokat, de nagyon szeretne. Este 9-kor kizavarják a kollégium gépterméből.", 10, 5, Eszter, 3);
    const OliviaCard = new diakCards("Olívia", "Lehelt már számtalanszon visszautasította. Oliver ikertestvére. Lehel ezt még nem tudja.", 10, 5, Olivia, 3);
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
    let cardStars

    let descriptionPage = false

    function handleClick(name, description, health, attack, source, stars) {
        cardName = name
        cardDescription = description
        cardHealth = health
        cardAttack = attack
        cardSource = source
        cardStars = stars
    }
</script>

<h1 style="margin-top:0; font-size:5vmin; text-align:center;">Collection</h1>
<div id="typeChoosers">
    <!-- buttons to choose the active banner -->
    <button style="background: URL({SNCover}), no-repeat; background-size:cover" class="bannerIcon" on:click={() => selectedCollection = 1}></button>
    <button style="background: URL({YCCover}), no-repeat; background-size:cover" class="bannerIcon" on:click={() => selectedCollection = 2}></button>
    <button style="background: URL({SpellCover}), no-repeat; background-size:cover" class="bannerIcon" on:click={() => selectedCollection = 3}></button>
</div>

{#if selectedCollection == 1}
    <div class = "cardcollection" id = "tanarcollection">
        {#each tanarCardsArr as card}
            <button class = "cardButton" style="background-image: url({card.source})" on:click={() => handleClick(card.name, card.description, card.health, card.attack, card.source, card.stars)}></button>
        {/each}
    </div>
{:else if selectedCollection == 2}
    <div class = "cardcollection" id = "diakcollection">
        {#each diakCardsArr as card}
            <button class = "cardButton" style="background-image: url({card.source})" on:click={() => handleClick(card.name, card.description)}></button>
        {/each}
    </div>
{/if}

{#if descriptionPage}
    <p>{cardName}</p>
    <p>{cardDescription}</p>
    <p>{cardHealth}</p>
    <p>{cardAttack}</p>
    <p>{cardStars}</p>
{/if}

<a href="/gachaScreen">sepd ur money here</a><br>
<a href="./">main menu here</a>

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
</style>