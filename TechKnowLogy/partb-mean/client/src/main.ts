import { renderNav } from './components/nav';
import { router } from './router';
import './assets/css/reset.css';
import './assets/css/theme.css';
import './assets/css/components.css';
import './assets/css/layout.css';

const app = document.getElementById('app') as HTMLElement;

// navbar ΜΙΑ ΦΟΡΑ
renderNav(app);

// routing
router();
window.addEventListener('hashchange', router);
document.addEventListener('click', (e) => {
  const btn = document.getElementById('menu-toggle');// κουμπί μενού
  const menu = document.querySelector('#main-nav .menu');// το μενού

  if (!btn || !menu) return;// αν δεν υπάρχουν, έξοδος

  if (e.target === btn) {// αν πατήθηκε το κουμπί
    menu.classList.toggle('open')// άνοιξε ή κλείσε το μενού;
  }
});
