var slider;
var images = []
var index = 0;
var buttons = [];

var createImageSlider = function createMenu(element, imageSrcArr) {
    slider = document.createElement('div');
    slider.classList.add('image-slider-container');
    element.appendChild(slider);

    images = imageSrcArr;

    let leftBtn = document.createElement('button');
    leftBtn.textContent = 'Left';
    leftBtn.onclick = function() {
        index--;
        if(index < 0) index = images.length - 1;
        setImage();
    }
    slider.appendChild(leftBtn);

    let imageDiv = document.createElement('div');
    imageDiv.classList.add('slider-image-div');
    let image = document.createElement('img');
    image.classList.add('slider-image');
    image.src = images[index];
    image.alt = 'image ' + index;
    imageDiv.appendChild(image);

    let buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('slider-buttons');
    for(let i = 0; i < images.length; i++){
        let button = document.createElement('button');
        button.onclick = function() {
            index = i;
            setImage();
        }
        if(i === index) button.classList.add('button-index-selected');
        buttons.push(button);
        buttonsDiv.appendChild(button);
    }
    imageDiv.appendChild(buttonsDiv);

    slider.appendChild(imageDiv);

    let rightBtn = document.createElement('button');
    rightBtn.textContent = 'Right';
    rightBtn.onclick = function() {
        index++;
        if(index >= images.length) index = 0;
        setImage();
    }
    slider.appendChild(rightBtn);
}

function setImage() {
    let image = document.querySelector('.slider-image');
    image.src = images[index];
    image.alt = 'image ' + index;

    for(let i = 0; i < buttons.length; i++){
        buttons[i].classList.remove('button-index-selected');
    }
    buttons[index].classList.add('button-index-selected');
}
    
export default function() {
    return {
        createImageSlider,
    }
}