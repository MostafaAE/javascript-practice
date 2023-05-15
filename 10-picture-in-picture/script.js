const startBtn = document.querySelector('#btn');
const videoEl = document.querySelector('#video');

// Prompt the user to select a media stream, pass that to the video element, then play.

async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoEl.srcObject = mediaStream;
    videoEl.onloadedmetadata = () => {
      videoEl.play();
    };
  } catch (err) {
    console.log(err.message);
  }
}

startBtn.addEventListener('click', async () => {
  // Disable button
  startBtn.disabled = true;

  // Start Pic in Pic mode
  await videoEl.requestPictureInPicture();

  // Enable the button
  startBtn.disabled = false;
});

selectMediaStream();
