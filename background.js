// const body = document.querySelector("body");
// const imgNumber = 5;

// function paintImage(randomNumber) {
//   const image = new Image();
//   image.src = `/img/img${randomNumber + 1}.jpg`;
//   image.classList.add("bgImage");
//   body.appendChild(image);
// }

// function getRandom() {
//   const random = Math.floor(Math.random() * imgNumber);

//   return random;
// }

// function init() {
//   const randomNumber = getRandom();
//   paintImage(randomNumber);
// }

// document.addEventListener("DOMContentLoaded", init);

function randomBg() {
  const body = document.querySelector("body");
  const imgNumber = 5;

  const randomNumber = Math.floor(Math.random() * imgNumber);
  const image = new Image();
  image.src = `/img/img${randomNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
}
document.addEventListener("DOMContentLoaded", randomBg);
