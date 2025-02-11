export function saveResults() {
    const results = JSON.parse(localStorage.getItem("typingResults")) || [];
    const newResult = {
        wpm: document.getElementById("wpm").textContent,
        accuracy: document.getElementById("accuracy").textContent.replace("%", ""),
        date: new Date().toLocaleString()
    };

    results.push(newResult);
    localStorage.setItem("typingResults", JSON.stringify(results));
}

export function getResults() {
    return JSON.parse(localStorage.getItem("typingResults")) || [];
}
