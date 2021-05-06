import React, { FC, ReactElement } from 'react';
import { Container } from './components/container/Container';
import { TodoApp } from './components/todo-app/TodoApp'

const App: FC = (): ReactElement => {
  return (
    <Container>
      <TodoApp />
    </Container>
  );
}

export default App;
