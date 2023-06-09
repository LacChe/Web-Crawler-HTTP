export default function newManager() {

    var todos = [];

    function createTodo(name, description, dueDate) {
        let todo = {
            id: Date.now() + Math.random() * 1000,
            name,
            description,
            dueDate,
        }
        return todo;
    }

    // PUBLIC ***********************

    var manager = {
        getTodos: function getTodos() {
            return todos;
        },
        addTodo: function addTodo(name, description, dueDate) {
            todos = [...todos, createTodo(name, description, dueDate)]
        },
        removeTodo: function removeTodo(filterTodo) {
            todos = todos.filter((t) => t.id !== filterTodo.id);
        }
    }

    return manager;
}