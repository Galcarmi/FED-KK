import { ITodoDTO, ITodoMap } from 'fed-todo-journey_todo-common';
import { TodoItemDriver } from './TodoItem.test.driver'
import { Chance } from 'chance';

const chance = new Chance();

describe('checks todo list item - done functionality', () => {
    let todoItemDriver: TodoItemDriver;
    let _id: string;

    beforeEach(() => {
        _id = chance.guid();
        const todo: ITodoDTO = { content: chance.word(), _id, userId: chance.guid(), isDone: false };
        todoItemDriver = new TodoItemDriver(todo);
    });

    it.only('text should be rendered with crossed content class if its done', async () => {
        todoItemDriver.clickOnTodoDoneBtn();
        await todoItemDriver.waitForAppToUpdate();
        expect(todoItemDriver.getTodoItem().isDone).toBe(true);
    })
})
