import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

const styles = theme => ({
  root: {
    margin: '0',
    width: '450px',
    maxWidth: '450px',
    // height: '350px',
    boxShadow: '0px 2px 17px 1px rgba(29, 2, 1, 0.06)',
    borderRadius: '2px',
    color: theme.color.gray,
    fontSize: '14px',
  },
  header: {
    color: theme.color.orange,
    lineHeight: '30px',
    marginLeft: '28px',
    marginRight: '10px',
    padding: '20px 0 10px 0',
    borderBottom: '1px solid rgba(201,205,209,1)',
    '&:after': {
      width: 0,
    },
    '& p': {
      fontSize: '16px',
    },
  },
  changeDataBtn: {
    width: 120,
    height: 35,
    marginRight: 10,
    background: 'rgba(255,162,19,1)',
    fontSize: 16,
    color: 'rgba(51,51,51,1)',
    borderRadius: 6,
    cursor: 'pointer',
  },
  label: {
    textAlign: 'right',
    paddingRight: '20px',
    paddingTop: '5px',
  },
  closeButton: {
    position: 'absolute',
    right: '-4px',
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  basicDialogButtons: {
    paddingLeft: '12px',
    '& button': {
      height: '28px',
      paddingTop: 3,
      transition: 'none',
    },
    '& button:nth-child(1)': {
      minWidth: '55px',
      background: '#fff',
      border: '1px solid rgba(222,222,222,1)',
    },
    '& button:nth-child(1):hover': {
      background: 'rgb(223, 223, 223)',
    },
    '& button:nth-child(2)': {
      minWidth: '94px',
      marginLeft: '14px',
      background: 'rgba(244, 173, 69, 1)',
      color: 'rgba(255, 255, 255, 1)',
      border: '1px solid rgba(244, 173, 69, 1)',
    },
    '& button:nth-child(2):hover': {
      background: 'rgb(243, 167, 54)',
    },
    '& button:nth-child(2):disabled': {
      background: '#ADADAD',
      color: '#fff',
      borderColor: '#ADADAD',
    },
  },
  noErrorGrid: {
    minHeight: '25px',
  },
  errorGrid: {
    minHeight: '24px',
    color: '#FF0000',
    fontSize: '12px',
    lineHeight: '25px',
    paddingLeft: '110px',
  },
  errorGrid2: {
    minHeight: '24px',
    color: '#FF0000',
    fontSize: '12px',
    lineHeight: '25px',
    paddingLeft: '15px',
  },
  descrInput: {
    '& ::-webkit-input-placeholder': {
      textAlign: 'right',
      paddingTop: 80,
    },
  },
});

const VsDialog = ({
  title,
  classes,
  open,
  onCancel,
  actions,
  content,
  onSubmit,
  formatMessage,
  type = 1,
  className,
}: VsDialogProps) => {
  useEffect(() => {}, []);

  const isError =
    Array.isArray(content) && (type === 1 || 3)
      ? content.filter(item => item.isError).length > 0 ||
        content.filter(item => item.isRequired && item.value === '').length > 0
      : false;

  const handleChange = (event, item) => {
    item.onChange && item.onChange(event.target.value, item.id);
  };

  const paramRender = item => {
    let r: any;
    switch (item.type) {
      case 'textarea':
        r = (
          <TextField
            id={item.id}
            placeholder={item.placeholder}
            multiline
            rows="4"
            onChange={e => handleChange(e, item)}
            value={item.value}
          />
        );
        break;
      default:
        r = (
          <TextField
            id="name"
            // autoComplete='off'
            placeholder={item.placeholder}
            onChange={e => handleChange(e, item)}
            value={item.value}
          />
        );
        break;
    }
    return r;
  };

  const contentRender =
    Array.isArray(content) && type === 1
      ? content.map((item, index) => [
          <Grid container key={`d-grid-${index}`}>
            <Grid item xs={3} className={classes.label}>
              {item.label}
            </Grid>
            <Grid item xs={7}>
              {paramRender(item)}
            </Grid>
          </Grid>,
          <Grid
            container
            key={`d-grid-${index}-error`}
            className={item.isError ? classes.errorGrid : classes.noErrorGrid}
          >
            {item.isError && item.error}
          </Grid>,
        ])
      : Array.isArray(content) && type === 3
      ? content.map((item, index) => [
          <Grid container key={`d3-grid-${index}`}>
            <Grid item xs={12}>
              <TextField
                autoComplete="off"
                id={item.id}
                placeholder={item.placeholder}
                multiline
                rows="6"
                className={classes.descrInput}
                onChange={e => handleChange(e, item)}
                value={item.value}
              />
            </Grid>
          </Grid>,
          <Grid
            container
            key={`d3-grid-${index}-error`}
            className={item.isError ? classes.errorGrid2 : classes.noErrorGrid}
          >
            {item.isError && item.error}
          </Grid>,
        ])
      : content;

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="basic-dialog-title"
      classes={{ paperWidthSm: className || classes.root }}
    >
      <DialogTitle disableTypography className={classes.header}>
        <Typography>{title}</Typography>
        {onCancel ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onCancel}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent>{contentRender}</DialogContent>
      <DialogActions className={classes.footer}>
        {type === 1 || type === 3 ? (
          <Grid container>
            <Grid item xs={3}></Grid>
            <Grid item xs={9} className={classes.basicDialogButtons}>
              <Button onClick={onCancel}>
                {formatMessage({ id: 'common.close' })}
              </Button>
              {isError ? (
                <Button disabled>{formatMessage({ id: 'common.ok' })}</Button>
              ) : (
                <Button
                  onClick={() => {
                    onSubmit && onSubmit();
                    onCancel && onCancel();
                  }}
                >
                  {formatMessage({ id: 'common.ok' })}
                </Button>
              )}
            </Grid>
          </Grid>
        ) : (
          actions
        )}
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles as any)(VsDialog);
