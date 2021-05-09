import React, { FC, ReactElement } from 'react';
import { commonStyles, colors } from '../../styles/commonStyles';
import { jss } from '../../styles/jss';

interface BtnProps {
  btnHandler: Function
}

export const EditBtn: FC<BtnProps> = (): ReactElement => {
  return (<svg
    className={s.editBtn}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24">
    <path
      d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.994 12.964l3.106 3.105-4.112.931 1.006-4.036zm9.994-3.764l-5.84 5.921-3.202-3.202 5.841-5.919 3.201 3.2z"
    />
  </svg>);
};

export const s = jss
  .createStyleSheet({
    editBtn: {
      ...commonStyles.RLMarginXS,
      cursor: 'pointer',
      fill: colors.softYellow,
    },
  })
  .attach().classes;
