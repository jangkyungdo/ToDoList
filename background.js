// const body = document.querySelector("body");
// const imgNumber = 5;

// function createImage(randomNumber) {
//   const image = new Image();
//   image.src = `/img/img${randomNumber + 1}.jpg`;
//   image.classList.add("background__image");
//   body.appendChild(image);
// }

// function getRandom() {
//   const random = Math.floor(Math.random() * imgNumber);

//   return random;
// }

// function start() {
//   const randomNumber = getRandom();
//   createImage(randomNumber);
// }

// document.addEventListener("DOMContentLoaded", start);

function randomBg() {
  const body = document.querySelector("body");
  const imgNumber = 5;

  const randomNumber = Math.floor(Math.random() * imgNumber);
  const image = new Image();
  image.src = `/img/img${randomNumber + 1}.jpg`;
  image.classList.add("background__image");

  body.appendChild(image);
}
document.addEventListener("DOMContentLoaded", randomBg);
