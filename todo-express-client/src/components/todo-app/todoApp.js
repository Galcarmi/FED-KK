import { jss } from '../../styles/jss.js';
import {
  fullStylesConstants,
  fractionalStylesConstants,
} from '../../styles/constants.js';

export const getTodoApp = (children) => {
  return `<div class="${classes.todoApp}">
    <div class="${classes.todoApp__list}">
      <div class="${
        classes.todoApp__list__emptyState
      }">Add your first TODO !</div>
      ${children ? children : ''}
    </div>
    <div class="${classes.todoApp__inputContainer}">
      <input type="text" class="${classes.todoApp__inputContainer__textInput}"/>
      <button class="${classes.todoApp__inputContainer__addBtn}">Add</button>
    </div>
  </div>`;
};

const styles = {
  todoApp: {
    backgroundColor: fullStylesConstants.colors.white,
    minHeight: '100%',
    width: '100%',
    boxShadow: fullStylesConstants.shadows.mediumSizeShadow,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  todoApp__inputContainer: {
    paddingBottom: fractionalStylesConstants.smallPadding.value,
    display: 'flex',
    borderTop: fullStylesConstants.borders.greyTopBorder,
    paddingTop: fractionalStylesConstants.smallPadding.value,
    position: 'fixed',
    width: `${
      100 - fractionalStylesConstants.sideMarginBigPercent.quantity * 2
    }${fractionalStylesConstants.sideMarginBigPercent.unit}`,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: fullStylesConstants.colors.white,
  },
  '@media only screen and (max-width: 600px)': {
    todoApp__inputContainer: {
      width: `${
        100 - fractionalStylesConstants.sideMarginMediumPercent.quantity * 2
      }${fractionalStylesConstants.sideMarginMediumPercent.unit}`,
    },
  },
  '@media only screen and (max-width: 400px)': {
    todoApp__inputContainer: {
      width: `${
        100 - fractionalStylesConstants.sideMarginSmallPercent.quantity * 2
      }${fractionalStylesConstants.sideMarginSmallPercent.unit}`,
    },
  },
  todoApp__inputContainer__textInput: {
    flex: 1,
    borderRadius: fractionalStylesConstants.smallRoundedBorder.value,
    padding: fullStylesConstants.padding.smallSidesPadding,
    overflow: 'visible',
    border: fullStylesConstants.borders.blackBorder,
    fontSize: fractionalStylesConstants.fontSmall.value,
    marginRight: fractionalStylesConstants.smallMargin.value,
    marginLeft: fractionalStylesConstants.smallMargin.value,
    '&:focus': {
      flex: 1,
      borderRadius: fractionalStylesConstants.smallRoundedBorder.value,
      padding: fullStylesConstants.padding.smallSidesPadding,
      overflow: 'visible',
      border: fullStylesConstants.borders.focusedBlueBorder,
      fontSize: fractionalStylesConstants.fontSmall.value,
      marginRight: fractionalStylesConstants.smallMargin.value,
      marginLeft: fractionalStylesConstants.smallMargin.value,
      outline: 'none',
    },
  },
  todoApp__inputContainer__addBtn: {
    marginRight: fractionalStylesConstants.smallMargin.value,
    width: '80px',
    height: '30px',
    borderRadius: fractionalStylesConstants.smallRoundedBorder.value,
    backgroundColor: fullStylesConstants.colors.softBlue,
    color: fullStylesConstants.colors.white,
    fontSize: fractionalStylesConstants.fontSmall.value,
    cursor: 'pointer',
    transition: 'all 0.2s',
    outline: 'none',
    border: 'none',
    '&:active': {
      marginRight: fractionalStylesConstants.smallMargin.value,
      width: '80px',
      borderRadius: fractionalStylesConstants.smallRoundedBorder.value,
      backgroundColor: fullStylesConstants.colors.blue,
      color: fullStylesConstants.colors.white,
      fontSize: fractionalStylesConstants.fontSmall.value,
      cursor: 'pointer',
    },
  },
  todoApp__list: {
    paddingBottom: `${
      fractionalStylesConstants.minTodoItemHeight.quantity + 2
    }${fractionalStylesConstants.minTodoItemHeight.unit}`,
  },
  todoApp__list__emptyState: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: fractionalStylesConstants.fontSmall.value,
    opacity: 0,
  },
};

export const { classes } = jss.createStyleSheet(styles).attach();