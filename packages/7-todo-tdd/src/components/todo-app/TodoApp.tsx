import { ITodoMap } from 'fed-todo-journey_todo-common';
import React, { ChangeEvent, FC, ReactElement, useContext, useEffect, useState } from 'react';
import { ITodosService } from '../../services/ITodoService';
import { jss } from '../../styles/config';
import { TodoItem } from '../todo-item/TodoItem';
import { TodoContext, TodosState } from '../../context/TodoContext';

interface TodosAppProps {
  todosService: ITodosService
}

const TodoApp: FC<TodosAppProps> = ({ todosService }): ReactElement => {
  const [todoInputValue, setTodoInputValue] = useState<string>('');
  const [todos, setTodos] = useState<ITodoMap>({});

  const onAddClick = async (): Promise<void> => {
    if (todoInputValue) {
      const addedTodo = await todosService.addTodo(todoInputValue);
      todos[addedTodo._id] = addedTodo;
      setTodos({ ...todos });
    }
  }


  useEffect(() => {
    todosService.getAllTodos().then(todos => setTodos  ({ ...todos }))
  }, [])

  return (
    <TodoContext.Provider value={new TodosState(todos, setTodos)} >
      <div className={s.todo}>
        <div className={s.todo__list}>
          {Object.values(todos).map(todo => <TodoItem todosService={todosService} key={todo._id} todo={todo} />)}
        </div>
        <input type='text'
          className={s.todo__input}
          onChange={(e: ChangeEvent<HTMLInputElement>) => { setTodoInputValue(e.target.value) }}
          value={todoInputValue} />
        <button className={s.todo__addBtn} onClick={onAddClick}>Add</button>
      </div>
    </TodoContext.Provider>
  );
}

export const s = jss
  .createStyleSheet({
    todo: {

    },
    todo__list: {

    },
    todo__input: {

    },
    todo__addBtn: {

    },
  })
  .attach().classes;


export default TodoApp;
