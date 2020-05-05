import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Input } from '@material-ui/core';

import { Scrollbars } from 'react-custom-scrollbars';

const styles = theme => ({
  content: {
    paddingRight: 90,
    fontSize: 14,
    maxHeight: 340,
  },
  itemBox: {
    height: 25,
    marginBottom: 20,
    '& span': {
      maxWidth: 110,
      maxHeight: 25,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    '& div': {
      width: 207,
      height: 25,
      marginLeft: 24,
    },
  },
});

function ConfigurationPage(props) {
  const { classes, configList, handleConfigList } = props;

  const handleValue = (event, index) => {
    const { value } = event.target;
    const config = configList.map((item, itemIndex) => {
      return index === itemIndex
        ? {
            ...item,
            value,
          }
        : item;
    });
    handleConfigList(config);
  };

  const itemRender = (itemData, index) => {
    let render;
    const { type, lable, defaultValue, value } = itemData;
    // const labelValue = value || defaultValue;
    switch (type) {
      case 'input':
        render = (
          <Grid
            container
            wrap="nowrap"
            justify="flex-end"
            className={classes.itemBox}
          >
            <span>{lable}</span>
            <Input
              type="text"
              value={value}
              onChange={event => handleValue(event, index)}
            />
          </Grid>
        );
        break;
      case 'inputPassword':
        render = (
          <Grid
            container
            wrap="nowrap"
            justify="flex-end"
            className={classes.itemBox}
          >
            <span>{lable}</span>
            <Input
              type="password"
              value={value}
              onChange={event => handleValue(event, index)}
            />
          </Grid>
        );
        break;
      default:
        <h1>unknow Label</h1>;
        break;
    }
    return render;
  };

  //   类型： 1. input 2. password
  const renderCall = (data: any) =>
    data.map((itemData, index) => itemRender(itemData, index));
  return (
    <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
      <Grid container justify="flex-end" className={classes.content}>
        {renderCall(configList)}
      </Grid>
    </Scrollbars>
  );
}

export default withStyles(styles as any)(ConfigurationPage);
