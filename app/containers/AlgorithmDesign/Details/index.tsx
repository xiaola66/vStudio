import React from 'react';
import InputPage from './InputPage';
import OtherPages from './OtherPages';
import { withStyles } from '@material-ui/core/styles';

const style = theme => ({
  drawer: {
    overflow: 'hidden',
    boxSizing: 'border-box',
    width: 1720,
    height: 830,
    fontSize: 16,
    fontFamily: 'PingFang',
    fontWeight: 400,
  },
  paperAnchorBottom: {
    left: 'unset',
  },
  body: {
    width: 1720,
  },
  commonButton: {
    width: 95,
    height: 30,
    padding: 0,
    fontSize: 14,
  },
});

function Details(props: propsType): any {
  let { classes, data, handleDetailShow, handleSaveAttributes } = props;
  if (!data.attributes) {
    return null;
  }
  if (parseInt(data.type) === 1) {
    return (
      <InputPage
        data={data}
        classes={classes}
        handleDetailShow={handleDetailShow}
        handleSaveAttributes={handleSaveAttributes}
      />
    );
  } else {
    return (
      <OtherPages
        data={data}
        classes={classes}
        handleDetailShow={handleDetailShow}
        handleSaveAttributes={handleSaveAttributes}
      />
    );
  }
}

export default withStyles(style as any)(Details);
