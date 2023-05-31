const audioPlayer = document.querySelector('.audio');
const audioTitle = document.querySelector('.title');
const audioArtist = document.querySelector('.artist');
const playBtn = document.querySelector('.main-button');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const audioProgressContainer = document.querySelector('.progress-container');
const audioProgress = document.querySelector('.progress');
const audioCurTime = document.querySelector('.current-time');
const audioDuration = document.querySelector('.duration');

let audioIsPlaying = false;
let curAudioIdx = 0;

class Audio {
  constructor(fileName, displayName, artist) {
    this.fileName = fileName;
    this.displayName = displayName;
    this.artist = artist;
  }
}

const audios = [
  new Audio('001', 'ماتيسر من سورة البقرة', 'عبد الرحمن مسعد'),
  new Audio('002', 'ماتيسر من سورة آل عمران', 'عبد الرحمن مسعد'),
  new Audio('003', 'ماتيسر من سورة الأعراف', 'عبد الرحمن مسعد'),
  new Audio('004', 'ماتيسر من سورة الرعد 1', 'عبد الرحمن مسعد'),
  new Audio('005', 'ماتيسر من سورة الرعد 2', 'عبد الرحمن مسعد'),
  new Audio('006', 'ماتيسر من سورة إبراهيم', 'عبد الرحمن مسعد'),
  new Audio('007', 'ماتيسر من سورة النحل 1', 'عبد الرحمن مسعد'),
  new Audio('008', 'ماتيسر من سورة النحل 2', 'عبد الرحمن مسعد'),
  new Audio('009', 'ماتيسر من سورة مريم 1', 'عبد الرحمن مسعد'),
  new Audio('010', 'ماتيسر من سورة مريم 2', 'عبد الرحمن مسعد'),
  new Audio('011', 'ماتيسر من سورة النور', 'عبد الرحمن مسعد'),
  new Audio('012', 'ماتيسر من سورة العنكبوت', 'عبد الرحمن مسعد'),
  new Audio('013', 'ماتيسر من سورة الروم', 'عبد الرحمن مسعد'),
];

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

const loadAudio = function (idx) {
  if (idx < 0 || idx >= audios.length) return;
  const audio = audios[idx];
  audioTitle.textContent = audio.displayName;
  audioArtist.textContent = audio.artist;
  audioPlayer.src = `quran/${audio.fileName}.mp3`;

  audioPlayer.addEventListener('loadeddata', e => {
    const durationMins = Math.floor(e.target.duration / 60);
    const durationSecs = Math.floor(e.target.duration % 60);
    audioDuration.textContent = `${durationMins}:${
      durationSecs < 10 ? 0 : ''
    }${durationSecs}`;
  });
};

const nextAudio = function () {
  curAudioIdx = (curAudioIdx + 1 + audios.length) % audios.length;
  loadAudio(curAudioIdx);
  playAudio();
};

const prevAudio = function () {
  curAudioIdx = (curAudioIdx - 1 + audios.length) % audios.length;
  loadAudio(curAudioIdx);
  playAudio();
};

const updateProgressBar = function (e) {
  if (audioIsPlaying) {
    const { currentTime, duration } = e.target;

    const progressPercentage = (currentTime / duration) * 100;
    audioProgress.style.width = `${progressPercentage}%`;

    const currentMins = Math.floor(currentTime / 60);
    const currentSecs = Math.floor(currentTime % 60);
    audioCurTime.textContent = `${currentMins}:${
      currentSecs < 10 ? 0 : ''
    }${currentSecs}`;
  }
};

const setProgressBar = function (e) {
  const width = this.clientWidth;
  const { offsetX } = e;
  const progressPercentage = offsetX / width;
  const currentTime = progressPercentage * audioPlayer.duration;

  audioPlayer.currentTime = currentTime;
};

// Event Listeners
playBtn.addEventListener('click', () => {
  audioIsPlaying ? pauseAudio() : playAudio();
});

prevBtn.addEventListener('click', prevAudio);

nextBtn.addEventListener('click', nextAudio);

audioPlayer.addEventListener('timeupdate', updateProgressBar);

audioProgressContainer.addEventListener('click', setProgressBar);

loadAudio(0);
