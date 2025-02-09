import { fetchText } from './api.js';
import { saveResults } from './storage.js';

const textDisplay = document.getElementById("text-display");
const timeDisplay = document.getElementById("time");
const userInput = document.getElementById("user-input");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const restart = document.getElementById("restart");

let originalText = "";
let timer = 20;
let interval;
let totalCharsTyped = 0;
let correctChars = 0;
let timerStarted = false;

async function startTest() {
    originalText = await fetchText();
    textDisplay.innerHTML = originalText.split("").map(char => `<span>${char}</span>`).join("");
    userInput.disabled = false;
    userInput.value = "";
    resetStats();
}

function startTimer() {
    if (timerStarted) return;
    timerStarted = true;

    interval = setInterval(() => {
        timer--;
        timeDisplay.textContent = timer;
        if (timer <= 0) {
            clearInterval(interval);
            endTest();
        }
    }, 1000);
}

userInput.addEventListener("input", () => {
    if (!timerStarted) startTimer();
});

userInput.addEventListener("input", () => {

    const typedText = userInput.value;
    totalCharsTyped = typedText.length;

    const textSpans = textDisplay.querySelectorAll("span");
    correctChars = 0;

    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === originalText[i]) {
            textSpans[i].style.color = "green";
            correctChars++;
        } else {
            textSpans[i].style.color = "red";
        }
    }
    updateStats();

});

function resetStats() {
    timer = 20;
    timeDisplay.textContent = timer;
    wpmDisplay.textContent = 0;
    accuracyDisplay.textContent = "0%";
    timerStarted = false;

    if (interval) {
        clearInterval(interval);
        interval = null;
    }
}

function updateStats() {
    const accuracy = totalCharsTyped > 0 ? Math.round((correctChars / totalCharsTyped) * 100) : 0;
    wpmDisplay.textContent = correctChars;
    accuracyDisplay.textContent = accuracy + "%";
}

function endTest() {
    userInput.disabled = true;
    saveResults();
}
restart.addEventListener("click", startTest);

startTest();
