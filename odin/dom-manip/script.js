const container = document.querySelector('#container');

const content = document.createElement('div');
content.classList.add('content');
content.textContent = 'This is the glorious text-content!';

container.appendChild(content);

const redP = document.createElement('p');
redP.classList.add('red-text');
redP.textContent = "Hey I'm red!";
container.appendChild(redP);

const blueH3 = document.createElement('h3');
blueH3.classList.add('blue-text');
blueH3.textContent = "I'm a blue h3";
container.appendChild(blueH3);

const div = document.createElement('div');
div.classList.add('div');

const h = document.createElement('h1');
h.textContent = "I’m in a div";
div.appendChild(h);

const p = document.createElement('p');
p.textContent = "ME TOO!";
div.appendChild(p);

container.appendChild(div);

const btn = document.querySelector('#btn');
btn.addEventListener('click', function onClick(e) {
    e.target.style.background = 'blue';
})