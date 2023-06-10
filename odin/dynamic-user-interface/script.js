import dropDownMenu from './dropDownMenu.js';
import mobileMenu from './mobileMenu.js';
import imageSlider from './imageSlider.js';

genMobileMenu();
genImageSlider();

function genDropDownMenus() {
    let DropDownMenuManager = dropDownMenu();
    
    let container = document.querySelector('#content');
    container.innerHTML = '';
    DropDownMenuManager.clearMenus();

    let dropDownHeader = document.createElement('h1');
    dropDownHeader.textContent = 'Drop Down Menus';
    container.appendChild(dropDownHeader);
    
    DropDownMenuManager.addMenu(container, 'menu 1');
    
    for(let i = 0; i < 3; i++) {
        let menuItem = document.createElement('div');
        menuItem.textContent = i + ' menuItem';
        DropDownMenuManager.addItemToMenu(0, menuItem);
    }
    
    DropDownMenuManager.addMenu(container, 'menu 2');
    
    for(let i = 0; i < 3; i++) {
        let menuItem = document.createElement('div');
        menuItem.textContent = i + ' menuItem';
        DropDownMenuManager.addItemToMenu(1, menuItem);
    }
}

function clear() {
    let container = document.querySelector('#content');
    container.innerHTML = '';
}

function genMobileMenu() {
    let MobileMenuManager = mobileMenu();
    
    let container = document.querySelector('body')
    
    MobileMenuManager.createMenu(container);
    MobileMenuManager.addMenuButton('Drop Down Menus', genDropDownMenus);
    MobileMenuManager.addMenuButton('Image Slider', genImageSlider);
    MobileMenuManager.addMenuButton('Empty Page', clear);
}

function genImageSlider() {
    let ImageSliderManager = imageSlider();
    
    let container = document.querySelector('#content')
    container.innerHTML = '';

    let sliderHeader = document.createElement('h1');
    sliderHeader.textContent = 'Image Slider';
    container.appendChild(sliderHeader);
    
    ImageSliderManager.createImageSlider(container, ['./1.jpg', './2.jpg', './3.jpg']);
}