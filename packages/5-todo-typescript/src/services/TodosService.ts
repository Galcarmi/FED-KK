import axios, { AxiosResponse } from 'axios';
import { ITodoDTO } from 'fed-todo-journey_todo-common';
import { ITodoPartialDTO } from '../mvvc/ITodoPartialDTO';
class TodosService {
  async addTodo(todo: ITodoPartialDTO): Promise<ITodoDTO> {
    const res: AxiosResponse<ITodoDTO> = await axios.post<ITodoDTO>(
      `/todo`,
      todo
    );
    return res.data;
  }

  async deleteTodo(_id: string): Promise<ITodoDTO> {
    const res: AxiosResponse<ITodoDTO> = await axios.delete<ITodoDTO>(
      `/todo/${_id}`
    );
    return res.data;
  }

  async editTodo(todo: Partial<ITodoDTO>): Promise<ITodoDTO> {
    const res: AxiosResponse<ITodoDTO> = await axios.put<ITodoDTO>(
      `/todo`,
      todo
    );
    return res.data;
  }

  async getAllTodos(): Promise<{ [key: string]: ITodoDTO }> {
    const res: AxiosResponse<{ [key: string]: ITodoDTO }> = await axios.get<{
      [key: string]: ITodoDTO;
    }>(`/todos`);
    return res.data;
  }
}

export const todosService = new TodosService();
