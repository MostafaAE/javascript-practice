// Unsplace API
const count = 10;
// Normally,  don't store API Keys like this, but an exception made here because it is free, and the data is publicly available!
const apiKey = 'TLWYYX7_18nvkJ2XHQwgHOglGOOsTouAJnVejyY_L8Q';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&content_filter=high&count=${count}`;

// Get photos from Unsplash API

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const imagesData = await response.json();
    console.log(imagesData);
  } catch (error) {
    console.log(error);
  }
}

// On load
getPhotos();
