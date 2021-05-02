import { jss } from '../../../styles/jss.js';
import { commonStyles } from '../../../styles/commonStyles';
import { commonClasses } from '../../../styles/commonClasses';
import { getDeleteBtn } from '../../action-btn/DeleteBtn';
import { getEditBtn } from '../../action-btn/EditBtn';
import { getDoneBtn } from '../../action-btn/DoneBtn';
import { IProps } from '../../../types/IProps.js';

interface TodoItemPropse extends IProps {
  _id: string;
  isDone: boolean;
  content: string;
}

export const getTodoItem = (props: TodoItemPropse) => {
  return `
    <div class="${s.todoItem}" id="${props._id}">
        <input type="text" class="${s.todoItem__editInput}">
        <div class="${s.todoItem__content} ${
    props.isDone && commonClasses.crossedContent
  }">${props.content}</div>
        <div class="${s.todoItem__actions}">
          ${getEditBtn()}
          ${getDeleteBtn()}
          ${getDoneBtn()}
        </div>
      </div>`;
};

const styles = {
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
    '&:hover $todoItem__actions': {
      opacity: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      right: 0,
    },
  },
  todoItem__actions: {
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
};

const { classes } = jss.createStyleSheet(styles).attach();
export const s = classes;
