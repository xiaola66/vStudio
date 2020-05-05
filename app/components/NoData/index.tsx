import React from 'react';
import nodata2 from './nodata2.png';
import nodata from './nodata.png';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
const styles = withStyles({
  root: {
    width: '100%',
    textAlign: 'center',
    paddingBottom: '15%',
  },
  img: {
    marginTop: '10%',
  },
  text: {
    color: '#999999',
    paddingTop: '2%',
  },
});
const NoData = (props: INoData) => {
  const {
    classes,
    text,
    size = 2,
    intl: { formatMessage },
  } = props;
  return (
    <div className={classes.root}>
      <img src={size == 1 ? nodata : nodata2} className={classes.img} />
      <p className={classes.text}>{formatMessage({ id: text })}</p>
    </div>
  );
};
export default styles(injectIntl(NoData));
