import React, { createRef, FC, ReactElement, useContext, useEffect, useState } from 'react';
import { jss } from '../../../styles/jss';
import { commonStyles } from '../../../styles/commonStyles';
import { s as commonClasses } from '../../../styles/commonClasses';
import { Btns } from '../../action-btn/Btns';
import { ITodoDTO } from 'fed-todo-journey_todo-common';
import { todosService } from '../../../services/TodosService';
import { Context, GlobalContext } from '../../../context/Store';
import { TodosActionTypes } from '../../../context/TodosActions';

interface TodoItemProps {
  todo: ITodoDTO
}

export const TodoItem: FC<TodoItemProps> = (props: TodoItemProps): ReactElement => {
  const { dispatch } = useContext<GlobalContext>(Context);
  const [editInputVisible, setEditInputVisible] = useState<boolean>(false);
  const [editInputValue, setEditInputValue] = useState<string>('');
  const editInput: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();

  const contentClass: string = props.todo.isDone ? [commonClasses.crossedContent, s.todoItem__content].join(' ') : s.todoItem__content;
  const editInputClass: string = editInputVisible ? [commonClasses.displayBlock, s.todoItem__editInput].join(' ') : s.todoItem__editInput;

  const handleRemove = async (): Promise<void> => {
    await todosService.deleteTodo(props.todo._id);
    dispatch({ type: TodosActionTypes.REMOVE_TODO, payload: props.todo });
  }
  const handleDone = async (): Promise<void> => {
    const updatedTodo: ITodoDTO = { ...props.todo, isDone: !props.todo.isDone };
    await todosService.editTodo(updatedTodo);
    dispatch({ type: TodosActionTypes.ADD_EDIT_TODO, payload: updatedTodo });
  }

  const handleEditClick = (): void => {
    setEditInputVisible(!editInputVisible);
    setEditInputValue(props.todo.content);
  }

  const handleEdit = async (): Promise<void> => {
    if (editInputValue !== '' && editInputValue !== props.todo.content) {
      const updatedTodo: ITodoDTO = { ...props.todo, content: editInputValue };
      await todosService.editTodo(updatedTodo);
      dispatch({ type: TodosActionTypes.ADD_EDIT_TODO, payload: updatedTodo });
      setEditInputVisible(false);
    }
  }

  const handleEditInputEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleEdit();
    }
  }

  useEffect(() => {
    if (editInputVisible) {
      editInput.current?.focus();
    }
  }, [editInputVisible])

  return (
    <div className={s.todoItem} id={props.todo._id}>
      <input type="text"
        className={editInputClass}
        value={editInputValue}
        onChange={(e) => setEditInputValue(e.target.value)}
        ref={editInput}
        onKeyPress={handleEditInputEnter}
        onBlur={handleEdit} />
      <div className={contentClass} >{props.todo.content}</div>
      <div className={s['todo-item__actions']}>
        <Btns.EditBtn btnHandler={handleEditClick} />
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
      display: 'none'
    },
  })
  .attach().classes;
