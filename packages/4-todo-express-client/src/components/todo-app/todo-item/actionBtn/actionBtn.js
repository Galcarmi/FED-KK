import { commonStyles, colors } from '../../../../styles/constants';
import { jss } from '../../../../styles/jss.js';
import { getDeleteSVG } from './deleteSVG';
import { getDoneSVG } from './doneSVG';
import { getEditSVG } from './editSVG';

export const eActionBtn = {
  DELETE: 'DELETE',
  EDIT: 'EDIT',
  DONE: 'DONE',
};

export const getActionBtn = (actionBtn) => {
  let svgBtn;
  switch (actionBtn) {
    case eActionBtn.DONE: {
      svgBtn = getDoneSVG({class: s.todoApp__list__item__actions__done})
      break;
    }
    case eActionBtn.DELETE: {
      svgBtn = getDeleteSVG({class: s.todoApp__list__item__actions__delete})
      break;
    }
    case eActionBtn.EDIT: {
      svgBtn = getEditSVG({class: s.todoApp__list__item__actions__edit})
      break;
    }
    default: {
      throw new Error(`btn ${actionBtn} doesn't exist.`);
    }
  }

  return svgBtn;
};

const styles = {
  todoApp__list__item__actions__done: {
    ...commonStyles.sidesMarginXS,
    cursor: 'pointer',
    fill: colors.green,
  },
  todoApp__list__item__actions__delete: {
    ...commonStyles.sidesMarginXS,
    cursor: 'pointer',
    fill: colors.red,
  },
  todoApp__list__item__actions__edit: {
    ...commonStyles.sidesMarginXS,
    cursor: 'pointer',
    fill: colors.softYellow,
  },
};

const { classes } = jss.createStyleSheet(styles).attach();
export const s = classes;
