import { setupEnterHandler, setupInputHandler } from "./inputHandler.js";
import { setupSwitchToggle } from "./switchView.js";
import { restartTest } from "./typingTest.js";

const restartButton = document.getElementById("restart");

// Initializes the app
function initApp() {
    setupSwitchToggle();
    setupEnterHandler();
    setupInputHandler();
    restartButton.addEventListener("click", restartTest);
    restartTest();
}

initApp();