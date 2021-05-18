import { ITodoMap } from 'fed-todo-journey_todo-common';
import React, { Component, FC, useState } from 'react';
import { TodoContext, TodosState } from '../../context/TodoContext';
import { todosService } from '../../services/TodoService';

const withTodos = <Props extends Object>(WrappedComponent:FC<Props>) => (props:Props) =>{

  const [todos, setTodos] = useState<ITodoMap>({});
  console.log('render', todos)

  return (
    <TodoContext.Provider value={new TodosState(todos, setTodos, todosService)} >
      <WrappedComponent {...props}/>
    </TodoContext.Provider>
  );
}

// const withTodos = <Props extends Object>(WrappedComponent: FC<Props>) =>
//     class TodosWrapper extends Component<{}, ITodoMap>{
//       wrappedProps:Props;

//       constructor(props:Props) {
//         super(props);
//         this.wrappedProps = props;
//       }

//       render() {
//         return (
//           <TodoContext.Provider value={new TodosState(this.state, this.setState, new TodosService())} >
//             <WrappedComponent {...this.wrappedProps} />
//           </TodoContext.Provider>)
//       }
//     }

export default withTodos;