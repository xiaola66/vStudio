import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Help, Iconfont } from 'components';
import { Scrollbars } from 'react-custom-scrollbars';
import { injectIntl } from 'react-intl';

import Credits from 'components/Help/test/Credits.md';
import messages from '../../messages';

const style = theme => ({
  titleBar: {
    height: 50,
  },
  title: {
    '& .iconfont': {
      fontSize: 16,
      marginLeft: 10,
      marginRight: 15,
    },
    '& .text': {
      fontSize: 16,
    },
  },
  body: {
    boxSizing: 'border-box',
    width: 580,
    height: 400,
    padding: 10,
    background: '#F9F9F9',
  },
});

const MDObj = {
  Credits,
};

function HelpArea(props) {
  const {
    classes,
    mdFile,
    intl: { formatMessage },
  } = props;

  return (
    <Grid container>
      <Grid container alignItems="center" className={classes.titleBar}>
        <Iconfont
          icon="icon-help"
          direction="row"
          iconClass={classes.title}
          text={formatMessage(messages.helpArea.title)}
        />
      </Grid>
      <Grid className={classes.body}>
        <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
          <Help fileSource={MDObj[mdFile]} />
        </Scrollbars>
      </Grid>
    </Grid>
  );
}

export default withStyles(style as any)(injectIntl(HelpArea));
