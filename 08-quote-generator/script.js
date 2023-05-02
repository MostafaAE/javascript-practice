'use strict';

//Get quotes from API
const API_URL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
let quotesData = [];

function newQuote() {
  const rand = Math.trunc(Math.random() * quotesData.length);
  const quote = quotesData[rand];
  console.log(quote);
}

async function getQuotes() {
  try {
    const res = await fetch(API_URL);
    quotesData = await res.json();
    newQuote();
  } catch (err) {
    console.log(err);
  }
}
getQuotes();
