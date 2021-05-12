import { ReactWrapper } from 'enzyme';
import { wrapperGenerator } from '../../styles/utils';
import { TodoTestDriver } from '../../test/TodoTestDriver';
import { s } from './App';

const h = wrapperGenerator('.');


describe('app main components should be rendered', () => {
    let app: ReactWrapper;

    beforeEach(() => {
        app = new TodoTestDriver().getAppComponent();
    });

    it('app should be rendered', () => {
        expect(app.exists()).toBe(true);
    });

    it('todo input should be rendered', () => {
        expect(app.find(h(s.todo__input)).exists()).toBe(true);
    });

    it('todo list should be rendered', () => {
        expect(app.find(h(s.todo__list)).exists()).toBe(true);
    });

    it('add btn should be rendered', () => {
        expect(app.find(h(s.todo__addBtn)).exists()).toBe(true);
    });
});

describe('checks todo list - add functionality', () => {
    let appTestDriver: TodoTestDriver;

    beforeEach(() => {
        appTestDriver = new TodoTestDriver();
    });

    it('should not add todo item with empty content', async () => {
        appTestDriver.todoInputInsertContent('');
        appTestDriver.clickOnAddBtn();
        await appTestDriver.waitForAppToUpdate()
        expect(appTestDriver.getTodosCount()).toBe(0);
    });

    it('should add todo item with content', async () => {
        appTestDriver.todoInputInsertContent('example');
        appTestDriver.clickOnAddBtn();
        await appTestDriver.waitForAppToUpdate()
        expect(appTestDriver.getTodosCount()).toBe(1);
    })
})
