import { ITodoDTO, ITodoMap } from 'fed-todo-journey_todo-common';
import { TodosActions } from './TodosActions';
import { TodosState } from './TodosState';

const TodosReducer = (
  state: { todos: ITodoMap },
  action: { type: TodosActions; payload: ITodoMap | ITodoDTO }
): TodosState => {
  switch (action.type) {
    case TodosActions.ADD_EDIT_TODO: {
      const todoToAddEdit: ITodoDTO = <ITodoDTO>action.payload;
      state.todos[todoToAddEdit._id] = todoToAddEdit;
      return {
        ...state,
        todos: { ...state.todos },
      };
    }
    case TodosActions.REMOVE_TODO: {
      const todoToDelete: ITodoDTO = <ITodoDTO>action.payload;
      delete state.todos[todoToDelete._id];
      return {
        ...state,
        todos: { ...state.todos },
      };
    }
    case TodosActions.SET_TODOS: {
      const todosToSet: ITodoMap = <ITodoMap>action.payload;
      return {
        ...state,
        todos: { ...todosToSet },
      };
    }
    default:
      return state;
  }
};

export default TodosReducer;
