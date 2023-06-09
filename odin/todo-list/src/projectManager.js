
var projects = [
    createProject('default')
];

function createProject(name){
    let project = {
        name,
        tasks: []
    }
    return project;
}

// PUBLIC ***********************

var getDefaultProject = function getDefaultProject(){
    return projects.filter((p) => p.name === 'default');
}

var getProject = function getProject(filterName){
    return projects.filter((p) => p.name === filterName);
}

var addProject = function addProject(filterName){
    projects = [...projects, createProject(filterName)];
}

var removeProject = function removeProject(filterName){
    projects = projects.filter((p) => p.name !== filterName);
}

var getProjectNames = function getProjectNames() {
    var ret = projects.map((p) => p.name);
    ret = ret.filter((n) => n !== 'default');
    return ret;
}

var projectManager = {
    getDefaultProject,
    getProject,
    addProject,
    removeProject,
    getProjectNames
}

export default projectManager;