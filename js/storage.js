export function saveResults() {
    const wpm = document.getElementById("wpm").textContent;
    const accuracy = document.getElementById("accuracy").textContent;
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
