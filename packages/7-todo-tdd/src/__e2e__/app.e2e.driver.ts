import { Browser, ElementHandle, HTTPResponse, launch, Page } from 'puppeteer';

export class AppDriver {
  public page!: Page;
  private browser!: Browser;

  public given = {
    createTodo: async (todoContent: string): Promise<void> => {
      await this.sleep(500);
      await this.insertContentTodoInput(todoContent);
      await this.clickOnAddTodo();
      await this.sleep(500);
    },
  }

  public when = {
    clickingOnFirstTodoDoneBtn: async ():Promise<void> => {
      const todoItem = await this.page.$('[data-hook="TODO_ITEM"]') as ElementHandle<Element>;
      const doneBtn = await todoItem.$('[data-hook="TODO_ITEM_DONE"]')
      await doneBtn?.click();
      await this.sleep(500);
    },
    clickingOnFirstTodoDeleteBtn: async ():Promise<void> => {
      const todoItem = await this.page.$('[data-hook="TODO_ITEM"]') as ElementHandle<Element>;
      const deleteBtn = await todoItem.$('[data-hook="TODO_ITEM_DELETE"]')
      await deleteBtn?.click();
      await this.sleep(500);
    },
    editingFirstTodo: async (content:string): Promise<void> => {
      const todoItem = await this.page.$('[data-hook="TODO_ITEM"]') as ElementHandle<Element>;
      const editBtn = await todoItem.$('[data-hook="TODO_ITEM_EDIT"]')
      await editBtn?.click();

      const todoEditInput = await this.page.$('[data-hook="TODO_ITEM_EDIT_INPUT"]') as ElementHandle<Element>;
      await this.insertContentToInputElem(todoEditInput, content)

      await todoEditInput.evaluate((elem:HTMLInputElement)=>{elem.blur()})

      return this.sleep(500);
    }
  }

  public then = {
    getFirstTodoContent: async (): Promise<string | undefined> => {
      const todoItems = await this.page.$('[data-hook="TODO_ITEM"]');
      return todoItems ?.$eval(
        '[data-hook="TODO_ITEM_CONTENT"]',
        (elem: Element) => elem.innerHTML
      );
    },
    getTodosCount: async (): Promise<number> => {
      const todoItems = await this.page.$$('[data-hook="TODO_ITEM"]');
      
      return todoItems.length;
    },
    isFirstTodoDone: async (): Promise<boolean> => {
      const todoItem = await this.page.$('[data-hook="TODO_ITEM"]') as ElementHandle<Element>;
      return todoItem.$eval(
        '[data-hook="TODO_ITEM_CONTENT"]',
        (elem: Element) => {
          let isDone = false;
          elem.classList.forEach((clazz: string): void => {
            if (clazz.includes('crossedContent')) {
              isDone = true;
            }
          })

          return isDone;
        }
      );
    }
  }
  
  public async launchBrowser() {
    this.browser = await launch({
      headless: true,
      executablePath:
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    });
    this.page = await this.browser.newPage();
  }

  public async navigateToTodoPage():Promise<HTTPResponse> {
    return this.page.goto('http://localhost:8000/');
  }

  public async insertContentTodoInput(content: string):Promise<void> {
    const todoInput = await this.page.$('[data-hook="TODO_INPUT"]') as ElementHandle<Element>;

    return this.insertContentToInputElem(todoInput, content);
  }

  public async clickOnAddTodo():Promise<void> {
    return this.page.click('[data-hook="ADD_BTN"]');
  }

  public async closeBrowser() :Promise<void>{
    return this.browser.close();
  }

  public async sleep(milli: number) :Promise<void> {
    return new Promise((res, rej) => {
      setTimeout(res, milli);
    });
  }

  private async insertContentToInputElem(elem: ElementHandle<Element>, content: string): Promise<void>{
    await elem.evaluate((elem: HTMLInputElement) => { elem.value = '' });
    await elem.focus();

    return this.page.keyboard.type(content);
  }
}

