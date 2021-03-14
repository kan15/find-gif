const GIPHY_URL = 'https://api.giphy.com/v1/stickers/search?'; 
const API_KEY = 'api_key=E26iZ0BIEszi7RA4GeEmXzJPRpkSeQ6m';
const SEARCH_PARAM = '&q=';
const AMOUNT = '&limit=50';

let numberElements = 5;
let userWord;
let url;
let json;

const input = document.getElementById('findInput');
const imgWrap = document.querySelector('.wrap-for-copy').cloneNode(true);

document.querySelector('.wrap-for-copy').remove();
imgWrap.classList.remove('wrap-for-copy');

const replaceImage = () => {
  //shuffle array-------------
  let array = [...json.data];
  array.sort(function() {
      return Math.random() - 0.5
  });
  //--------------------------
  const needGifArr = array.slice(0, numberElements)
  needGifArr.forEach(gif => {
    const newImg = imgWrap.cloneNode(true);
    newImg.querySelector('img').src = gif.images.original.url;
    newImg.querySelector('img').alt = gif.title;
    document.getElementById('listImages').appendChild(newImg);
  })
}

const start = async function() {
  let response = await fetch(url);
  if (response.ok) {
    json = await response.json();
    replaceImage();
  } else {
    alert("ERROR HTTP: " + response.status);
  }
}

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  userWord = input.value.trim();
  input.value = '';
  document.getElementById('listImages').innerHTML = '';
  url = GIPHY_URL + API_KEY + SEARCH_PARAM + userWord + AMOUNT;
  console.log(url);
  start();
})