import * as React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './appStyles-jss';

function Outer(props: any) {
  const { classes, children } = props;
  return (
    <div className={classNames(classes.appFrameOuter, classes.gradientBg)}>
      <main className={classes.outerContent} id="mainContent">
        {children}
      </main>
    </div>
  );
}

export default withStyles(styles as any)(Outer);
