<script>
    import { onMount } from 'svelte';
    onMount(() => {


        isRunning()
    });
    function isAnimationOngoing() {
    var elements = document.querySelectorAll('*');

    for (var i = 0; i < elements.length; i++) {
        var computedStyle = window.getComputedStyle(elements[i]);

        if (computedStyle.transitionDuration !== '0s' || computedStyle.animationDuration !== '0s') {
            // Transition or animation is ongoing for at least one element
            return true;
        }
        }

            // No ongoing transitions or animations found
            return false;
        }

    function isRunning(){
        if (isAnimationOngoing()) {
            console.log('At least one animation is ongoing on the page.');
        } else {
            console.log('No ongoing animations on the page.');
        }
        setTimeout(() => {
            isRunning()
        }, 1000);
    }






</script>


<div id="alma" style="height: 10vw;width:10vw;">aaa</div>
<style>

    #alma{
        animation: alma 3s 5s;
    }
    @keyframes alma {
        0%{
            background-color:violet;
        }
        100%{
            background-color:red;
        }
    }
    
</style>

