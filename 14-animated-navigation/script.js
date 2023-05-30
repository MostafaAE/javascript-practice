const menuBars = document.getElementById('menu-bars');
const overlay = document.getElementById('overlay');
const nav = document.getElementById('nav');
const navItems = document.querySelectorAll('nav ul li');

console.log(navItems);
// Event Listeners

const toggleNav = () => {
  menuBars.classList.toggle('change');
  overlay.classList.toggle('overlay-slide');
  navItems.forEach((navItem, i) => {
    navItem.classList.toggle(`slide-in-${i + 1}`);
    navItem.classList.toggle(`slide-out-${i + 1}`);
  });
};

menuBars.addEventListener('click', toggleNav);

nav.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() !== 'a') return;
  toggleNav();
});
