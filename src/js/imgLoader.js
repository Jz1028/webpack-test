import image from '../img/Jz.png';

function imgLoader() {
  const img = new Image();
  img.src = image;
  img.classList.add('image');

  document.body.appendChild(img);
}

export default imgLoader;
