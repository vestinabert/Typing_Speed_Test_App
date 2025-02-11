import { getResults } from "./storage.js";
const resultsTable = document.getElementById("results-table");
export function loadResults() {
    const results = getResults();
    resultsTable.innerHTML = "";

    results.forEach(result => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${result.date}</td>
            <td>${result.wpm}</td>
            <td>${result.accuracy}</td>
        `;
        resultsTable.appendChild(row);
    });

}