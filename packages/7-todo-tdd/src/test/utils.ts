import { mount as enzymeMount, ReactWrapper } from 'enzyme';
import { ITodoMap } from 'fed-todo-journey_todo-common';
import { ReactElement } from 'react';
import { todosService } from '../services/TodoService';
import { Chance } from 'chance';

const chance = new Chance();

export const enzymeContainerMount = (component: ReactElement): ReactWrapper =>
  enzymeMount(component, {
    attachTo: document.getElementById('enzymeContainer'),
  });

export const enzymeContainerSetupAndTeardown = (): void => {
  let container: HTMLDivElement | null;

  beforeEach(() => {
    container = document.createElement('div');
    container.id = 'enzymeContainer';
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }

    container = null;
  });
};


export const initTodosServiceMocks = (todos:ITodoMap):void => {
  const mockedGetAllTodos = (todosService.getAllTodos = jest.fn());
  mockedGetAllTodos.mockResolvedValue(todos);

  const mockedAddTodo = (todosService.addTodo = jest.fn());
  mockedAddTodo.mockResolvedValue({
    _id: chance.guid(),
    content: 'doesnt matter',
    isDone: false,
  });

  const mockedEditTodo = (todosService.editTodo = jest.fn());
  mockedEditTodo.mockResolvedValue({
    _id: chance.guid(),
    content: 'doesnt matter',
    isDone: false,
  });

  const mockedDeleteTodo = (todosService.deleteTodo = jest.fn());
  mockedDeleteTodo.mockResolvedValue({
    _id: chance.guid(),
    content: 'doesnt matter',
    isDone: false,
  });
}