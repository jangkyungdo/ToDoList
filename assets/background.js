document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  const imgNumber = 5;

  const randomNumber = Math.floor(Math.random() * imgNumber);
  const image = new Image();

  image.src = `img/img${randomNumber + 1}.jpg`;
  image.classList.add("background__image");

  body.appendChild(image);
});
