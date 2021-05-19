import { ITodoDTO } from 'fed-todo-journey_todo-common';
import { TodoItemDriver } from './TodoItem.test.driver'
import { Chance } from 'chance';
import { enzymeContainerSetupAndTeardown } from '../../test/utils';

const chance = new Chance();

describe('todo item content should be rendered properly', () => {
    let todoItemDriver: TodoItemDriver;
    let todo: ITodoDTO;

    beforeEach(async () => {
        todo = { content: chance.word(), _id: chance.guid(), userId: chance.guid(), isDone: false };
        todoItemDriver = new TodoItemDriver(todo);
    });

    it('content should be rendered properly', () => {
        expect(todoItemDriver.getTodoItem().content).toBe(todo.content);
    })

    it('todo item id-proprety should be the correct _id', () => {
        expect(todoItemDriver.getTodoItem()._id).toBe(todo._id);
    })
})

describe('todo item should be rendered properly with all of "isDone" states', () => {
    it('todo content should contain crossed-content class if "isDone" is true', () => {
        const todo: ITodoDTO = { content: chance.word(), _id: chance.guid(), userId: chance.guid(), isDone: true };
        const todoItemDriver: TodoItemDriver = new TodoItemDriver(todo);
        expect(todoItemDriver.getTodoItem().isDone).toBe(true);
    })

    it('todo content should not contain crossed-content class if "isDone" is false', () => {
        const todo: ITodoDTO = { content: chance.word(), _id: chance.guid(), userId: chance.guid(), isDone: false };
        const todoItemDriver: TodoItemDriver = new TodoItemDriver(todo);
        expect(todoItemDriver.getTodoItem().isDone).toBe(false);
    })
})

describe('checks todo state for action interactions', () => {
    let todo: ITodoDTO;
    let todoItemDriver: TodoItemDriver;

    enzymeContainerSetupAndTeardown();

    beforeEach(() => {
        todo = { content: chance.word(), _id: chance.guid(), userId: chance.guid(), isDone: true };
        todoItemDriver = new TodoItemDriver(todo);
    })

    it('todo edit input should not be rendered if edit btn wasnt clicked', () => {
        expect(todoItemDriver.isEditInputVisible()).toBe(false);
    })

    it('edit input should be rendered & focused after clicking on edit btn', async () => {
        todoItemDriver.clickOnEditBtn();
        await todoItemDriver.waitForAppToUpdate()
        expect(todoItemDriver.isEditInputVisible()).toBe(true);
        expect(todoItemDriver.isEditInputFocused()).toBe(true);
    })

    it.only('edit input content should be the same as todo content while clicking on edit btn', ()=>{
        todoItemDriver.clickOnEditBtn();
        expect(todoItemDriver.getEditInputContent()).toBe(todo.content);
    })

    it('edit input should be hidden after clicking twice on edit btn', async () => {
        todoItemDriver.clickOnEditBtn();
        todoItemDriver.clickOnEditBtn();
        await todoItemDriver.waitForAppToUpdate();
        expect(todoItemDriver.isEditInputVisible()).toBe(false);
    })

    it('edit input should be hidden while we leave the edit input focus', async () => {
        todoItemDriver.clickOnEditBtn();
        todoItemDriver.blurEditInput();
        await todoItemDriver.waitForAppToUpdate();
        expect(todoItemDriver.isEditInputVisible()).toBe(false);
    })
})
