const fetch = require('node-fetch');
const fs = require('fs');

const folder = 'insta';

const saveImage = (url, name) => {
  fetch(url).then(response => {
    const dest = fs.createWriteStream(`./${folder}/${name}.png`);
    response.body.pipe(dest);
  });
};

fetch(
  'https://api.instagram.com/v1/users/self/media/recent/?access_token=7483098617.c5db6de.243e832352fc4518b803995414456e5a'
)
  .then(data => data.json())
  .then(data => {
    data.data.map((pic, i) => {
      saveImage(pic.images.standard_resolution.url, i);
    });
  });
