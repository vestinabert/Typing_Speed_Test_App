import { scroll } from "../ui/ui.js";
import { startTimer, stopApp } from "../core/timer.js";

let currentWordIndex = 0;
let currentLetterIndex = 0;
let correctChars = 0;
let totalCharsTyped = 0;
let correctWords = 0;

export function processInput(key) {
    startTimer();

    const words = document.querySelectorAll(".word");
    const currentWord = words[currentWordIndex];
    const letters = currentWord.querySelectorAll(".letter");

    // Check if the user hasn't completed the current word
    if (currentLetterIndex < letters.length) {
        const expectedChar = letters[currentLetterIndex].textContent;

        if (key === expectedChar) {
            letters[currentLetterIndex].classList.add("correct");
            correctChars++;
        } else {
            letters[currentLetterIndex].classList.add("incorrect");
        }

        letters[currentLetterIndex].classList.remove("current");
        currentLetterIndex++;
        totalCharsTyped++;

        // If the user has completed the current word
        if (currentLetterIndex === letters.length) {
            let allCorrect = Array.from(letters).every(letter => letter.classList.contains("correct"));

            currentWord.classList.remove("current");
            currentWordIndex++;
            currentLetterIndex = 0;

            if (allCorrect && !currentWord.classList.contains("correct-word")) {
                correctWords++;
                currentWord.classList.add("correct-word"); // Add the class to prevent recounting
            }

            // Move to the next word if available
            if (currentWordIndex < words.length) {
                words[currentWordIndex].classList.add("current");
                words[currentWordIndex].querySelector(".letter").classList.add("current");
            }
            else {
                stopApp();
            }
        } else {
            letters[currentLetterIndex].classList.add("current");
        }
    }

    scroll();
}

export function processBackspace() {
    // Prevent backspacing beyond the first letter
    if (currentLetterIndex === 0 && currentWordIndex === 0) {
        return;
    }

    const words = document.querySelectorAll(".word");
    let currentWord = words[currentWordIndex];
    let letters = currentWord.querySelectorAll(".letter");

    // Handle backspace at the start of a word: move to the previous word
    if (currentLetterIndex === 0) {
        currentWord.classList.remove("current");

        currentWordIndex--;
        currentWord = words[currentWordIndex];
        letters = currentWord.querySelectorAll(".letter");
        currentLetterIndex = letters.length;

        currentWord.classList.add("current");
    }

    currentLetterIndex--;
    const letter = letters[currentLetterIndex];

    if (letter.classList.contains("correct")) {
        correctChars--;
    }

    letter.classList.remove("correct", "incorrect", "current");
    totalCharsTyped--;

    letter.classList.add("current"); // Mark the backtracked letter as current

    scroll();
}

export function resetStats() {
    correctChars = 0;
    totalCharsTyped = 0;
    correctWords = 0;
    currentWordIndex = 0;
    currentLetterIndex = 0;

    // Remove all visual markers from words and letters
    document.querySelectorAll(".word").forEach(word => word.classList.remove("current"));
    document.querySelectorAll(".letter").forEach(letter => letter.classList.remove("correct", "incorrect", "current"));
}

export function getStats() {
    return {
        totalCharsTyped,
        correctChars,
        correctWords
    };
}
