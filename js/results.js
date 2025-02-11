import { getResults } from "./storage.js";

const resultsTable = document.getElementById("results-table");

export function loadResults() {
    resultsTable.innerHTML = "";
    const results = getResults();

    results.forEach(({ date, wpm, accuracy }) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${date}</td><td>${wpm}</td><td>${accuracy}</td>`;
        resultsTable.appendChild(row);
    });
}
