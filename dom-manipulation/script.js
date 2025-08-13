// Quotes array with text and category properties
let quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Don't let yesterday take up too much of today.", category: "Inspiration" },
    { text: "It's not whether you get knocked down, it's whether you get up.", category: "Perseverance" }
];

// Function to display a random quote
function displayRandomQuote(filteredCategory = null) {
    let availableQuotes = filteredCategory 
        ? quotes.filter(q => q.category === filteredCategory)
        : quotes;

    if (availableQuotes.length === 0) {
        document.getElementById("quoteText").innerText = "No quotes available for this category.";
        document.getElementById("quoteCategory").innerText = "";
        return;
    }

    let randomIndex = Math.floor(Math.random() * availableQuotes.length);
    document.getElementById("quoteText").innerText = availableQuotes[randomIndex].text;
    document.getElementById("quoteCategory").innerText = `Category: ${availableQuotes[randomIndex].category}`;
}

// Function to add a new quote
function addQuote() {
    let quoteText = document.getElementById("quoteInput").value.trim();
    let quoteCategory = document.getElementById("categoryInput").value.trim();

    if (quoteText === "" || quoteCategory === "") {
        alert("Please fill in both the quote and the category");
        return;
    }

    quotes.push({ text: quoteText, category: quoteCategory });

    document.getElementById("quoteInput").value = "";
    document.getElementById("categoryInput").value = "";

    populateCategories(); // Update categories dropdown
    displayRandomQuote();
}

// Function to populate category dropdown with unique categories
function populateCategories() {
    let categorySelect = document.getElementById("categorySelect");
    categorySelect.innerHTML = "<option value=''>All Categories</option>";

    let uniqueCategories = [...new Set(quotes.map(q => q.category))];

    uniqueCategories.forEach(cat => {
        let option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        categorySelect.appendChild(option);
    });

    // Restore last selected category from localStorage
    let savedCategory = localStorage.getItem("selectedCategory");
    if (savedCategory) {
        categorySelect.value = savedCategory;
    }
}

// Function to filter quotes by category
function filterQuote() {
    let selectedCategory = document.getElementById("categorySelect").value;
    localStorage.setItem("selectedCategory", selectedCategory);
    displayRandomQuote(selectedCategory || null);
}

// Event listeners
document.getElementById("newQuoteBtn").addEventListener("click", () => {
    let selectedCategory = document.getElementById("categorySelect").value;
    displayRandomQuote(selectedCategory || null);
});

document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
document.getElementById("categorySelect").addEventListener("change", filterQuote);

// On page load
window.addEventListener("DOMContentLoaded", () => {
    populateCategories();
    let savedCategory = localStorage.getItem("selectedCategory");
    displayRandomQuote(savedCategory || null);
});
