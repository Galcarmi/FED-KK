import React, { FC, ReactElement, useContext } from 'react';
import { jss } from '../../../styles/jss';
import { commonStyles } from '../../../styles/commonStyles';
import { s as commonClasses } from '../../../styles/commonClasses';
import { Btns } from '../../action-btn/Btns';
import { ITodoDTO } from 'fed-todo-journey_todo-common';
import { todosService } from '../../../services/TodosService';
import { Context } from '../../../context/Store';
import { TodosActions } from '../../../context/TodosActions';

interface TodoItemProps {
  todo: ITodoDTO
}

export const TodoItem: FC<TodoItemProps> = (props: TodoItemProps): ReactElement => {
  const { dispatch } = useContext(Context);
  const contentClass = props.todo.isDone ? [commonClasses.crossedContent, s.todoItem__content].join(' ') : s.todoItem__content;

  const handleRemove = async () => {
    await todosService.deleteTodo(props.todo._id);
    dispatch({ type: TodosActions.REMOVE_TODO, payload: props.todo })
  }
  const handleDone = async () => {
    const updatedTodo = { ...props.todo, isDone: !props.todo.isDone };
    await todosService.editTodo(updatedTodo);
    dispatch({ type: TodosActions.REMOVE_TODO, payload: updatedTodo })
  }
  
  const handleEdit = () => {

  }

  return (
    <div className={s.todoItem} id={props.todo._id}>
      <input type="text" className={s.todoItem__editInput} />
      <div className={contentClass} >${props.todo.content}</div>
      <div className={s['todo-item__actions']}>
        <Btns.EditBtn btnHandler={handleEdit} />
        <Btns.DeleteBtn btnHandler={handleRemove} />
        <Btns.DoneBtn btnHandler={handleDone} />
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
