import React, { useState } from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import { Iconfont } from 'components';
import styles from './header-jss';
import UserMenu from './UserMenu';

function Header(props: any) {
  const [open] = useState(false);

  const { classes, toggleDrawerOpen, margin, title, showTitle } = props;

  return (
    <AppBar
      className={classNames(
        classes.appBar,
        classes.floatingBar,
        margin && classes.appBarShift,
        classes.left,
        classes.gradientBg
      )}
    >
      <Toolbar disableGutters={!open} className={classes.aiHeader}>
        <Fab
          size="small"
          className={classes.menuButton}
          aria-label="Menu"
          onClick={toggleDrawerOpen}
        >
          {margin ? (
            <Iconfont icon="icon-Revoke" />
          ) : (
            <Iconfont icon="icon-Redo" />
          )}
        </Fab>
        <Hidden smDown>
          <div className={classes.headerProperties}>
            <div
              className={classNames(
                classes.headerAction,
                showTitle && classes.fadeOut
              )}
            ></div>
            <Typography
              component="h2"
              className={classNames(
                classes.headerTitle,
                showTitle && classes.show
              )}
            >
              {title}
            </Typography>
          </div>
        </Hidden>
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles as any)(Header);
