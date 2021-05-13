import { jss } from '../../styles/config';
import React, { FC, ReactElement, PropsWithChildren } from 'react';
import { ITodoDTO } from 'fed-todo-journey_todo-common';
import { s as commonStyles } from '../../styles/commonClasses';

interface TodoItemProps {
    todo: ITodoDTO
}
export const TodoItem: FC<TodoItemProps> = (props: PropsWithChildren<TodoItemProps>): ReactElement => {
    return (<div id={props.todo._id}
        className={s.todo__list__item}
        key={props.todo._id}>
        <div className={`${s.todo__list__item__content} ${props.todo.isDone && commonStyles.crossedContent}`}>{props.todo.content}</div>
    </div>);
};

export const s = jss
    .createStyleSheet({
        todo__list__item: {

        },
        todo__list__item__content: {

        },
        todo__list__item__actions: {

        },
        todo__list__item__actions__done: {

        },
        todo__list__item__actions__delete: {

        },
        todo__list__item__actions__edit: {

        },
    })
    .attach().classes;
