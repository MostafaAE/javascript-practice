'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2023-03-04T14:11:59.604Z',
    '2023-03-06T17:01:17.194Z',
    '2023-03-07T13:00:17.929Z',
    '2023-03-08T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const formatMovementDate = (date, locale) => {
  const calDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // console.log(daysPassed);
    // const day = String(date.getDate()).padStart(2, 0);
    // const month = String(date.getMonth() + 1).padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    // const options = {
    //   day: 'numeric',
    //   month: 'numeric',
    //   year: 'numeric',
    // };
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCur = (value, locale, currency) =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movs.forEach(function (movement, i) {
    const movementType = movement > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(account.movementsDates[i]);
    const displayDate = formatMovementDate(date, account.locale);

    const formattedMov = formatCur(movement, account.locale, account.currency);

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${movementType}">${
      i + 1
    } ${movementType}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMov}</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, cur) => acc + cur, 0);

  const formattedBalance = formatCur(
    account.balance,
    account.locale,
    account.currency
  );

  labelBalance.textContent = `${formattedBalance}`;
};

// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (account) {
  const movements = account.movements;
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur);

  const formattedIncomes = formatCur(incomes, account.locale, account.currency);

  labelSumIn.textContent = `${formattedIncomes}`;

  const out = movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);

  const formattedOut = formatCur(
    Math.abs(out),
    account.locale,
    account.currency
  );

  labelSumOut.textContent = `${formattedOut}`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);

  const formattedInterest = formatCur(
    interest,
    account.locale,
    account.currency
  );
  labelSumInterest.textContent = `${formattedInterest}`;
};

// calcDisplaySummary(account1.movements);

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(str => str[0])
      .join('');
  });
};

createUsernames(accounts);

const updateUI = function (currentAccount) {
  // Display movements
  displayMovements(currentAccount);
  // Display balance
  calcDisplayBalance(currentAccount);
  // Display summary
  calcDisplaySummary(currentAccount);
};

const startLogoutTime = function () {
  // Set the time to 5 mins
  let time = 10 * 60;
  const tick = function () {
    const mins = `${Math.trunc(time / 60)}`.padStart(2, 0);
    const sec = `${time % 60}`.padStart(2, 0);

    // In each call, Print the remaining time to the user interface
    labelTimer.textContent = `${mins}:${sec}`;

    // When time = 0, stop timer and logout user
    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = `Log in to get started`;
    }

    time--;
  };
  tick();
  // Call the timer every sec
  const timer = setInterval(tick, 1000);
  return timer;
};

// Event handler
let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 1;

/////////////////////////////////////
// EXPERIMENTING API

// const now = new Date();
// const options = {
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   month: 'numeric',
//   year: 'numeric',
//   weekday: 'long',
// };
// // const locale = navigator.language;
// labelDate.textContent = new Intl.DateTimeFormat(
//   currentAccount.locale,
//   options
// ).format(now);

/////////////////////////////////////

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 1;

    // Create current date and time
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };
    // const locale = navigator.language;
    // console.log(locale);
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // const now = new Date();
    // const day = String(now.getDate()).padStart(2, 0);
    // const month = String(now.getMonth() + 1).padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = String(now.getHours()).padStart(2, 0);
    // const min = String(now.getMinutes()).padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
    // As of 05/03/2037
    // As of day/month/year

    // Clear input fields
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginUsername.blur();
    inputLoginPin.blur();

    // Clear previous timer
    if (timer) clearInterval(timer);

    // Start a new timer
    timer = startLogoutTime();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = +inputTransferAmount.value;

  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  // Clear input fields
  inputTransferAmount.value = '';
  inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAccount &&
    amount <= currentAccount.balance &&
    receiverAccount?.username != currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAccount.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);

    // Clear previous timer
    clearInterval(timer);
    // Start a new timer
    timer = startLogoutTime();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
      // Clear previous timer
      clearInterval(timer);
      // Start a new timer
      timer = startLogoutTime();
    }, 2500);
  }

  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.pin === +inputClosePin.value &&
    currentAccount.username === inputCloseUsername.value
  ) {
    const accountIndex = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // console.log(accountIndex);

    // Delete account
    accounts.splice(accountIndex, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = '';
  inputClosePin.value = '';

  console.log(accounts);
});

let isSorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  isSorted = !isSorted;
  displayMovements(currentAccount, isSorted);
});
