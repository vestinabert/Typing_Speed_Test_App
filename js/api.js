export async function fetchText() {
    try {
        const response = await fetch("https://random-word-api.herokuapp.com/word?number=42");
        const data = await response.json();
        return data.join(" ");
    } catch (error) {
        console.error("Error fetching text:", error);
        return "This is a fallback text for testing. Fetching from API failed.";
    }
}

console.log(fetchText());
