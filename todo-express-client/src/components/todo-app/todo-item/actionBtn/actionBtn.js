import { commonStyles, colors } from '../../../../styles/constants';
import { jss } from '../../../../styles/jss.js';

export const eActionBtn = {
  DELETE: 'DELETE',
  EDIT: 'EDIT',
  DONE: 'DONE',
};

export const getActionBtn = (actionBtn) => {
  let svgBtn;
  switch (actionBtn) {
    case eActionBtn.DONE: {
      svgBtn = `<svg
            class="${s.todoApp__list__item__actions__done}"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.393 7.5l-5.643 5.784-2.644-2.506-1.856 1.858 4.5 4.364 7.5-7.643-1.857-1.857z"
            />
          </svg>`;
      break;
    }
    case eActionBtn.DELETE: {
      svgBtn = `<svg
            class="${s.todoApp__list__item__actions__delete}"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z"
            />
          </svg>`;
      break;
    }
    case eActionBtn.EDIT: {
      svgBtn = `<svg
            class="${s.todoApp__list__item__actions__edit}"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.994 12.964l3.106 3.105-4.112.931 1.006-4.036zm9.994-3.764l-5.84 5.921-3.202-3.202 5.841-5.919 3.201 3.2z"
            />
          </svg>`;
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
