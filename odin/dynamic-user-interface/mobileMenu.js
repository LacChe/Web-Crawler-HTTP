var menu;

var createMenu = function createMenu(element) {
    menu = document.createElement('div');
    menu.classList.add('mobile-menu-container');
    element.appendChild(menu);
}
    
var addMenuButton = function addMenuButton(name, callback) {
    if(!menu) return false;

    var menuButton = document.createElement('button');
    menuButton.classList.add('mobile-menu-button');
    menuButton.onclick = callback;
    menuButton.textContent = name;

    menu.appendChild(menuButton);
}
    
export default function() {
    return {
        createMenu,
        addMenuButton,
    }
}