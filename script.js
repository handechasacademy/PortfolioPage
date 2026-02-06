
// Tech stack animation
const techStack = document.getElementById('techStack');
const techStackContainer = document.querySelector('.techStackContainer');

const items = Array.from(techStack.children);
const stackWidth = techStack.scrollWidth;
const containerWidth = techStackContainer.offsetWidth;

let duplicates = Math.ceil(containerWidth / stackWidth) + 3;

for (let i = 0; i < duplicates; i++) {
  items.forEach(item => {
    techStack.appendChild(item.cloneNode(true));
  });
}

let stackPosition = 0;
const stackSpeed = 0.5;

function slideTechStack() {
    stackPosition -= stackSpeed;

    if (Math.abs(stackPosition) >= techStack.scrollWidth / 2) {
        stackPosition = 0;
    }

    techStack.style.transform = `translateX(${stackPosition}px)`;
    requestAnimationFrame(slideTechStack);
}

slideTechStack();


// Walker animation
const walker = document.querySelector('.timelineWalker');
const wrapper = document.querySelector('.timelineWrapper');
const walkerSpeed = 0.4;

let topPosition = 0;

function animateWalker() {
    const wrapperHeight = wrapper.clientHeight;

    topPosition += walkerSpeed;

    if (topPosition > wrapperHeight) {
        topPosition = -walker.offsetHeight;
    }

    walker.style.top = `${topPosition}px`;

    requestAnimationFrame(animateWalker);
}

window.addEventListener('load', animateWalker);

