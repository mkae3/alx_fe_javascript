// مصفوفة الاقتباسات الابتدائية
const quotes = [
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "The only way to do great work is to love what you do.", category: "Motivation" },
  { text: "Success is not final, failure is not fatal.", category: "Inspiration" }
];

// دالة تعرض اقتباس عشوائي بدون استخدام innerHTML
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteDisplay = document.getElementById('quoteDisplay');
  const quote = quotes[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;
}

// دالة لإضافة اقتباس جديد للمصفوفة وعرضه
function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (newText === "" || newCategory === "") {
    alert("Please fill in both the quote and the category.");
    return;
  }

  quotes.push({ text: newText, category: newCategory });

  // تحديث العرض لآخر اقتباس مضاف
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.textContent = `"${newText}" — ${newCategory}`;

  // تنظيف حقول الإدخال
  textInput.value = "";
  categoryInput.value = "";
}

// حدث زر عرض اقتباس جديد
document.getElementById('newQuote').addEventListener('click', displayRandomQuote);

// حدث زر إضافة اقتباس جديد
document.getElementById('addQuoteBtn').addEventListener('click', addQuote);

// عرض اقتباس أولي عند تحميل الصفحة
window.onload = displayRandomQuote;
