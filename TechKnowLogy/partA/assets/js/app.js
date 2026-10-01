// AICANARY: CSD-ELearn-2025

document.addEventListener('DOMContentLoaded', () => {

  // Courses στην αρχική 
  const courseList = document.getElementById('course-list');
  if (courseList) {
    const featuredCourses = courses
      .filter(c => c.available)       // μόνο διαθέσιμα
      .sort(() => 0.5 - Math.random()) // τυχαία σειρά
      .slice(0, 4);                   // πρώτα 4

    featuredCourses.forEach(course => {
      const card = document.createElement('div');
      card.classList.add('course-card');
      card.innerHTML = `
        <h3>${course.title}</h3>
        <button class="open-modal" data-course-id="${course.id}">Δείτε περισσότερα</button>
      `;
      courseList.appendChild(card);
    });
  }

  // Βιβλία στη σελίδα books 
  const booksContainer = document.getElementById('books-container');
  if (booksContainer) {
    books.forEach(book => {
      const div = document.createElement('div');
      div.classList.add('book-card');
      div.innerHTML = `
        <h4>${book.title}</h4>
        <p>Συγγραφέας: ${book.author}</p>
        <p>Κατηγορία: ${book.category}</p>
        <p>Σελίδες: ${book.pages}</p>
        <p>Διαθέσιμο: ${book.available ? 'Ναι' : 'Όχι'}</p>
      `;
      booksContainer.appendChild(div);
    });
  }

  // Modal setup 
  const modal = document.getElementById('modal');
  const modalContent = modal?.querySelector('.modal-content');

  function closeModal() {
    if (modal) modal.style.display = 'none';
  }

  modalContent?.querySelector('.close')?.addEventListener('click', closeModal);
  window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  //  Άνοιγμα modal για courses 
  if (courseList) {
    courseList.addEventListener('click', (e) => {
      if (e.target.classList.contains('open-modal')) {
        const courseId = Number(e.target.dataset.courseId);
        const course = courses.find(c => c.id === courseId);
        if (!course) return;

        const courseBooks = books.filter(b => b.courseId === courseId);
        const courseVideos = videos.filter(v => v.courseId === courseId);

        modalContent.innerHTML = `
          <span class="close">&times;</span>
          <h2>${course.title}</h2>
          <p>${course.description}</p>
          <h3>Βιβλία</h3>
          <ul>
            ${courseBooks.map(b => `<li>${b.title} - ${b.author}</li>`).join('')}
          </ul>
          <h3>Βίντεο</h3>
          <ul>
            ${courseVideos.map(v => `<li>${v.title}</li>`).join('')}
          </ul>
        `;

        
        modalContent.querySelector('.close').addEventListener('click', closeModal);
        modal.style.display = 'block';
      }
    });
  }

});
