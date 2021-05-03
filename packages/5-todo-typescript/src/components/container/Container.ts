import { jss } from '../../styles/jss';
import { commonStyles } from '../../styles/commonStyles';
import { IProps } from '../../types/IProps';
import { JSSStyles, JSSClasses } from '../../types/Styles';

export const getContainer = (props: IProps): string => {
  return `<div class="${s.container}">${
    props.children ? props.children : ''
  }</div>`;
};

const styles: JSSStyles = {
  container: {
    height: '100vh',
    ...commonStyles.RLMarginLPercent,
  },
  '@media only screen and (max-width: 600px)': {
    container: {
      ...commonStyles.RLMarginMPercent,
    },
  },
  '@media only screen and (max-width: 400px)': {
    container: {
      ...commonStyles.RLMarginSPercent,
    },
  },
};

const { classes }: { classes: JSSClasses } = jss
  .createStyleSheet(styles)
  .attach();
export const s: JSSClasses = classes;
