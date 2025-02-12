import { processInput, processBackspace } from "./stats.js";
import { updateCursor } from "./ui.js";
import { isTimeUp } from "./timer.js";
import { restartTest, resetTest } from "./typingTest.js";

const textContainer = document.getElementById("text-container");

function handleTypingInput(e) {
    if (e.key === "Enter") {
        restartTest();
        return;
    }

    if (isTimeUp()) return;

    if (e.key === " ") return;

    if (e.key === "Escape") {
        resetTest();
        return;
    }

    if (e.key.length === 1) {
        processInput(e.key);
    } else if (e.key === "Backspace") {
        processBackspace();
    }

    updateCursor();
}

export function setupInputHandler() {
    textContainer.addEventListener("keyup", handleTypingInput);
}
