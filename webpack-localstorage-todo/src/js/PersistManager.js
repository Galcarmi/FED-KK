class PersistManager{
    constructor(){};

    getSavedTodos(){
        const todosJSON = localStorage.getItem("todos");

        return todosJSON ? JSON.parse(todosJSON) : [];
    }

    persistTodos(todos){
        localStorage.setItem("todos", JSON.stringify(todos));
    }
}

export const persistManager = new PersistManager();