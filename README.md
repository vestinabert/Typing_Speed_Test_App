# Typing Speed Test

This is a **Typing Speed Test** web application that allows users to measure their typing speed and accuracy in a 60-second test. It provides real-time feedback on typing performance, stores results, and displays user progress over time.
# Screenshots

Here are some screenshots showcasing the application:
<img width="708" alt="test" src="https://github.com/user-attachments/assets/301c9cde-684a-44ce-ad08-cf4e87de2178" />
<img width="706" alt="results" src="https://github.com/user-attachments/assets/681b8717-eb36-44cf-9b51-2773b06148bb" />

## Features
- Fetches random text from an API (`https://random-word-api.herokuapp.com/word`)
- 60-second timer starts when the user begins typing
- Characters are highlighted as **green** for correct inputs and **red** for incorrect ones
- Allows backspacing to correct mistakes
- Implements auto-scroll to keep the current typing position in view
- Displays Words Per Minute (WPM) and accuracy percentage in real time
- Results are stored and retrieved from local storage
- Users can restart the test using the **Enter** key and reset using the **Escape** key
- Switch between typing test and results view
- Cursor animation for a smooth typing experience

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/vestinabert/Typing_Speed_Test_App.git
   ```
2. Open the project in VS Code

3. Launch the app using Live Server:

This project is designed to be run in a browser. The easiest way to do this is by using the Live Server extension in VS Code:

- Install the Live Server extension from the VS Code marketplace (if you haven't already).
- Open index.html in VS Code.
- Right-click inside the editor and select "Open with Live Server".
- The app will launch in your default web browser.

## Project Structure
```
typing-speed-test
│── index.html        # Main HTML file
│── style.css         # Styling and animations
│── js/
│   ├── app.js        # Initializes the application
│   ├── api/
│   │   ├── api.js    # Fetches random text
│   ├── config/
│   │   ├── config.js # Configuration settings (e.g., test duration)
│   ├── core/
│   │   ├── elements.js  # Stores DOM elements
│   │   ├── typingTest.js  # Manages test start, reset, and UI updates
│   │   ├── timer.js       # Manages the 60-second countdown
│   │   ├── inputHandler.js # Handles user input and key events
│   ├── results/
│   │   ├── stats.js   # Tracks correct/incorrect inputs and calculates WPM
│   │   ├── results.js # Displays past results
│   │   ├── storage.js # Saves and retrieves results from local storage
│   ├── ui/
│   │   ├── switchView.js # Switches between typing test and results view
│   │   ├── ui.js         # Handles UI elements like cursor and text scrolling
```

## Technologies Used
- **HTML, CSS** (Bootstrap for styling)
- **JavaScript (ES6 modules)**
- **Local Storage** (for saving results)
- **Fetch API** (for retrieving random words)

