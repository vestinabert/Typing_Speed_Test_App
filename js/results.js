import { getResults } from "./storage.js";
import { isTimeUp } from "./timer.js";

const resultsTable = document.getElementById("results-table");
const resultsEvaluation = document.getElementById("results-evaluation");

export function loadResults() {
    console.log("loadResults");
    resultsTable.innerHTML = "";
    const results = getResults();

    const latestResult = results[0];
    results.forEach(({ date, wpm, accuracy }) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${date}</td><td>${wpm}</td><td>${accuracy}</td>`;
        resultsTable.appendChild(row);
    });
    if (isTimeUp()) evaluatePerformance(latestResult, results);
}

function evaluatePerformance(latestResult, previousResults) {
    const wpm = parseInt(latestResult.wpm, 10);
    let comparison = "";

    if (wpm < 5) {
        comparison = "Your typing speed is as slow as a snail! 🐌";
    } else if (wpm < 15) {
        comparison = "You're typing like a turtle. 🐢 Keep going!";
    } else if (wpm < 30) {
        comparison = "You're as fast as a rabbit! 🐇";
    } else {
        comparison = "Wow! You're as quick as a cheetah! 🐆";
    }

    let improvementMessage = "";
    if (previousResults.length > 1) {
        const previousBest = Math.max(...previousResults.slice(1).map(r => parseInt(r.wpm, 10)));
        if (wpm > previousBest) {
            improvementMessage = "🎉 Congratulations! This is your best result yet!";
        } else {
            improvementMessage = `Your previous best was ${previousBest} WPM. Keep practicing!`;
        }
    }

    resultsEvaluation.textContent = `${comparison} ${improvementMessage}`;
}
