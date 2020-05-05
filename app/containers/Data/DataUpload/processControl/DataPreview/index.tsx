import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import GridTable from 'components/GridTable';

const style = withStyles({
  content: {
    position: 'absolute',
    width: 1680,
    height: 675,
    marginTop: '-16px',
  },
  fillBox: {
    width: 1680,
    height: 650,
  },
});

function DataPreview(props: any) {
  const { classes, previewData } = props;
  const previewDataTitle = previewData.title || [];
  const previewDataContent = previewData.content || [];

  return (
    <Grid>
      <Grid className={classes.content}>
        <GridTable
          dataTitle={previewDataTitle}
          dataContent={previewDataContent}
        />
      </Grid>
      <Grid className={classes.fillBox}></Grid>
    </Grid>
  );
}

export default style(DataPreview);
