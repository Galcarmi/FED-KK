import { jss } from './jss.js';

const styles = {
  crossedContent: {
    textDecoration: 'line-through',
  },
  visible: {
    opacity: 1,
  },
  displayBlock: {
    display: 'block',
  },
  displayNone: {
    display: 'none',
  },
};

export const { classes } = jss.createStyleSheet(styles).attach();