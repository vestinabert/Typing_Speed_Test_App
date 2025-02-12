import { updateCursor, updateStats, scrollIfNeeded } from "./ui.js";
import { startTimer } from "./timer.js";
import { getOriginalText } from "./typingTest.js";
import { clearPerformanceEvaluation } from "./results.js";

const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const textDisplay = document.getElementById("text-display");

let totalCharsTyped = 0
let correctChars = 0
let correctWords = 0
let currentIndex = 0;

export function processInput(key) {
    startTimer();
    const letters = document.querySelectorAll(".letter");
    if (currentIndex >= letters.length) return;

    const currentLetterSpan = letters[currentIndex];
    totalCharsTyped++;
    if (key === currentLetterSpan.textContent) {
        currentLetterSpan.classList.add("correct");
        correctChars++;
    } else {
        currentLetterSpan.classList.add("incorrect");
    }

    currentLetterSpan.classList.remove("current");
    currentIndex++;

    if (currentIndex < letters.length) {
        letters[currentIndex].classList.add("current");
    }
    else {
        console.log("processInput else");
    }
    if (key === " ") checkWordCompletion();

    updateStats(wpmDisplay, accuracyDisplay, correctChars, totalCharsTyped, correctWords);
    scrollIfNeeded();
}

export function processBackspace() {
    if (currentIndex === 0) return;
    const letters = document.querySelectorAll(".letter");


    if (currentIndex < letters.length) {
        letters[currentIndex].classList.remove("current");
    }

    currentIndex--;
    totalCharsTyped--;
    const currentLetterSpan = letters[currentIndex];

    if (currentLetterSpan.classList.contains("correct")) {
        correctChars--;
    }

    currentLetterSpan.classList.remove("correct", "incorrect");

    currentLetterSpan.classList.add("current");

    updateStats(wpmDisplay, accuracyDisplay, correctChars, totalCharsTyped, correctWords);
}

function checkWordCompletion() {
    const originalWords = getOriginalText().split(" ");
    const typedWords = textDisplay.textContent.slice(0, currentIndex).split(" ");

    if (typedWords.length > correctWords && typedWords[correctWords] === originalWords[correctWords]) {
        correctWords++;
    }
}

export function resetStats() {
    currentIndex = 0;
    correctChars = 0;
    totalCharsTyped = 0;
    correctWords = 0;
    wpmDisplay.textContent = 0;
    accuracyDisplay.textContent = "0%";
    updateCursor(textDisplay);
    clearPerformanceEvaluation();
}