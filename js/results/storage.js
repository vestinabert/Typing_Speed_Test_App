export function saveResults() {
    const wpm = document.getElementById("wpm").textContent;
    const accuracy = document.getElementById("accuracy").textContent;
    const results = getResults();

    // Format date as YYYY-MM-DD HH:MM
    const formattedDate = new Date().toLocaleString("sv-SE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    }).replace(",", "");

    results.unshift({
        date: formattedDate,
        wpm,
        accuracy,
    });

    localStorage.setItem("typingResults", JSON.stringify(results));
}

export function getResults() {
    return JSON.parse(localStorage.getItem("typingResults")) || [];
}
