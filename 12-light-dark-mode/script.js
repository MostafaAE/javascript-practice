const toggleSwitch = document.querySelector('.toggle-switch');
const nav = document.querySelector('#nav');
const imgs = document.querySelectorAll('img');
const textBox = document.querySelector('#text-box');
const toggleText = document.querySelector('.toggle-text');
const toggleIcon = document.querySelector('.toggle-icon');

const imgPaths = [
  'img/undraw_proud_coder_',
  'img/undraw_feeling_proud_',
  'img/undraw_conceptual_idea_',
];

// Toggle Theme Dynamically
function themeMode(theme) {
  document.documentElement.setAttribute('data-theme', theme);

  nav.style.background =
    theme === 'dark' ? 'rgb(0 0 0 / 50%)' : 'rgb(255 255 255 / 50%)';

  imgs.forEach((img, i) => (img.src = `${imgPaths[i]}${theme}.svg`));

  textBox.style.background =
    theme === 'dark' ? 'rgb(255 255 255 / 50%)' : 'rgb(0 0 0 / 50%)';

  toggleText.textContent = theme === 'dark' ? 'Dark Mode' : 'Light Mode';

  theme === 'dark'
    ? toggleIcon.classList.replace('fa-sun', 'fa-moon')
    : toggleIcon.classList.replace('fa-moon', 'fa-sun');
}

// Event Listeners
toggleSwitch.addEventListener('change', e => {
  e.target.checked ? themeMode('dark') : themeMode('light');
});
