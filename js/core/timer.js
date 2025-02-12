import { saveResults } from "../results/storage.js";
import { TEST_DURATION } from "../config/config.js";
import { disableCursor, updateStats } from "../ui/ui.js";
import { switchToResultsView } from "../ui/switchView.js";

const timeDisplay = document.getElementById("time");

let timeLeft = TEST_DURATION;
let interval = null;
let timerStarted = false;

export function startTimer() {
    if (timerStarted) return;
    timerStarted = true;

    interval = setInterval(() => {
        timeLeft--;
        updateStats();
        timeDisplay.textContent = timeLeft;
        if (isTimeUp()) {
            clearInterval(interval);
            disableCursor();
            saveResults();
            switchToResultsView();
        }
    }, 1000);
}

export function isTimeUp() {
    return timeLeft <= 0;
}

export function getTimeLeft() {
    return timeLeft;
}

export function resetTimer() {
    clearInterval(interval);
    timeLeft = TEST_DURATION;
    timeDisplay.textContent = TEST_DURATION;
    timerStarted = false;
}