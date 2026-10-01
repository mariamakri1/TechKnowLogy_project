import { renderHome } from './pages/home/home';
import { renderLogin } from './pages/login/login';
import { renderRegister } from './pages/register/register';
import { renderCourses } from './pages/courses/courses';
import { renderAbout } from './pages/about/about';
import { renderBooks } from './pages/books/books';

// συνάρτηση που διαχειρίζεται την πλοήγηση ανάμεσα στις σελίδες
export function router() {
  const page = document.getElementById('page') as HTMLElement;
  const hash = window.location.hash;

  page.innerHTML = '';
// ανάλογα με το hash, φόρτωνει τη σωστή σελίδα
  if (hash === '#/login') {
    renderLogin(page);
  } else if (hash === '#/register') {
    renderRegister(page);
  } else if (hash === '#/courses') {
    renderCourses(page);
  } else if (hash === '#/about') {
  renderAbout(page);
}
else if (hash === '#/books') {
  renderBooks(page);
}

 else {
    renderHome(page);
  }
}
