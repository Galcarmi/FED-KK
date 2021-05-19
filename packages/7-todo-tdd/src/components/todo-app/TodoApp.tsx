import React, { ChangeEvent, FC, ReactElement, useContext, useEffect, useState } from 'react';
import { jss } from '../../styles/config';
import { TodoItem } from '../todo-item/TodoItem';
import { ITodoContext, TodoContext } from '../../context/TodoContext';
import withTodosContex from '../HOC/withTodos';

const TodoApp: FC<{}> = (): ReactElement => {
  const [todoInputValue, setTodoInputValue] = useState<string>('');
  const { todosService, todos, setTodos } = useContext<ITodoContext>(TodoContext);

  const onAddClick = async (): Promise<void> => {
    if (todoInputValue) {
      const addedTodo = await todosService.addTodo(todoInputValue);
      todos[addedTodo._id] = addedTodo;
      setTodos({ ...todos });
    }
  }


  useEffect(() => {
    todosService.getAllTodos().then(todos => setTodos({ ...todos }))
  }, [])

  return (
    <div className={s.todo}>
      <div className={s.todo__list}>
        {Object.values(todos).map(todo => <TodoItem key={todo._id} todo={todo} />)}
      </div>
      <input type='text'
        className={s.todo__input}
        onChange={(e: ChangeEvent<HTMLInputElement>) => { setTodoInputValue(e.target.value) }}
        value={todoInputValue} />
      <button className={s.todo__addBtn} onClick={onAddClick}>Add</button>
    </div>
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


export default withTodosContex(TodoApp);
