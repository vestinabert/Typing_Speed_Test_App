import { loadResults } from "./results.js";

const switchToggle = document.getElementById("view-switch");
const testView = document.getElementById("test-view");
const resultsView = document.getElementById("results-view");

export function setupSwitchToggle() {
    switchToggle.addEventListener("change", () => {
        if (switchToggle.checked) {
            testView.classList.add("d-none");
            resultsView.classList.remove("d-none");
            loadResults();
        } else {
            testView.classList.remove("d-none");
            resultsView.classList.add("d-none");
        }
    });
}
export function switchToResultsView() {
    switchToggle.checked = true;
    switchToggle.dispatchEvent(new Event("change"));
}