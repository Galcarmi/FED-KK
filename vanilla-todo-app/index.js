const elementClasses = {
    todoList:'.todo-list',
    addTODOBtn: '.add-todo-btn',
    todoTxtInput:'.todo-text-input',
}

const elementSelectors = {
    todoList : ()=>document.querySelector(elementClasses.todoList),
    addTodoBtn : ()=> document.querySelector(elementClasses.addTODOBtn),
    todoTxtInput : ()=> document.querySelector(elementClasses.todoTxtInput),
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
        const content = elementSelectors.todoTxtInput().value;
        if(!content) return;

        this.addTodo(content);
        elementSelectors.todoTxtInput().value = '';
    }

    _initEventListeners(){
        elementSelectors.addTodoBtn().addEventListener('click', ()=>{this._handleAddTodoClick()});
    }

    addTodo(content){
        const id = this.todos.length;
        const todo = {content, id};
        this.todos.push(todo);
        this._renderTodo(todo);
    }
}

const todoManager = new TODOManager();

todoManager.addTodo('test');