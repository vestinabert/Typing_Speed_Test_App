import { fetchText } from './api.js';
import { startTimer, resetTimer } from './timer.js';
import { updateStats, updateCursor } from './ui.js'
import { setupSwitchToggle } from './switchView.js';
import { TEST_DURATION } from './config.js';

// DOM elements
const textContainer = document.getElementById("text-container");
const textDisplay = document.getElementById("text-display");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const restart = document.getElementById("restart");

let originalText = "";
let timeLeft = TEST_DURATION;
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

function handleTypingInput(e) {
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
        console.log("processInput else");
    }
    if (key === " ") {
        checkWordCompletion();
    }
    updateStats(wpmDisplay, accuracyDisplay, correctChars, totalCharsTyped, correctWords, TEST_DURATION - timeLeft);
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

    updateStats(wpmDisplay, accuracyDisplay, correctChars, totalCharsTyped, correctWords, TEST_DURATION - timeLeft);
}

function resetStats() {
    currentIndex = 0;
    correctChars = 0;
    resetTimer();
    const firstLetter = textDisplay.firstChild;
    if (firstLetter) {
        firstLetter.classList.add("current");
    }
    updateCursor(textContainer);
    textContainer.focus();
    wpmDisplay.textContent = 0;
    accuracyDisplay.textContent = "0%";
    totalCharsTyped = 0;
}

setupSwitchToggle();

textContainer.addEventListener("keyup", handleTypingInput);

restart.addEventListener("click", startTest);

startTest();