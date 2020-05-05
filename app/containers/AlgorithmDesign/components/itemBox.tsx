import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import { Iconfont } from 'components';
import messages from '../messages';
import styles from '../designStyles';

const ItemBox = ({ classes, data }) => {
  const icons = {
    '1': {
      label: '输入',
      value: 'icon-error',
    },
    '2': {
      label: '输出',
      value: 'icon-carryout',
    },
    '3': {
      label: 'unit',
      value: 'icon-signal-copy',
    },
  };

  const icon = icons[data.type] || icons['1'];

  return (
    <div
      className={classNames(
        classes.designItemBox,
        classes[`itemType${data.type}`]
      )}
    >
      <div className={classes.itemBoxIcon}>
        <Iconfont
          icon={icon.value}
          iconClass={classes.itemBoxIconfont}
          // text={icon.label}
          text={data.category}
          direction="column"
        />
      </div>
      <div className={classes.itemBoxIconLable}>
        <div>{data.name}</div>
        <span className={classes.itemBoxIconLableLength}>
          {data.length}
          <FormattedMessage {...messages.itemColumns} />/{data.size}
          <FormattedMessage {...messages.itemMb} />
        </span>
      </div>
    </div>
  );
};

export default withStyles(styles as any)(ItemBox);
