import React from 'react';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown/with-html';
import { withStyles } from '@material-ui/core/styles';
import '../../public/iconfont/iconfont.ttf';

import './index.css';
import 'public/iconfont/iconfont.css';

const style = withStyles({
  summary: {
    width: '100%',
    fontSize: 14,
    fontWeight: 400,
    fontFamily: 'PingFang',
    color: 'rgba(51,51,51,1)',
  },
  markdownBody: {
    '& h1': {},
    '& h2': {},
    '& h3': {},
    '& h4': {},
    '& h5': {},
    '& h6': {
      marginLeft: 35,
      fontSize: 14,
      fontWeight: 400,
      color: 'rgba(102,102,102,1)',
    },
    '& p': {
      marginLeft: 35,
      fontSize: 12,
      lineHeight: '30px',
      color: 'rgba(153,153,153,1)',
    },
    '& a': {},
    '& i': {},
    '& span': {},
    '& strong': {},
  },
});

function Help(props: IHelp) {
  const { fileSource, classes } = props;
  return (
    <ReactMarkdown
      className={classNames(classes.markdownBody, classes.summary)}
      source={fileSource}
      escapeHtml={false}
    />
  );
}

export default style(Help);
