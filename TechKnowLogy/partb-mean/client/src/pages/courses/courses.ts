
type Course = {
  _id: string;
  title: string;
  category: string;
  level: string;
  description: string;
  duration: string;
  available: boolean;
};
// Συνάρτηση για την απόδοση της σελίδας μαθημάτων
export async function renderCourses(container: HTMLElement) {
  container.innerHTML = `
  <main>

    <section class="courses-banner"></section>

  <section class="page-title">
    <h1>Όλα τα Μαθήματα</h1>
    <p>Εξερευνήστε τις κατηγορίες μαθημάτων Πληροφορικής</p>
  </section>


    <section class="filters">
      <input type="text" id="searchInput" placeholder="Αναζήτηση μαθήματος...">

      <select id="categoryFilter">
        <option value="">Όλες οι κατηγορίες</option>
        <option value="Προγραμματισμός">Προγραμματισμός</option>
        <option value="Δίκτυα">Δίκτυα</option>
        <option value="Ασφάλεια">Ασφάλεια</option>
        <option value="Βάσεις Δεδομένων">Βάσεις Δεδομένων</option>
      </select>

      <select id="levelFilter">
        <option value="">Όλα τα επίπεδα</option>
        <option value="Αρχάριος">Αρχάριος</option>
        <option value="Μεσαίο">Μεσαίο</option>
        <option value="Προχωρημένο">Προχωρημένο</option>
      </select>

      <label>
        <input type="checkbox" id="availableOnly">
        Μόνο διαθέσιμα
      </label>
    </section>

    <section id="coursesContainer" class="course-list"></section>

  </main>
`;
//fetch courses from server
const res = await fetch('http://localhost:3000/api/courses'); 
  const courses: Course[] = await res.json();

  const containerEl = document.getElementById('coursesContainer')!;
  const searchInput = document.getElementById('searchInput') as HTMLInputElement;
  const categoryFilter = document.getElementById('categoryFilter') as HTMLSelectElement;
  const levelFilter = document.getElementById('levelFilter') as HTMLSelectElement;
  const availableOnly = document.getElementById('availableOnly') as HTMLInputElement;
// Συνάρτηση για την απόδοση της λίστας μαθημάτων
  function renderList(list: Course[]) {
    containerEl.innerHTML = '';

    if (list.length === 0) {
      containerEl.innerHTML = `<p>Δεν βρέθηκαν μαθήματα.</p>`;
      return;
    }
// Δημιουργία καρτών μαθημάτων
    list.forEach(course => {
      containerEl.insertAdjacentHTML('beforeend', `
        <div class="course-card">
          <h3>${course.title}</h3>
          <p><strong>Κατηγορία:</strong> ${course.category}</p>
          <p><strong>Επίπεδο:</strong> ${course.level}</p>
          <p>${course.description}</p>
          <p><strong>Διάρκεια:</strong> ${course.duration}</p>
          <p class="${course.available ? 'available' : 'unavailable'}">
            ${course.available ? 'Διαθέσιμο' : 'Μη διαθέσιμο'}
          </p>
        </div>
      `);
    });
  }
// Συνάρτηση για την εφαρμογή των φίλτρων
  function applyFilters() {
    let filtered = [...courses];

    if (searchInput.value) {//` Αναζήτηση με βάση τον τίτλο
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(searchInput.value.toLowerCase())
      );
    }

    if (categoryFilter.value) {// Φιλτράρισμα με βάση την κατηγορία
      filtered = filtered.filter(c => c.category === categoryFilter.value);
    }

    if (levelFilter.value) {// Φιλτράρισμα με βάση το επίπεδο
      filtered = filtered.filter(c => c.level === levelFilter.value);
    }

    if (availableOnly.checked) {// Φιλτράρισμα για διαθέσιμα μαθήματα
      filtered = filtered.filter(c => c.available);
    }

    renderList(filtered);
  }

  searchInput.addEventListener('input', applyFilters);// Ενημέρωση κατά την πληκτρολόγηση
  categoryFilter.addEventListener('change', applyFilters);// Ενημέρωση κατά την αλλαγή κατηγορίας
  levelFilter.addEventListener('change', applyFilters);// Ενημέρωση κατά την αλλαγή επιπέδου
  availableOnly.addEventListener('change', applyFilters);// Ενημέρωση κατά την αλλαγή διαθέσιμων

  renderList(courses);
}

