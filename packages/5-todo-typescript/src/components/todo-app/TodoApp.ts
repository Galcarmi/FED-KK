import { jss } from '../../styles/jss';
import { colors, commonStyles } from '../../styles/commonStyles';
import { IProps } from '../../types/IProps';

export const getTodoApp = (props: IProps): string => {
  return `<div class="${s.todoApp}">
    <div class="${s.todoApp__list}">
      <div class="${s.todoApp__list__emptyState}">Add your first TODO !</div>
      ${props.children ? props.children : ''}
    </div>
    <div class="${s.todoApp__inputContainer}">
      <input type="text" class="${s.todoApp__inputContainer__textInput}"/>
      <button class="${s.todoApp__inputContainer__addBtn}">Add</button>
    </div>
  </div>`;
};

const styles = {
  todoApp: {
    ...commonStyles.TpaddingXXS,
    ...commonStyles.boxShadowM,
    backgroundColor: colors.white,
    minHeight: '100%',
    width: '100%',
    position: 'relative',
  },
  todoApp__inputContainer: {
    ...commonStyles.TPpaddingS,
    ...commonStyles.TGreyBorder,
    display: 'flex',
    position: 'fixed',
    width: `${
      100 - +commonStyles.RLMarginLPercent.marginLeft.split('%')[0] * 2
    }%`,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: colors.white,
  },
  '@media only screen and (max-width: 600px)': {
    todoApp__inputContainer: {
      width: `${
        100 - +commonStyles.RLMarginMPercent.marginLeft.split('%')[0] * 2
      }%`,
    },
  },
  '@media only screen and (max-width: 400px)': {
    todoApp__inputContainer: {
      width: `${
        100 - +commonStyles.RLMarginSPercent.marginLeft.split('%')[0] * 2
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
  todoApp__list: {
    paddingBottom: `${
      commonStyles.minTodoItemHeight.minHeight.split('px')[0]
    }px`,
  },
  todoApp__list__emptyState: {
    ...commonStyles.fontS,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    opacity: 0,
  },
};

export const s = jss.createStyleSheet(styles).attach().classes
