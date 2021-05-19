import { jss } from '../../styles/config';
import React, { FC, ReactElement, PropsWithChildren, useContext, useState } from 'react';
import { ITodoDTO } from 'fed-todo-journey_todo-common';
import { s as commonStyles } from '../../styles/commonClasses';
import { ITodoContext, TodoContext } from '../../context/TodoContext';

interface TodoItemProps {
    todo: ITodoDTO;
}

export const TodoItem: FC<TodoItemProps> = (props: PropsWithChildren<TodoItemProps>): ReactElement => {
    const { todosService, todos, setTodos } = useContext<ITodoContext>(TodoContext);
    const [todoInputVisibility, setTodoInputVisibility] = useState<boolean>(false);

    const onDoneClick = async (): Promise<void> => {
        const updatedTodo = await todosService.editTodo({ ...props.todo, isDone: !props.todo.isDone });
        todos[updatedTodo._id] = updatedTodo;
        setTodos({ ...todos });
    }

    const onDeleteClick = async (): Promise<void> => {
        await todosService.deleteTodo(props.todo._id);
        delete todos[props.todo._id];
        setTodos({ ...todos });
    }

    const onEditClick = ()=>{
        setTodoInputVisibility(!todoInputVisibility);
    }

    // const hideEditInput = ()=>{
    //     console.log('blurrrr')
    //     setTodoInputVisibility(false);
    // }

    return (
    <div id={props.todo._id}
        className={s.todo__list__item}
        key={props.todo._id}>
        { todoInputVisibility && <input type='text' className={s.todo__list__item__editInput}/>}
        <div className={`${s.todo__list__item__content} ${props.todo.isDone && commonStyles.crossedContent}`}>{props.todo.content}</div>
        <div className={s.todo__list__item__actions}>
            <button className={s.todo__list__item__actions__edit} onClick={onEditClick}>edit</button>
            <button className={s.todo__list__item__actions__delete} onClick={onDeleteClick}>delete</button>
            <button className={s.todo__list__item__actions__done} onClick={onDoneClick}>done</button>
        </div>
    </div>);
};

export const s = jss
    .createStyleSheet({
        todo__list__item: {

        },
        todo__list__item__editInput: {

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
