import React, { FC, ReactElement } from 'react';
import { Container } from './components/container/Container';
import { TodoApp } from './components/todo-app/TodoApp'
import Store from './context/Store';

const App: FC = (): ReactElement => {
  return (
    <Store>
      <Container>
        <TodoApp />
      </Container>
    </Store>
  );
}

export default App;
