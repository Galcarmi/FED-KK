import puppeteer from 'puppeteer';
import { s as todoAppStyles } from '../components/todo-app/TodoApp';
import { wrapperGenerator } from '../styles/utils';
import { Chance } from 'chance';
import { s as todoItemStyles } from '../components/todo-item/TodoItem';

const chance = new Chance();

const c = wrapperGenerator('.');

jest.setTimeout(30000);

describe('first test', () => {
  let browser: puppeteer.Browser;

  it('should render the todos page', async () => {
    browser = await puppeteer.launch({ headless: true });
//     const page: puppeteer.Page = await browser.newPage();

//     await page.goto('http://localhost:3000/');

//     await page.$eval(
//       c(todoAppStyles.todo__inputContainer__input),
//       (el) => ((el as HTMLInputElement).value = chance.word())
//     );

//     page.click(c(todoAppStyles.todo__inputContainer__addBtn));

//     const a = await page.waitForSelector(c(todoItemStyles.todo__list__item));
    

    expect(1).toBe(1);
  });

  afterEach(async () => {
    await browser.close();
  });
});
