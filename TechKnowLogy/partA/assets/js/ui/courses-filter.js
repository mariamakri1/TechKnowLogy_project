// Φόρτωση στοιχείων
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const levelFilter = document.getElementById("levelFilter");
const availableOnly = document.getElementById("availableOnly");
const coursesContainer = document.getElementById("coursesContainer");


//Render μαθημάτων

function renderCourses(list) {
  coursesContainer.innerHTML = "";

  if (list.length === 0) {
    coursesContainer.innerHTML = "<p>Δεν βρέθηκαν μαθήματα.</p>";
    return;
  }

  list.forEach(course => {
    const card = document.createElement("article");
    card.classList.add("course-card");

    card.innerHTML = `
      <h3>${course.title}</h3>
      <p><strong>Κατηγορία:</strong> ${course.category}</p>
      <p><strong>Επίπεδο:</strong> ${course.level}</p>
      <p>${course.description}</p>
      <p><strong>Διάρκεια:</strong> ${course.duration}</p>
      <p class="${course.available ? "available" : "unavailable"}">
        ${course.available ? "Διαθέσιμο" : "Μη διαθέσιμο"}
      </p>
    `;

    coursesContainer.appendChild(card);
  });
}


//Συνάρτηση φιλτραρίσματος

function applyFilters() {
  let filtered = courses;

  const text = searchInput.value.toLowerCase();
  const category = categoryFilter.value;
  const level = levelFilter.value;
  const onlyAvailable = availableOnly.checked;

  filtered = filtered.filter(c => 
    c.title.toLowerCase().includes(text) ||
    c.description.toLowerCase().includes(text)
  );

  if (category) {
    filtered = filtered.filter(c => c.category === category);
  }

  if (level) {
    filtered = filtered.filter(c => c.level === level);
  }

  if (onlyAvailable) {
    filtered = filtered.filter(c => c.available);
  }

  renderCourses(filtered);
}


// Events

searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
levelFilter.addEventListener("change", applyFilters);
availableOnly.addEventListener("change", applyFilters);

// Αρχική εμφάνιση
renderCourses(courses);
