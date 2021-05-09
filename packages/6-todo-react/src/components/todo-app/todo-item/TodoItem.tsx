import React, { FC, ReactElement } from 'react';
import { jss } from '../../../styles/jss';
import { commonStyles } from '../../../styles/commonStyles';
import { s as commonClasses } from '../../../styles/commonClasses';
import { Btns } from '../../action-btn/Btns';
import { ITodoDTO } from 'fed-todo-journey_todo-common';

interface TodoItemProps {
  todo: ITodoDTO
}

export const TodoItem: FC<TodoItemProps> = (props: TodoItemProps): ReactElement => {
  const contentClass = props.todo.isDone ? [commonClasses.crossedContent, s.todoItem__content].join(' ') : s.todoItem__content;
  return (
    <div className={s.todoItem} id={props.todo._id}>
      <input type="text" className={s.todoItem__editInput} />
      <div className={contentClass} >${props.todo.content}</div>
      <div className={s['todo-item__actions']}>
        <Btns.EditBtn />
        <Btns.DeleteBtn />
        <Btns.DoneBtn />
      </div>
    </div>)

};



export const s = jss
  .createStyleSheet({
    todoItem: {
      ...commonStyles.minTodoItemHeight,
      ...commonStyles.RLMarginS,
      ...commonStyles.roundedBorderS,
      ...commonStyles.blackBorder,
      ...commonStyles.TPmarginM,
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      '&:hover $todo-item__actions': {
        opacity: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
      },
    },
    'todo-item__actions': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      right: 0,
      opacity: 0,
      transition: 'all 0.5s ease',
    },
    todoItem__content: {
      ...commonStyles.fontS,
      width: '55%',
      overflowWrap: 'break-word',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    todoItem__editInput: {
      ...commonStyles.fontS,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '400',
      border: 'none',
      textAlign: 'center',
      display: 'none',
    },
  })
  .attach().classes;
