import { jss } from '../../js/utils';

const styles = {
  container: {
    height: '100vh',
    marginLeft: '10%',
    marginRight: '10%',
  },
  '@media only screen and (max-width: 600px)':{
    container: {
      marginLeft: '5%',
      marginRight: '5%',
    },
  },
  '@media only screen and (max-width: 400px)':{
    container: {
      marginLeft: '2%',
      marginRight: '2%',
    },
  }
};

const { classes } = jss.createStyleSheet(styles).attach();


export const createContainer = (props) => {
    return `<div class="${classes.container}">${props.children ? props.children : ''}</div>`
}