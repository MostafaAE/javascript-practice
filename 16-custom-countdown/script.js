const inputContainer = document.querySelector('.input-container');
const inputTitle = document.querySelector('#title');
const inputDate = document.querySelector('#date-picker');
const submitBtn = document.querySelector('.submit-btn');

const countdownContainer = document.querySelector('.countdown');
const countdownTitle = document.querySelector('.countdown-title');
const countdownData = document.querySelectorAll('.countdown span');
const resetBtn = document.querySelector('.countdown-reset-btn');

const completeContainer = document.querySelector('.complete');
const completeData = document.querySelector('.complete-info');
const newCountdownBtn = document.querySelector('.new-countdown-btn');

let title = '';
let date = '';
let dateValue = '';
let timer;
const sec = 1000;
const min = sec * 60;
const hour = min * 60;
const day = hour * 24;

const init = function () {
  const today = new Date().toISOString().split('T')[0];
  inputDate.min = today;
};

const updateDOM = function () {
  timer = setInterval(() => {
    const now = new Date().getTime();
    const offset = (new Date().getTimezoneOffset() / 60) * hour;
    const distance = dateValue - now + offset;
    console.log(distance);

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / min);
    const seconds = Math.floor((distance % min) / sec);

    // Hide input
    inputContainer.hidden = true;
    console.log(days, hours, minutes, seconds);

    if (distance < 0) {
      countdownContainer.hidden = true;
      clearInterval(timer);
      completeData.textContent = `${title} finished on ${date}`;
      completeContainer.hidden = false;
    } else {
      // Populate the data
      countdownData[0].textContent = days;
      countdownData[1].textContent = hours;
      countdownData[2].textContent = minutes;
      countdownData[3].textContent = seconds;

      countdownTitle.textContent = title;

      completeContainer.hidden = true;

      // Show countdown
      countdownContainer.hidden = false;
    }
  }, sec);
};

const updateCountdown = function (e) {
  e.preventDefault();
  title = inputTitle.value;
  date = inputDate.value;
  if (!date) {
    alert('Please select a date for the coundown!');
  } else {
    dateValue = new Date(date).getTime();
    updateDOM();
  }
};

const reset = function (e) {
  e.preventDefault();
  // Hide countdown
  countdownContainer.hidden = true;
  // Hide complete
  completeContainer.hidden = true;
  // Show input
  inputContainer.hidden = false;

  // Clear the timer
  clearInterval(timer);

  // Reset the values
  title = '';
  date = '';
  dateValue = '';
};

// Event Listeners
submitBtn.addEventListener('click', updateCountdown);
resetBtn.addEventListener('click', reset);
newCountdownBtn.addEventListener('click', reset);
// Initialization
init();
