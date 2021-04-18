import { jss } from '../../../styles/jss.js';
import {
  fractionalStylesConstants,
  fullStylesConstants,
} from '../../../styles/constants.js';
import { classes as helperClasses } from '../../../styles/helperClasses.js';
import { getActionBtn, eActionBtn } from './actionBtn/actionBtn';

export const getTodoItem = (props) => {
  return `
    <div class="${s.todoApp__list__item}" id="${props.id}">
        <input type="text" class="${s.todoApp__list__item__editInput}">
        <div class="${s.todoApp__list__item__content} ${
    props.isDone && helperClasses.crossedContent
  }">${props.content}</div>
        <div class="${s['todo-app__list__item__actions']}">
          ${getActionBtn(eActionBtn.EDIT)}
          ${getActionBtn(eActionBtn.DELETE)}
          ${getActionBtn(eActionBtn.DONE)}
        </div>
      </div>`;
};

const styles = {
  todoApp__list__item: {
    margin: '8px auto',
    textAlign: 'center',
    minHeight: fractionalStylesConstants.minTodoItemHeight.value,
    marginRight: fractionalStylesConstants.smallMargin.value,
    marginLeft: fractionalStylesConstants.smallMargin.value,
    borderRadius: fractionalStylesConstants.smallRoundedBorder.value,
    border: fullStylesConstants.borders.blackBorder,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    '&:hover $todo-app__list__item__actions': {
      opacity: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      right: 0,
    },
  },
  'todo-app__list__item__actions': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    opacity: 0,
    transition: 'all 0.5s ease',
  },
  todoApp__list__item__content: {
    fontSize: fractionalStylesConstants.fontSmall.value,
    width: '55%',
    overflowWrap: 'break-word',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  todoApp__list__item__editInput: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '400',
    border: 'none',
    fontSize: fractionalStylesConstants.fontSmall.value,
    textAlign: 'center',
    display: 'none',
  },
  todoApp__list__emptyState: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: fractionalStylesConstants.fontMedium.value,
    opacity: 0,
  },
};

const { classes } = jss.createStyleSheet(styles).attach();
export const s = classes;