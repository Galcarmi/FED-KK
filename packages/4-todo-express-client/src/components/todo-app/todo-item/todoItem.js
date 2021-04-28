import { jss } from '../../../styles/jss.js';
import { commonStyles } from '../../../styles/constants.js';
import { classes as helperClasses } from '../../../styles/helperClasses.js';
import { getActionBtn, eActionBtn } from './actionBtn/actionBtn';

export const getTodoItem = (props) => {
  return `
    <div class="${s.todoApp__list__item}" id="${props._id}">
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
    ...commonStyles.minTodoItemHeight,
    ...commonStyles.sidesMarginS,
    ...commonStyles.smallRoundedBorder,
    ...commonStyles.blackBorder,
    ...commonStyles.marginTopBottomMedium,
    textAlign: 'center',
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
    ...commonStyles.fontSmall,
    width: '55%',
    overflowWrap: 'break-word',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  todoApp__list__item__editInput: {
    ...commonStyles.fontSmall,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '400',
    border: 'none',
    textAlign: 'center',
    display: 'none',
  },
  todoApp__list__emptyState: {
    ...commonStyles.fontMedium,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    opacity: 0,
  },
};

const { classes } = jss.createStyleSheet(styles).attach();
export const s = classes;
