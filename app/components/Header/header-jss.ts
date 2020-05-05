/*
 * @Author: Ren jieyun
 * @Date:   2020-02-18 16:36:42
 * @Last Modified by:   jieyun Ren
 * @Last Modified time: 2020-03-28 15:05:49
 */
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import {
  gradientBgLight,
  gradientBgDark,
} from 'containers/Layout/appStyles-jss';
const drawerWidth = 200;

const styles = theme => ({
  aiHeader: {
    minHeight: '60px',
    '@media (min-width:1920px)': {
      minHeight: '60px',
    },
  },
  appBar: {
    background: '#EEF1F7',
    //boxShadow: '0px 1px 6px 0px rgba(221,221,221,0.54)',
    zIndex: theme.zIndex.drawer + 1,
    '& $menuButton': {
      color: theme.palette.primary.main,
      backgroundColor: 'transparent',
      boxShadow: 'none',
      zIndex: 10,
    },
    '&$left': {
      '& $menuButton': {
        marginLeft: 13,
      },
      '& $headerTitle': {
        left: 10 * 2,
      },
    },
    '&$right': {
      '& $menuButton': {
        marginRight: 13,
      },
      '& $headerTitle': {
        right: 10 * 2,
      },
      '& > div': {
        flexDirection: 'row-reverse',
      },
      '& $flex': {
        textAlign: 'left',
      },
    },
  },
  attachedbar: {
    position: 'relative',
    '& $menuButton': {
      margin: `0 ${10 * 2}px`,
    },
    '& $wrapper': {
      [theme.breakpoints.down('lg')]: {
        border: `1px solid ${theme.palette.divider}`,
      },
    },
  },
  floatingBar: {
    position: 'fixed',
  },
  appMenu: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    [theme.breakpoints.down('md')]: {
      padding: `${10 / 2}px 0`,
    },
    [theme.breakpoints.up('lg')]: {
      background: fade(theme.palette.background.paper, 0.8),
    },
    color: theme.palette.text.primary,
  },
  flex: {
    flex: 1,
    textAlign: 'right',
  },
  flexDefault: {
    flex: 1,
    textAlign: 'right',
  },
  left: {},
  right: {},
  appBarShift: {
    transition: theme.transitions.create(['width', 'margin', 'background'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    '&$left': {
      '& $menuButton': {
        [theme.breakpoints.up('lg')]: {
          marginLeft: -35,
          marginTop: 10,
          color: '#ffffff',
          fontWeight: 'normal',
        },
      },
      [theme.breakpoints.up('lg')]: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
      },
    },
    '&$right': {
      '& $menuButton': {
        [theme.breakpoints.up('lg')]: {
          marginRight: -40,
        },
      },
      [theme.breakpoints.up('lg')]: {
        marginRight: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
      },
    },
    '& $menuButton': {
      //backgroundColor: theme.palette.primary.main,
      //boxShadow: theme.glow.medium,
    },
    '& $headerAction': {
      marginLeft: 10,
    },
    '&$darker': {
      '& $menuButton': {
        color: '#000000',
      },
    },
  },
  menuButton: {},
  hide: {
    display: 'none',
  },
  textField: {
    marginLeft: 10,
    marginRight: 10,
    width: 200,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  dark: {},
  light: {},
  wrapper: {
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    marginRight: 10 * 2,
    marginLeft: 10,
    borderRadius: 22,
    display: 'inline-block',
    '&:hover': {
      background: fade(theme.palette.common.white, 0.25),
    },
    '&$light': {
      background: fade(theme.palette.common.white, 0.2),
    },
    '&$dark': {
      background:
        theme.palette.type === 'dark'
          ? theme.palette.grey[700]
          : fade(theme.palette.common.white, 0.8),
      boxShadow: theme.shade.light,
      '& input': {
        color: theme.palette.grey[700],
      },
      '& input::placeholder': {
        color: theme.palette.grey[400],
        opacity: 1 /* Firefox */,
      },
      '& input:-ms-input-placeholder': {
        color: theme.palette.grey[400],
      },
      '& input::-ms-input-placeholder': {
        /* Internet Explorer 10-11 */
        color: theme.palette.grey[400],
      },
    },
    '& $miniInput': {
      width: 70,
    },
  },
  searchWrapper: {
    [theme.breakpoints.down('md')]: {
      flex: 1,
      textAlign: 'right',
    },
  },
  search: {
    width: 10 * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  miniInput: {
    paddingLeft: 0,
    textIndent: '999999px',
  },
  gradientBg: {},
  solidBg: {},
  darker: {
    backgroundAttachment: 'fixed',
    boxShadow: theme.shadows[3],
    '&$gradientBg': {
      backgroundImage:
        theme.palette.type === 'dark'
          ? gradientBgDark(theme)
          : gradientBgLight(theme),
    },
    '&$solidBg': {
      backgroundColor:
        theme.palette.type === 'dark'
          ? darken(theme.palette.primary.main, 0.4)
          : theme.palette.primary.main,
    },
    '& $menuButton': {
      color: '#000000',
    },
  },
  fixed: {
    position: 'fixed',
    left: 0,
    top: 0,
    [theme.breakpoints.up('lg')]: {
      top: 10 * -8,
    },
    '& nav': {
      padding: '16px 0',
    },
  },
  separatorV: {
    borderLeft: `1px solid ${theme.palette.grey[300]}`,
    height: 20,
    margin: '0 10px',
    opacity: 0.4,
  },
  notifMenu: {
    '& li': {
      height: 'auto',
      '& h3': {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
    },
  },
  badgeMenu: {
    '& span': {
      top: 0,
      right: -30,
    },
  },
  textNotif: {
    '& span': {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  },
  notifIcon: {
    '& svg': {
      width: 28,
      height: 28,
    },
    '&$dark': {
      '& svg': {
        fill: theme.palette.text.primary,
      },
    },
    '&$light': {
      '& svg': {
        fill: theme.palette.common.white,
      },
    },
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 20px 5px',
    height: 64,
    position: 'absolute',
    width: '100%',
    fontSize: 16,
    margin: 0,
    fontWeight: 500,
    textDecoration: 'none',
    color: theme.palette.text.primary,
    '& img': {
      marginRight: 10,
      width: 30,
    },
  },
  mainMenu: {
    backgroundColor: theme.palette.background.paper,
    padding: `${10}px 0`,
    boxShadow: theme.shadows[3],
    position: 'relative',
    transition: 'padding 0.3s ease',
    '& > div': {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  headMenu: {
    fontSize: 12,
    padding: `${10 / 2}px ${10}px ${10 / 2}px ${10 * 2}px`,
    minHeight: 'auto',
    margin: `0 ${10 / 2}px`,
  },
  opened: {
    color: theme.palette.primary.main,
    boxShadow: `inset 0 0 0 1px ${theme.palette.primary.main}`,
    '& svg': {
      fill: theme.palette.primary.main,
    },
  },
  rightIcon: {
    marginLeft: 10 / 2,
    opacity: 0.3,
  },
  selected: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.light,
    '&:hover': {
      background: theme.palette.primary.main,
    },
    '& svg': {
      fill: theme.palette.primary.light,
    },
    '& $rightIcon': {
      opacity: 0.7,
    },
  },
  paperMenu: {
    overflow: 'auto',
    maxHeight: 500,
  },
  popperClose: {
    pointerEvents: 'none',
    zIndex: 2,
  },
  title: {
    fontSize: 10,
    textTransform: 'uppercase',
    marginTop: 10 * 3,
    display: 'block',
    color: theme.palette.secondary.main,
    lineHeight: '28px',
    fontWeight: 'bold',
    background: theme.palette.background.paper,
    borderRadius: theme.rounded.medium,
  },
  dropDownMenu: {
    minWidth: 300,
    marginTop: 10 * 1.5,
    position: 'relative',
  },
  active: {},
  menuItem: {
    '& span': {
      fontSize: 14,
    },
    '&$active': {
      borderLeft: `5px solid ${theme.palette.primary.main}`,
      backgroundColor:
        theme.palette.type === 'dark'
          ? fade(theme.palette.secondary.main, 0.24)
          : theme.palette.secondary.light,
      '& span': {
        color: theme.palette.primary.main,
      },
      '&:hover': {
        backgroundColor:
          theme.palette.type === 'dark'
            ? fade(theme.palette.secondary.main, 0.24)
            : theme.palette.secondary.light,
      },
    },
  },
  megaMenu: {
    padding: `0 ${10 * 2}px`,
    '& $title': {
      paddingLeft: 10 * 2,
    },
  },
  megaItem: {
    display: 'inline-block',
    width: 'auto',
    margin: 10,
    borderRadius: theme.rounded.big,
    padding: `${10 / 4}px ${10}px`,
    '& span': {
      fontSize: 14,
    },
    '& div': {
      padding: 0,
    },
    '&$active': {
      border: `1px solid ${theme.palette.primary.main}`,
      backgroundColor:
        theme.palette.type === 'dark'
          ? fade(theme.palette.secondary.main, 0.24)
          : theme.palette.secondary.light,
      '& span': {
        color: theme.palette.primary.main,
      },
      '&:hover': {
        backgroundColor:
          theme.palette.type === 'dark'
            ? fade(theme.palette.secondary.main, 0.24)
            : theme.palette.secondary.light,
      },
    },
  },
  bigIcon: {
    display: 'block',
    marginTop: 40,
    '& svg': {
      width: 100,
      height: 100,
      fill: theme.palette.primary.main,
      margin: '0 auto',
      display: 'inherit',
    },
  },
  button: {},
  headerProperties: {
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    zIndex: 1,
  },
  fadeOut: {},
  invert: {},
  headerAction: {
    margin: `0 ${10 * 3}px`,
    transition: 'opacity 0.5s ease',
    '& $button': {
      margin: `0 ${10}px / 2`,
      '& svg': {
        fill: fade(theme.palette.common.white, 0.87),
        width: 28,
        height: 28,
      },
    },
    '&$fadeOut': {
      opacity: 0,
    },
    '&$invert': {
      '& $button': {
        '& svg': {
          fill: fade(theme.palette.text.primary, 0.5),
        },
      },
    },
  },
  show: {},
  headerTitle: {
    transition: 'all 0.3s ease',
    fontSize: 10 * 3,
    position: 'absolute',
    textTransform: 'capitalize',
    fontWeight: 700,
    top: 60,
    color: theme.palette.common.white,
    opacity: 0,
    '&$show': {
      top: 10,
      opacity: 0.87,
    },
  },
  swipeDrawerPaper: {
    width: drawerWidth,
  },
  searchHeaderMenu: {
    flex: 1,
    flexDirection: 'row-reverse',
    display: 'flex',
    alignItems: 'center',
  },
  userName: {
    fontSize: '16px',
    fontWeight: '400',
    color: 'rgba(51,51,51,1)',
    opacity: '0.65',
    lineHeight: '40px',
    textShadow: '0px 1px 1px rgba(199,199,199,0.25)',
  },
  userAvatar: {
    display: 'inline-block;',
  },
  headerUserMenu: {
    display: 'flex',
    justifyContent: 'center',
    paddingRight: '10px',
  },
  userConfigBtn: {
    marginTop: '4px',
    minWidth: '30px',
    overflow: 'hidden',
    paddingTop: '8px',
  },
});

export default styles;
