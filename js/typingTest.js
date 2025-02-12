import { fetchText } from "./api.js";
import { resetStats } from "./stats.js";

const textContainer = document.getElementById("text-container");
const textDisplay = document.getElementById("text-display");

let originalText = "";

export async function startTest() {
    originalText = await fetchText();

    // Wrap each word in a <div class="word"> and each letter in <span class="letter">
    textDisplay.innerHTML = originalText
        .map(word => `<div class="word">${word.split("").map(char => `<span class="letter">${char}</span>`).join("")}</div>`)
        .join(" ");

    resetStats();
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
