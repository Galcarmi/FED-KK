const fractionalStylesConstants = {
  screenSizeMedium: {
    unit: 'px',
    quantity: 600,
  },
  screenSizeSmall: {
    unit: 'px',
    quantity: 400,
  },
  sideMarginBigPercent: {
    unit: '%',
    quantity: 10,
  },
  sideMarginMediumPercent: {
    unit: '%',
    quantity: 5,
  },
  sideMarginSmallPercent: {
    unit: '%',
    quantity: 2,
  },
  smallPadding:{
    unit: 'px',
    quantity: 5, 
  },
  smallMargin : {
    unit: 'px',
    quantity: 5, 
  },
  smallRoundedBorder : {
    unit: 'px',
    quantity: 25, 
  },
  fontSmall : {
    unit: 'em',
    quantity: 1.2,  
  },
  fontMedium : {
    unit: 'em',
    quantity: 1.4,  
  }
};

const fullStylesConstants = {
  shadows: {
    mediumSizeShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  },
  colors: {
      softBlue : 'rgba(82, 153, 229, 1)', 
      blue : 'rgb(0, 123, 255)', 
      softYellow : 'rgb(177, 177, 41)',
      white: 'white',
      red: 'red',
      green: 'green'
  },
  borders: {
      greyTopBorder : 'solid 3px rgb(177, 184, 189)',
      blackBorder : 'solid 2px rgb(62, 66, 70)',
      focusedBlueBorder : 'solid 3px rgba(82, 153, 229, 1)'
  },
  padding : {
      smallSidesPadding : '0px 10px 0px 10px'
  }
};

const insertValuesToFractionalStylesObj = (styleObj) => {
  for (const property in styleObj) {
    styleObj[
      property
    ].value = `${styleObj[property].quantity}${styleObj[property].unit}`;
  }
};

insertValuesToFractionalStylesObj(fractionalStylesConstants);

export { fullStylesConstants, fractionalStylesConstants };
