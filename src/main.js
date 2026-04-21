import "./style.css";

const openBtn = document.getElementById('open-menu');
const mobileNav = document.getElementById('mobile-nav');
const hamburger = document.getElementById('hamburger');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('search');
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

// Mobile menu toggle
openBtn.addEventListener('click', () => {
  mobileNav.classList.toggle('translate-x-full');

  hamburger.classList.toggle('ri-close-large-line');
  hamburger.classList.toggle('ri-menu-line');

  document.body.classList.toggle('overflow-hidden');
});

// Close menu if clicking outside of it
document.addEventListener('click', (e) => {
  if (!openBtn.contains(e.target) && !mobileNav.contains(e.target)) {
    mobileNav.classList.add('translate-x-full');
    hamburger.classList.add('ri-menu-line');
    hamburger.classList.remove('ri-close-large-line');
  }
});

// Search form
searchBtn.addEventListener('click', (e) => {
  if (searchInput.classList.contains('invisible')) {
    searchInput.classList.remove('invisible', 'w-0', 'opacity-0', 'pointer-events-none');
    searchInput.classList.add('w-64', 'visible', 'opacity-100', 'pointer-events-auto');

    setTimeout(() => searchInput.focus(), 50);
  } else {
    if (searchInput.value === "") {
      searchInput.classList.add('invisible', 'w-0', 'opacity-0', 'pointer-events-none');
      searchInput.classList.remove('w-64', 'visible', 'opacity-100', 'pointer-events-auto');
    } else {
      document.getElementById('searchForm').submit();
    }
  }
});

// Dropdown 
dropdownToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const dropdownMenu = toggle.nextElementSibling;

    if (dropdownMenu.classList.contains('hidden')) {
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.add('hidden');
      });

      dropdownMenu.classList.remove('hidden');
    } else {
      dropdownMenu.classList.add('hidden');
    };
  });
});

// clicking outside of an open dropdown menu closes it
window.addEventListener('click', (event) => {
  if (!event.target.matches('.dropdown-toggle')) {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
      if (!menu.contains(event.target)) {
        menu.classList.add('hidden');
      };
    });
  };
});