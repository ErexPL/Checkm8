const returnImg = document.querySelector('.return');
const h1 = document.querySelector('h1');
const p = document.querySelector('p');
const hamburger = document.querySelector('#hamburger');
const nav = document.querySelector('nav');
const box = document.querySelector('#sectionBox');
const leftArrow = document.querySelector('.navigation.left');
const rightArrow = document.querySelector('.navigation.right');
const carouselTitles = document.querySelectorAll('.carousel-titles h2');
const carouselContentsBox = document.querySelector('.carousel-contents');
const carouselContents = document.querySelectorAll('.carousel-contents div');
const carouselImgs = document.querySelectorAll('.carousel-imgs img');

let carouselCooldown = false;
function navigateCarousel(event) {
    if (carouselCooldown) return;
    carouselCooldown = true;
    const direction = event.target === leftArrow ? -1 : 1;

    carouselTitles.forEach((title) => {
        title.style.top = `${parseInt(title.style.top) + direction * 100}%`;
        if (title.style.top == '200%') {
            title.style.opacity = 0;
            title.style.top = '-100%';
        } else if (title.style.top == '-200%') {
            title.style.opacity = 0;
            title.style.top = '100%';
        } else {
            title.style.opacity = 1;
        }
    });

    carouselContents.forEach((content) => {
        content.style.left = `${parseInt(content.style.left) + direction * 100}%`;
        if (content.style.left == '200%') {
            content.style.opacity = 0;
            content.style.left = '-100%';
        } else if (content.style.left == '-200%') {
            content.style.opacity = 0;
            content.style.left = '100%';
        } else {
            content.style.opacity = 1;
        }
    });

    carouselImgs.forEach((img) => {
        img.style.top = `${parseInt(img.style.top) + direction * 100}%`;
        if (img.style.top == '200%') {
            img.style.opacity = 0;
            img.style.top = '-100%';
        } else if (img.style.top == '-200%') {
            img.style.opacity = 0;
            img.style.top = '100%';
        } else {
            img.style.opacity = 1;
        }
    });

    setTimeout(() => {
        carouselCooldown = false;
    }, 1000);
}

leftArrow.addEventListener('click', navigateCarousel);
rightArrow.addEventListener('click', navigateCarousel);

returnImg.addEventListener('click', function() {
    currentScrollPosition = 0;
    box.style.transform = `translateY(0vh)`;
    returnImg.classList.remove('slide-down');
});

carouselContentsBox.style.height = `${carouselContents[0].offsetHeight}px`;
window.addEventListener("resize", (event) => {
    carouselContentsBox.style.height = `${carouselContents[0].offsetHeight}px`;
});

document.addEventListener("click", (event) => {
    if (hamburger.contains(event.target)) {
        hamburger.classList.toggle('open');
        nav.classList.toggle('open');
    } else {
        hamburger.classList.remove("open");
        nav.classList.remove('open');
    }
});

let currentScrollPosition = 0;
let scrollCooldown = false;
document.addEventListener('wheel', function(event) {
    if (scrollCooldown) return;

    let scrollDirection = event.deltaY > 0 ? 100 : -100;
    if ((scrollDirection > 0 && currentScrollPosition < 300) || (scrollDirection < 0 && currentScrollPosition > 0)) {
        currentScrollPosition += scrollDirection;
        box.style.transform = `translateY(-${currentScrollPosition}vh)`;
    }

    returnImg.classList.toggle('slide-down', currentScrollPosition !== 0);

    scrollCooldown = true;
    setTimeout(() => scrollCooldown = false, 1000);
});

function linkScroll(newScrollPosition) {
    currentScrollPosition = newScrollPosition;
    box.style.transform = `translateY(-${newScrollPosition}vh)`;
    returnImg.classList.add('slide-down');
}

function startRandomNumbers() {
    let finalText = 'Checkm8'.split('');
    let displayText = [];
    let startTime = new Date().getTime();

    finalText.forEach((_, index) => {
        const stopAfter = 500 + index * 500;

        let intervalId = setInterval(() => {
            if (new Date().getTime() - startTime >= stopAfter) {
                clearInterval(intervalId);
                displayText[index] = finalText[index];
                h1.textContent = displayText.join('');
            } else {
                displayText[index] = Math.floor(Math.random() * 10).toString();
                h1.textContent = displayText.join('');
            }
        }, 100);
    });
}

function startTextCycle() {
    let states = ['The Ultimate AI Chatbot', 'Setting New Standards', 'Just Straight Up Better'];
    let currentState = 0;

    function typeText(text, callback) {
        let index = 0;
        let intervalId = setInterval(() => {
            if (index < text.length) {
                p.textContent += text[index];
                index++;
            } else {
                clearInterval(intervalId);
                setTimeout(() => callback(), 2000);
            }
        }, 100);
    }

    function backspaceText(callback) {
        let text = p.textContent;
        let intervalId = setInterval(() => {
            if (text.length > 0) {
                text = text.substring(0, text.length - 1);
                p.textContent = text;
            } else {
                clearInterval(intervalId);
                callback();
            }
        }, 100);
    }

    function setNextState() {
        let text = states[currentState];
        typeText(text, () => {
            backspaceText(() => {
                currentState = (currentState + 1) % states.length;
                setNextState();
            });
        });
    }

    setNextState();
}

startRandomNumbers();
startTextCycle();