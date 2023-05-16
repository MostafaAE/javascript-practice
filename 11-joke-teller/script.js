const audioElement = document.querySelector('#audio');
const button = document.querySelector('#btn');

function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing joke to VoiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    // Normally, I don't store API Keys like this, but an exception made here because it is free, and the data is publicly available!
    key: '51e49f1d78c24c6db56522737ea551d5',
    src: joke,
    hl: 'en-us',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// Get jokes from JokeAPI
async function getJokes() {
  let joke = '';
  const apiUrl =
    'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
  try {
    toggleButton();
    const res = await fetch(apiUrl);

    const data = await res.json();

    joke = data.setup ? data.setup + ' ... ' + data.delivery : data.joke;
    tellMe(joke);
  } catch (err) {
    console.log(err);
  }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
