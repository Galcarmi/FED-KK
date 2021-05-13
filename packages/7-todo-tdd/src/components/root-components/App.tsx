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
      className={`${s.todo__list__item} ${todo.isDone && commonStyles.crossedContent}`}
      key={todo._id}>{todo.content}</div>


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
    todo__input: {

    },
    todo__addBtn: {

    }
  })
  .attach().classes;


export default App;
