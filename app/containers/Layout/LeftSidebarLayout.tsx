import React, { Fragment, useEffect } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import {
  toggleAction,
  openAction,
  playTransitionAction,
} from 'logic/ui/action';
import dataMenu from './menu';
import Header from 'components/Header/Header';
import Sidebar from 'components/Sidebar/Sidebar';
import styles from './appStyles-jss';

function LeftSidebarLayout(props: any) {
  const {
    classes,
    children,
    toggleDrawer,
    sidebarOpen,
    loadTransition,
    mode,
    gradient,
    history,
    changeMode,
    transform,
    place,
    handleOpenGuide,
  } = props;

  useEffect(() => {}, []);

  return (
    <div className={classNames(classes.appFrameInner, classes.sideNav)}>
      <Fragment>
        <Header
          toggleDrawerOpen={toggleDrawer}
          turnDarker={transform > 30}
          showTitle={transform > 40}
          margin={sidebarOpen}
          gradient={gradient}
          position="left-sidebar"
          changeMode={changeMode}
          mode={mode}
          title={place}
          history={history}
          openGuide={handleOpenGuide}
        />
        <Sidebar
          open={sidebarOpen}
          toggleDrawerOpen={toggleDrawer}
          loadTransition={loadTransition}
          turnDarker={transform > 30}
          dataMenu={dataMenu}
          leftSidebar
        />
        <main
          className={classNames(
            classes.content,
            sidebarOpen
              ? classes.contentPaddingLeftTaskOpen
              : classes.contentPaddingLeftTask
          )}
          id="mainContent"
        >
          <section
            className={classNames(classes.mainWrap, classes.sidebarLayout)}
          >
            {children}
          </section>
        </main>
      </Fragment>
    </div>
  );
}

const mapStateToProps = state => ({
  sidebarOpen: state.ui.sidebarOpen,
  pageLoaded: state.ui.pageLoaded,
});

const mapDispatchToProps = dispatch => ({
  toggleDrawer: () => dispatch(toggleAction),
  initialOpen: bindActionCreators(openAction, dispatch),
  loadTransition: bindActionCreators(playTransitionAction, dispatch),
});

const LeftSidebarLayoutMaped = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftSidebarLayout);

export default withStyles(styles as any)(LeftSidebarLayoutMaped);
