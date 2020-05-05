/*
 * @Author: Ren jieyun
 * @Date:   2020-02-20 11:37:41
 * @Last Modified by:   jieyun Ren
 * @Last Modified time: 2020-04-17 17:24:16
 */
import { fade } from '@material-ui/core/styles/colorManipulator';
import lightGreen from '@material-ui/core/colors/lightGreen';
import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';
import grey from '@material-ui/core/colors/grey';

const drawerWidth = 200;
const styles = theme => ({
  user: {
    justifyContent: 'center',
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    overflow: 'hidden',
    border: 'none',
    background: 'none',
    color: theme.palette.text.primary,
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  swipeDrawerPaper: {
    width: drawerWidth,
  },
  opened: {
    '& $primary, & $icon': {
      color: '#FEFEFE',
    },
  },
  openedList: {
    backgroundColor: '',
  },
  nested: {
    paddingBottom: 10,
    margin: `0 0`,
    paddingLeft: 10 * 2,
    [theme.breakpoints.down('lg')]: {
      paddingLeft: 10 * 2,
    },
    '&:hover': {
      backgroundColor: theme.backgroundColor.dark,
    },
    '&:focus': {
      backgroundColor: theme.backgroundColor.dark,
    },
  },
  icon: {
    fill: theme.text.white,
    minWidth: 20,
    '& svg': {
      fill: '#ffffff',
    },
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    height: '100%',
    position: 'fixed',
    backgroundColor: theme.backgroundColor.main,
    boxShadow: theme.shade.light,
  },
  drawerInnerMobile: {
    // Make the items inside not wrap when transitioning:
    height: '100%',
    backgroundColor:
      theme.palette.type === 'dark'
        ? fade(theme.palette.background.paper, 0.75)
        : fade(theme.palette.background.paper, 0.95),
  },
  drawerHeader: {
    padding: '0',
    zIndex: 1,
    position: 'relative',
    color: '#ffffff',
    ...theme.mixins.toolbar,
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 80,
    height: 80,
    boxShadow: theme.glow.light,
  },
  brandBar: {
    transition: theme.transitions.create(['width', 'margin', 'background'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    '&:after': {
      transition: theme.transitions.create(['box-shadow'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  },
  darker: {
    background: 'none',
  },
  child: {
    '& a': {
      paddingLeft: 10 * 6,
    },
  },
  title: {
    fontSize: 10,
    textTransform: 'uppercase',
    paddingLeft: 10 * 10,
    marginTop: 10 * 3,
    display: 'block',
    color: theme.palette.secondary.main,
    lineHeight: '28px',
    fontWeight: 'bold',
  },
  dense: {
    margin: '-2px 0 10px 10px',
    paddingTop: 5,
    '& > $title:first-child': {
      margin: '0',
    },
  },
  active: {
    backgroundColor: theme.backgroundColor.dark,
    '& $primary': {
      color: theme.text.lightGray,
    },
    '& $icon': {
      color: theme.iconColor.lightGray,
    },
    '& $icon svg': {
      fill: theme.iconColor.lightGray,
    },
    '&:hover': {
      backgroundColor: theme.backgroundColor.dark,
    },
  },
  nolist: {
    listStyle: 'none',
  },
  primary: {
    whiteSpace: 'nowrap',
    color: theme.color.lightGray,
    fontSize: 14,
    //marginLeft: 10,
  },
  iconed: {},
  head: {
    padding: `10px 0`,
    margin: `10px 0 0`,
    borderRadius: `0 30px 30px 0`,
    paddingLeft: 18,
    '& $icon': {
      color: theme.iconColor.lightGray,
      width: '20px',
    },
    '&$iconed': {
      paddingLeft: 18,
    },
    '& svg[class^="MuiSvgIcon"]': {
      left: -15,
      position: 'relative',
      fill: theme.color.lightGray,
    },
    '& $primary': {
      marginLeft: 10,
    },
  },
  headCapital: {
    padding: `10px 0 10px 30px`,
    left: 10 * -1.5,
    position: 'relative',
    textTransform: 'uppercase',
    borderRadius: `0 30px 30px 0`,
    margin: `10px`,
    '& span': {
      fontSize: 14,
    },
  },
  copyright: {
    color: theme.palette.text.secondary,
    background: theme.palette.background.paper,
    padding: 10 * 2,
    position: 'fixed',
    [theme.breakpoints.up('lg')]: {
      background: 'none',
      position: 'absolute',
    },
    bottom: 0,
    left: 10 * 3,
    lineHeight: '24px',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 3px 5px',
    height: 64,
    position: 'relative',
    textDecoration: 'none',
    fontSize: 18,
    margin: 0,
    fontWeight: 500,
    color: theme.text.white,
    '& img': {
      width: 160,
      marginTop: -4,
    },
  },
  brandBig: {
    paddingTop: 10 * 4,
    position: 'relative',
    textAlign: 'center',
    '& img': {
      width: 68,
    },
    '& h3': {
      fontSize: 18,
      marginTop: 10 * 2,
      fontWeight: 500,
      color: theme.palette.text.primary,
    },
  },
  profile: {
    height: 120,
    width: '100%',
    display: 'flex',
    fontSize: 14,
    padding: 10,
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    position: 'absolute',
    margin: `${10 * 2}px 0`,
    zIndex: 0,
    '& h4': {
      fontSize: 18,
      marginBottom: 0,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      width: 110,
    },
    '& button': {
      fontSize: 12,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      width: 110,
      display: 'block',
      overflow: 'hidden',
      textTransform: 'capitalize',
      padding: 0,
      minHeight: 20,
      marginTop: 4,
    },
  },
  statusMenu: {
    '& li': {
      width: 100,
    },
  },
  dotStatus: {
    width: 10,
    height: 10,
    display: 'inline-block',
    borderRadius: '50%',
    marginRight: 10 / 2,
  },
  online: {
    backgroundColor: lightGreen[500],
  },
  bussy: {
    backgroundColor: red[500],
  },
  idle: {
    backgroundColor: amber[500],
  },
  offline: {
    backgroundColor: grey[500],
  },
  rounded: {},
  landingNav: {},
  withProfile: {},
  menuContainer: {
    overflow: 'auto',
    // height: 'calc(100% - 64px)',
    width: drawerWidth,
    position: 'relative',
    display: 'block',
    // padding: `${10 * 5}px 0`,
    '&$withProfile': {
      paddingTop: 10 * 18,
    },
    '&$landingNav': {
      [theme.breakpoints.up('lg')]: {
        paddingTop: 10 * 5,
      },
      [theme.breakpoints.down('lg')]: {
        height: 'calc(100% - 100px)',
        paddingTop: 10 * 5,
      },
    },
    '&$rounded': {
      paddingRight: 0,
      // '& $opened': {
      //   '&:before': {
      //     background: theme.backgroundColor.light,
      //   },
      // },
    },
    '&::-webkit-scrollbar': {
      width: 8,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 12,
      backgroundColor: 'rgba(0,0,0,0)',
    },
    '&:hover': {
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,0.4)',
        border: '1px solid rgba(255,255,255,0.4)',
      },
    },
  },
  divider: {
    marginTop: 10,
  },
  badge: {
    height: 'auto',
  },
  displayNone: {
    display: 'none',
  },
  mainMenuItemText: {
    padding: 0,
    color: theme.text.gainsboro,
    '& $primary': {
      color: theme.text.gainsboro,
      fontSize: '14px',
      marginLeft: 10,
    },
  },
  drawerPaperClose: {
    width: '57px',
    position: 'absolute',
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    '& $user': {
      justifyContent: 'flex-start',
    },
    '& $bigAvatar': {
      width: 40,
      height: 40,
    },
    '& nav': {
      display: 'none',
    },
    '&:hover': {
      width: drawerWidth,
      boxShadow: theme.shadows[6],
      '& nav': {
        display: 'block',
      },
      '& $menuContainer': {
        marginLeft: 0,
      },
    },
    '& $brand': {
      display: 'none',
    },
    '& $profile': {
      flexDirection: 'row',
      top: 10 * 6,
      padding: 10 / 2,
    },
    '& $avatar': {
      marginRight: 10 * 3,
    },
    '& $menuContainer': {
      '&$menuContainer': {
        paddingBottom: 0,
      },
    },
  },
  paperClose: {
    '& $primary': {
      marginLeft: 50,
    },
  },
  workspaceMenus: {
    display: 'flex',
    margin: '20px 14px 0',
    color: theme.color.lightGray,
    background: theme.background.lightBlue,
    padding: '4px 5px 4px 10px',
  },
  wspIcon: {
    fontSize: 16,
  },
  wspCurName: {
    marginLeft: 10,
    width: 108,
    overflow: 'hidden',
    fontSize: 14,
    whiteSpace: 'nowrap',
    fontWeight: 'normal',
  },
  wspMenuIcon: {
    cursor: 'pointer',
    width: 10,
    '& .iconfont': {
      fontSize: 12,
    },
  },
  wspMenuPaper: {
    width: 172,
    marginTop: 42,
    marginLeft: -146,
    borderRadius: 1,
    boxShadow: '0px 1px 9px 0px rgba(32,1,0,0.06)',
  },
  wspMenuList: {
    paddingTop: 0,
  },
  wspCreateBtn: {
    width: '100%',
    textAlign: 'left',
    padding: 0,
    paddingTop: 5,
    height: '34px',
    backgroundColor: 'rgba(240,241,245,1)',
    borderBottom: '2px solid #E7E9EB',
    color: theme.color.main,
    borderRadius: 0,
    '&:hover': {
      backgroundColor: 'rgba(240,241,245,1)',
    },
    '& .iconfont': {
      fontSize: 14,
      marginLeft: 15,
      marginTop: -5,
      color: theme.color.orange,
    },
  },
  wspCreateBtnLabel: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  wspCreateBtnStartIcon: {
    marginTop: -8,
  },
  wspCreateDialog: {
    height: 250,
    width: 430,
    fontSize: 14,
  },
  wspName: {
    width: '100%',
    overflow: 'hidden',
  },
  wspRenameInpt: {
    '& input': {
      fontSize: 13,
      color: theme.color.gray,
    },
  },
  wspListItem: {
    height: 40,
    color: theme.color.main,
    fontSize: 14,
    padding: '10px 10px 10px 15px',
    cursor: 'pointer',
    '&:hover': {
      //backgroundColor: theme.background.gray,
    },
  },
  wspDeleteBtn: {
    width: '170px',
    position: 'absolute',
    left: 14,
    bottom: 10,
    textAlign: 'left',
    height: '34px',
    borderRadius: 0,
    display: 'flex',
    color: theme.color.lightGray,
    background: theme.background.lightBlue,
    padding: '4px 5px 4px 10px',
    '& .iconfont': {
      fontSize: 14,
      marginLeft: 15,
      marginTop: -5,
      //color: theme.color.orange,
    },
    '&:hover': {
      backgroundColor: theme.background.lightBlue,
    },
  },
});
export default styles;
