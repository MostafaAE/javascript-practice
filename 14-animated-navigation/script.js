const menuBars = document.getElementById('menu-bars');
const overlay = document.getElementById('overlay');
const nav = document.getElementById('nav');

// Event Listeners

const toggleNav = () => {
  menuBars.classList.toggle('change');
  overlay.classList.toggle('overlay-slide');
};

menuBars.addEventListener('click', toggleNav);

nav.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() !== 'a') return;
  toggleNav();
});
