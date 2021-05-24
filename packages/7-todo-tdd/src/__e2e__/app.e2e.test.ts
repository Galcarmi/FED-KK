import { Chance } from 'chance';
import { dataHooks } from '../components/utils/dataHooks';
import { AppDriver } from './app.e2e.driver';

const chance = new Chance();

jest.setTimeout(30000);
// dataHooks.TODO_ITEM_CONTENT

describe('first test', () => {
  let appDriver: AppDriver;

  beforeEach(() => {
    appDriver = new AppDriver();
  });

  it('should render the todos page', async () => {
    await appDriver.launchBrowser();
    await appDriver.navigateToTodoPage();

    const testContent = chance.word();
    await appDriver.sleep(500);
    await appDriver.insertContentTodoInput(testContent);
    await appDriver.clickOnAddTodo();
    await appDriver.sleep(500);

    const todoItems = await appDriver.page.$('[data-hook="TODO_ITEM"]');
    const todoContent = await todoItems?.$eval(
      '[data-hook="TODO_ITEM_CONTENT"]',
      (elem) => elem.innerHTML
    );

    expect(todoContent).toBe(testContent);
  });

  afterEach(async () => {
    await appDriver.closeBrowser();
  });
});
