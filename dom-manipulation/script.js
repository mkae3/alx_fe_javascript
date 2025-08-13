let quotes = [];

// Load quotes from local storage
function loadQuotes() {
    const storedQuotes = localStorage.getItem("quotes");
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    } else {
        // Default quotes if no data in storage
        quotes = [
            "The best way to predict the future is to invent it.",
            "Life is 10% what happens to us and 90% how we react to it.",
            "Do not watch the clock. Do what it does. Keep going."
        ];
        saveQuotes();
    }
}

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Display a random quote
function displayRandomQuote() {
    if (quotes.length === 0) {
        document.getElementById("quoteDisplay").textContent = "No quotes available!";
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    document.getElementById("quoteDisplay").textContent = randomQuote;

    // Save last viewed quote in session storage
    sessionStorage.setItem("lastQuote", randomQuote);
}

// Add a new quote
function addQuote() {
    const newQuote = document.getElementById("newQuoteInput").value.trim();
    if (newQuote) {
        quotes.push(newQuote);
        saveQuotes();
        document.getElementById("newQuoteInput").value = "";
        alert("Quote added successfully!");
    } else {
        alert("Please enter a quote.");
    }
}

// Export quotes as JSON file
function exportQuotes() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(e) {
        try {
            const importedQuotes = JSON.parse(e.target.result);
            if (Array.isArray(importedQuotes)) {
                quotes.push(...importedQuotes);
                saveQuotes();
                alert("Quotes imported successfully!");
            } else {
                alert("Invalid JSON format.");
            }
        } catch {
            alert("Error reading JSON file.");
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// Event listeners
document.getElementById("newQuoteBtn").addEventListener("click", displayRandomQuote);
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
document.getElementById("exportBtn").addEventListener("click", exportQuotes);
document.getElementById("importFile").addEventListener("change", importFromJsonFile);

// Load initial data
loadQuotes();

// Show last quote if available
const lastQuote = sessionStorage.getItem("lastQuote");
if (lastQuote) {
    document.getElementById("quoteDisplay").textContent = lastQuote;
}
