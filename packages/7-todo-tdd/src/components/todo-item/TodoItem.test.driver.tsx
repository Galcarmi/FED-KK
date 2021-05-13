import { ReactWrapper } from 'enzyme';
import { mount } from '../../test/config';
import { ITodoDTO } from 'fed-todo-journey_todo-common';
import { act } from 'react-dom/test-utils';
import { TodoItem } from './TodoItem';
import { s } from './TodoItem';
import { wrapperGenerator } from '../../styles/utils';
import { s as commonStyles } from '../../styles/commonClasses';

const c = wrapperGenerator('.');

export class TodoItemDriver {
    private todo: ITodoDTO;
    private todoItem: ReactWrapper;

    constructor(todo: ITodoDTO) {
        this.todo = todo;
        this.todoItem = mount(<TodoItem todo={todo} />)
    }

    public clickOnTodoDoneBtn() {
        console.log(this.todoItem.debug())
        this.todoItem.find(c(s.todo__list__item__actions__done)).simulate('click');
    }

    public getTodoItem(): ITodoDTO {
        const todoElement = this.todoItem.find(c(s.todo__list__item))
        const _id: string = (todoElement.getDOMNode().getAttribute('id')) as string;
        const contentElement = todoElement.find(c(s.todo__list__item__content));
        const content: string = contentElement.getDOMNode().innerHTML;
        const isDone: boolean = contentElement.getDOMNode().classList.contains(commonStyles.crossedContent);
        return { _id, content, isDone, userId: '' }
    }

    public async waitForAppToUpdate(): Promise<void> {
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve));
            this.todoItem.update();
        });
    };
}