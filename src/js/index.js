import image from '../img/Jz.png';
import imgLoader from './imgLoader';
import style from '../css/index.css';

const img = new Image();
img.src = image;
img.classList.add(style.image);
document.body.appendChild(img);
imgLoader();
// eslint-disable-next-line no-undef
const arr2 = _.join(['a', 'v', 'b', '****']);
console.log(arr2);
