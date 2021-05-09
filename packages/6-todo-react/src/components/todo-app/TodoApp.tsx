import React, { FC, ReactElement, useContext, useEffect } from 'react';
import { jss } from '../../styles/jss';
import { colors, commonStyles } from '../../styles/commonStyles';
import { Context } from '../../context/Store';
import { ITodoDTO } from 'fed-todo-journey_todo-common';
import { TodoItem } from './todo-item/TodoItem';
import { TodoInput } from './todo-input/TodoInput';
import { todosService } from '../../services/TodosService';
import { TodosActions } from '../../context/TodosActions';

export const TodoApp: FC = (): ReactElement => {
  const { state, dispatch } = useContext(Context);

  const todosAsArray: ITodoDTO[] = Object.values(state.todos);

  const getTodoItem = (todoItem: ITodoDTO) => <TodoItem todo={todoItem} key={todoItem._id} />
  const getEmptyState = () => <div className={s.todoApp__list__emptyState}>Add your first TODO !</div>;

  useEffect(() => {
    todosService.getAllTodos().then(todos => {
      dispatch({ type: TodosActions.SET_TODOS, payload: todos })
    })
  }, [])
  
  return (<div className={s.todoApp}>
    <div className={s.todoApp__list}>
      {todosAsArray.length ? todosAsArray.map(todo => getTodoItem(todo)) : getEmptyState()}
    </div>
    <TodoInput />
  </div>);
};

export const s = jss
  .createStyleSheet({
    todoApp: {
      ...commonStyles.TpaddingXXS,
      ...commonStyles.boxShadowM,
      backgroundColor: colors.white,
      minHeight: '100%',
      width: '100%',
      position: 'relative',
    },
    todoApp__list: {
      paddingBottom: `${commonStyles.minTodoItemHeight.minHeight.split('px')[0]
        }px`,
    },
    todoApp__list__emptyState: {
      ...commonStyles.fontS,
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
  })
  .attach().classes;
