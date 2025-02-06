import { fetchText } from './api.js';

const textDisplay = document.getElementById("text-display");
const timeDisplay = document.getElementById("time");
const userInput = document.getElementById("user-input");

let originalText = "";
let timer = 60;
let interval;
let totalCharsTyped = 0;
let correctChars = 0;

async function startTest() {
    originalText = await fetchText();
    textDisplay.innerHTML = originalText.split("").map(char => `<span>${char}</span>`).join("");
}

function startTimer() {
    interval = setInterval(() => {
        timer--;
        timeDisplay.textContent = timer;
        if (timer === 0) {
            clearInterval(interval);
        }
    }, 1000);
}

userInput.addEventListener("input", () => {
    if (timer === 60) startTimer();

    const typedText = userInput.value;
    totalCharsTyped = typedText.length;

    const textSpans = textDisplay.querySelectorAll("span");
    correctChars = 0;
    console.log(originalText[0]);

    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === originalText[i]) {
            textSpans[i].style.color = "green";
            correctChars++;
        } else {
            textSpans[i].style.color = "red";
        }
    }

});
startTest();
