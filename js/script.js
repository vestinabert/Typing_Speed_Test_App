import { fetchText } from './api.js';
import { saveResults, getResults } from './storage.js';
import { updateStats, updateCursor } from './ui.js'
import { setupSwitchToggle } from './switchView.js';

// DOM elements
const textContainer = document.getElementById("text-container");
const textDisplay = document.getElementById("text-display");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const restart = document.getElementById("restart");

let originalText = "";
let testDuration = 20;
let timeLeft = testDuration;
let interval;
let totalCharsTyped = 0;
let correctChars = 0;
let correctWords = 0;
let timerStarted = false;
let currentIndex = 0;

async function startTest() {
    console.log("startTest");
    originalText = await fetchText();
    textDisplay.innerHTML = originalText.split("").map(char => `<span class="letter">${char}</span>`).join("");
    resetStats();
}

function handleKeyUp(e) {
    console.log("hendleKeyUp");
    if (timeLeft <= 0) return;
    if (!timerStarted) startTimer();

    const key = e.key;
    if (key.length === 1) {
        processInput(key);
    }
    else if (key === "Backspace") {
        processBackspace();
    }

    updateCursor(textContainer);
}

function startTimer() {
    console.log("startTimer");
    timerStarted = true;

    interval = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(interval);
            endTest();
        }
    }, 1000);
}

function processInput(key) {
    console.log("processInput");
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
        endTest();
    }
    if (key === " ") {
        checkWordCompletion();
    }
    updateStats(wpmDisplay, accuracyDisplay, correctChars, totalCharsTyped, correctWords, testDuration - timeLeft);
}

function checkWordCompletion() {
    console.log("checkWordCompletion");
    const originalWords = originalText.split(" ");
    const typedWords = textDisplay.textContent.slice(0, currentIndex).split(" ");

    if (typedWords.length > correctWords && typedWords[correctWords] === originalWords[correctWords]) {
        correctWords++;
    }
}

function processBackspace() {
    console.log("processBackspace");
    const letters = document.querySelectorAll(".letter");
    if (currentIndex === 0) return;

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

    updateStats(wpmDisplay, accuracyDisplay, correctChars, totalCharsTyped, correctWords, testDuration - timeLeft);
}

function resetStats() {
    currentIndex = 0;
    correctChars = 0;
    const firstLetter = textDisplay.firstChild;
    if (firstLetter) {
        firstLetter.classList.add("current");
    }
    updateCursor(textContainer);
    textContainer.focus();
    console.log("resetStats");
    testDuration = 20;
    timeLeft = testDuration;
    timeDisplay.textContent = testDuration;
    wpmDisplay.textContent = 0;
    accuracyDisplay.textContent = "0%";
    timerStarted = false;
    totalCharsTyped = 0;

    if (interval) {
        clearInterval(interval);
        interval = null;
    }
}

function endTest() {
    saveResults(wpmDisplay.textContent, accuracyDisplay.textContent);
}

setupSwitchToggle();

textContainer.addEventListener("keyup", handleKeyUp);

restart.addEventListener("click", startTest);

startTest();