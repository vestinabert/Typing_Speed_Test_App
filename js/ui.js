import { getTimeLeft } from "./timer.js";
import { TEST_DURATION } from "./config.js";
import { getStats } from "./stats.js";

const textDisplay = document.getElementById("text-display");
const resultsEvaluation = document.getElementById("results-evaluation");
const textContainer = document.getElementById("text-container");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

export function resetUI() {
    wpmDisplay.textContent = 0;
    accuracyDisplay.textContent = "0%";
    updateCursor();
    resultsEvaluation.textContent = "";
    textDisplay.style.transform = "translateY(0px)";
}

export function updateStats() {
    const { correctChars, totalCharsTyped, correctWords } = getStats();
    const elapsedTime = TEST_DURATION - getTimeLeft();
    const accuracy = totalCharsTyped > 0 ? Math.round((correctChars / totalCharsTyped) * 100) : 0;
    const wpm = elapsedTime > 0 ? Math.round((correctWords * 60) / elapsedTime) : 0;
    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = `${accuracy}%`;
}

export function updateCursor() {
    const cursor = document.getElementById("cursor");
    if (!cursor) return;

    const currentLetter = document.querySelector(".letter.current");
    if (currentLetter) {
        const letterRect = currentLetter.getBoundingClientRect();
        const containerRect = textContainer.getBoundingClientRect();
        cursor.style.top = (letterRect.top - containerRect.top) + "px";
        cursor.style.left = (letterRect.left - containerRect.left) + "px";
        cursor.style.display = "block";
    } else {
        disableCursor();
    }
}
export function disableCursor() {
    cursor.style.display = "none";
}
export function scroll() {
    const currentLetter = document.querySelector(".letter.current");
    if (!currentLetter) return;

    const containerRect = textContainer.getBoundingClientRect();
    const letterRect = currentLetter.getBoundingClientRect();
    console.log("currentLetter", currentLetter);
    console.log("letterrectbottom", letterRect.bottom);
    console.log("containerRectbottom", containerRect.bottom);
    console.log("letterrecttop", letterRect.top);
    console.log("containerRecttop", containerRect.top);
    if (letterRect.bottom > containerRect.bottom) {
        const offset = letterRect.bottom - containerRect.bottom + 10;
        adjustScroll(-offset);
    }
    else if (letterRect.top < containerRect.top) {
        const offset = containerRect.top - letterRect.top + 10;
        adjustScroll(offset);
    }
}

function adjustScroll(offset) {
    const style = window.getComputedStyle(textDisplay);
    const matrix = new DOMMatrixReadOnly(style.transform);
    let currentTranslateY = matrix.m42;
    currentTranslateY += offset;
    textDisplay.style.transform = `translateY(${currentTranslateY}px)`;
}