import { jss } from '../../styles/jss';
import { commonStyles } from '../../styles/commonStyles';
import React, { FC, ReactElement } from 'react';

export const Container: FC<{}> = (props:React.PropsWithChildren<{}>): ReactElement => {
  return (<div className={s.container}>
    {props.children}
  </div>);
};

const s = jss
  .createStyleSheet({
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
  })
  .attach().classes;
