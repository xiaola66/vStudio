import React, { useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { useKeycloak } from '@react-keycloak/web';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import { Iconfont } from 'components';
import { changeLocale } from 'logic/language/action';
import messages from './messages';

const styles = theme => ({
  root: {
    marginRight: '20px',
  },
  userName: {
    fontSize: '14px',
    color: 'rgba(102,102,102,1)',
    lineHeight: '46px',
  },
  menu: {
    marginTop: '36px',
  },
  paper: {
    width: '180px',
    height: '238px',
    background: 'rgba(254, 254, 254, 1)',
    boxShadow: '0px 2px 17px 1px rgba(26, 4, 2, 0.06) !important',
    borderRadius: '4px !important',
    fontSize: '12px',
  },
  list: {
    '& li': {
      color: theme.color.main,
      padding: '8px 0 8px 27px',
      fontSize: '12px',
    },
  },
  menuItemRoot: {
    fontSize: '12px',
    color: theme.color.main,
  },
  menuItemLocale: {
    fontSize: '12px',
    color: theme.color.orange,
  },
  laguage: {
    marginLeft: '50px',
  },
  logout: {
    marginTop: '10px !important',
    borderTop: '1px solid rgba(237,237,239,1)',
  },
  Iconfont: {
    marginTop: 3,
    '& .iconfont': {
      fontSize: '6px',
      width: '6px',
      marginLeft: 2,
    },
  },
});

const HtmlTooltip = withStyles({
  tooltip: {
    width: '122px',
    height: '80px',
    backgroundColor: 'rgba(254,254,254,1)',
    boxShadow: '0px 2px 17px 1px rgba(26,4,2,0.06)',
    borderRadius: '4px',
    fontSize: 12,
    left: '20px',
    marginRight: 0,
  },
})(Tooltip);

function UserMenu(props: any) {
  const {
    classes,
    intl: { formatMessage },
    locale,
    onLocaleToggle,
  } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showIcon, setShowIcon] = React.useState<any>(false);
  const handleShowUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setShowIcon(true);
  };
  const handleCloseUserMenu = () => {
    setAnchorEl(null);
    setShowIcon(false);
  };

  const keycloak: any | undefined = useKeycloak().keycloak;

  return (
    <div className={classes.root}>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleShowUserMenu}
        className={classes.userName}
      >
        <Iconfont icon="dropdown" onShow={true} close={showIcon} text="admin" />
      </Button>
      <Menu
        className={classes.menu}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseUserMenu}
        classes={{ paper: classes.paper, list: classes.list }}
      >
        <MenuItem>{formatMessage(messages.accountInformation)}</MenuItem>
        <MenuItem>{formatMessage(messages.businessAdministration)}</MenuItem>
        <MenuItem>{formatMessage(messages.helpCenter)}</MenuItem>
        <MenuItem>{formatMessage(messages.featureUpdates)}</MenuItem>
        <HtmlTooltip
          interactive
          placement="left-start"
          title={
            <React.Fragment>
              <MenuItem
                onClick={evt => onLocaleToggle(evt, 'zh')}
                classes={{
                  root:
                    locale === 'zh'
                      ? classes.menuItemLocale
                      : classes.menuItemRoot,
                }}
              >
                {formatMessage(messages.zh)}
              </MenuItem>
              <MenuItem
                onClick={evt => onLocaleToggle(evt, 'en')}
                classes={{
                  root:
                    locale === 'en'
                      ? classes.menuItemLocale
                      : classes.menuItemRoot,
                }}
              >
                {formatMessage(messages.en)}
              </MenuItem>
            </React.Fragment>
          }
        >
          <MenuItem>
            {formatMessage(messages.interfaceLanguage)}
            <span className={classes.laguage}>
              {formatMessage(messages[locale])}
            </span>
            <Iconfont icon="icon-Nextpage" iconClass={classes.Iconfont} />
          </MenuItem>
        </HtmlTooltip>
        <MenuItem className={classes.logout} onClick={() => keycloak.logout()}>
          {formatMessage(messages.logout)}
        </MenuItem>
      </Menu>
    </div>
  );
}

const mapStateToProps = state => ({
  locale: state.language.locale,
});

export const mapDispatchToProps = dispatch => {
  return {
    onLocaleToggle: (evt, locale) => dispatch(changeLocale(locale)),
    dispatch,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles as any)(injectIntl(UserMenu)));
