const walker = document.querySelector('.timelineWalker');
const wrapper = document.querySelector('.timelineWrapper');
const speed = 0.4; 

let topPosition = 0;

function animateWalker() {
    const wrapperHeight = wrapper.clientHeight;

    topPosition += speed;

    if (topPosition > wrapperHeight) {
        topPosition = -walker.offsetHeight;
    }

    walker.style.top = `${topPosition}px`;

    requestAnimationFrame(animateWalker);
}

window.addEventListener('load', animateWalker);
