import { ReactWrapper } from 'enzyme';
import App, { s as appStyles } from './App';
import { s as todoItemStyles } from '../todo-item/TodoItem';
import { wrapperGenerator } from '../../styles/utils';
import { mount } from '../../test/config';
import { TodosServiceMock } from '../../test/TodosServiceMock';
import { act } from 'react-dom/test-utils';
import { ITodoMap } from 'fed-todo-journey_todo-common';
import { s as commonStyles } from '../../styles/commonClasses';

const c = wrapperGenerator('.');

export class AppDriver {
  private app: ReactWrapper;
  private serviceMock: TodosServiceMock;

  constructor(todos?: ITodoMap) {
    this.serviceMock = new TodosServiceMock(todos);
    this.app = mount(<App todosService={this.serviceMock} />);
  }

  public todoInputInsertContent(content: string): void {
    this.app
      .find(c(appStyles.todo__input))
      .simulate('change', { target: { value: content } });
  }

  public clickOnAddBtn(): void {
    this.app.find(c(appStyles.todo__addBtn)).simulate('click');
  }

  public getTodosCount(): number {
    return this.app.find(c(todoItemStyles.todo__list__item)).length;
  }

  public getAppComponent(): ReactWrapper {
    return this.app;
  }

  public async waitForAppToUpdate(): Promise<void> {
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve));
      this.app.update();
    });
  };

  public getTodos(): ITodoMap {
    const todos: ITodoMap = {};
    this.app.find(c(todoItemStyles.todo__list__item)).forEach(todoElement => {
      const _id: string = (todoElement.getDOMNode().getAttribute('id')) as string;
      const contentElement = todoElement.find(c(todoItemStyles.todo__list__item__content));
      const content: string = contentElement.getDOMNode().innerHTML;
      const isDone: boolean = contentElement.getDOMNode().classList.contains(commonStyles.crossedContent);
      todos[_id] = { _id, content, isDone, userId: '' }
    })

    return todos;
  }
}
