import { fetchText } from './api.js';

const textDisplay = document.getElementById("text-display");
let originalText = "";
async function startTest() {
    originalText = await fetchText();
    textDisplay.innerText = originalText;
}

startTest();