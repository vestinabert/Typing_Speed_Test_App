import { processInput, processBackspace } from "../results/stats.js";
import { updateCursor } from "../ui/ui.js";
import { isTimeUp } from "./timer.js";
import { restartTest, resetTest } from "./typingTest.js";
import { switchToTestView } from "../ui/switchView.js";
import { textContainer } from "./elements.js"

function handleTypingInput(e) {
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
export function setupEnterHandler() {
    document.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            restartTest();
            switchToTestView();
        }
    });
}
