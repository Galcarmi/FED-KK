import { ITodoDTO, ITodoMap } from 'fed-todo-journey_todo-common';
import React, { ChangeEvent, FC, ReactElement, useEffect, useState } from 'react';
import { ITodosService } from '../../services/ITodoService';
import { s as commonStyles } from '../../styles/commonClasses';
import { jss } from '../../styles/config';

interface AppProps {
  todosService: ITodosService
}

const App: FC<AppProps> = ({ todosService }): ReactElement => {
  const [todos, setTodos] = useState<ITodoMap>({})
  const [todoInputValue, setTodoInputValue] = useState<string>('');

  const onAddClick = async (): Promise<void> => {
    if (todoInputValue) {
      const addedTodo = await todosService.addTodo(todoInputValue);
      todos[addedTodo._id] = addedTodo;
      setTodos({ ...todos });
    }
  }

  const renderTodo = (todo: ITodoDTO) =>
    <div id={todo._id}
      className={s.todo__list__item}
      key={todo._id}>
      <div className={`${s.todo__list__item__content} ${todo.isDone && commonStyles.crossedContent}`}>{todo.content}</div>
    </div>


  useEffect(() => {
    todosService.getAllTodos().then(todos => setTodos(todos))
  }, [])

  return (
    <div className={s.todo}>
      <div className={s.todo__list}>
        {Object.values(todos).map(renderTodo)}
      </div>
      <input type='text'
        className={s.todo__input}
        onChange={(e: ChangeEvent<HTMLInputElement>) => { setTodoInputValue(e.target.value) }}
        value={todoInputValue} />
      <button className={s.todo__addBtn} onClick={onAddClick}></button>
    </div>
  );
}

export const s = jss
  .createStyleSheet({
    todo: {

    },
    todo__list: {

    },
    todo__list__item: {

    },
    todo__list__item__content: {

    },
    todo__list__item__actions: {

    },
    todo__list__item__actions__done: {

    },
    todo__list__item__actions__delete: {

    },
    todo__list__item__actions__edit: {

    },
    todo__input: {

    },
    todo__addBtn: {

    },
  })
  .attach().classes;


export default App;
