/*
 * @Author: Wei Zhao
 * @Date:   2020-03-24 18:31:58
 * @Last Modified by:   jieyun Ren
 * @Last Modified time: 2020-03-24 18:32:13
 */
const styles = theme => ({
  root: {
    paddingLeft: '10px',
  },
  title: {
    flex: '0 0 auto',
    fontSize: 16,
    color: theme.text.gray,
    // paddingTop: '10',
    paddingBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    div: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  titleText: {
    color: '#666666',
    paddingRight: '20px',
  },
  rootTableTitle: {
    width: '100%',
    padding: 0,
    paddingTop: 10,
    overflowX: 'auto',
  },
  tableTopPaper: {
    color: theme.color.gray,
    fontSize: 13,
    background: theme.backgroundColor.lightOrange,
    boxShadow: 0,
    borderRadius: 2,
    padding: 10,
    minHeight: 60,
  },
  settings: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  topGrid: {
    fontSize: 13,
    padding: 0,
  },
  topGridLeft: {
    paddingTop: 10,
    color: theme.text.main,
    cursor: 'pointer',
  },
  topGridLeft2: {
    paddingTop: 10,
    color: theme.text.orange,
    cursor: 'pointer',
  },
  topGridRight: {
    marginLeft: 10,
    paddingTop: 10,
    color: theme.text.orange,
    cursor: 'pointer',
  },
  topGridRight2: {
    paddingLeft: 10,
    paddingTop: 10,
    color: theme.text.main,
    cursor: 'pointer',
  },
  helpText: {
    color: '#FFAA21',
    cursor: 'pointer',
  },
  link: {
    color: theme.text.orange,
    textDecoration: 'none',
  },
  iconfont: {
    '& .iconfont': {
      fontSize: 16,
    },
  },
  buttonGroup: {
    height: 50,
    width: '100%',
    marginTop: 20,
  },
  currentButton: {
    height: '100%',
    width: '10%',
    fontSize: 14,
    color: '#FFAA21',
    border: '1px solid rgba(204,204,204,1)',
    borderTop: '2px solid rgba(232,164,5,1)',
    borderBottom: 'none',
  },
  publishedButton: {
    height: '100%',
    width: '10%',
    fontSize: 14,
    color: '#333333',
    borderBottom: '1px solid rgba(204,204,204,1)',
  },
  nullDiv: {
    height: '100%',
    width: '80%',
    float: 'right',
    borderBottom: '1px solid rgba(204,204,204,1)',
  },
});
export default styles;
