import { fetchText } from "../api/api.js";
import { resetStats } from "../results/stats.js";
import { resetTimer } from "./timer.js";
import { resetUI, updateCursor } from "../ui/ui.js";
import { textDisplay, textContainer } from "../core/elements.js"

let originalText = "";

// Resets and starts a new test
export async function restartTest() {
    await startTest();
    resetTest();
}
// Resets test
export function resetTest() {
    resetTimer();
    resetStats();
    highlightFirstWord();
    highlightFirstLetter();
    focusTypingArea();
    resetUI();
    updateCursor();
}

export async function startTest() {
    originalText = await fetchText();

    // Wrap each word in a <div class="word"> and each letter in <span class="letter">
    textDisplay.innerHTML = originalText
        .map(word => `<div class="word">${word.split("").map(char => `<span class="letter">${char}</span>`).join("")}</div>`)
        .join(" ");
}

export function getOriginalText() {
    return originalText;
}

export function focusTypingArea() {
    textContainer.focus();
}

export function highlightFirstLetter() {
    const firstLetter = document.querySelector(".word:first-child .letter:first-child");
    if (firstLetter) {
        firstLetter.classList.add("current");
    }
}
export function highlightFirstWord() {
    const firstWord = document.querySelector(".word:first-child");
    if (firstWord) {
        firstWord.classList.add("current");
    }
}
