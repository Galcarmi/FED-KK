export class Model{
    constructor(){
        this.todos = [];
    }

    addTodo(todo){
        this.todos.push(todo);
    }

    deleteTodoById(id){
        const deletedIndex = this.todos.findIndex(todo=>todo.id === id);
        this.todos.splice(deletedIndex,1);
    }

    editTodoContentById({id, content}){
        const editedIndex = this.todos.findIndex(todo=>todo.id === id);
        this.todos[editedIndex].content = content;
    }
}