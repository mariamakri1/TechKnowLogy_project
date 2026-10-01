//responsive menu -για κινητά ανοιγόμενο με το κουμπί hamburger
document.addEventListener("DOMContentLoaded", () => {
    console.log("menu.js loaded"); // debug

    const hamburger = document.getElementById("hamburgerBtn");
    const navLinks = document.getElementById("navLinks");

    if (!hamburger) {
        console.error("Hamburger button NOT found!");
        return;
    }
    if (!navLinks) {
        console.error("Nav links container NOT found!");
        return;
    }

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
});
