//TREE SHAKING  只支持ES Module
import image from './img/Jz.png'
import imgLoader from './js/imgLoader'
import style from './css/index.css'

let img = new Image()
img.src = image
img.classList.add(style.image)
document.body.appendChild(img)

imgLoader()
let arr2 = _.join(['a', 'v', 'b', '****'])
console.log(arr2)


