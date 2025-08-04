// window.addEventListener('DOMContentLoaded', () => {
//     const header = document.getElementById('site-header');
//     const sections = document.querySelectorAll('[data-header-aware]');
//
//     function updateLayout() {
//         if (!header) return;
//         const height = header.offsetHeight;
//
//         sections.forEach(section => {
//             section.style.paddingTop = `${height}px`;
//             section.style.minHeight = `calc(100vh - ${height}px)`;
//         });
//     }
//
//     updateLayout();
//     window.addEventListener('resize', updateLayout);
// });
