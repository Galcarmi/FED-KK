import { jss } from '../../styles/config';
import React, { FC, ReactElement, PropsWithChildren, useContext, useState } from 'react';
import { ITodoDTO, ITodoMap } from 'fed-todo-journey_todo-common';
import { s as commonStyles } from '../../styles/commonClasses';
import { ITodoContext, TodoContext } from '../../context/TodoContext';

interface TodoItemProps {
    todo: ITodoDTO;
}

export const TodoItem: FC<TodoItemProps> = (props: PropsWithChildren<TodoItemProps>): ReactElement => {
    const { todosService, todos, setTodos } = useContext<ITodoContext>(TodoContext);

    const onDoneClick = async (): Promise<void> => {
        const updatedTodo = await todosService.editTodo({ ...props.todo, isDone: !props.todo.isDone });
        todos[updatedTodo._id] = updatedTodo;
        setTodos({...todos});
        console.log(todos)
    }

    // const onDeleteClick = async ():Promise<void> =>{
    //     await todosService.deleteTodo(props.todo._id);
    //     delete todos[props.todo._id];
    //     setTodos({...todos});
    // }

    return (<div id={props.todo._id}
        className={s.todo__list__item}
        key={props.todo._id}>
        <div className={`${s.todo__list__item__content} ${props.todo.isDone && commonStyles.crossedContent}`}>{props.todo.content}</div>
        <div className={s.todo__list__item__actions}>
            <button className={s.todo__list__item__actions__edit}>edit</button>
            <button className={s.todo__list__item__actions__delete}>delete</button>
            <button className={s.todo__list__item__actions__done} onClick={onDoneClick}>done</button>
        </div>
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
