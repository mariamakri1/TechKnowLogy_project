
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalContent = modal.querySelector('.modal-content');
    const closeBtn = modal.querySelector('.close');

    // Άνοιγμα modal με δυναμικό περιεχόμενο
    document.querySelectorAll('.show-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const courseTitle = btn.dataset.title;
            const courseDesc = btn.dataset.desc;

            modalContent.innerHTML = `
                <h2>${courseTitle}</h2>
                <p>${courseDesc}</p>
            `;

            modal.style.display = 'block';
        });
    });

    // Κλείσιμο με το κουμπί
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Κλείσιμο με click έξω από το modal
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
