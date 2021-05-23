import { ReactWrapper } from 'enzyme';
import TodoApp, { s as appStyles } from './TodoApp';
import { s as todoItemStyles } from '../todo-item/TodoItem';
import { wrapperGenerator } from '../../styles/utils';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { ITodoDTO, ITodoMap } from 'fed-todo-journey_todo-common';
import { s as commonStyles } from '../../styles/commonClasses';
import { todosService } from '../../services/TodoService';
import { Chance } from 'chance';

const chance = new Chance();
const c = wrapperGenerator('.');

export class TodoAppDriver {
  public mountedTodoApp!: ReactWrapper;

  public todoInputInsertContent(content: string): void {
    this.mountedTodoApp
      .find(c(appStyles.todo__inputContainer__input))
      .simulate('change', { target: { value: content } });
  }

  public clickOnAddBtn(): void {
    this.mountedTodoApp
      .find(c(appStyles.todo__inputContainer__addBtn))
      .simulate('click');
  }

  public pressEnterOnTodoInput(): void {
    this.mountedTodoApp
      .find(c(appStyles.todo__inputContainer__input))
      .simulate('keypress', { key: 'Enter' });
  }

  public getTodosCount(): number {
    return this.mountedTodoApp.find(c(todoItemStyles.todo__list__item)).length;
  }

  public getAppComponent(): ReactWrapper {
    return this.mountedTodoApp;
  }

  public async waitForAppToUpdate(): Promise<void> {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve));
      this.mountedTodoApp.update();
    });
  }

  public getTodos(): ITodoMap {
    const todos: ITodoMap = {};
    this.mountedTodoApp
      .find(c(todoItemStyles.todo__list__item))
      .forEach((todoElement) => {
        const _id: string = todoElement
          .getDOMNode()
          .getAttribute('id') as string;
        const contentElement = todoElement.find(
          c(todoItemStyles.todo__list__item__content)
        );
        const content: string = contentElement.getDOMNode().innerHTML;
        const isDone: boolean = contentElement
          .getDOMNode()
          .classList.contains(commonStyles.crossedContent);
        todos[_id] = { _id, content, isDone, userId: '' };
      });

    return todos;
  }

  public getFirstTodoItemWrapper(): ReactWrapper {
    return this.mountedTodoApp.find(c(todoItemStyles.todo__list__item)).first();
  }

  public getTodoInputContent(): string {
    return (
      this.mountedTodoApp
        .find(c(appStyles.todo__inputContainer__input))
        .getDOMNode() as HTMLInputElement
    ).value;
  }

  public getFirstTodo(): ITodoDTO {
    return this.extractFirstTodoFromMap(this.getTodos());
  }

  public static async givenTodos(todos: ITodoMap = {}): Promise<TodoAppDriver> {
    const mockedGetAllTodos = (todosService.getAllTodos = jest.fn());
    mockedGetAllTodos.mockResolvedValue(todos);

    const todoAppDriver: TodoAppDriver = new TodoAppDriver();
    todoAppDriver.mountTodoApp();
    await todoAppDriver.waitForAppToUpdate();

    return todoAppDriver;
  }

  public mountTodoApp() {
    this.mountedTodoApp = mount(<TodoApp />);
  }

  public static generateTodosMapWithSingleTodo(todo?: ITodoDTO): ITodoMap {
    const todos: ITodoMap = {};
    todo = todo || {
      _id: chance.guid(),
      content: chance.word(),
      isDone: chance.bool(),
      userId: chance.guid(),
    };
    todos[todo._id] = todo;

    return todos;
  }

  public extractFirstTodoFromMap(todos: ITodoMap): ITodoDTO {
    return Object.values(todos)[0];
  }
}
