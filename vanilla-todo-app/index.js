const elementClasses = {
    todoList:'.todo-list',
}

const elementSelectors = {
    todoList : ()=>{return document.querySelector(elementClasses.todoList)},
}

class TODOManager{
    constructor(){
        this.todos = [];
        this._initEventListeners();
    }


    _getTODOTemplate({content, id}){
        return `<div class="todo-item" id="${id}">
        <p>${content}</p>
    </div>`
    }

    _renderTodo({content, id}){
        const todoHTMLList = elementSelectors.todoList();
        todoHTMLList.insertAdjacentHTML('beforeend', this._getTODOTemplate({content, id}))
    }

    _handleAddTodoClick(){
        
    }

    _initEventListeners(){

    }

    addTodo(content){
        const id = this.todos.length;
        const todo = {content, id};
        this.todos.push(todo);
        this._renderTodo(todo);
    }
}

const todoManager = new TODOManager();

console.log('test');
todoManager.addTodo('blablabla');
todoManager.addTodo('bsdfdsffsda');