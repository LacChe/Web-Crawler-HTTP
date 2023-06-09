import _ from 'lodash';
import projectManager from './projectManager.js'
import todoManager from './todoManager.js'
import './styles.css';

document.body.appendChild(container());
genProjectButtons();

function container() {
    const container = document.createElement('div');
    container.classList.add('container');

    container.appendChild(genHeader());
    container.appendChild(genMain());

    return container;
}

function genHeader() {
    const header = document.createElement('div');
    header.classList.add('header');

    const img = document.createElement('img');
    img.src = '';
    img.alt = 'logo';

    const h1 = document.createElement('h1');
    h1.textContent = 'Todo List';

    header.appendChild(img);
    header.appendChild(h1);

    return header;
}

function genMain() {
    const main = document.createElement('div');
    main.classList.add('main');

    main.appendChild(genSideBar());

    main.appendChild(genContent());

    return main;
}

function genSideBar() {
    const sideBar = document.createElement('div');
    sideBar.classList.add('side-bar');

    const showTasksBtn = document.createElement('button');
    showTasksBtn.textContent = 'Tasks';
    showTasksBtn.onclick = function(){displayDefaultProject()};

    const projectSideBar = document.createElement('div');
    projectSideBar.classList.add('projects-side-bar');

    const projectsSideBarHeader = document.createElement('h2');
    projectsSideBarHeader.textContent = 'Projects';

    const projectSideBarButtons = document.createElement('div');
    projectSideBarButtons.classList.add('projects-side-bar-buttons');
    
    const addProjectContainer = document.createElement('div');
    addProjectContainer.classList.add('add-project-container');
    const addProjectBtn = document.createElement('button');
    addProjectBtn.textContent = 'Add Project';
    addProjectBtn.onclick = displayAddProject;
    addProjectContainer.appendChild(addProjectBtn);

    sideBar.appendChild(showTasksBtn);

    projectSideBar.appendChild(projectsSideBarHeader);
    projectSideBar.appendChild(projectSideBarButtons);
    projectSideBar.appendChild(addProjectContainer);
    sideBar.appendChild(projectSideBar);

    return sideBar;
}

function genContent() {
    const content = document.createElement('div');
    content.classList.add('content');
    content.textContent = 'main';

    return content;
}

function displayDefaultProject(){
    displayProject('default');
}

function displayProject(name){
    console.log(name);
}

function displayAddProject(){
    const addProjectContainer = document.querySelector('.add-project-container');
    addProjectContainer.innerHTML = '';

    const label = document.createElement('label');
    label.textContent = 'Project Name'
    label.setAttribute('for', 'add-project-input');
    addProjectContainer.appendChild(label);

    const input = document.createElement('input');
    input.classList.add('add-project-input');
    input.setAttribute('id', 'add-project-input');
    addProjectContainer.appendChild(input);

    const add = document.createElement('button');
    add.textContent = 'Add';
    add.onclick = addProject;
    addProjectContainer.appendChild(add);

    const cancel = document.createElement('button');
    cancel.textContent = 'Cancel';
    cancel.onclick = resetAddProject;
    addProjectContainer.appendChild(cancel);
}

function resetAddProject() {
    const addProjectContainer = document.querySelector('.add-project-container');
    addProjectContainer.innerHTML = '';

    const addProjectBtn = document.createElement('button');
    addProjectBtn.textContent = 'Add Project';
    addProjectBtn.onclick = displayAddProject;
    addProjectContainer.appendChild(addProjectBtn);
}

function addProject() {
    const input = document.querySelector('.add-project-input');
    if(input.value !== '') projectManager.addProject(input.value);
    resetAddProject();
    genProjectButtons();
}

function genProjectButtons() {
    const buttons = document.querySelector('.projects-side-bar-buttons');
    buttons.innerHTML = '';
    
    for(let n of projectManager.getProjectNames()) {
        const projectBtnDiv = document.createElement('div');

        const projectBtn = document.createElement('button');
        projectBtn.onclick = function(){displayProject(n)};
        projectBtn.textContent = n;

        const projectRemoveBtn = document.createElement('button');
        projectRemoveBtn.onclick = function(){
            projectManager.removeProject(n)
            genProjectButtons();
        };
        projectRemoveBtn.textContent = 'X';

        projectBtnDiv.appendChild(projectBtn);
        projectBtnDiv.appendChild(projectRemoveBtn);
        buttons.appendChild(projectBtnDiv);
    }
}