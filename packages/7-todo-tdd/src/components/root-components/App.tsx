import { ITodoMap } from 'fed-todo-journey_todo-common';
import React, { ChangeEvent, FC, ReactElement, useState } from 'react';
import { ITodosService } from '../../services/ITodoService';
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
      setTodos({ ...todos, addedTodo });
    }
  }
  return (
    <div className={s.todo}>
      <div className={s.todo__list}>
        {Object.values(todos).map(todo => <div className={s.todo__list__item} key={todo._id}>{todo.content}</div>)}
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
