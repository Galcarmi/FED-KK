export class Model {
  constructor() {
    this.todos = [];
  }

  addTodo(content) {
    const generateId = this._generateUUIDV4();
    const todo = { id: generateId, content };
    this.todos.push(todo);
    return todo;
  }

  deleteTodoById(id) {
    const deletedIndex = this.todos.findIndex((todo) => todo.id === id);
    this.todos.splice(deletedIndex, 1);
  }

  editTodoContentById({ id, content }) {
    const editedIndex = this.todos.findIndex((todo) => todo.id === id);
    this.todos[editedIndex].content = content;
  }

  getTodoItemById(id) {
    console.log(id, this.todos);
    return this.todos.find((todo) => todo.id === id);
  }

  getTodos() {
    return this.todos;
  }

  setTodos(todos) {
    this.todos = [...todos];
  }

  _generateUUIDV4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
