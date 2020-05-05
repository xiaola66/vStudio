import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { Grid, IconButton } from '@material-ui/core';
import style from './style';

function Title(props) {
  const { classes, title, handleDetailShow, isOutput = false } = props;
  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      className={isOutput ? classes.outPutTitle : classes.title}
    >
      {title}
      <IconButton
        aria-label="close"
        className={classes.closeIcon}
        onClick={() => handleDetailShow(false)}
      >
        <CloseIcon />
      </IconButton>
    </Grid>
  );
}

export default withStyles(style as any)(Title);
