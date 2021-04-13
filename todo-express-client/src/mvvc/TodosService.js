import axios from 'axios';

const serverUrl = 'http://localhost:8000';

class TodosService {
  constructor() {}

  async addTodo(todo) {
    const res = await axios.post(`${serverUrl}/todo`, todo);
    return res.data;
  }

  async deleteTodo(id) {
    const res = await axios.delete(`${serverUrl}/todo/${id}`);
    return res.data;
  }

  async editTodo(todo) {
    const res = await axios.put(`${serverUrl}/todo`, todo);
    return res.data;
  }

  async getAllTodos() {
    const res = await axios.get(`${serverUrl}/todos`);
    return res.data;
  }
}

export const todosService = new TodosService();
