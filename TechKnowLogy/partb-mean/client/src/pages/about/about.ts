export function renderAbout(container: HTMLElement) {
  container.innerHTML = ` <main>        
            
            <section class="team-intro">
              <h2>Από developers, για developers.</h2>
                  <p>
                      Στο TechKnowLogy, πιστεύουμε ότι η γνώση είναι δύναμη, αλλά η τεχνολογία είναι το μέλλον. 
                      Στόχος μας είναι να γεφυρώσουμε το χάσμα ανάμεσα στη θεωρία και την πράξη, προσφέροντας τα εφόδια που χρειάζεται κάθε σύγχρονος δημιουργός.
                      </p>
            </section>


            <section class="team-members">
              <div class="team-bg-overlay"></div>
              <div class="member-cards">
                <article class="member-card">
                    <h4>Μαρία Μακρή </h4>
                    <p>Frontend Developer</p>
                </article>
                <article class="member-card">
                    <h4>Ειρήνη-Αικατερίνη Σπανού</h4>
                    <p>Frontend Developer</p>
                </article>
              </div>
            </section>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
            <section class="contact-info">
            <h3>Επικοινωνία</h3>
            <p><i class="fas fa-envelope"></i> info@techknowlogy.gr</p>
            <p><i class="fas fa-phone"></i> +30 210 0000000</p>
            </section>
        </main>
          `;
}