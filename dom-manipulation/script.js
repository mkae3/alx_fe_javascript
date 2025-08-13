// -------------------
// Initial Quotes Array
// -------------------
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Don't let yesterday take up too much of today.", category: "Inspiration" },
  { text: "It's not whether you get knocked down, it's whether you get up.", category: "Perseverance" }
];

// -------------------
// Load quotes from localStorage if available
// -------------------
if (localStorage.getItem("quotes")) {
  quotes = JSON.parse(localStorage.getItem("quotes"));
}

// -------------------
// Display a random quote
// -------------------
function displayRandomQuote() {
  if (quotes.length === 0) {
    document.getElementById("quoteText").innerText = "No quotes available.";
    document.getElementById("quoteCategory").innerText = "";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  document.getElementById("quoteText").innerText = randomQuote.text;
  document.getElementById("quoteCategory").innerText = `Category: ${randomQuote.category}`;

  // Save last viewed quote index in sessionStorage (optional)
  sessionStorage.setItem("lastQuoteIndex", randomIndex);
}

// -------------------
// Add a new quote
// -------------------
function addQuote() {
  const text = document.getElementById("quoteInput").value.trim();
  const category = document.getElementById("categoryInput").value.trim();

  if (!text || !category) {
    alert("Please fill in both the quote and the category");
    return;
  }

  const newQuote = { text, category };
  quotes.push(newQuote);
  saveQuotes();
  populateCategories();
  filterQuotes();

  document.getElementById("quoteInput").value = "";
  document.getElementById("categoryInput").value = "";

  displayRandomQuote();
}

// -------------------
// Save quotes to localStorage
// -------------------
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// -------------------
// Populate categories dropdown
// -------------------
function populateCategories() {
  const select = document.getElementById("categoryFilter");
  const categories = ["all", ...new Set(quotes.map(q => q.category))];

  select.innerHTML = ""; // clear existing options
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.text = cat;
    select.appendChild(option);
  });

  // Restore last selected category from localStorage
  const savedCategory = localStorage.getItem("selectedCategory") || "all";
  select.value = savedCategory;
}

// -------------------
// Filter quotes by category
// -------------------
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selectedCategory);

  let filteredQuotes = quotes;
  if (selectedCategory !== "all") {
    filteredQuotes = quotes.filter(q => q.category === selectedCategory);
  }

  if (filteredQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    document.getElementById("quoteText").innerText = filteredQuotes[randomIndex].text;
    document.getElementById("quoteCategory").innerText = `Category: ${filteredQuotes[randomIndex].category}`;
  } else {
    document.getElementById("quoteText").innerText = "No quotes in this category.";
    document.getElementById("quoteCategory").innerText = "";
  }
}

// -------------------
// Export quotes to JSON
// -------------------
document.getElementById("exportBtn").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
});

// -------------------
// Import quotes from JSON
// -------------------
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        filterQuotes();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid JSON format.");
      }
    } catch (err) {
      alert("Error parsing JSON file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// -------------------
// Event listeners
// -------------------
document.getElementById("newQuoteBtn").addEventListener("click", displayRandomQuote);
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);

// -------------------
// Initialize on page load
// -------------------
populateCategories();
filterQuotes();
