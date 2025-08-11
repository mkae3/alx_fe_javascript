// مصفوفة الاقتباسات مع نص وتصنيف لكل اقتباس
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Don't let yesterday take up too much of today.", category: "Inspiration" },
  { text: "It's not whether you get knocked down, it's whether you get up.", category: "Perseverance" }
];

// دالة تعرض اقتباس عشوائي داخل العنصر #quoteDisplay
function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // مسح المحتوى الحالي
  quoteDisplay.innerHTML = "";

  // إنشاء عناصر جديدة وعرض الاقتباس
  const pText = document.createElement("p");
  pText.innerText = quote.text;
  const pCategory = document.createElement("p");
  pCategory.innerText = `Category: ${quote.category}`;

  quoteDisplay.appendChild(pText);
  quoteDisplay.appendChild(pCategory);
}

// دالة تنشئ فورم الإضافة الديناميكي
function createAddQuoteForm() {
  const container = document.getElementById("addQuoteFormContainer");

  const form = document.createElement("div");

  const inputQuote = document.createElement("input");
  inputQuote.type = "text";
  inputQuote.id = "newQuoteText";
  inputQuote.placeholder = "Enter a new quote";

  const inputCategory = document.createElement("input");
  inputCategory.type = "text";
  inputCategory.id = "newQuoteCategory";
  inputCategory.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.innerText = "Add Quote";
  addButton.addEventListener("click", addQuote);

  form.appendChild(inputQuote);
  form.appendChild(inputCategory);
  form.appendChild(addButton);

  container.appendChild(form);
}

// دالة لإضافة اقتباس جديد إلى المصفوفة وعرضه
function addQuote() {
  const quoteText = document.getElementById("newQuoteText").value.trim();
  const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (quoteText === "" || quoteCategory === "") {
    alert("Please fill in both the quote and the category");
    return;
  }

  quotes.push({ text: quoteText, category: quoteCategory });

  // مسح الحقول
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  showRandomQuote();
}

// إضافة مستمع للزر لعرض اقتباس جديد
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// إنشاء فورم الإضافة عند تحميل الصفحة
createAddQuoteForm();

// عرض اقتباس أولي عند تحميل الصفحة
showRandomQuote();
