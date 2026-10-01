import { renderCourses } from '../courses/courses';


export async function renderHome(container: HTMLElement) {
  container.innerHTML = `
    <main>
           
            <section class="intro hero">
                <div class="hero-content">
                    <h2>Μάθετε, Εξελιχθείτε, Επιτύχετε - Η TechKnowLogy είναι εδώ για εσάς!</h2>
                    <p>Η πλατφόρμα μας προσφέρει σύγχρονα μαθήματα πληροφορικής σε διάφορες κατηγορίες. 
                    Επιλέξτε το μάθημα που σας ταιριάζει και ξεκινήστε σήμερα.</p>
                    <a href="courses.html" class="hero-cta">Δείτε τα Μαθήματα</a>
                </div>

                <div class="hero-image">
                    <img src="assets/images/feature-mockup.png" alt="Tech Learning">
                </div>
            </section>
            
            <section class="categories">
                <h2>Κατηγορίες Μαθημάτων</h2>
                <div class="category-cards">
                    <article class="category-card programming">
                        <div class="icon">
                            <!-- Προγραμματισμός -->
                            <svg viewBox="0 0 24 24">
                                <path d="M8 17l-5-5 5-5M16 7l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2"/>
                            </svg>
                        </div>
                        <h3>Προγραμματισμός</h3>
                    </article>

                 
                        <article class="category-card networks">

                        <div class="icon">
                            <!-- Δίκτυα -->
                            <svg viewBox="0 0 24 24">
                                <circle cx="12" cy="7" r="3" stroke="currentColor" stroke-width="2" fill="none" />
                                <circle cx="5" cy="17" r="3" stroke="currentColor" stroke-width="2" fill="none" />
                                <circle cx="19" cy="17" r="3" stroke="currentColor" stroke-width="2" fill="none" />
                                <line x1="10" y1="9" x2="6.5" y2="14" stroke="currentColor" stroke-width="2"/>
                                <line x1="14" y1="9" x2="17.5" y2="14" stroke="currentColor" stroke-width="2"/>
                            </svg>
                        </div>
                        <h3>Δίκτυα</h3>
                    </article>

                     <article class="category-card sequrity">
                        <div class="icon">
                            <!-- Ασφάλεια -->
                            <svg viewBox="0 0 24 24">
                                <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" 
                                    fill="none" stroke="currentColor" stroke-width="2"/>
                            </svg>
                        </div>
                        <h3>Ασφάλεια</h3>
                    </article>

                    <article class="category-card database">
                        <div class="icon">
                            <!-- Βάσεις Δεδομένων -->
                            <svg viewBox="0 0 24 24">
                                <ellipse cx="12" cy="5" rx="7" ry="3" stroke="currentColor" stroke-width="2" fill="none"/>
                                <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" 
                                    fill="none" stroke="currentColor" stroke-width="2"/>
                                <path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" 
                                    fill="none" stroke="currentColor" stroke-width="2"/>
                            </svg>
                        </div>
                        <h3>Βάσεις Δεδομένων</h3>
                    </article>

                </div>
            </section>


            <section class="featured-courses">
            <h2>Προτεινόμενα Μαθήματα</h2>
                <div id="course-list" >
                
                </div>
            </section>
            
        </main>
  `;
 

const heroLink = container.querySelector('.hero-cta') as HTMLAnchorElement;// Λειτουργικότητα κουμπιού "Δείτε τα Μαθήματα"

if (heroLink) {
  heroLink.addEventListener('click', (e) => {
    e.preventDefault();        // ⛔ μην αλλάξει σελίδα
    renderCourses(container); // ✅ δείξε μαθήματα
  });
}

// φόρτωμα των προτεινόμενων μαθημάτων από τον server
  const coursesDiv = document.getElementById('course-list');
  if (!coursesDiv) return;

  try {
    const res = await fetch('http://localhost:3000/api/courses');
    if (!res.ok) {
      throw new Error('Αποτυχία φόρτωσης μαθημάτων');
    }

    const courses = await res.json();
    const randomCourses = courses
  .sort(() => Math.random() - 0.5)
  .slice(0, 4);


    if (courses.length === 0) {
      coursesDiv.innerHTML = `<p>Δεν υπάρχουν διαθέσιμα μαθήματα</p>`;
      return;
    }

 randomCourses.forEach((course: any) => {

      const div = document.createElement('div');
      div.classList.add('course-card');
      div.innerHTML = `
        <h3>${course.title}</h3>
        <p>${course.description}</p>
        <small>${course.category}</small><br />
     
        <hr />
      `;
      coursesDiv.appendChild(div);
    });
  } catch (error) {
    console.error(error);
    coursesDiv.innerHTML = `
      <p>Σφάλμα επικοινωνίας με τον server</p>
    `;
  }
}