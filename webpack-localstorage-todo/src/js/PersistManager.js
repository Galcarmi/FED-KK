export class PersistManager{
    constructor(){};

    getPersistedTodos(){
        const todosJSON = localStorage.getItem("todos");

        return todosJSON ? JSON.parse(todosJSON) : [];
    }

    persistTodos(todos){
        localStorage.setItem("todos", JSON.stringify(todos));
    }
}
