import { TodoAppDriver } from './TodoApp.test.driver';
import { Chance } from 'chance';
import { TodoItemDriver } from '../todo-item/TodoItem.test.driver';
import { todosService } from '../../services/TodoService';
import { ITodoDTO } from 'fed-todo-journey_todo-common';

const chance = new Chance();

describe('checks todo list - add functionality', () => {
    let appTestDriver: TodoAppDriver;

    beforeEach(() => {
        appTestDriver = new TodoAppDriver();
    });

    afterEach(async () => {
        appTestDriver.removeTodosFromFakeTodosService();
    })

    it('should not add todo item with empty content', async () => {
        expect(appTestDriver.getTodosCount()).toBe(0);

        appTestDriver.todoInputInsertContent('');
        appTestDriver.clickOnAddBtn();
        await appTestDriver.waitForAppToUpdate();

        expect(appTestDriver.getTodosCount()).toBe(0);
    });

    it('should add todo item with content when pressing enter', async () => {
        expect(appTestDriver.getTodosCount()).toBe(0);

        appTestDriver.todoInputInsertContent('example');
        appTestDriver.pressEnterOnTodoInput();
        await appTestDriver.waitForAppToUpdate();

        expect(appTestDriver.getTodosCount()).toBe(1);
    })

    it('should add todo item with content when clicking on add btn', async () => {
        expect(appTestDriver.getTodosCount()).toBe(0);

        appTestDriver.todoInputInsertContent('example');
        appTestDriver.clickOnAddBtn();
        await appTestDriver.waitForAppToUpdate()

        expect(appTestDriver.getTodosCount()).toBe(1);
    })

    it('todo input should be empty after adding todo', async () => {
        expect(appTestDriver.getTodoInputContent()).toBe('');

        appTestDriver.todoInputInsertContent('example');
        appTestDriver.clickOnAddBtn();
        await appTestDriver.waitForAppToUpdate()

        expect(appTestDriver.getTodoInputContent()).toBe('');
    })
})

describe('app should render fetched todos properly', () => {
    it('should render a valid UUID', async () => {
        const { appTestDriver } = await initDriverWithTodo()

        const UUIDPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

        expect(Object.values(appTestDriver.getTodos())[0]._id).toMatch(UUIDPattern)
    })

    it('should render the correct content', async () => {
        const { content, appTestDriver } = await initDriverWithTodo()

        expect(Object.values(appTestDriver.getTodos())[0].content).toBe(content)
    })

    it('should render the correct state of isDone', async () => {
        const { appTestDriver } = await initDriverWithTodo()

        expect(Object.values(appTestDriver.getTodos())[0].isDone).toBe(false)
    })

    const initDriverWithTodo = async (): Promise<{ appTestDriver: TodoAppDriver, content: string }> => {
        const content: string = chance.word();
        const appTestDriver: TodoAppDriver = new TodoAppDriver();
        appTestDriver.todoInputInsertContent(content);
        appTestDriver.clickOnAddBtn();
        await appTestDriver.waitForAppToUpdate();

        return { content, appTestDriver }
    }
})

describe('todo item actions should change todos state properly', () => {

    it('todo item should be marked as done after clicking on done btn', async () => {
        const { todoItemTestDriver, appTestDriver } = await initDriversWithTodo();

        expect(Object.values(appTestDriver.getTodos())[0].isDone).toBe(false);

        todoItemTestDriver.clickOnDoneBtn();
        await appTestDriver.waitForAppToUpdate();

        expect(Object.values(appTestDriver.getTodos())[0].isDone).toBe(true);
    })

    it('todo item should be deleted after clicking on delete btn', async () => {
        const { todoItemTestDriver, appTestDriver } = await initDriversWithTodo();

        expect(appTestDriver.getTodosCount()).toBe(1);

        todoItemTestDriver.clickOnDeleteBtn();
        await appTestDriver.waitForAppToUpdate();

        expect(appTestDriver.getTodosCount()).toBe(0);
    })

    it('todo item should be edited on edit input blur', async () => {
        let { todoItemTestDriver, appTestDriver, content } = await initDriversWithTodo();

        expect(Object.values(appTestDriver.getTodos())[0].content).toBe(content);

        todoItemTestDriver.clickOnEditBtn();
        todoItemTestDriver = new TodoItemDriver(appTestDriver.getFirstTodoItemWrapper());
        const editedContent = chance.word();
        todoItemTestDriver.insertContentToEditInput(editedContent);
        todoItemTestDriver.blurEditInput();
        await appTestDriver.waitForAppToUpdate();

        expect(Object.values(appTestDriver.getTodos())[0].content).toBe(editedContent);
    })

    it('todo item should not be edited on edit input blur when edit input is empty', async () => {
        let { todoItemTestDriver, appTestDriver, content } = await initDriversWithTodo();

        expect(Object.values(appTestDriver.getTodos())[0].content).toBe(content);

        todoItemTestDriver.clickOnEditBtn();
        todoItemTestDriver = new TodoItemDriver(appTestDriver.getFirstTodoItemWrapper());
        todoItemTestDriver.insertContentToEditInput('');
        todoItemTestDriver.blurEditInput();
        await appTestDriver.waitForAppToUpdate();

        expect(Object.values(appTestDriver.getTodos())[0].content).toBe(content);
    })

    it('todos service edit method should not be called when edit input content is the same as todo content', async () => {
        let { todoItemTestDriver, appTestDriver, content } = await initDriversWithTodo();
        const spy: jest.SpyInstance<Promise<ITodoDTO>> = jest.spyOn(todosService, 'editTodo');

        expect(spy).toHaveBeenCalledTimes(0);

        todoItemTestDriver.clickOnEditBtn();
        todoItemTestDriver = new TodoItemDriver(appTestDriver.getFirstTodoItemWrapper());
        todoItemTestDriver.insertContentToEditInput(content);
        todoItemTestDriver.blurEditInput();
        await appTestDriver.waitForAppToUpdate();

        expect(spy).toHaveBeenCalledTimes(0);
    })

    const initDriversWithTodo = async (): Promise<{ appTestDriver: TodoAppDriver, content: string, todoItemTestDriver: TodoItemDriver }> => {
        const content: string = chance.word();
        const appTestDriver: TodoAppDriver = new TodoAppDriver();
        appTestDriver.todoInputInsertContent(content);
        appTestDriver.clickOnAddBtn();
        await appTestDriver.waitForAppToUpdate();
        const todoItemTestDriver: TodoItemDriver = new TodoItemDriver(appTestDriver.getFirstTodoItemWrapper());

        return { content, appTestDriver, todoItemTestDriver }
    }

})