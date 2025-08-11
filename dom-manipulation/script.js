// Quotes array with text and category properties
let quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Don't let yesterday take up too much of today.", category: "Inspiration" },
    { text: "It's not whether you get knocked down, it's whether you get up.", category: "Perseverance" }
];

// Function to display a random quote
function displayRandomQuote() {
    let randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById("quoteText").innerText = quotes[randomIndex].text;
    document.getElementById("quoteCategory").innerText = `Category: ${quotes[randomIndex].category}`;
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

    displayRandomQuote();
}

// Event listeners
document.getElementById("newQuoteBtn").addEventListener("click", displayRandomQuote);
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);

// Display first quote on page load
displayRandomQuote();
// مصفوفة الاقتباسات مع النص والتصنيف
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Don't let yesterday take up too much of today.", category: "Inspiration" },
  { text: "It's not whether you get knocked down, it's whether you get up.", category: "Perseverance" }
];

// دالة عرض اقتباس عشوائي
function displayRandomQuote() {
  let randomIndex = Math.floor(Math.random() * quotes.length);
  document.getElementById("quoteText").innerText = quotes[randomIndex].text;
  document.getElementById("quoteCategory").innerText = `Category: ${quotes[randomIndex].category}`;
}

// دالة إضافة اقتباس جديد
function addQuote() {
  let quoteText = document.getElementById("quoteInput").value.trim();
  let quoteCategory = document.getElementById("categoryInput").value.trim();

  if (quoteText === "" || quoteCategory === "") {
    alert("Please fill in both the quote and the category");
    return;
  }

  quotes.push({ text: quoteText, category: quoteCategory });

  // مسح الحقول بعد الإضافة
  document.getElementById("quoteInput").value = "";
  document.getElementById("categoryInput").value = "";

  // عرض اقتباس جديد عشوائي بعد الإضافة
  displayRandomQuote();
}

// إعداد الاستماع للأزرار
document.getElementById("newQuoteBtn").addEventListener("click", displayRandomQuote);
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);

// عرض أول اقتباس عند تحميل الصفحة
displayRandomQuote();
