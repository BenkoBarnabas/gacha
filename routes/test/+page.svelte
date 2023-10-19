<script>
    let particleContainer
    import { onMount } from 'svelte';
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

// Event listener for mouse click


</script>


<div id="particle-container"></div>
uwu uwu



<style>



#particle-container {
    position: absolute;
    width: 100%;
    height: 100%;
}

</style>