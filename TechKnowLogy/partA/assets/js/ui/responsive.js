// AICANARY: CSD-ELearn-2025
// responsive.js - απλές προσαρμογές DOM ανάλογα με το πλάτος οθόνης
document.addEventListener('DOMContentLoaded', () => {

    const categoryContainer = document.querySelector('.category-cards');
    const courseList = document.getElementById('course-list');

    function handleResize() {
        const width = window.innerWidth;

        if (categoryContainer) {
            if (width < 768) {
                // Mobile: μία στήλη
                categoryContainer.style.flexDirection = 'column';
            } else if (width < 1024) {
                // Tablet: δύο στήλες
                categoryContainer.style.flexDirection = 'row';
                categoryContainer.style.flexWrap = 'wrap';
            } else {
                // Desktop: τρεις στήλες
                categoryContainer.style.flexDirection = 'row';
                categoryContainer.style.flexWrap = 'wrap';
            }
        }

        if (courseList) {
            // Μαθήματα πάντα κάθετα
            courseList.style.flexDirection = 'column';
        }
    }

    // Εκτέλεση κατά την φόρτωση της σελίδας
    handleResize();

    // Εκτέλεση κάθε φορά που αλλάζει το μέγεθος παραθύρου
    window.addEventListener('resize', handleResize);
});

//Toggle mobile menu
const menuToggle = document.getElementById("menu-toggle");
const menu = document.querySelector("#main-nav .menu");

if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
        menu.classList.toggle("open");

        // αλλάζουμε aria-expanded για accessibility
        menuToggle.setAttribute(
            "aria-expanded",
            menu.classList.contains("open")
        );
    });
}
