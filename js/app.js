import { startTest, focusTypingArea, highlightFirstLetter } from "./typingTest.js";
import { setupInputHandler } from "./inputHandler.js";
import { setupSwitchToggle } from "./switchView.js";
import { resetTimer } from "./timer.js";
import { resetStats } from "./stats.js";

const restartButton = document.getElementById("restart");

// Resets and starts a new test
async function restartTest() {
    resetTimer();
    await startTest();
    highlightFirstLetter();
    focusTypingArea();
    resetStats();
}

// Initializes the app
function initApp() {
    setupSwitchToggle();
    setupInputHandler();
    restartButton.addEventListener("click", restartTest);
    restartTest();
}

initApp();