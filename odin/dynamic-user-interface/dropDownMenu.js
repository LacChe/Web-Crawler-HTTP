var menus = [];

var addMenu = function addMenu(element, name) {
    var menuContainer = document.createElement('div');
    menuContainer.classList.add('menu-container');

    var menuButton = document.createElement('button');
    menuButton.textContent = name;
    menuButton.onclick = function() {
        let children = menuContainer.childNodes;
        for(let i = 1; i < children.length; i++) {
            children[i].classList.toggle('hidden');
        }
    }

    menuContainer.appendChild(menuButton);
    menus.push(menuContainer);

    element.appendChild(menuContainer);
}

var getMenu = function getMenu() {
    return menus;
}

var addItemToMenu = function addItemToMenu(index, element) {
    menus[index].appendChild(element);
}

var clearMenus = function clearMenus() {
    menus = [];
}


export default function() {
    return {
        addMenu,
        getMenu,
        addItemToMenu,
        clearMenus,
    }
}