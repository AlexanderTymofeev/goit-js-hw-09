const startBtnEl = document.querySelector('button[data-start]');
const stopBtnEl = document.querySelector('button[data-stop]');
let timerId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

startBtnEl.addEventListener('click', () => {
    timerId = setInterval(() => {
        document.body.style.background = getRandomHexColor()
    }, 1000);
    startBtnEl.disabled = true;
});

stopBtnEl.addEventListener('click', () => {
    clearInterval(timerId);
    startBtnEl.disabled = false;
});