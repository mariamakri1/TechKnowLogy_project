export function renderRegister(container: HTMLElement) {
  container.innerHTML = `
    <main class="form-page">
      <section class="form-container">
        <form id="registerForm" class="form-card">

          <h2>Εγγραφή Χρήστη</h2>

          <!-- A. Βασικά στοιχεία -->
          <label>Ονοματεπώνυμο</label>
          <input type="text" id="name" required>

          <label>Email</label>
          <input type="email" id="email" required>

          <label>Ημερομηνία Γέννησης</label>
          <input type="date" id="birthdate" required>

          <h3>Φύλο</h3>
          <div class="form-row">
            <label><input type="radio" name="gender" value="Άνδρας" required> Άνδρας</label>
            <label><input type="radio" name="gender" value="Γυναίκα"> Γυναίκα</label>
            <label><input type="radio" name="gender" value="Άλλο"> Άλλο</label>
          </div>

          <!-- B. Στοιχεία λογαριασμού -->
          <label>Όνομα Χρήστη</label>
          <input type="text" id="username" required minlength="4">

          <label>Κωδικός</label>
          <input type="password" id="password"
            required
            pattern="^(?=.*[A-Z])(?=.*[0-9]).{8,}$">

          <label>Επιβεβαίωση Κωδικού</label>
          <input type="password" id="confirmPassword" required>

          <!-- C. Ενδιαφέροντα -->
          <h3>Ενδιαφέροντα</h3>
          <div class="checkbox-list">
            <label><input type="checkbox" value="Προγραμματισμός"> Προγραμματισμός</label>
            <label><input type="checkbox" value="Δίκτυα"> Δίκτυα</label>
            <label><input type="checkbox" value="Ασφάλεια"> Ασφάλεια</label>
            <label><input type="checkbox" value="Βάσεις Δεδομένων"> Βάσεις Δεδομένων</label>
          </div>

          <!-- D. Εμπειρία -->
          <h3>Εμπειρία</h3>
          <select id="experience" required>
            <option value="">--Επίλεξε--</option>
            <option value="Αρχάριος">Αρχάριος</option>
            <option value="Μεσαίος">Μεσαίος</option>
            <option value="Προχωρημένος">Προχωρημένος</option>
          </select>

          <label>Στόχος Μάθησης</label>
          <select id="goal" required>
            <option value="">--Επίλεξε--</option>
            <option value="Εύρεση Εργασίας">Εύρεση Εργασίας</option>
            <option value="Βελτίωση Δεξιοτήτων">Βελτίωση δεξιοτήτων</option>
            <option value="Hobby">Hobby</option>
          </select>

          <button type="submit" class="banner-btn">Υποβολή</button>
          <p id="registerMessage"></p>

        </form>
      </section>
    </main>
  `;
// Λειτουργικότητα φόρμας εγγραφής
  const form = document.getElementById('registerForm') as HTMLFormElement;
  const message = document.getElementById('registerMessage') as HTMLParagraphElement;

  form.addEventListener('submit', async (e) => {// χειρισμός υποβολής φόρμας
    e.preventDefault();
// λήψη και έλεγχος τιμών πεδίων
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const confirm = (document.getElementById('confirmPassword') as HTMLInputElement).value;

    if (password !== confirm) {// έλεγχος ταύτισης κωδικών
      message.textContent = 'Οι κωδικοί δεν ταιριάζουν';
      message.style.color = 'red';
      return;
    }

    const interests = Array.from(// λήψη επιλεγμένων ενδιαφερόντων
      form.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:checked')
    ).map(i => i.value);

    const userData = {
      name: (document.getElementById('name') as HTMLInputElement).value,
      email: (document.getElementById('email') as HTMLInputElement).value,
      username: (document.getElementById('username') as HTMLInputElement).value,
      password,
      birthdate: (document.getElementById('birthdate') as HTMLInputElement).value,
      gender: (form.querySelector('input[name="gender"]:checked') as HTMLInputElement)?.value,
      experience: (document.getElementById('experience') as HTMLSelectElement).value,
      goal: (document.getElementById('goal') as HTMLSelectElement).value,
      interests
    };

    try {// Αποστολή αιτήματος εγγραφής στον server
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      const data = await res.json();

      if (!res.ok) {// διαχείριση σφαλμάτων
        message.textContent = data.message || 'Σφάλμα εγγραφής';
        message.style.color = 'red';
        return;
      }

      message.textContent = 'Επιτυχής εγγραφή!';
      message.style.color = 'green';

    } catch {
      message.textContent = 'Σφάλμα επικοινωνίας με server';
      message.style.color = 'red';
    }
  });
}
