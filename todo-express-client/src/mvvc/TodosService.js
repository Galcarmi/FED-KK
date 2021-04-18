import axios from 'axios';

class TodosService {
  constructor() {}

  async addTodo(todo) {
    const res = await axios.post(`/todo`, todo);
    return res.data;
  }

  async deleteTodo(id) {
    const res = await axios.delete(`/todo/${id}`);
    return res.data;
  }

  async editTodo(todo) {
    const res = await axios.put(`/todo`, todo);
    return res.data;
  }

  async getAllTodos() {
    const res = await axios.get(`/todos`);
    return res.data;
  }
}

export const todosService = new TodosService();
