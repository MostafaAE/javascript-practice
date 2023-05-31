const audioPlayer = document.querySelector('.audio');
const playBtn = document.querySelector('.main-button');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const audioProgressContainer = document.querySelector('.progress-container');
const audioProgress = document.querySelector('.progress');
const audioCurTime = document.querySelector('.current-time');
const audioDuration = document.querySelector('.duration');

let audioIsPlaying = false;

const playAudio = function () {
  audioPlayer.play();
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  audioIsPlaying = true;
};

const pauseAudio = function () {
  audioPlayer.pause();
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  audioIsPlaying = false;
};

// Event Listeners
playBtn.addEventListener('click', () => {
  audioIsPlaying ? pauseAudio() : playAudio();
});
