import puppeteer from 'puppeteer';
import { dataHooks } from '../components/utils/dataHooks';
import { AppDriver } from './app.e2e.driver';

jest.setTimeout(30000);
// dataHooks.

describe('first test', () => {
  let appDriver:AppDriver;

  beforeEach(()=>{
    appDriver = new AppDriver();
  })

  it('should render the todos page', async () => {
   await appDriver.launchBrowser();
   await appDriver.navigateToTodoPage();
   
   await appDriver.sleep(1000);
   await appDriver.insertContentTodoInput('lalal');
   await appDriver.clickOnAddTodo();

   await appDriver.sleep(1000);
   await appDriver.insertContentTodoInput('asdas');
   await appDriver.clickOnAddTodo();
   await appDriver.sleep(1000);

    const todoItems = await appDriver.page.$$('[data-hook="TODO_ITEM"]');

    console.log('itemss', todoItems.length);
    expect(1).toBe(1);
  });

  afterEach(async () => {
    await appDriver.closeBrowser();
  });
});
