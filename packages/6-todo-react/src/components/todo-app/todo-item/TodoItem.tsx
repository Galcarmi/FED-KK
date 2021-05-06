import React, { FC, ReactElement } from 'react';
import { jss } from '../../../styles/jss';
import { commonStyles } from '../../../styles/commonStyles';
import { s as commonClasses } from '../../../styles/commonClasses';
import { DeleteBtn } from '../../action-btn/DeleteBtn';
import { EditBtn } from '../../action-btn/EditBtn';
import { DoneBtn } from '../../action-btn/DoneBtn';
import { ITodoPartialDTO } from '../../../types/ITodoPartialDTO';

interface TodoItemProps extends ITodoPartialDTO { }

export const TodoItem: FC<TodoItemProps> = (props: TodoItemProps): ReactElement => {
  const contentClass = props.isDone ? [commonClasses.crossedContent, s.todoItem__content].join(' ') : s.todoItem__content;
  return (
    <div className={s.todoItem} id={props._id}>
      <input type="text" className={s.todoItem__editInput} />
      <div className={contentClass} >${props.content}</div>
      <div className={s['todo-item__actions']}>
        <EditBtn />
        <DeleteBtn />
        <DoneBtn />
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
