import _ from 'lodash';
import projectManager from './projectManager.js'
import todoManager from './todoManager.js'
import './styles.css';

document.body.appendChild(container());
genProjectButtons();
displayDefaultProject();

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

    return content;
}

function displayDefaultProject(){
    displayProject('default');
}

function displayProject(name){
    const content = document.querySelector('.content');
    content.innerHTML = ''

    const projectName = document.createElement('h1');
    projectName.textContent = name === 'default' ? 'Todos' : name;
    content.appendChild(projectName);

    for(let t of projectManager.getProject(name).todos.getTodos()) {
        const todoBtnDiv = document.createElement('div');
        todoBtnDiv.classList.add('todo-list-item');

        const todoRemoveBtn = document.createElement('button');
        todoRemoveBtn.onclick = function(){
            projectManager.getProject(name).todos.removeTodo(t);
            displayProject(name);
        };
        todoRemoveBtn.textContent = 'O';
        todoBtnDiv.appendChild(todoRemoveBtn);

        const todoDueDate = document.createElement('p');
        todoDueDate.textContent = 'Due: ' + t.dueDate;
        todoBtnDiv.appendChild(todoDueDate);

        const todoname = document.createElement('p');
        todoname.textContent = t.name;
        todoBtnDiv.appendChild(todoname);

        const todoDesc = document.createElement('p');
        todoDesc.textContent = t.description;
        todoBtnDiv.appendChild(todoDesc);
        
        content.appendChild(todoBtnDiv);
    }

    const addTaskContainer = document.createElement('div');
    addTaskContainer.classList.add('add-todo-container');
    const addTaskBtn = document.createElement('button');
    addTaskBtn.textContent = 'Add Task';
    addTaskBtn.onclick = function() {displayAddTask(name)};
    addTaskContainer.appendChild(addTaskBtn);

    content.appendChild(addTaskContainer);
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

function displayAddTask(projectName){
    const addTaskContainer = document.querySelector('.add-todo-container');
    addTaskContainer.innerHTML = '';

    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Name'
    nameLabel.setAttribute('for', 'add-todo-name-input');
    addTaskContainer.appendChild(nameLabel);
    addTaskContainer.appendChild(document.createElement('br'));
    const nameInput = document.createElement('input');
    nameInput.classList.add('add-todo-name-input');
    nameInput.setAttribute('id', 'add-todo-name-input');
    addTaskContainer.appendChild(nameInput);
    addTaskContainer.appendChild(document.createElement('br'));

    const descLabel = document.createElement('label');
    descLabel.textContent = 'Description'
    descLabel.setAttribute('for', 'add-todo-desc-input');
    addTaskContainer.appendChild(descLabel);
    addTaskContainer.appendChild(document.createElement('br'));
    const descInput = document.createElement('input');
    descInput.classList.add('add-todo-desc-input');
    descInput.setAttribute('id', 'add-todo-desc-input');
    addTaskContainer.appendChild(descInput);
    addTaskContainer.appendChild(document.createElement('br'));

    const dueDateLabel = document.createElement('label');
    dueDateLabel.textContent = 'Due Date'
    dueDateLabel.setAttribute('for', 'add-todo-dueDate-input');
    addTaskContainer.appendChild(dueDateLabel);
    addTaskContainer.appendChild(document.createElement('br'));
    const dueDateInput = document.createElement('input');
    dueDateInput.classList.add('add-todo-dueDate-input');
    dueDateInput.setAttribute('id', 'add-todo-dueDate-input');
    dueDateInput.setAttribute("type", "date");
    addTaskContainer.appendChild(dueDateInput);
    addTaskContainer.appendChild(document.createElement('br'));

    const add = document.createElement('button');
    add.textContent = 'Add';
    add.onclick = function() {addTask(projectName)};
    addTaskContainer.appendChild(add);

    const cancel = document.createElement('button');
    cancel.textContent = 'Cancel';
    cancel.onclick = resetAddTask;
    addTaskContainer.appendChild(cancel);
}

function resetAddTask() {
    const addTaskContainer = document.querySelector('.add-todo-container');
    addTaskContainer.innerHTML = '';

    const addTaskBtn = document.createElement('button');
    addTaskBtn.textContent = 'Add Task';
    addTaskBtn.onclick = displayAddTask;
    addTaskContainer.appendChild(addTaskBtn);
}

function addTask(projectName) {
    const nameInput = document.querySelector('.add-todo-name-input');
    const descInput = document.querySelector('.add-todo-desc-input');
    const dueDateInput = document.querySelector('.add-todo-dueDate-input');
    console.log(nameInput.value, descInput.value, dueDateInput.value)
    
    if(nameInput.value !== '' && dueDateInput.value !== '') {
        projectManager.getProject(projectName).todos.addTodo(nameInput.value, descInput.value, dueDateInput.value);
    }
    
    resetAddTask();
    displayProject(projectName);
}
