import { loadResults } from "../results/results.js";
import { focusTypingArea } from "../core/typingTest.js";
import { switchToggle, testView, resultsView } from "../core/elements.js";

export function setupSwitchToggle() {
    switchToggle.addEventListener("change", () => {
        if (switchToggle.checked) {
            switchToResultsView();
        } else {
            switchToTestView();
        }
    });
}
export function switchToResultsView() {
    switchToggle.checked = true;
    testView.classList.add("d-none");
    resultsView.classList.remove("d-none");
    loadResults();
}
export function switchToTestView() {
    switchToggle.checked = false;
    testView.classList.remove("d-none");
    resultsView.classList.add("d-none");
    focusTypingArea();
}