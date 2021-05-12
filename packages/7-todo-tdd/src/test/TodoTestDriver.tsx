import { ReactWrapper } from 'enzyme';
import App, { s } from '../components/root-components/App';
import { wrapperGenerator } from '../styles/utils';
import { mount } from './config';
import { TodosServiceMock } from './TodosServiceMock';
import { act } from 'react-dom/test-utils';

const h = wrapperGenerator('.');

export class TodoTestDriver {
  private app: ReactWrapper;
  private serviceMock: TodosServiceMock;

  constructor() {
    this.serviceMock = new TodosServiceMock();
    this.app = mount(<App todosService={this.serviceMock} />);
  }

  public todoInputInsertContent(content: string): void {
    this.app
      .find(h(s.todo__input))
      .simulate('change', { target: { value: content } });
  }

  public clickOnAddBtn(): void {
    this.app.find(h(s.todo__addBtn)).simulate('click');
  }

  public getTodosCount(): number {
    return this.app.find(h(s.todo__list__item)).length;
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
}
