import { jss } from '../../styles/jss.js';
import { colors, commonStyles } from '../../styles/constants.js';

export const getTodoApp = (children) => {
  return `<div class="${s.todoApp}">
    <div class="${s.todoApp__list}">
      <div class="${s.todoApp__list__emptyState}">Add your first TODO !</div>
      ${children ? children : ''}
    </div>
    <div class="${s.todoApp__inputContainer}">
      <input type="text" class="${s.todoApp__inputContainer__textInput}"/>
      <button class="${s.todoApp__inputContainer__addBtn}">Add</button>
    </div>
  </div>`;
};

const styles = {
  todoApp: {
    ...commonStyles.mediumSizeShadow,
    backgroundColor: colors.white,
    minHeight: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  todoApp__inputContainer: {
    ...commonStyles.paddingTopBottomS,
    ...commonStyles.greyTopBorder,
    display: 'flex',
    position: 'fixed',
    width: `${
      100 - commonStyles.sidesMarginBigPercent.marginLeft.split('%')[0] * 2
    }%`,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: colors.white,
  },
  '@media only screen and (max-width: 600px)': {
    todoApp__inputContainer: {
      width: `${
        100 - commonStyles.sidesMarginMediumPercent.marginLeft.split('%')[0] * 2
      }%`,
    },
  },
  '@media only screen and (max-width: 400px)': {
    todoApp__inputContainer: {
      width: `${
        100 - commonStyles.sidesMarginSmallPercent.marginLeft.split('%')[0] * 2
      }%`,
    },
  },
  todoApp__inputContainer__textInput: {
    flex: 1,
    ...commonStyles.smallRoundedBorder,
    ...commonStyles.sidesPaddingS,
    ...commonStyles.blackBorder,
    ...commonStyles.fontSmall,
    ...commonStyles.sidesMarginS,
    overflow: 'visible',
    '&:focus': {
      flex: 1,
      ...commonStyles.smallRoundedBorder,
      ...commonStyles.sidesPaddingS,
      ...commonStyles.focusedBlueBorder,
      ...commonStyles.fontSmall,
      ...commonStyles.sidesMarginS,
      overflow: 'visible',
      outline: 'none',
    },
  },
  todoApp__inputContainer__addBtn: {
    ...commonStyles.marginRightS,
    ...commonStyles.smallRoundedBorder,
    ...commonStyles.fontSmall,
    width: '80px',
    height: '30px',
    backgroundColor: colors.softBlue,
    color: colors.white,
    cursor: 'pointer',
    transition: 'all 0.2s',
    outline: 'none',
    border: 'none',
    '&:active': {
      ...commonStyles.marginRightS,
      ...commonStyles.smallRoundedBorder,
      ...commonStyles.fontSmall,
      backgroundColor: colors.blue,
      color: colors.white,
      width: '80px',
      cursor: 'pointer',
    },
  },
  todoApp__list: {
    paddingBottom: `${
      commonStyles.minTodoItemHeight.minHeight.split('px')[0]
    }px`,
  },
  todoApp__list__emptyState: {
    ...commonStyles.fontSmall,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    opacity: 0,
  },
};

const { classes } = jss.createStyleSheet(styles).attach();
export const s = classes;
