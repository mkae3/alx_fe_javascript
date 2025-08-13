let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];

const quoteDisplay = document.getElementById("quoteDisplay");
const categorySelect = document.getElementById("categorySelect");

// Display a random quote
function displayRandomQuote() {
  if (quotes.length === 0) return;
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.textContent = `"${randomQuote.text}" — ${randomQuote.category}`;
  sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote));
}

// Add a new quote
function addQuote() {
  const text = document.getElementById("quoteText").value.trim();
  const category = document.getElementById("quoteCategory").value.trim();
  if (!text || !category) {
    alert("Please enter both quote and category.");
    return;
  }
  quotes.push({ text, category });
  saveQuotes();
  populateCategories();
  displayRandomQuote();
  document.getElementById("quoteText").value = "";
  document.getElementById("quoteCategory").value = "";
}

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Populate dropdown categories
function populateCategories() {
  const uniqueCategories = [...new Set(quotes.map(q => q.category))];
  categorySelect.innerHTML = `<option value="">All</option>`;
  uniqueCategories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });

  // Restore last selected category
  const lastCategory = localStorage.getItem("selectedCategory");
  if (lastCategory) {
    categorySelect.value = lastCategory;
    filterQuote();
  }
}

// Filter quotes by category
function filterQuote() {
  const selectedCategory = categorySelect.value;
  localStorage.setItem("selectedCategory", selectedCategory);
  let filteredQuotes = quotes;
  if (selectedCategory) {
    filteredQuotes = quotes.filter(q => q.category === selectedCategory);
  }
  if (filteredQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];
    quoteDisplay.textContent = `"${randomQuote.text}" — ${randomQuote.category}`;
  } else {
    quoteDisplay.textContent = "No quotes found for this category.";
  }
}

// Fetch quotes from mock API
async function fetchQuotesFromServer() {
  const response = await fetch("https://mocki.io/v1/35b33d62-4e5d-4c34-bf89-31c3a05974f5"); // Example mock API
  const serverQuotes = await response.json();
  return serverQuotes;
}

// Post a quote to mock API (demo)
async function postQuoteToServer(quote) {
  await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(quote),
    headers: { "Content-Type": "application/json" }
  });
}

// Sync quotes with server
async function syncQuotes() {
  try {
    const serverQuotes = await fetchQuotesFromServer();
    let updated = false;

    serverQuotes.forEach(serverQuote => {
      if (!quotes.some(localQuote => localQuote.text === serverQuote.text)) {
        quotes.push(serverQuote);
        updated = true;
      }
    });

    if (updated) {
      saveQuotes();
      populateCategories();
      alert("Quotes synced with server!");
    }
  } catch (err) {
    console.error("Error syncing quotes:", err);
  }
}

// Export quotes to JSON
document.getElementById("exportBtn").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
});

// Import quotes from JSON file
document.getElementById("importFile").addEventListener("change", (event) => {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      populateCategories();
      alert("Quotes imported successfully!");
    } catch (err) {
      alert("Invalid JSON file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
});

// Event listeners
document.getElementById("newQuoteBtn").addEventListener("click", displayRandomQuote);
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
categorySelect.addEventListener("change", filterQuote);

// Initialize
populateCategories();
if (sessionStorage.getItem("lastViewedQuote")) {
  const lastQuote = JSON.parse(sessionStorage.getItem("lastViewedQuote"));
  quoteDisplay.textContent = `"${lastQuote.text}" — ${lastQuote.category}`;
} else {
  displayRandomQuote();
}

// Periodic sync every 60 seconds
setInterval(syncQuotes, 60000);
