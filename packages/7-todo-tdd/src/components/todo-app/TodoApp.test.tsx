import { TodoAppDriver } from './TodoApp.test.driver';
import { Chance } from 'chance';
import { TodoItemDriver } from '../todo-item/TodoItem.test.driver';
import { todosService } from '../../services/TodoService';
import { ITodoDTO, ITodoMap } from 'fed-todo-journey_todo-common';

const chance = new Chance();

describe('checks todo list - add functionality', () => {
    it('should not add todo item with empty content', async () => {
        const appTestDriver: TodoAppDriver = await TodoAppDriver.givenTodos({});
        const spy: jest.SpyInstance<Promise<ITodoDTO>> = jest.spyOn(todosService, 'addTodo');

        appTestDriver.todoInputInsertContent('');
        appTestDriver.clickOnAddBtn();
        await appTestDriver.waitForAppToUpdate();

        expect(spy).toHaveBeenCalledTimes(0);
    });

    it('should add todo item with content when pressing enter', async () => {
        const appTestDriver: TodoAppDriver = await TodoAppDriver.givenTodos({});
        const spy: jest.SpyInstance<Promise<ITodoDTO>> = jest.spyOn(todosService, 'addTodo');

        const content = chance.word();
        appTestDriver.todoInputInsertContent(content);
        appTestDriver.pressEnterOnTodoInput();
        await appTestDriver.waitForAppToUpdate();

        expect(spy).toHaveBeenCalledWith(content);
    })

    it('should add todo item with content when clicking on add btn', async () => {
        const appTestDriver: TodoAppDriver = await TodoAppDriver.givenTodos({});
        const spy: jest.SpyInstance<Promise<ITodoDTO>> = jest.spyOn(todosService, 'addTodo');

        const content = chance.word();
        appTestDriver.todoInputInsertContent(content);
        appTestDriver.clickOnAddBtn();
        await appTestDriver.waitForAppToUpdate()

        expect(spy).toHaveBeenCalledWith(content);
    })

    it('todo input should be empty after adding todo', async () => {
        const appTestDriver: TodoAppDriver = await TodoAppDriver.givenTodos({});

        expect(appTestDriver.getTodoInputContent()).toBe('');

        const content = chance.word();
        appTestDriver.todoInputInsertContent(content);
        appTestDriver.clickOnAddBtn();
        await appTestDriver.waitForAppToUpdate()

        expect(appTestDriver.getTodoInputContent()).toBe('');
    })
})

describe('app should render fetched todos properly', () => {

    it('should render a valid UUID', async () => {
        const { appTestDriver } = await initDriverWithDefaultTodo();

        const UUIDPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

        expect(appTestDriver.getFirstTodo()._id).toMatch(UUIDPattern)
    })

    it('should render the correct content', async () => {
        const { appTestDriver, todo } = await initDriverWithDefaultTodo();

        expect(appTestDriver.getFirstTodo().content).toBe(todo.content);
    })

    it('should render the correct state of isDone', async () => {
        const { appTestDriver, todo } = await initDriverWithDefaultTodo();

        expect(appTestDriver.getFirstTodo().isDone).toBe(todo.isDone)
    })


})

describe('todo item actions should change todos state properly', () => {
    it('todo item should be marked as done after clicking on done btn', async () => {
        const { appTestDriver, todoItemTestDriver, todo } = await initDriverWithDefaultTodo();
        const editTodoSpy: jest.SpyInstance<Promise<ITodoDTO>> = jest.spyOn(todosService, 'editTodo');

        todoItemTestDriver.clickOnDoneBtn();
        await appTestDriver.waitForAppToUpdate();

        todo.isDone = !todo.isDone;
        expect(editTodoSpy).toBeCalledWith(todo);
    })

    it('todo item should be deleted after clicking on delete btn', async () => {
        const { appTestDriver, todoItemTestDriver, todo } = await initDriverWithDefaultTodo();
        const deleteTodoSpy: jest.SpyInstance<Promise<ITodoDTO>> = jest.spyOn(todosService, 'deleteTodo');

        todoItemTestDriver.clickOnDeleteBtn();
        await appTestDriver.waitForAppToUpdate();

        expect(deleteTodoSpy).toBeCalledWith(todo._id);
    })

    it('todo item should be edited on edit input blur', async () => {
        let { appTestDriver, todoItemTestDriver, todo } = await initDriverWithDefaultTodo();
        const editTodoSpy: jest.SpyInstance<Promise<ITodoDTO>> = jest.spyOn(todosService, 'editTodo');

        todoItemTestDriver.clickOnEditBtn();
        todoItemTestDriver = new TodoItemDriver(appTestDriver.getFirstTodoItemWrapper());
        const editedContent = chance.word();
        todoItemTestDriver.insertContentToEditInput(editedContent);
        todoItemTestDriver.blurEditInput();
        await appTestDriver.waitForAppToUpdate();
        todo.content = editedContent;

        expect(editTodoSpy).toBeCalledWith(todo);
    })

    it('todo item should not be edited on edit input blur when edit input is empty', async () => {
        let { appTestDriver, todoItemTestDriver } = await initDriverWithDefaultTodo();
        const editTodoSpy: jest.SpyInstance<Promise<ITodoDTO>> = jest.spyOn(todosService, 'editTodo');

        todoItemTestDriver.clickOnEditBtn();
        todoItemTestDriver = new TodoItemDriver(appTestDriver.getFirstTodoItemWrapper());
        todoItemTestDriver.insertContentToEditInput('');
        todoItemTestDriver.blurEditInput();
        await appTestDriver.waitForAppToUpdate();

        expect(editTodoSpy).toHaveBeenCalledTimes(0);
    })

    it('todos service edit method should not be called when edit input content is the same as todo content', async () => {
        let { appTestDriver, todoItemTestDriver, todo } = await initDriverWithDefaultTodo();
        const editTodoSpy: jest.SpyInstance<Promise<ITodoDTO>> = jest.spyOn(todosService, 'editTodo');

        todoItemTestDriver.clickOnEditBtn();
        todoItemTestDriver = new TodoItemDriver(appTestDriver.getFirstTodoItemWrapper());
        todoItemTestDriver.insertContentToEditInput(todo.content);
        todoItemTestDriver.blurEditInput();
        await appTestDriver.waitForAppToUpdate();

        expect(editTodoSpy).toHaveBeenCalledTimes(0);
    })

})

const initDriverWithDefaultTodo = async (todo?: ITodoDTO): Promise<{ todo: ITodoDTO, appTestDriver: TodoAppDriver, todoItemTestDriver: TodoItemDriver }> => {
    const todos: ITodoMap = TodoAppDriver.generateTodosMapWithSingleTodo(todo);
    const appTestDriver: TodoAppDriver = await TodoAppDriver.givenTodos(todos);
    const todoItemTestDriver: TodoItemDriver = new TodoItemDriver(appTestDriver.getFirstTodoItemWrapper());

    return { todo: appTestDriver.extractFirstTodoFromMap(todos), appTestDriver, todoItemTestDriver };
}