import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withStyles, withTheme } from '@material-ui/core/styles';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import Chip from '@material-ui/core/Chip';
import Ionicon from 'react-ionicons';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import styles from './sidebar-jss';

function MainMenu(props: any) {
  const { classes, openSubMenu, open, dataMenu, drawerPaper } = props;

  const getMenus = menuArray =>
    menuArray.map((item, index) => {
      // const auth = userRole
      //   ? _.intersection(item.role, userRole).length > 0
      //   : false;
      const auth = true;
      if (item.child) {
        return auth ? (
          <div
            key={index.toString()}
            className={open.indexOf(item.key) > -1 ? classes.active : ''}
          >
            <ListItem
              button
              key={`${index}-child`}
              className={classNames(
                classes.head,
                item.icon ? classes.iconed : '',
                open.indexOf(item.key) > -1 ? classes.opened : '',
                drawerPaper ? '' : classes.paperClose
              )}
              onClick={() => openSubMenu(item.key, item.keyParent)}
            >
              {item.icon && (
                <ListItemIcon className={classes.icon}>
                  <Ionicon icon={item.icon} />
                </ListItemIcon>
              )}
              <ListItemText
                classes={{ primary: classes.primary }}
                primary={item.name}
              />
              {open.indexOf(item.key) > -1 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              component="div"
              className={classNames(
                classes.nolist,
                item.keyParent ? classes.child : ''
              )}
              in={open.indexOf(item.key) > -1}
              timeout="auto"
              unmountOnExit
            >
              <List className={classes.dense} component="nav" dense>
                {getMenus(item.child)}
              </List>
            </Collapse>
          </div>
        ) : null;
      }
      if (item.title) {
        return auth ? (
          <ListSubheader
            disableSticky
            key={index.toString()}
            component="div"
            className={classes.title}
          >
            {item.name}
          </ListSubheader>
        ) : null;
      }
      const listItemRender = (
        <ListItem
          key={index.toString()}
          //button
          exact
          className={classes.nested}
          activeClassName={classes.active}
          component={NavLink}
          to={item.link}
        >
          {item.icon && (
            <ListItemIcon className={classes.icon}>
              <Ionicon icon={item.icon} />
            </ListItemIcon>
          )}
          <ListItemText
            classes={{ primary: classes.primary }}
            primary={item.name}
            className={classes.mainMenuItemText}
          />
          {item.badge && (
            <Chip
              color="primary"
              label={item.badge}
              className={classes.badge}
            />
          )}
        </ListItem>
      );
      return auth && listItemRender;
    });
  return <div>{getMenus(dataMenu)}</div>;
}

MainMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.array.isRequired,
  openSubMenu: PropTypes.func.isRequired,
  toggleDrawerOpen: PropTypes.func,
  loadTransition: PropTypes.func.isRequired,
  dataMenu: PropTypes.array.isRequired,
};

const openAction = (key, keyParent) => ({
  type: 'OPEN_SUBMENU',
  key,
  keyParent,
});

const reducer = 'ui';

const mapStateToProps = (state: any) => ({
  force: state, // force active class for sidebar menu
  open: state.ui.subMenuOpen,
});

const mapDispatchToProps = dispatch => ({
  openSubMenu: bindActionCreators(openAction, dispatch),
});

const MainMenuMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMenu);

export default withTheme<any>(withStyles(styles as any)(MainMenuMapped));
