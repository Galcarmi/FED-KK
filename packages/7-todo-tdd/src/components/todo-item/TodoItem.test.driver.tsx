import { ReactWrapper } from 'enzyme';
import { mount } from 'enzyme';
import { ITodoDTO } from 'fed-todo-journey_todo-common';
import { act } from 'react-dom/test-utils';
import { TodoItem } from './TodoItem';
import { s } from './TodoItem';
import { wrapperGenerator } from '../../styles/utils';
import { s as commonStyles } from '../../styles/commonClasses';
import withTodos from '../HOC/withTodos';

const c = wrapperGenerator('.');

export class TodoItemDriver {
    public todoItem: ReactWrapper;

    constructor(todo: ITodoDTO) {
        const WrappedTodoItem = withTodos(TodoItem);
        this.todoItem = mount(<WrappedTodoItem todo={todo} />)
    }

    public clickOnTodoDoneBtn() {
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