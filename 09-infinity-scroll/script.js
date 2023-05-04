const imgContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplace API
const count = 10;
// Normally,  don't store API Keys like this, but an exception made here because it is free, and the data is publicly available!
const apiKey = 'TLWYYX7_18nvkJ2XHQwgHOglGOOsTouAJnVejyY_L8Q';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&content_filter=high&count=${count}&query=universe`;

// Create elements for links & photos, Add to the DOM
async function displayPhotos() {
  photosArray.forEach(photo => {
    const markup = `
      <a href="${photo.links.html}" target="_blank">
        <img src="${photo.urls.regular}" alt="${photo.alt_description}" title="${photo.alt_description}">
      </a>
      `;
    imgContainer.insertAdjacentHTML('beforeend', markup);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    console.log(photosArray);
  } catch (error) {
    console.log(error);
  }
}

// On load
getPhotos();
