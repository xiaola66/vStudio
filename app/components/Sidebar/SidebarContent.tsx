import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import MainMenu from './MainMenu';
import WorkspaceContent from './WorkspaceContent';
import styles from './sidebar-jss';

function SidebarContent(props: any) {
  const {
    classes,
    dataMenu,
    turnDarker,
    drawerPaper,
    loadTransition,
    toggleDrawerOpen,
  } = props;

  return (
    <div
      className={classNames(
        classes.drawerInner,
        !drawerPaper ? classes.drawerPaperClose : ''
      )}
    >
      <div className={classes.drawerHeader}>
        <NavLink
          to="/app"
          className={classNames(
            classes.brand,
            classes.brandBar,
            turnDarker && classes.darker
          )}
        >
          EXD vStudio
        </NavLink>
      </div>
      <WorkspaceContent />
      <div
        id="sidebar"
        className={classNames(classes.menuContainer, classes.rounded)}
      >
        <MainMenu
          dataMenu={dataMenu}
          loadTransition={loadTransition}
          toggleDrawerOpen={toggleDrawerOpen}
          drawerPaper={drawerPaper}
        />
      </div>
    </div>
  );
}

export default withStyles(styles as any)(SidebarContent);
