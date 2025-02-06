import { fetchText } from './api.js';

const textDisplay = document.getElementById("text-display");
const timeDisplay = document.getElementById("time");

let originalText = "";
let timer = 60;

async function startTest() {
    originalText = await fetchText();
    textDisplay.textContent = originalText;
}

function startTimer() {
    setInterval(() => {
        timer--;
        timeDisplay.textContent = timer;
        if (timer === 0) {
            clearInterval(interval);
            endTest();
        }
    }, 1000);
}
startTest();
startTimer();
