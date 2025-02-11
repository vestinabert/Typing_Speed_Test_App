import { fetchText } from './api.js';
import { saveResults, getResults } from './storage.js';

const textContainer = document.getElementById("text-container");
const textDisplay = document.getElementById("text-display");
const cursor = document.getElementById("cursor");
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
let timerStarted = false;

let currentIndex = 0;

async function startTest() {
    originalText = await fetchText();
    textDisplay.innerHTML = originalText.split("").map(char => `<span class="letter">${char}</span>`).join("");
    const firstLetter = textDisplay.firstChild;
    if (firstLetter) {
        firstLetter.classList.add("current");
    }
    updateCursor();
    textContainer.focus();
    resetStats();
}

function handleKeyUp(e) {
    if (timeLeft <= 0) return;
    if (!timerStarted) startTimer();

    const key = e.key;
    console.log(key);
    if (key.length === 1) {
        processInput(key);
    }
    else if (key === "Backspace") {
        processBackspace();
    }

    updateCursor();
}


function updateCursor() {
    const currentLetter = document.querySelector(".letter.current");
    if (currentLetter) {
        const letterRect = currentLetter.getBoundingClientRect();
        const containerRect = textContainer.getBoundingClientRect();
        cursor.style.top = (letterRect.top - containerRect.top) + "px";
        cursor.style.left = (letterRect.left - containerRect.left) + "px";
        cursor.style.display = "block";
    } else {
        cursor.style.display = "none";
    }
}

function startTimer() {
    if (timerStarted) return;
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

textContainer.addEventListener("keyup", () => {
    if (!timerStarted) startTimer();
});

function processInput(key) {
    const letters = document.querySelectorAll(".letter");
    if (currentIndex >= letters.length) return;

    const currentLetterSpan = letters[currentIndex];

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

    updateStats();
}

function processBackspace() {
    const letters = document.querySelectorAll(".letter");
    if (currentIndex === 0) return;

    if (currentIndex < letters.length) {
        letters[currentIndex].classList.remove("current");
    }

    currentIndex--;
    const currentLetterSpan = letters[currentIndex];

    if (currentLetterSpan.classList.contains("correct")) {
        correctCHars--;
    }

    currentLetterSpan.classList.remove("correct", "incorrect");

    currentLetterSpan.classList.add("current");

    updateStats();
}

function resetStats() {
    testDuration = 20;
    timeDisplay.textContent = testDuration;
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
    saveResults();
}
restart.addEventListener("click", startTest);

startTest();




const switchToggle = document.getElementById("view-switch");
const testView = document.getElementById("test-view");
const resultsView = document.getElementById("results-view");
const resultsTable = document.getElementById("results-table");

function loadResults() {
    const results = getResults();
    resultsTable.innerHTML = "";

    results.forEach(result => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${result.date}</td>
            <td>${result.wpm}</td>
            <td>${result.accuracy}%</td>
        `;
        resultsTable.appendChild(row);
    });

}

switchToggle.addEventListener("change", () => {
    if (switchToggle.checked) {
        testView.classList.add("d-none");
        resultsView.classList.remove("d-none");
        loadResults();
    } else {
        testView.classList.remove("d-none");
        resultsView.classList.add("d-none");
    }
});


textContainer.addEventListener("keyup", handleKeyUp);