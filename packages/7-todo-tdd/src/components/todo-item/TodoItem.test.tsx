describe('checks todo list item - done functionality', () => {
    let appTestDriver: TodoTestDriver;
    let _id: string;

    beforeEach(async () => {
        _id = chance.guid();
        const todos: ITodoMap = {};
        todos[_id] = { content: chance.word(), _id, userId: chance.guid(), isDone: false };
        appTestDriver = new TodoTestDriver(todos);
        await appTestDriver.waitForAppToUpdate()
    });

    it.only('text should be rendered with crossed content class if its done', async () => {
        appTestDriver.clickOnTodoDoneBtn(_id);
        await appTestDriver.waitForAppToUpdate();
        expect(appTestDriver.getTodos()[_id].isDone).toBe(true);
    })
})
