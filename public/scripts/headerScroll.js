let lastScrollTop = 0;
const headerScroll = document.getElementById('site-headerScroll');

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scroll vers le bas et plus de 100px -> afficher headerScroll
        headerScroll.classList.remove('-translate-y-full');
    } else if (scrollTop < lastScrollTop) {
        // Scroll vers le haut -> cacher headerScroll
        headerScroll.classList.add('-translate-y-full');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});