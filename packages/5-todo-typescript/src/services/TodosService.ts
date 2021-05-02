import axios from 'axios';
import { ITodoDTO } from 'fed-todo-journey_todo-common';
class TodosService {
  async addTodo(todo: ITodoDTO): Promise<ITodoDTO> {
    const res = await axios.post<ITodoDTO>(`/todo`, todo);
    return res.data;
  }

  async deleteTodo(_id: string): Promise<ITodoDTO> {
    const res = await axios.delete<ITodoDTO>(`/todo/${_id}`);
    return res.data;
  }

  async editTodo(todo: Partial<ITodoDTO>): Promise<ITodoDTO> {
    const res = await axios.put<ITodoDTO>(`/todo`, todo);
    return res.data;
  }

  async getAllTodos(): Promise<ITodoDTO[]> {
    const res = await axios.get<ITodoDTO[]>(`/todos`);
    return res.data;
  }
}

export const todosService = new TodosService();
