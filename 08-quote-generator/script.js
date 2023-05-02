'use strict';

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Get quotes from API
const API_URL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
let quotesData = [];

// Show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

function newQuote() {
  loading();

  const rand = Math.trunc(Math.random() * quotesData.length);
  const quote = quotesData[rand];

  quoteText.textContent = quote.text;
  quote.text.length > 120
    ? quoteText.classList.add('long-quote')
    : quoteText.classList.remove('long-quote');
  quoteAuthor.textContent = quote.author ?? 'Unknown';
  complete();
}

// Tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, '_blank');
}

async function getQuotes() {
  try {
    loading();
    const res = await fetch(API_URL);
    quotesData = await res.json();
    newQuote();
    complete();
  } catch (err) {
    console.log(err);
  }
}
getQuotes();

// Event listeners
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', newQuote);
