import { fetchText } from "./api.js";
import { resetStats } from "./stats.js";

const textContainer = document.getElementById("text-container");
const textDisplay = document.getElementById("text-display");

let originalText = "";

export async function startTest() {
    originalText = await fetchText();
    textDisplay.innerHTML = originalText.split("")
        .map(char => `<span class="letter">${char}</span>`)
        .join("");

    resetStats();
}

export function getOriginalText() {
    return originalText;
}

export function focusTypingArea() {
    textContainer.focus();
}

export function highlightFirstLetter() {
    console.log("highlightFirstLetter");
    console.log(textDisplay.firstChild);
    textDisplay.firstChild?.classList.add("current");
}
