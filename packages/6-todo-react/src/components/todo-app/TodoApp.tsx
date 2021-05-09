import React, { FC, ReactElement, useContext } from 'react';
import { jss } from '../../styles/jss';
import { colors, commonStyles } from '../../styles/commonStyles';
import { Context } from '../../context/Store';
import { ITodoDTO } from 'fed-todo-journey_todo-common';
import { TodoItem } from './todo-item/TodoItem';
import { TodoInput } from './todo-input/TodoInput';

export const TodoApp: FC = (): ReactElement => {
  const { state } = useContext(Context);

  const todosAsArray: ITodoDTO[] = Object.values(state.todos);

  const getTodoItem = (todoItem: ITodoDTO) => <TodoItem content={todoItem.content} isDone={todoItem.isDone} _id={todoItem._id} />
  const getEmptyState = () => <div className={s.todoApp__list__emptyState}>Add your first TODO !</div>;

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
