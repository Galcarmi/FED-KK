import { jss } from '../../../styles/jss.js';
import { commonStyles } from '../../../styles/constants.js';

export const getContainer = (props) => {
    return `<div class="${s.container}">${props.children ? props.children : ''}</div>`
}

const styles = {
  container: {
    height: '100vh',
    ...commonStyles.sidesMarginBigPercent
  },
  '@media only screen and (max-width: 600px)':{
    container: {
      ...commonStyles.sidesMarginMediumPercent
    },
  },
  '@media only screen and (max-width: 400px)':{
    container: {
      ...commonStyles.sidesMarginSmallPercent
    },
  }
};

const { classes } = jss.createStyleSheet(styles).attach();
export const s = classes;