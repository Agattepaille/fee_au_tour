window.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('site-header');
    const hero = document.getElementById('hero');

    const heroBottom = () => hero?.getBoundingClientRect().bottom ?? 0;

    window.addEventListener('scroll', () => {
        if (heroBottom() <= 0) {
            header.classList.remove('-translate-y-full');
        } else {
            header.classList.add('-translate-y-full');
        }
    });
});
