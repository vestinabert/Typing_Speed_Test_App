import { saveResults } from "./storage.js";
import { TEST_DURATION } from "./config.js";

const timeDisplay = document.getElementById("time");

let timeLeft = TEST_DURATION;
let interval = null;
let timerStarted = false;

export function startTimer() {
    if (timerStarted) return;
    timerStarted = true;

    interval = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(interval);
            saveResults();
        }
    }, 1000);
}

export function resetTimer() {
    clearInterval(interval);
    timeLeft = TEST_DURATION;
    timeDisplay.textContent = TEST_DURATION;
    timerStarted = false;
}