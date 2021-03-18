
const GIPHY_URL = 'https://api.giphy.com/v1/stickers/search?'; 
const API_KEY = 'E26iZ0BIEszi7RA4GeEmXzJPRpkSeQ6m';

const getImageClone = () => {
  const imgWrap = document.querySelector('.wrap-for-copy').cloneNode(true);
  document.querySelector('.wrap-for-copy').remove();
  imgWrap.classList.remove('wrap-for-copy');
  return imgWrap;
}

const imgForCopy = getImageClone();

const showPosts = (serverArray) => {
  const allImgFragment = document.createDocumentFragment();
  for (let i = 0; i < serverArray.length; i++) {
    const newImg = imgForCopy.cloneNode(true);
    newImg.querySelector('img').src = serverArray[i].images.original.url;
    allImgFragment.appendChild(newImg);
  }
  document.getElementById('listImages').appendChild(allImgFragment);
}

const getFetchPostsUrl = (userWord) => {
  const searchParams = new URLSearchParams();
  searchParams.append('api_key', API_KEY);
  searchParams.append('q', userWord);
  searchParams.append('limit', 5);
  const url = GIPHY_URL + searchParams;
  return url;
}

const cleanList = () => {
  document.getElementById('findInput').value = '';
  document.getElementById('listImages').innerHTML = '';
}

async function fetchPosts(userWord) {
  const response = await fetch(getFetchPostsUrl(userWord));
  if (response.ok) {
    const json = await response.json();
    cleanList();
    return [...json.data];
  } else {
    alert("ERROR HTTP: " + response.status);
  }
}

const startSpinner = () => {
  document.querySelector('.spinner-wrap').style.display = "block";
}

const stopSpinner = () => {
  document.querySelector('.spinner-wrap').style.display = "none";
}

const getUserWord = () => {
  const userWord = document.getElementById('findInput').value.trim();
  return userWord;
}

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  startSpinner();
  const userWord = getUserWord();
  stopSpinner();
  fetchPosts(userWord).then(showPosts)
})