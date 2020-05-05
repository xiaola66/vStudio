import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { GridTable } from 'components';
import { Grid } from '@material-ui/core';

const style = withStyles({
  content: {
    position: 'absolute',
    width: 795,
    height: 420,
    marginTop: '-10px',
  },
  fillBox: {
    width: 795,
    height: 420,
  },
});

function DataPreve(props) {
  const { classes, data } = props;
  const title = data.title || [];
  const content = data.content || [];

  return (
    <Grid>
      <Grid className={classes.content}>
        <GridTable dataTitle={title} dataContent={content} />
      </Grid>
      <Grid className={classes.fillBox}></Grid>
    </Grid>
  );
}

export default style(DataPreve);
