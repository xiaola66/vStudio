/**
 * @Author: Zhao wei
 * @Date:   2020-02-19 16:33:05
 * @Description: icon and text icon
 */
import React from 'react';
import classNames from 'classnames';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import 'public/iconfont/iconfont.css';
import styles from './Iconfont-jss';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

function Iconfont(props: IconfontProps) {
  const {
    classes,
    icon,
    text,
    direction,
    onShow,
    iconClass,
    onClick,
    close = false,
  } = props;
  const [open, setOpen] = React.useState(false);

  const onClickIcon = () => {
    onClick && onClick();
  };
  const handleClick = () => {
    if (open == false) {
      setOpen(true);
    } else {
      setOpen(true);
    }
  };

  return (
    <div>
      <div
        className={classNames(
          direction == 'column' ? classes.columnIcon : classes.rowIcon,
          iconClass
        )}
        onClick={() => {
          onClickIcon();
          handleClick();
        }}
      >
        <Icon className={classNames('iconfont', icon)}></Icon>
        {text && <span className="text">{text}</span>}
      </div>
      {onShow && (
        <div className={classes.iconShow}>
          {!open ? <ExpandMore /> : close ? <ExpandLess /> : <ExpandMore />}
        </div>
      )}
    </div>
  );
}

export default withStyles(styles as any)(Iconfont);
