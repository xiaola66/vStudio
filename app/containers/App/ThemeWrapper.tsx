import React, { useState, useEffect } from 'react';
import Loading from 'react-loading-bar';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/styles';
import {
  withTheme,
  withStyles,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import '../../styles/components/vendors/react-loading-bar/index.css';
import applicationTheme from '../../styles/theme/applicationTheme';

const styles = {
  root: {
    width: '100%',
    minHeight: '100%',
    marginTop: 0,
    zIndex: 1,
  },
};

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function ThemeWrapper(props: any) {
  const { classes, children } = props;
  const [pageLoaded, setPageLoaded] = useState(true);
  const theme = createMuiTheme(applicationTheme());
  useEffect(() => {
    setPageLoaded(false);
    return componentWillUnmount;
  }, []);

  const componentWillUnmount = () => {
    setPageLoaded(true);
  };

  return (
    <StylesProvider jss={jss}>
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <Loading
            show={pageLoaded}
            color="rgba(255,255,255,.9)"
            showSpinner={false}
          />
          {children}
        </div>
      </MuiThemeProvider>
    </StylesProvider>
  );
}

export default withTheme<any>(withStyles(styles)(ThemeWrapper));
