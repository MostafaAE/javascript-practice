const imgContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let photosArray = [];

let ready = false;
let imgsLoaded = 0;
let totalImgs = 0;
// Unsplace API
let loadImgsCount = 5;
// Normally,  don't store API Keys like this, but an exception made here because it is free, and the data is publicly available!
const apiKey = 'TLWYYX7_18nvkJ2XHQwgHOglGOOsTouAJnVejyY_L8Q';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&content_filter=high&count=${loadImgsCount}&query=universe`;

function setAttributes(element, attributes) {
  for (const key in attributes) element.setAttribute(key, attributes[key]);
}

function imgLoaded() {
  imgsLoaded++;

  if (imgsLoaded === totalImgs) {
    ready = true;
    loader.hidden = true;
    loadImgsCount = 30;
  }
}

// Create elements for links & photos, Add to the DOM
function displayPhotos() {
  totalImgs = photosArray.length;
  imgsLoaded = 0;
  photosArray.forEach(photo => {
    const markup = `
      <a href="${photo.links.html}" target="_blank">
        <img src="${photo.urls.regular}" alt="${photo.alt_description}" title="${photo.alt_description}">
      </a>
      `;

    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener('load', imgLoaded);

    item.appendChild(img);
    imgContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

// Check to see if scrolling near the bottom of page, load more photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On load
getPhotos();
