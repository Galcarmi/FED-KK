import { IProps } from '../types/IProps';
import { getContainer } from '../components/container/Container';

export const renderTodoHP = (props: IProps): void => {
    const todoHP = `${getContainer({children:'<div>hi there</div>'})}`;
    const body = <HTMLBodyElement>document.querySelector('body');
    body.innerHTML = todoHP;
}