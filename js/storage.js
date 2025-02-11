export function saveResults(wpm, accuracy) {
    const results = getResults();
    results.unshift({
        date: new Date().toLocaleString(),
        wpm,
        accuracy,
    });
    localStorage.setItem("typingResults", JSON.stringify(results));
}

export function getResults() {
    return JSON.parse(localStorage.getItem("typingResults")) || [];
}
