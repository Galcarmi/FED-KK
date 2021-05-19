import { ReactWrapper } from 'enzyme';
import { wrapperGenerator } from '../../styles/utils';
import { TodoAppDriver } from './TodoApp.test.driver';
import { s } from './TodoApp';
import { Chance } from 'chance';
import { TodoItemDriver } from '../todo-item/TodoItem.test.driver';

const chance = new Chance();
const h = wrapperGenerator('.');


describe('app main components should be rendered', () => {
    let mountedTodoApp: ReactWrapper;

    beforeEach(async () => {
        const todosDriver = new TodoAppDriver();
        await todosDriver.waitForAppToUpdate();
        mountedTodoApp = todosDriver.getAppComponent();
    });

    it('app should be rendered', () => {
        expect(mountedTodoApp.exists()).toBe(true);
    });

    it('todo input should be rendered', () => {
        expect(mountedTodoApp.find(h(s.todo__input)).exists()).toBe(true);
    });

    it('todo list should be rendered', () => {
        expect(mountedTodoApp.find(h(s.todo__list)).exists()).toBe(true);
    });

    it('add btn should be rendered', () => {
        expect(mountedTodoApp.find(h(s.todo__addBtn)).exists()).toBe(true);
    });
});

describe('checks todo list - add functionality', () => {
    let appTestDriver: TodoAppDriver;

    beforeEach(() => {
        appTestDriver = new TodoAppDriver();
    });

    it('should not add todo item with empty content', async () => {
        appTestDriver.todoInputInsertContent('');
        appTestDriver.clickOnAddBtn();
        await appTestDriver.waitForAppToUpdate();
        expect(appTestDriver.getTodosCount()).toBe(0);
    });

    it('should add todo item with content', async () => {
        appTestDriver.todoInputInsertContent('example');
        appTestDriver.clickOnAddBtn();
        await appTestDriver.waitForAppToUpdate()
        expect(appTestDriver.getTodosCount()).toBe(1);
    })
})

describe('app should render fetched todos properly', () => {
    let content: string;
    let appTestDriver: TodoAppDriver;

    beforeAll(async () => {
        content = chance.word();
        appTestDriver = new TodoAppDriver();
        appTestDriver.todoInputInsertContent(content);
        appTestDriver.clickOnAddBtn();
        await appTestDriver.waitForAppToUpdate()
    })

    it('should render the correct _id', () => {
        expect(Object.values(appTestDriver.getTodos())[0]).not.toBeUndefined()
    })

    it('should render the correct content', () => {
        expect(Object.values(appTestDriver.getTodos())[0].content).toBe(content)
    })

    it('should render the correct state of isDone', () => {
        expect(Object.values(appTestDriver.getTodos())[0].isDone).toBe(false)
    })
})

describe.only('todo item actions should change the todos state properly', () => {
    let appTestDriver: TodoAppDriver;
    let todoItemTestDriver : TodoItemDriver;

    beforeEach(async () => {
        appTestDriver = new TodoAppDriver();
        appTestDriver.todoInputInsertContent('hakuna matata');
        appTestDriver.clickOnAddBtn();
        await appTestDriver.waitForAppToUpdate();
        todoItemTestDriver = new TodoItemDriver(appTestDriver.getFirstTodoItemWrapper());
    });

    it('todo item should be marked as done after clicking on done btn', async () => {
        todoItemTestDriver.clickOnDoneBtn();
        await appTestDriver.waitForAppToUpdate();
        expect(Object.values(appTestDriver.getTodos())[0].isDone).toBe(true);
    })
    
    it('todo item should be deleted after clicking on delete btn', async () => {
        todoItemTestDriver.clickOnDeleteBtn();
        await appTestDriver.waitForAppToUpdate();
        expect(appTestDriver.getTodosCount()).toBe(0);
    })

    it('todo item should be edited on edit input blur',async ()=>{
        todoItemTestDriver.clickOnEditBtn();
        todoItemTestDriver = new TodoItemDriver(appTestDriver.getFirstTodoItemWrapper());
        todoItemTestDriver.insertContentToEditInput('edited');
        todoItemTestDriver.blurEditInput();
        await appTestDriver.waitForAppToUpdate();
        expect(Object.values(appTestDriver.getTodos())[0].content).toBe('edited');
    })
    
})