import { loadResults } from "./results.js";
import { focusTypingArea } from "./typingTest.js";

const switchToggle = document.getElementById("view-switch");
const testView = document.getElementById("test-view");
const resultsView = document.getElementById("results-view");

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