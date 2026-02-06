
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
const timelineWrapper = document.querySelector('.timelineWrapper');
const timelineItems = document.querySelectorAll('.timelineItem');

const walkerSpeed = 0.4;

let topPosition;
let minY;
let maxY;

function recalcBounds() {
    const wrapperRect = timelineWrapper.getBoundingClientRect();

    const itemRects = Array.from(timelineItems).map(timelineItem =>
        timelineItem.getBoundingClientRect()
    );

    minY = Math.min(...itemRects.map(r => r.top)) - wrapperRect.top;
    maxY = Math.max(...itemRects.map(r => r.bottom)) - wrapperRect.top;
}

function animateWalker() {
    topPosition -= walkerSpeed;

    if (topPosition < minY - walker.offsetHeight) {
        topPosition = maxY;
    }

    walker.style.top = `${topPosition}px`;
    requestAnimationFrame(animateWalker);
}

window.addEventListener('load', () => {
    recalcBounds();
    topPosition = maxY;
    animateWalker();
});

window.addEventListener('resize', recalcBounds);