import puppeteer from 'puppeteer';

export class AppDriver {
  public page!: puppeteer.Page;
  private browser!: puppeteer.Browser;

  public async launchBrowser() {
    this.browser = await puppeteer.launch({
      headless: false,
      executablePath:
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    });
    this.page = await this.browser.newPage();
  }

  public async navigateToTodoPage(){
    return this.page.goto('http://localhost:8000/');
  }

  public async insertContentTodoInput(content: string) {
    await this.page.focus('[data-hook="TODO_INPUT"]');
    await this.page.keyboard.type(content);
  }

  public async clickOnAddTodo(){
    return this.page.click('[data-hook="ADD_BTN"]');
  }

  public async closeBrowser(){
    return this.browser.close();
  }

  public async sleep(milli:number){
      return new Promise((res,rej)=>{setTimeout(res,milli)})
  }
}
