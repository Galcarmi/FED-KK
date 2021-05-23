import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { todosService } from '../services/TodoService';
import { Chance } from 'chance';

const chance = new Chance();
enzyme.configure({ adapter: new Adapter() });

jest.mock('../services/TodoService');

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
