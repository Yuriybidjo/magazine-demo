import "./style.css";

const openBtn = document.getElementById('open-menu');
const mobileNav = document.getElementById('mobile-nav');
const hamburger = document.getElementById('hamburger')

// openBtn.addEventListener('click', () => {
//   mobileNav.classList.toggle('translate-y-full');
//   hamburger.classList.toggle('ri-close-large-line')
// });

openBtn.addEventListener('click', () => {
  // Toggle the X-axis translation
  mobileNav.classList.toggle('translate-x-full');

  // Toggle the icon from menu to close
  hamburger.classList.toggle('ri-close-large-line');
  hamburger.classList.toggle('ri-menu-line'); // Ensure the original icon is swapped
});