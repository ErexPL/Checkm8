const video = document.querySelectorAll('video');
const img = document.querySelector('img');
const h1 = document.querySelector('h1');
const p = document.querySelector('p');
const hamburger = document.querySelector('div');
const nav = document.querySelector('nav');

let hueValue = 0;
img.addEventListener('click', function() {
    hueValue += 60;
    if (hueValue >= 360) {
        hueValue = 0;
    }
    video.forEach((element) => {
        element.style.filter = `hue-rotate(${hueValue}deg)`;
    });
});

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('open');
    nav.classList.toggle('open');
});

let currentScrollPosition = 0;
let scrollCooldown = false;
document.addEventListener('wheel', function(event) {
    if (scrollCooldown) return;

    if (event.deltaY > 0) {
        if (currentScrollPosition < 300) {
            currentScrollPosition += 100;
            document.body.style.transform = `translateY(-${currentScrollPosition}vh)`;
        }
    } else if (event.deltaY < 0) {
        if (currentScrollPosition > 0) {
            currentScrollPosition -= 100;
            document.body.style.transform = `translateY(-${currentScrollPosition}vh)`;
        }
    }

    scrollCooldown = true;
    setTimeout(() => {
        scrollCooldown = false;
    }, 1000);
});

function linkScroll(newScrollPosition) {
    currentScrollPosition = newScrollPosition;
    document.body.style.transform = `translateY(-${newScrollPosition}vh)`;
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