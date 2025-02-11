import { processInput, processBackspace } from "./stats.js";
import { updateCursor } from "./ui.js";
import { isTimeUp } from "./timer.js";
const textContainer = document.getElementById("text-container");

function handleTypingInput(e) {
    console.log("handleTypingInput");
    if (isTimeUp()) return;

    if (e.key.length === 1) {
        processInput(e.key);
    } else if (e.key === "Backspace") {
        processBackspace();
    }

    updateCursor(textContainer);
}

export function setupInputHandler() {
    console.log("setupInputHandler");
    textContainer.addEventListener("keyup", handleTypingInput);
}
