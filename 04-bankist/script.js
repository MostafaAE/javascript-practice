'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (movement, index) {
    const movementType = movement > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${movementType}">${
      index + 1
    } ${movementType}</div>
      <div class="movements__value">${movement}€</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, cur) => acc + cur, 0);

  // console.log(balance);
  labelBalance.textContent = `${balance} EUR`;
};

calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (movements) {
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur);
  // console.log(incomes);

  labelSumIn.textContent = `${incomes}€`;

  const out = movements.filter(mov => mov < 0).reduce((acc, cur) => acc + cur);
  // console.log(out);

  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * 1.2) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};
calcDisplaySummary(account1.movements);
// const user = 'Mostafa Ayman'; // ma

// const username = user
//   .toLowerCase()
//   .split(' ')
//   .map(str => str[0])
//   .join('');
// console.log(username);

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

/////////////////////////////////////////////////////////
// console.log(accounts);

// const deposits = account1.movements.filter(function (mov) {
//   return mov > 0;
// });

// const withdrawals = account1.movements.filter(function (mov) {
//   return mov < 0;
// });

// console.log(deposits);
// console.log(withdrawals);
// const balance = account1.movements.reduce(function (acc, cur) {
//   return acc + cur;
// });

// const maxVal = account1.movements.reduce(
//   (max, cur) => (cur > max ? cur : max),
//   Number.MIN_VALUE
// );

// console.log(maxVal);

// const calcDogHumanAge = function (arr) {
//   const dogHumanAge = arr.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   console.log(dogHumanAge);

//   const filteredAges = dogHumanAge.filter(age => age >= 18);
//   console.log(filteredAges);

//   const avg =
//     filteredAges.reduce((acc, age) => acc + age, 0) / filteredAges.length;

//   return avg;
// };

// console.log(calcDogHumanAge([5, 2, 4, 1, 15, 8, 3]));
