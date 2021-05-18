import { ITodoMap } from 'fed-todo-journey_todo-common';
import React, { FC, useState } from 'react';
import { TodoContext, TodosState } from '../../context/TodoContext';
import { TodosService } from '../../services/TodoService';

const withTodos = <Props extends Object>(Component:FC<Props>) => (props:Props) =>{
  
  const [todos, setTodos] = useState<ITodoMap>({});

  return (
    <TodoContext.Provider value={new TodosState(todos, setTodos, new TodosService())} >
      <Component {...props}/>
    </TodoContext.Provider>
  );
}

export default withTodos;
