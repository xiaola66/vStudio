/*
 * @Author: Ren jieyun
 * @Date:   2020-02-19 13:55:01
 * @Last Modified by:   jieyun Ren
 * @Last Modified time: 2020-03-24 18:30:59
 */
import {
  lighten,
  darken,
  fade,
} from '@material-ui/core/styles/colorManipulator';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import { text } from 'express';
const styles = theme => ({
  root: {
    padding: 10 * 2,
  },
  rootTable: {
    width: '100%',
    marginTop: 10 * 2.5,
    padding: 10 * 3,
    paddingTop: 0,
    overflowX: 'auto',
  },
  rootTableTitle: {
    width: '100%',
    padding: 10,
    paddingTop: 0,
    overflowX: 'auto',
  },
  miniTableNoHeader: {
    margin: 0,
  },
  highlight: {
    color: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
  },
  spacer: {
    flex: '1 1 100%',
  },
  avatar: {
    marginRight: 10,
  },
  flex: {
    display: 'flex',
  },
  actionsToolbar: {
    color: theme.palette.text.secondary,
    flex: '1 0 auto',
  },
  textField: {
    flexBasis: 200,
    width: 300,
    marginTop: 4,
  },
  table: {
    minWidth: 860,
    borderCollapse: 'separate',
    borderSpacing: '0',
    marginTop: 10,
    '& td, th': {
      padding: '0px 24px 0px 24px',
      fontSize: '14px',
    },
    '& th': {
      color: theme.text.gray,
      fontSize: '14px',
    },
    '& td': {
      color: theme.text.main,
      height: '46px',
    },
    '& tbody tr': {
      height: '46px',
    },
    '& tbody tr:hover': {
      backgroundColor: '#F9F9F9',
    },
    '& tbody tr td button svg': {
      fill: theme.text.blue,
    },
    '& tbody tr td p': {
      fontSize: '14px',
      lineHeight: '14px',
    },
  },
  operateColumn: {
    width: 100,
    textAlign: 'center',
  },
  miniTable: {
    width: '100%',
    marginTop: 0,
    overflowX: 'auto',
    '& td, th': {
      padding: '0px 10px',
    },
    '& th': {
      color: theme.text.gray,
      fontSize: '12px',
    },
    '& td': {
      color: theme.text.main,
    },
    '& tr:nth-child(even)': {
      backgroundColor: '#fafafa',
    },
    '& tbody tr': {
      height: '46px',
    },
    '& tbody tr td button svg': {
      fill: theme.text.blue,
    },
  },
  tableHead: {
    height: '46px',
  },
  linkColumn: {
    cursor: 'pointer',
  },
  tableSmall: {
    minWidth: 500,
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  toolbar: {
    backgroundColor: darken(theme.palette.primary.light, 0.6),
    minHeight: 48,
  },
  title: {
    flex: '0 0 auto',
    fontSize: 16,
    color: theme.text.gray,
    paddingTop: '10px',
    paddingBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    div: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  titleIcon: {
    width: '4px',
    height: '20px',
    backgroundColor: theme.backgroundColor.blue,
    marginRight: 10,
  },
  iconSmall: {
    fontSize: 20,
  },
  leftIcon: {
    marginRight: 10,
  },
  tableChip: {
    margin: 10,
    color: theme.palette.common.white,
  },
  /*
  -----------------------
  ** Table Style **
  ** - Odd Even Stripped
  ** - Hover Style
  ** - Bordered Style
  ** - Empty Table
  ** - Table SIze
  -----------------------
  */
  stripped: {
    '& tbody tr:nth-child(even)': {
      background:
        theme.palette.type === 'dark'
          ? fade(theme.palette.grey[900], 0.5)
          : theme.palette.grey[50],
    },
  },
  hover: {
    '& tbody tr:hover': {
      background: darken(theme.palette.primary.light, 0.8),
    },
  },
  bordered: {
    border: `1px solid ${theme.palette.primary.light}`,
    '& thead tr': {
      background: theme.palette.primary.light,
    },
    '& td, th': {
      border: `1px solid ${theme.palette.primary.light}`,
    },
    '& tr td, tr th': {
      '&:first-child': {
        borderLeft: 'none',
      },
      '&:last-child': {
        borderRight: 'none',
      },
    },
  },
  nodata: {
    textAlign: 'center',
    padding: '10px 10px 40px',
    fontSize: 24,
    lineHeight: '16px',
    color: theme.palette.grey[500],
    '& svg': {
      position: 'relative',
      top: -2,
      width: 26,
      height: 26,
      margin: '0 6px',
      fill: theme.palette.grey[500],
    },
  },
  small: {
    '& tr': {
      height: 24,
      '& td, th': {
        padding: '4px 10px',
        fontSize: 12,
      },
    },
  },
  medium: {
    '& tr': {
      height: 48,
      '& td, th': {
        padding: '4px 24px 4px 24px',
        fontSize: 14,
      },
    },
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
  big: {
    '& tr': {
      height: 64,
      '& td, th': {
        padding: '8px 24px 8px 24px',
        fontSize: 18,
      },
    },
  },
  up: {
    color: green[500],
    '& svg': {
      fill: green[500],
    },
  },
  down: {
    color: red[500],
    '& svg': {
      fill: red[500],
    },
  },
  flat: {
    color: theme.palette.divider,
    '& svg': {
      fill: theme.palette.divider,
    },
  },
  chartTable: {
    '& svg': {
      '& [class*="recharts-bar-rectangle"] path': {
        fill: fade(theme.palette.primary.main, 0.5),
      },
    },
  },
  paginationText: {
    fontSize: 13,
  },
  filterButtons: {
    paddingLeft: 15,
    '& button': {
      marginRight: 15,
    },
  },
  filterGroup: {
    marginLeft: '22px',
    marginRight: '18px',
  },
  settingTilte: {
    fontSize: '14px',
    color: '#262626',
    height: '36px',
    lineHeight: '36px',
    paddingRight: '11px',
  },
  settings: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  filterGroupU: {
    marginRight: '18px',
  },
  filePath: {
    marginTop: 0,
  },
  waterfallTable: {
    width: '100%',
    marginTop: '10px',
  },
  waterfallHead: {
    height: '46px',
    fontSize: 14,
    background: theme.backgroundColor.orange,
    lineHeight: '46px',
  },
  foldHead: {
    height: '46px',
    fontSize: 14,
    background: theme.backgroundColor.gray,
    lineHeight: '46px',
  },
  fold: {
    background: theme.backgroundColor.gray,
  },
  waterfallGridItem: {
    fontSize: '14px',
    padding: '0 24px',
    color: theme.color.main,
    lineHeight: '46px',
    '& $operateColumn': {
      width: '100%',
    },
    '& p': {
      fontSize: '14px',
      lineHeight: '46px',
    },
  },
  waterfallGrid: {
    borderBottom: '1px #E8EBEE solid',
    height: '46px',
    '&:hover': {
      backgroundColor: '#F9F9F9',
    },
  },
  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
  link: {
    color: theme.text.orange,
    textDecoration: 'none',
  },
  load: {
    fontSize: '14px',
    color: '#999999',
    textAlign: 'center',
    lineHeight: '35px',
  },
  iconFont: {
    '& .iconfont': {
      fontSize: '16px',
    },
    '& .text': {
      fontSize: '14px',
      marginLeft: '4px',
    },
  },
  statusType0: {
    '& $iconFont': {
      '& .iconfont': {
        color: theme.iconColor[0],
      },
    },
  },
  statusType1: {
    '& $iconFont': {
      '& .iconfont': {
        color: theme.iconColor[1],
      },
    },
  },
  statusType2: {
    '& $iconFont': {
      '& .iconfont': {
        color: theme.iconColor[2],
      },
    },
  },
  statusType3: {
    '& $iconFont': {
      '& .iconfont': {
        color: theme.itemColor[3],
      },
    },
  },
  taskListTable: {
    paddingLeft: '26px',
    background: 'rgba(255,255,255,1)',
    boxShadow: '0px 2px 17px 1px rgba(32,1,0,0.06)',
    borderRadius: '2px',
    width: '800px',
  },
  taskListHead: {
    maxWidth: '772px',
    borderBottom: '1px solid rgba(200,205,209,1)',
  },
  taskListItem: {
    fontSize: '16px',
    lineHeight: '46px',
    color: 'rgba(51,51,51,1)',
    zIndex: 9999,
  },
  taskListGridItem: {
    fontSize: '14px',
    color: 'rgba(102,102,102,1)',
    lineHeight: '35px',
  },
  empty: {
    fontSize: '16px',
    color: 'rgba(153,153,153,1)',
    padding: '68px 320px 128px 320px',
    // textAlign: 'center',
  },
  iconfont: {
    '& .iconfont': {
      fontSize: 16,
    },
  },
  release: {
    backgroundColor: '#666666',
    borderRadius: 4,
    color: 'rgba(255,255,255,1)',
    fontSize: 14,
  },
});

export default styles;
