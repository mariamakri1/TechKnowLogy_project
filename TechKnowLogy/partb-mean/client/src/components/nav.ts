export function renderNav(container: HTMLElement) {
  container.insertAdjacentHTML('afterbegin', `
    <header>
      <div class="header-inner">
        <a href="#/" class="logo">
          <img src="assets/images/logo.png" alt="TechKnowLogy">
        </a>

        <nav id="main-nav">
          <button id="menu-toggle">☰</button>
          <ul class="menu">
            <li><a href="#/">Αρχική</a></li>
            <li><a href="#/courses">Μαθήματα</a></li>
            <li><a href="#/books">Βιβλία</a></li>
            <li><a href="#/about">Ποιοι Είμαστε</a></li>
          </ul>
        </nav>
      </div>

      <div class="header-actions">
        <a href="#/register" class="register-btn">Εγγραφή</a>
        <span class="divider">/</span>
        <a href="#/login" class="login-btn">Σύνδεση</a>
      </div>
    </header>
  `);
}
