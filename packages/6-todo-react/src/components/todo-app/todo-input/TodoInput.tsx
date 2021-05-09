import React, { FC, KeyboardEvent, ReactElement, useContext, useState } from 'react';
import { jss } from '../../../styles/jss';
import { colors, commonStyles } from '../../../styles/commonStyles';
import { Context } from '../../../context/Store';
import { TodosActions } from '../../../context/TodosActions';
import { ITodoDTO } from 'fed-todo-journey_todo-common';
import { todosService } from '../../../services/TodosService';

export const TodoInput: FC = (): ReactElement => {
    const { dispatch } = useContext(Context);
    const [todoInput, setTodoInput] = useState('')

    const handleAddTodo = async () => {
        if (todoInput.length) {
            const todo: ITodoDTO = await todosService.addTodo(todoInput);
            dispatch({ type: TodosActions.ADD_EDIT_TODO, payload: todo })
            setTodoInput('');
        }
    }

    const handleKeyPress = (e: KeyboardEvent): void => {
        if (e.key === 'Enter') {
            handleAddTodo();
        }
    }

    return (
        <div className={s.todoApp__inputContainer}>
            <input type="text" className={s.todoApp__inputContainer__textInput}
                onChange={(e) => { setTodoInput(e.target.value) }}
                onKeyPress={handleKeyPress}
                value={todoInput} />
            <button className={s.todoApp__inputContainer__addBtn}
                onClick={handleAddTodo}>Add</button>
        </div>)
};



export const s = jss
    .createStyleSheet({
        todoApp__inputContainer: {
            ...commonStyles.TPpaddingS,
            ...commonStyles.TGreyBorder,
            display: 'flex',
            position: 'fixed',
            width: `${100 - +commonStyles.RLMarginLPercent.marginLeft.split('%')[0] * 2
                }%`,
            bottom: 0,
            zIndex: 1000,
            backgroundColor: colors.white,
        },
        '@media only screen and (max-width: 600px)': {
            todoApp__inputContainer: {
                width: `${100 - +commonStyles.RLMarginMPercent.marginLeft.split('%')[0] * 2
                    }%`,
            },
        },
        '@media only screen and (max-width: 400px)': {
            todoApp__inputContainer: {
                width: `${100 - +commonStyles.RLMarginSPercent.marginLeft.split('%')[0] * 2
                    }%`,
            },
        },
        todoApp__inputContainer__textInput: {
            flex: 1,
            ...commonStyles.roundedBorderS,
            ...commonStyles.RLPaddingS,
            ...commonStyles.blackBorder,
            ...commonStyles.fontS,
            ...commonStyles.RLMarginS,
            overflow: 'visible',
            '&:focus': {
                flex: 1,
                ...commonStyles.roundedBorderS,
                ...commonStyles.RLPaddingS,
                ...commonStyles.focusedBlueBorder,
                ...commonStyles.fontS,
                ...commonStyles.RLMarginS,
                overflow: 'visible',
                outline: 'none',
            },
        },
        todoApp__inputContainer__addBtn: {
            ...commonStyles.RLMarginS,
            ...commonStyles.roundedBorderS,
            ...commonStyles.fontS,
            width: '80px',
            height: '30px',
            backgroundColor: colors.softBlue,
            color: colors.white,
            cursor: 'pointer',
            transition: 'all 0.2s',
            outline: 'none',
            border: 'none',
            '&:active': {
                ...commonStyles.RMarginS,
                ...commonStyles.roundedBorderS,
                ...commonStyles.fontS,
                backgroundColor: colors.blue,
                color: colors.white,
                width: '80px',
                cursor: 'pointer',
            },
        },
    })
    .attach().classes;
