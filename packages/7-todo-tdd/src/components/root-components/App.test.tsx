import { ReactWrapper } from 'enzyme';
import { wrapperGenerator } from '../../styles/utils';
import { TodoTestDriver } from '../../test/TodoTestDriver';
import { s } from './App';
import { Chance } from 'chance';
import { ITodoMap } from 'fed-todo-journey_todo-common';

const chance = new Chance();
const h = wrapperGenerator('.');


describe('app main components should be rendered', () => {
    let app: ReactWrapper;

    beforeEach(async () => {
        const todosDriver = new TodoTestDriver();
        todosDriver.waitForAppToUpdate();
        app = todosDriver.getAppComponent();
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

    it.only('should add todo item with content', async () => {
        appTestDriver.todoInputInsertContent('example');
        appTestDriver.clickOnAddBtn();
        await appTestDriver.waitForAppToUpdate()
        expect(appTestDriver.getTodosCount()).toBe(1);
    })
})

describe('app should render fetched todos', () => {
    let _id: string;
    let content: string;
    let isDone: boolean;
    let appTestDriver: TodoTestDriver
    beforeAll(async () => {
        _id = chance.guid();
        content = chance.word();
        isDone = chance.bool();
        const todos: ITodoMap = { [_id]: { content, _id, userId: chance.guid(), isDone } };
        appTestDriver = new TodoTestDriver(todos);
        await appTestDriver.waitForAppToUpdate();
    })

    it('should render fetched todos', async () => {
        expect(appTestDriver.getTodosCount()).toBe(1);
    })

    it('should render the correct _id', ()=>{
        expect(appTestDriver.getTodos()[_id]).not.toBeUndefined()
    })

    it('should render the correct content', ()=>{
        expect(appTestDriver.getTodos()[_id].content).toBe(content)
    })


    // it('should render the correct state of isDone', ()=>{
    //     expect(appTestDriver.getTodos()[_id].isDone).toBe(isDone)
    // })
})

// describe('checks todo list item rendered properly', () => {
//     let appTestDriver: TodoTestDriver;
//     let _id: string;
//     let isDone: boolean;
//     let content: string;

//     beforeEach(() => {
//         _id = chance.guid();
//         content = chance.word();
//         isDone = chance.bool();

//         const todos: ITodoMap = { [_id]: { content, _id, userId: chance.guid(), isDone } };
//         appTestDriver.initTodos(todos);
//         appTestDriver = new TodoTestDriver();
//     });

//     it('content should be rendered properly', () => {
//         appTestDriver.getAppComponent()
//     })
// })


// describe('checks todo list item - done functionality', () => {
//     let appTestDriver: TodoTestDriver;
//     let _id: string;
//     let isDone: boolean;

//     beforeEach(() => {
//         appTestDriver = new TodoTestDriver();
//     });

//     it('text should be rendered with crossed content class if its done', () => {
//         _id = chance.guid();
//         const todos: ITodoMap = {};
//         todos[_id] = { content: chance.word(), _id, userId: chance.guid(), isDone: true };
//         appTestDriver.initTodos(todos);

//         appTestDriver.getAppComponent()
//     })
// })
