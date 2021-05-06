import { ITodoDTO } from 'fed-todo-journey_todo-common';
import { TodosActions } from './TodosActions';
import { TodosPayload } from './TodosPayload';

const TodosReducer = (state:ITodoDTO, action: TodosActions) :TodosPayload=> {
  switch (action) {
    case TodosActions.ADD_TODO:
      return {
        ...state,
        todos: action.payload,
      };
    case TodosActions.EDIT_TODO:
      return {
        ...state,
        todos: state.posts.concat(action.payload),
      };
    case TodosActions.REMOVE_TODO:
      return {
        ...state,
        todos: state.posts.filter((post) => post.id !== action.payload),
      };
    case TodosActions.SET_TODOS:
        return {
            ...state,
            todos: state.posts.concat(action.payload),
          };
    default:
      return state;
  }
};

export default Reducer;
