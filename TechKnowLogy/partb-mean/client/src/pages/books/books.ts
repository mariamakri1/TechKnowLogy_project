
type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  pages: number;
  available: boolean;
};

type Video = {
  _id: string;
  title: string;
  category: string;
  src: string;
  available: boolean;
};
// φόρτωμα της σελίδας βιβλία
export async function renderBooks(container: HTMLElement) {
  container.innerHTML = `
   <main>
        <section class="page-title">
            <h2>Βιβλία & Πόροι</h2>
            <p>Βρείτε εγχειρίδια, οδηγούς και βιβλία που συνοδεύουν τα μαθήματά μας.</p>
        </section>



        <section class="filters">
            <h3>Φίλτρα</h3>
            <input type="text" id="searchBooks" placeholder="Αναζήτηση βιβλίου...">

            <select id="categoryBooks">
                <option value="">Όλες οι κατηγορίες</option>
                <option value="Προγραμματισμός">Προγραμματισμός</option>
                <option value="Δίκτυα">Δίκτυα</option>
                <option value="Ασφάλεια">Ασφάλεια</option>
                <option value="Βάσεις Δεδομένων">Βάσεις Δεδομένων</option>
            </select>

            <label>
                <input type="checkbox" id="availableBooks">
                Μόνο διαθέσιμα
            </label>
        </section>

            <section id="booksContainer" class="book-list"></section>

  
   
        
            
        <section class="filters"> 
            <h3>Λίστα Video</h3>
            <select id="categoryVideos">
                <option value="">Ολες οι κατηγορίες</option>
                <option value="Προγραμματισμός">Προγραμματισμός</option>
                <option value="Δίκτυα">Δίκτυα</option>
                <option value="Ασφάλεια">Ασφάλεια</option>
                <option value="Βάσεις Δεδομένων">Βάσεις Δεδομένων</option>
            </select>
        </section>

        <section  id="videosContainer" class="video-list"></section>





        </main>

  `;

  /* ---------- BOOKS ---------- */
  //fetch books from server
  const booksRes = await fetch('http://localhost:3000/api/books');
  const books: Book[] = await booksRes.json();
// στοιχεία φίλτρων
  const booksContainer = document.getElementById('booksContainer')!;
  const searchInput = document.getElementById('searchBooks') as HTMLInputElement;
  const categorySelect = document.getElementById('categoryBooks') as HTMLSelectElement;
  const availableCheckbox = document.getElementById('availableBooks') as HTMLInputElement;

  function renderBooksList(list: Book[]) {// εμφάνιση λίστας βιβλίων
    booksContainer.innerHTML = list.map(b => `
      <div class="book-card">
        <h4>${b.title}</h4>
        <p><strong>Συγγραφέας:</strong> ${b.author}</p>
        <p>${b.category} • ${b.pages} σελ.</p>
        <p class="${b.available ? 'available' : 'unavailable'}">
          ${b.available ? 'Διαθέσιμο' : 'Μη διαθέσιμο'}
        </p>
      </div>
    `).join('');
  }

  function filterBooks() {
    const filtered = books.filter(b =>// φιλτράρισμα
      b.title.toLowerCase().includes(searchInput.value.toLowerCase()) &&
      (categorySelect.value === '' || b.category === categorySelect.value) &&
      (!availableCheckbox.checked || b.available)
    );
    renderBooksList(filtered);
  }

  searchInput.addEventListener('input', filterBooks);
  categorySelect.addEventListener('change', filterBooks);
  availableCheckbox.addEventListener('change', filterBooks);

  renderBooksList(books);

  /* ---------- VIDEOS ---------- */
  const videosRes = await fetch('http://localhost:3000/api/videos');
  const videos: Video[] = await videosRes.json();

  const videosContainer = document.getElementById('videosContainer')!;// στοιχεία φίλτρων
  videosContainer.innerHTML = videos.map(v => `
    <div class="video-card">
      <h4>${v.title}</h4>
      <iframe src="${v.src}" frameborder="0" allowfullscreen></iframe>
    </div>
  `).join('');
}
