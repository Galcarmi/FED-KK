import { IProps } from '../types/IProps';
import { getContainer } from '../components/container/Container';
import { getTodoApp } from '../components/todo-app/TodoApp';

export const renderTodoHP = (props: IProps): void => {
    const todoHP = `${getContainer({children:getTodoApp({})})}`;
    const body = <HTMLBodyElement>document.querySelector('body');
    body.innerHTML = todoHP;
}