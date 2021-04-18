import { jss } from '../../../styles/jss.js';
import { fractionalStylesConstants } from '../../../styles/constants.js';

export const getContainer = (props) => {
    return `<div class="${classes.container}">${props.children ? props.children : ''}</div>`
}

const styles = {
  container: {
    height: '100vh',
    marginLeft: fractionalStylesConstants.sideMarginBigPercent.value,
    marginRight: fractionalStylesConstants.sideMarginBigPercent.value,
  },
  '@media only screen and (max-width: 600px)':{
    container: {
      marginLeft: fractionalStylesConstants.sideMarginMediumPercent.value,
      marginRight: fractionalStylesConstants.sideMarginMediumPercent.value,
    },
  },
  '@media only screen and (max-width: 400px)':{
    container: {
        marginLeft: fractionalStylesConstants.sideMarginSmallPercent.value,
        marginRight: fractionalStylesConstants.sideMarginSmallPercent.value,
    },
  }
};

const { classes } = jss.createStyleSheet(styles).attach();