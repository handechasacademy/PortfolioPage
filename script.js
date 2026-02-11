
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


//github repos and activity 

const username = 'handechasacademy';

async function loadProjects() {
    const grid = document.getElementById('repo-grid');
    const pinnedNames = ['PortfolioPage', 'Photo_Gallery', 'Calculator', 'TaskManager', 'LibraryDB', 'BankProjekt', 'ChessBoard2_0', 'ContactCatalog_2', 'OrbitalTransferCalculator']; // Put your pinned repo names here!

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const allRepos = await response.json();
        
        const pinnedRepos = allRepos.filter(repo => pinnedNames.includes(repo.name));

        grid.innerHTML = '';
        pinnedRepos.forEach(repo => {
            const card = document.createElement('div');
            card.className = 'repo-card';
            card.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || "No description provided."}</p>
                <div class="repo-tags">
                    <span>${repo.language || "Code"}</span>
                </div>
                <a href="${repo.html_url}" target="_blank" class="view-btn">View Code</a>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        grid.innerHTML = '<p>Error loading pinned projects.</p>';
    }
}

loadProjects();