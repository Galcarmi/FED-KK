import puppeteer from 'puppeteer';

jest.setTimeout(30000);

describe('first test', () => {
  let browser: puppeteer.Browser;

  it('should render the todos page', async () => {
    browser = await puppeteer.launch({ headless: true });
    const page: puppeteer.Page = await browser.newPage();

    await page.goto('http://localhost:3000/');

    await page.$eval(
      "[class^='todo__inputContainer__input']",
      (el) => ((el as HTMLInputElement).value = 'asdasd')
    );
    console.log('asdasd')

    page.click("[class^='todo__inputContainer__addBtn']");

    // await page.evaluate(() =>{
    //   const nodes = document.querySelector("[class^='todo__list__item']")
    //   console.log(nodes);
    // });

    const as = await page.waitForSelector('.todo__list__item');

    console.log('itemss', as)
    expect(1).toBe(1);
  });

  afterEach(async () => {
    await browser.close();
  });
});
