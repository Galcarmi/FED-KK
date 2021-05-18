import { ITodoMap } from 'fed-todo-journey_todo-common';
import React, { FC, useState } from 'react';
import { TodoContext, TodosState } from '../../context/TodoContext';
import { TodosService } from '../../services/TodoService';

const withTodos = (Component:FC<{}>) => () =>{
  
  const [todos, setTodos] = useState<ITodoMap>({});

  return (
    <TodoContext.Provider value={new TodosState(todos, setTodos, new TodosService())} >
      <Component></Component>
    </TodoContext.Provider>
  );
}

export default withTodos;
