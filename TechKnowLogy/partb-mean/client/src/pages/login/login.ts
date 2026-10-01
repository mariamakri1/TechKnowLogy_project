export function renderLogin(container: HTMLElement) {
  container.innerHTML = `
    <main class="form-page">
      <section class="form-container">
        <form id="loginForm" class="form-card">

          <label>Όνομα Χρήστη</label>
          <input type="text" id="loginUsername" required>

          <label>Κωδικός</label>
          <input type="password" id="loginPassword" required>

          <button type="submit" class="banner-btn">Σύνδεση</button>
          <p id="loginMessage"></p>

        </form>
      </section>
    </main>
  `;
// Λειτουργικότητα φόρμας σύνδεσης
  const form = document.getElementById('loginForm') as HTMLFormElement;
  const message = document.getElementById('loginMessage') as HTMLParagraphElement;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
// Λήψη τιμών από τα πεδία της φόρμας
    const username = (document.getElementById('loginUsername') as HTMLInputElement).value;
    const password = (document.getElementById('loginPassword') as HTMLInputElement).value;

    try {// Αποστολή αιτήματος σύνδεσης στον server
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',// αποστολή δεδομένων με μέθοδο POST
        headers: { 'Content-Type': 'application/json' },// καθορισμός τύπου περιεχομένου
        body: JSON.stringify({ username, password })// μετατροπή δεδομένων σε JSON
      });

      const data = await res.json();// λήψη απάντησης από τον server

      if (!res.ok) {// διαχείριση σφαλμάτων
        message.textContent = data.message || 'Λάθος στοιχεία';
        message.style.color = 'red';
        return;
      }

      
      message.textContent = ' Επιτυχής σύνδεση!';
      message.style.color = 'green';

      

    } catch {
      message.textContent = 'Σφάλμα επικοινωνίας με server';
      message.style.color = 'red';
    }
  });
}
