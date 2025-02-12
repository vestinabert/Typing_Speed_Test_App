import { setupEnterHandler, setupInputHandler } from "./core/inputHandler.js";
import { setupSwitchToggle } from "./ui/switchView.js";
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