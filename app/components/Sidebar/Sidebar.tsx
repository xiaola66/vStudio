import React, { Fragment, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import styles from './sidebar-jss';
import SidebarContent from './SidebarContent';

function Sidebar(props: any) {
  const [anchorEl, setAnchorEl] = useState<any>(null);

  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    classes,
    open,
    toggleDrawerOpen,
    loadTransition,
    turnDarker,
    leftSidebar,
    dataMenu,
  } = props;
  return (
    <Fragment>
      <Hidden lgUp>
        <SwipeableDrawer
          onClose={toggleDrawerOpen}
          onOpen={toggleDrawerOpen}
          open={!open}
          anchor="left"
        >
          <div className={classes.swipeDrawerPaper}>
            <SidebarContent
              drawerPaper
              leftSidebar={leftSidebar}
              toggleDrawerOpen={toggleDrawerOpen}
              loadTransition={loadTransition}
              dataMenu={dataMenu}
              anchorEl={anchorEl}
              openMenuStatus={handleOpen}
              closeMenuStatus={handleClose}
            />
          </div>
        </SwipeableDrawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          variant="permanent"
          onClose={toggleDrawerOpen}
          classes={{
            paper: classNames(
              classes.drawer,
              classes.drawerPaper,
              !open ? classes.drawerPaperClose : ''
            ),
          }}
          open={open}
          anchor="left"
        >
          <SidebarContent
            drawerPaper={open}
            leftSidebar={leftSidebar}
            turnDarker={turnDarker}
            loadTransition={loadTransition}
            dataMenu={dataMenu}
            status={status}
            anchorEl={anchorEl}
            openMenuStatus={handleOpen}
            closeMenuStatus={handleClose}
          />
        </Drawer>
      </Hidden>
    </Fragment>
  );
}

export default withStyles(styles as any)(Sidebar);
