import { getTimeLeft } from "./timer.js";
import { TEST_DURATION } from "./config.js";

export function updateStats(wpmDisplay, accuracyDisplay, correctChars, totalCharsTyped, correctWords) {
    const elapsedTime = TEST_DURATION - getTimeLeft();
    const accuracy = totalCharsTyped > 0 ? Math.round((correctChars / totalCharsTyped) * 100) : 0;
    const wpm = elapsedTime > 0 ? Math.round((correctWords * 60) / elapsedTime) : 0;
    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = `${accuracy}%`;
}

export function updateCursor(textContainer) {
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
        cursor.style.display = "none";
    }
}
