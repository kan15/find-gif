
const numberElements = 5;

const getImageShell = () => {
  const imgWrap = document.querySelector('.wrap-for-copy').cloneNode(true);
  document.querySelector('.wrap-for-copy').remove();
  imgWrap.classList.remove('wrap-for-copy');
  return imgWrap;
}

const imgForCopy = getImageShell();

const replaceImage = (serverArray, neededImg) => {
  document.querySelector('.spinner').style.display = "none";
  const array = [...serverArray]; //if I will need to add images on the screen I will need the full array
  const needGifArr = array.slice(0, neededImg);
  for (let i = 1; i <= neededImg; i++) {
    const newImg = imgForCopy.cloneNode(true);
    document.getElementById('listImages').appendChild(newImg);

  }
  const arrForChange = document.querySelectorAll('.image-wrap img');
  for (let i = 0; i < arrForChange.length; i++) {
    arrForChange[i].src = needGifArr[i].images.original.url;
  }
}

const start = async(userWord) => {
  const GIPHY_URL = 'https://api.giphy.com/v1/stickers/search?'; 
  const API_KEY = 'E26iZ0BIEszi7RA4GeEmXzJPRpkSeQ6m';

  const searchParams = new URLSearchParams();
  searchParams.append('api_key', API_KEY);
  searchParams.append('q', userWord);
  const url = GIPHY_URL + searchParams;

  const response = await fetch(url);
  if (response.ok) {
    const json = await response.json();
    replaceImage(json.data, numberElements);
  } else {
    alert("ERROR HTTP: " + response.status);
  }
}

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const userWord = document.getElementById('findInput').value.trim();
  start(userWord);
  document.getElementById('findInput').value = '';
  document.getElementById('listImages').innerHTML = '';
})