import { ITodoDTO } from '../DBManager/ITodoDTO';
import { IDAO } from './IDAO';

export class TodoDAO implements IDAO<ITodoDTO> {
  extractItem(item:ITodoDTO): ITodoDTO {
    return {
      content: item.content,
      _id: item._id,
      isDone: item.isDone,
      userId: item.userId,
    };
  }
}

export const todoDAO = new TodoDAO();
