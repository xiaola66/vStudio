import { darken } from '@material-ui/core/styles/colorManipulator';

export const gradientBgLight = theme =>
  `linear-gradient(-45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.main} 33%, ${theme.palette.secondary.main} 100%);`;
export const gradientBgDark = theme =>
  `linear-gradient(-45deg, ${darken(
    theme.palette.primary.main,
    0.4
  )} 0%, ${darken(theme.palette.primary.main, 0.4)} 33%, ${darken(
    theme.palette.secondary.main,
    0.4
  )} 100%);`;

const appFrame = {
  display: 'flex',
  width: '100%',
  minHeight: '100%',
  zIndex: 1,
};

const styles = (theme: any) => ({
  root: {
    width: '100%',
    marginTop: 0,
    zIndex: 1,
    overflow: 'auto',
  },
  blogWrap: {
    position: 'relative',
  },
  appFrameInner: {
    ...appFrame,
  },
  appFrameOuter: {
    ...appFrame,
  },
  appFrameLanding: {
    backgroundColor: theme.palette.background.default,
    minHeight: 1000,
  },
  appFrameSlider: {
    display: 'flex',
    width: '100%',
    height: '100%',
    [theme.breakpoints.up('lg')]: {
      position: 'absolute',
      overflow: 'hidden',
    },
    backgroundColor: theme.palette.background.default,
  },
  topNav: {
    flexDirection: 'column',
  },
  sideNav: {
    flexDirection: 'row',
  },
  content: {
    width: '100%',
    // paddingTop: 10,
    minHeight: '100%',
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
      paddingLeft: 10,
      paddingRight: 10,
    },
  },
  petal: {
    //background: `url(${bg}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    width: '100%',
    height: '100%',
    position: 'fixed',
  },
  outerContent: {
    width: '100%',
    backgroundSize: 'cover',
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgWrap: {
    position: 'fixed',
    background: '#eef3f7',
    width: '100%',
    height: '100%',
    top: -10,
    left: 0,
  },
  headerBg: {},
  halfBg: {},
  fullBg: {},
  bgbar: {
    backgroundAttachment: 'fixed',
    width: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
    '&$headerBg': {
      height: 64,
    },
    '&$halfBg': {
      height: 400,
    },
    '&$fullBg': {
      height: '100%',
    },
  },
  gradientBg: {
    backgroundImage:
      'linear-gradient(-45deg, #2196F3 0%, #2196F3 33%, #00BFA5 100%)',
    backgroundAttachment: 'fixed',
  },
  solidBg: {
    backgroundColor: theme.palette.primary.main,
  },
  decorationWave: {
    width: '100%',
    height: 'auto',
    position: 'absolute',
    left: -2,
    bottom: -32,
    transform: 'scale(1.1,0.8)',
    transformOrigin: 'bottom',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  decorationPetal: {
    width: '100%',
    height: 'auto',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  sidebarLayout: {},
  topbarLayout: {},
  mainWrap: {
    height: '100%',
    position: 'relative',
    '& > div': {
      willChange: 'inherit !important', // hack for floating form issue when expaded
    },
    '&$sidebarLayout': {
      paddingTop: 10 * 6,
      paddingLeft: 10 * 2,
      paddingRight: 10 * 2,
      '@media (min-width:1920px)': {
        paddingTop: '58px',
      },
    },
    '&$topbarLayout': {
      width: '100%',
      marginTop: 10 * 3,
    },
  },
  preloader: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    background: 'transparent',
    height: 3,
  },
  materialBg: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    opacity: 0.5,
  },
  contentPaddingLeftMain: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  contentPaddingLeft: {
    paddingLeft: 60,
    paddingRight: 0,
  },
  contentPaddingLeftTask: {
    paddingLeft: 57,
    paddingRight: 0,
  },
  contentPaddingLeftTaskOpen: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  contentPaddingRight: {
    paddingRight: 80,
  },
  hideApp: {
    display: 'none',
  },
  circularProgress: {
    position: 'fixed',
    top: 'calc(50% - 45px)',
    left: 'calc(50% - 45px)',
  },
  brand: {
    height: 54,
    display: 'flex',
    padding: '10px 10px 5px',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    '& img': {
      width: 20,
    },
    '& h3': {
      margin: 0,
      fontSize: 16,
      fontWeight: 500,
      paddingLeft: 10,
      color: theme.palette.common.white,
    },
  },
  light: {},
  pageTitle: {
    padding: 10,
    paddingBottom: 10 * 3,
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    '& h4': {
      fontWeight: 700,
      textTransform: 'capitalize',
      [theme.breakpoints.down('md')]: {
        marginBottom: 10 * 3,
      },
    },
  },
  darkTitle: {
    color: theme.palette.primary.main,
  },
  lightTitle: {
    color: theme.palette.common.white,
  },
});

export default styles;
