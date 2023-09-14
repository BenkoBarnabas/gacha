<script>
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

    let tanarCards = [Farkas, Moni, Nagyora, Rozgonyi, Tabi]
    let diakCards = [Arho, Barni, Eszter, Olivia, Zalan, Zeno]
    let spellCards = [Filozofia, Gomboc, Tz]

    function handleClick(index) {
        alert(`Button ${index + 1} clicked!`);
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
        {#each tanarCards as label, index}
            <button class = "cardButton" style="background-image: url({label})" on:click={() => handleClick(index)}></button>
        {/each}
    </div>
{:else if selectedCollection == 2}
    <div class = "cardcollection" id = "diakcollection">
        {#each diakCards as label, index}
            <button class = "cardButton" style="background-image: url({label})" on:click={() => handleClick(index)}></button>
        {/each}
    </div>
{:else}
<div class = "cardcollection" id = "spellcollection">
    {#each spellCards as label, index}
        <button class = "cardButton" style="background-image: url({label})" on:click={() => handleClick(index)}></button>
    {/each}
</div>
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
</style>