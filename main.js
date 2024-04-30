const returnImg = document.querySelector('.return');
const h1 = document.querySelector('h1');
const p = document.querySelector('p');
const hamburger = document.querySelector('#hamburger');
const nav = document.querySelector('nav');
const box = document.querySelector('#sectionBox');
const leftArrow = document.querySelector('.navigation.left');
const rightArrow = document.querySelector('.navigation.right');
const carouselTitles = document.querySelectorAll('.carousel-titles > *');
const carouselContents = document.querySelectorAll('.carousel-contents > *');
const carouselImgs = document.querySelectorAll('.carousel-imgs > *');

let currentIndex = 0;
let carouselCooldown = false;
carouselContents[0].style.display = "flex";
function navigateCarousel(event) {
    if (carouselCooldown) return;
    carouselCooldown = true;

    const direction = event.target === leftArrow ? -1 : 1;
    nextIndex = (currentIndex + direction + carouselContents.length) % carouselContents.length;

    carouselTitles.forEach((title) => {
        title.style.top = `${parseInt(title.style.top) + direction * 100}px`;
        if (title.style.top == '200px') {
            title.style.opacity = 0;
            title.style.top = `-100px`;
        } else if (title.style.top == '-200px') {
            title.style.opacity = 0;
            title.style.top = `100px`;
        } else {
            title.style.opacity = 1;
        }
    });

    carouselContents[currentIndex].style.display = 'none';
    carouselContents[nextIndex].style.display = 'flex';
    carouselImgs[currentIndex].style.zIndex = '1';
    carouselImgs[nextIndex].style.opacity = '1';
    carouselImgs[nextIndex].style.zIndex = '2';
    carouselImgs[nextIndex].classList.add('slide-down');

    setTimeout(() => {
        carouselImgs[currentIndex].style.opacity = '0';
        carouselImgs[currentIndex].classList.remove('slide-down');
        currentIndex = nextIndex;
        carouselCooldown = false;
    }, 750);
}

leftArrow.addEventListener('click', navigateCarousel);
rightArrow.addEventListener('click', navigateCarousel);

returnImg.addEventListener('click', function() {
    currentScrollPosition = 0;
    box.style.transform = `translateY(0vh)`;
    returnImg.classList.remove('slide-down');
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
    setTimeout(() => scrollCooldown = false, 750);
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