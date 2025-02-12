import { startTest, focusTypingArea, highlightFirstLetter, highlightFirstWord } from "./typingTest.js";
import { setupInputHandler } from "./inputHandler.js";
import { setupSwitchToggle } from "./switchView.js";
import { resetTimer } from "./timer.js";
import { resetStats } from "./stats.js";
import { resetUI } from "./ui.js";

const restartButton = document.getElementById("restart");

// Resets and starts a new test
async function restartTest() {
    resetTimer();
    await startTest();
    highlightFirstWord();
    highlightFirstLetter();
    focusTypingArea();
    resetStats();
    resetUI();
}

// Initializes the app
function initApp() {
    setupSwitchToggle();
    setupInputHandler();
    restartButton.addEventListener("click", restartTest);
    restartTest();
}

initApp();