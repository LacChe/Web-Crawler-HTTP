import './styles.css';
import home from './home.js';
import menu from './menu.js';
import contact from './contact.js';

var main = document.querySelector('#content');
main.classList.add('main');

var homeBtn = document.createElement('button');
homeBtn.onclick = function() {home(component)};
homeBtn.textContent = 'Home';
main.appendChild(homeBtn);

var menuBtn = document.createElement('button');
menuBtn.onclick = function() {menu(component)};
menuBtn.textContent = 'Menu';
main.appendChild(menuBtn);

var contactBtn = document.createElement('button');
contactBtn.onclick = function() {contact(component)};
contactBtn.textContent = 'Contact';
main.appendChild(contactBtn);

var component = document.createElement('div');
main.appendChild(component);

home(component);