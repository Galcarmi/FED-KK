import React, { ChangeEvent, FC, ReactElement, useContext, useEffect, useState } from 'react';
import { jss } from '../../styles/config';
import { TodoItem } from '../todo-item/TodoItem';
import { ITodoContext, TodoContext } from '../../context/TodoContext';
import withTodosContex from '../HOC/withTodos';
import { ITodoDTO } from 'fed-todo-journey_todo-common';
import { commonStyles, colors } from '../../styles/commonStyles';

const TodoApp: FC<{}> = (): ReactElement => {
  const [todoInputValue, setTodoInputValue] = useState<string>('');
  const { todosService, todos, setTodos } = useContext<ITodoContext>(TodoContext);

  const onAddClick = async (): Promise<void> => {
    addTodo();
  }

  const onTodoInputEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      addTodo();
    }
  }

  const addTodo = async (): Promise<void> => {
    if (todoInputValue) {
      const addedTodo: ITodoDTO = await todosService.addTodo(todoInputValue);
      todos[addedTodo._id] = addedTodo;
      setTodos({ ...todos });
    }
  }


  useEffect(() => {
    todosService.getAllTodos().then(todos => setTodos({ ...todos }))
  }, [])

  return (
    <div className={s.container}>
      <div className={s.todo}>
        <div className={s.todo__list}>
          {Object.values(todos).map(todo => <TodoItem key={todo._id} todo={todo} />)}
        </div>
        <input type='text'
          className={s.todo__input}
          onChange={(e: ChangeEvent<HTMLInputElement>) => { setTodoInputValue(e.target.value) }}
          value={todoInputValue}
          onKeyPress={onTodoInputEnter} />
        <button className={s.todo__addBtn} onClick={onAddClick}>Add</button>
      </div>
    </div>
  );
}

export const s = jss
  .createStyleSheet({
    container: {
      height: '100vh',
      ...commonStyles.RLMarginLPercent,
    },
    '@media only screen and (max-width: 600px)': {
      container: {
        ...commonStyles.RLMarginMPercent,
      },
    },
    '@media only screen and (max-width: 400px)': {
      container: {
        ...commonStyles.RLMarginSPercent,
      },
    },
    todo: {
      ...commonStyles.TpaddingXXS,
      ...commonStyles.boxShadowM,
      backgroundColor: colors.white,
      minHeight: '100%',
      width: '100%',
      position: 'relative',
    },
    todo__list: {
      paddingBottom: `${commonStyles.minTodoItemHeight.minHeight.split('px')[0]
        }px`,
    },
    todo__input: {

    },
    todo__addBtn: {

    },
  })
  .attach().classes;


export default withTodosContex(TodoApp);
