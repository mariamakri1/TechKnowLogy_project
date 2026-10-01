const searchBooks = document.getElementById("searchBooks");
const categoryBooks = document.getElementById("categoryBooks");
const availableBooks = document.getElementById("availableBooks");
const booksContainer = document.getElementById("booksContainer");


// Render βιβλίων

function renderBooks(list) {
  booksContainer.innerHTML = "";

  if (list.length === 0) {
    booksContainer.innerHTML = "<p>Δεν βρέθηκαν βιβλία.</p>";
    return;
  }

  list.forEach(book => {
    const card = document.createElement("article");
    card.classList.add("book-card");

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Συγγραφέας:</strong> ${book.author}</p>
      <p><strong>Κατηγορία:</strong> ${book.category}</p>
      <p><strong>Σελίδες:</strong> ${book.pages}</p>
      <p class="${book.available ? "available" : "unavailable"}">
        ${book.available ? "Διαθέσιμο" : "Μη διαθέσιμο"}
      </p>
    `;

    booksContainer.appendChild(card);
  });
}


// Φιλτράρισμα βιβλίων

function applyBookFilters() {
  let filtered = books;

  const text = searchBooks.value.toLowerCase();
  const category = categoryBooks.value;
  const onlyAvailable = availableBooks.checked;

  filtered = filtered.filter(b =>
    b.title.toLowerCase().includes(text) ||
    b.author.toLowerCase().includes(text)
  );

  if (category) {
    filtered = filtered.filter(b => b.category === category);
  }

  if (onlyAvailable) {
    filtered = filtered.filter(b => b.available);
  }

  renderBooks(filtered);
}

// Events listeners
searchBooks.addEventListener("input", applyBookFilters); 
categoryBooks.addEventListener("change", applyBookFilters); 
availableBooks.addEventListener("change", applyBookFilters);

// Αρχική εμφάνιση
renderBooks(books);
