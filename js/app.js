import { setupEnterHandler, setupInputHandler } from "./core/inputHandler.js";
import { setupSwitchToggle } from "./ui/switchView.js";
import { restartTest } from "./core/typingTest.js";
import { restartButton } from "./core/elements.js"

document.addEventListener("DOMContentLoaded", function () {

    initApp();

});

function initApp() {
    setupSwitchToggle();
    setupEnterHandler();
    setupInputHandler();
    restartButton.addEventListener("click", restartTest);
    restartTest();
}