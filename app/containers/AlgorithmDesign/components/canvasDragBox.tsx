import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import ItemBox from './itemBox';
import styles from '../designStyles';

const CanvasDragBox = ({
  classes,
  data,
  handleDetailData,
  handleDeleteItem,
}) => {
  useEffect(() => {}, []);

  const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const getDetailItemData = event => {
    // 发送请求获取数据
    handleDetailData(event, true, data.type, data);
  };
  return (
    <div
      className={classes.canvasDragItem}
      style={{
        left: data.x,
        top: data.y,
      }}
      id={`ALG_${data.id}_${data.dropTime}`}
      onClick={stopPropagation}
    >
      <ContextMenuTrigger id={`ALG__MENU_${data.id}_${data.dropTime}`}>
        <ItemBox data={data} />
      </ContextMenuTrigger>
      <ContextMenu
        id={`ALG__MENU_${data.id}_${data.dropTime}`}
        className={classes.contextMenu}
      >
        <MenuItem
          data={{ foo: 'bar' }}
          onClick={event => {
            getDetailItemData(event);
          }}
        >
          <FormattedMessage id="common.config" />
        </MenuItem>
        <MenuItem
          data={{ foo: 'bar' }}
          onClick={() => {
            handleDeleteItem(data);
          }}
        >
          <FormattedMessage id="common.delete" />
        </MenuItem>
      </ContextMenu>
    </div>
  );
};

export default withStyles(styles as any)(CanvasDragBox);
