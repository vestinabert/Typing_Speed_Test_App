import { fetchText } from './api.js';

const textDisplay = document.getElementById("text-display");
const timeDisplay = document.getElementById("time");
const userInput = document.getElementById("user-input");
const cpmDisplay = document.getElementById("cpm");
const accuracyDisplay = document.getElementById("accuracy");
const restart = document.getElementById("restart");

let originalText = "";
let timer = 20;
let interval;
let totalCharsTyped = 0;
let correctChars = 0;

async function startTest() {
    originalText = await fetchText();
    textDisplay.innerHTML = originalText.split("").map(char => `<span>${char}</span>`).join("");
    userInput.disabled = false;
    userInput.value = "";
    resetStats();
}

function startTimer() {
    interval = setInterval(() => {
        timer--;
        timeDisplay.textContent = timer;
        console.log("Timer:", timer);
        if (timer <= 0) {
            clearInterval(interval);
            endTest();
        }
    }, 1000);
}

userInput.addEventListener("input", () => {
    if (timer === 20) startTimer();

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
    cpmDisplay.textContent = 0;
    accuracyDisplay.textContent = "0%";
}

function updateStats() {
    const accuracy = totalCharsTyped > 0 ? Math.round((correctChars / totalCharsTyped) * 100) : 0;

    cpmDisplay.textContent = correctChars;
    accuracyDisplay.textContent = accuracy + "%";
}

function endTest() {
    userInput.disabled = true;
    //saveResults();
}
restart.addEventListener("click", startTest);

startTest();
