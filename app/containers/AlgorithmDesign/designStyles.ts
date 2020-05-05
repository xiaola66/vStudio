/*
 * @Author: jieyun Ren
 * @Date:   2020-03-08 13:09:35
 * @Last Modified by: jieyun ren
 * @Last Modified time: 2020-04-30 17:43:09
 */

const styles = theme => ({
  designRoot: {
    display: 'flex',
    width: '100%',
    minHeight: '100%',
    flexDirection: 'row',
  },
  designHeader: {
    position: 'fixed',
    height: '68px',
    textAlign: 'center',
    background: 'rgba(255,255,255,1)',
    boxShadow: '0px 0px 2px 0px rgba(32,1,0,0.07)',
  },
  designToolbar: {
    minHeight: '68px',
    color: theme.text.main,
  },
  ToolbarRight: {
    marginLeft: 700,
  },
  designSidebar: {
    position: 'absolute',
    paddingTop: 78,
    // paddingLeft: 10,
    // paddingRight: 10,
    width: '200px',
    height: '100%',
    overflow: 'hidden',
    background: 'rgba(255,255,255,1)',
    boxShadow: '1px 0px 2px 0px rgba(201,201,201,0.22)',
  },
  designContent: {
    position: 'absolute',
    width: 'calc(100% - 200px)',
    top: 68,
    left: 200,
    height: 'calc(100% - 68px)',
    overflow: 'hidden',
    backgroundColor: '#FAF7FA',
    backgroundImage: `linear-gradient(0deg, 
            rgba(60, 130, 150, 0.1), 
            rgba(60, 130, 150, 0.1) 1px, 
            transparent 1px, transparent 50px), 
            linear-gradient(90deg, rgba(60, 130, 150, 0.1), 
            rgba(60, 130, 150, 0.1) 1px, 
            transparent 1px, 
            transparent 30px)`,
    backgroundSize: '30px 30px',
    cursor: 'pointer',
  },
  main: {
    width: '100%',
    height: '100%',
  },
  dragBoxGroup: {
    width: '100%',
    minHeight: 360,
  },
  designItemBox: {
    width: 'auto',
    minWidth: '130px',
    height: '60px',
    cursor: 'move',
    display: 'flex',
    background: '#fff',
  },
  itemBoxIcon: {
    width: '85px',
    minWidth: '60px',
    maxWidth: '100px',
    padding: '8px 0',
    cursor: 'move',
  },
  itemBoxIconfont: {
    width: '100%',
    cursor: 'move',
    '& .iconfont': {
      fontSize: '26px',
    },
    '& .text': {
      marginTop: -5,
    },
  },
  itemBoxIconLable: {
    width: 'auto',
    //width: 'calc(100% - 54px)',
    fontSize: '14px',
    display: 'block',
    //textAlign: 'center',
    padding: '5px 10px 0',
    color: '#fff',
    whiteSpace: 'nowrap',
  },
  itemBoxIconLableLength: {
    fontSize: '12px',
    width: '100%',
    display: 'block',
  },
  itemType1: {
    border: `1px ${theme.itemColor[1]} solid`,
    '& $itemBoxIconfont': {
      color: theme.itemColor[1],
    },
    '& $itemBoxIconLable': {
      background: theme.itemColor[1],
    },
  },
  itemType2: {
    border: `1px ${theme.itemColor[2]} solid`,
    '& $itemBoxIconfont': {
      color: theme.itemColor[2],
    },
    '& $itemBoxIconLable': {
      background: theme.itemColor[2],
    },
  },
  itemType3: {
    border: `1px ${theme.itemColor[3]} solid`,
    '& $itemBoxIconfont': {
      color: theme.itemColor[3],
    },
    '& $itemBoxIconLable': {
      background: theme.itemColor[3],
    },
  },
  canvasDragItem: {
    position: 'absolute',
    width: 'auto',
    lineHeight: '24px',
    fontSize: '12px',
  },
  contextMenu: {
    zIndex: '999999',
    minWidth: '100px',
    textAlign: 'center',
    padding: '10px 0',
    background: '#fff',
    boxShadow: `0px 5px 5px -3px rgba(0,0,0,0.2), 
            0px 8px 10px 1px rgba(0,0,0,0.14), 
            0px 3px 14px 2px rgba(0,0,0,0.12)`,
    lineHeight: '28px',
    '& .react-contextmenu-item': {
      outline: 0,
      padding: '5px 10px',
      cursor: 'pointer',
      color: theme.text.main,
    },
    '& .react-contextmenu-item:hover': {
      background: '#f0f0f0',
    },
  },
  grow: {
    display: 'inline-block',
    width: '160px',
  },
  headerIcon: {
    paddingRight: 10,
    paddingLeft: 10,
    '& .text': {
      fontSize: '14px',
    },
    '& .iconfont': {
      fontSize: '20px',
    },
  },
  headerIconShow: {
    '& .text': {
      fontSize: '14px',
    },
    '& .iconfont': {
      fontSize: '20px',
    },
  },
  disabledIcon: {
    cursor: 'not-allowed',
    '& .text': {
      color: '#cccccc',
    },
    '& .iconfont': {
      color: '#cccccc',
    },
  },
  basicIcons: {
    width: '400px',
    '& div': {
      display: 'inline-block',
    },
  },
  midIcons: {
    marginLeft: '20%',
    '& div': {
      display: 'inline-block',
    },
  },
  endIcons: {
    position: 'absolute',
    right: 50,
    '& div': {
      display: 'inline-block',
    },
  },
  taskShowdown: {
    marginLeft: '45%',
  },
  popper: {
    position: 'absolute',
    top: '60px',
    left: '742px',
    borderTop: '8px transparent dashed',
    borderLeft: '8px transparent dashed',
    borderRight: '8px transparent dashed',
    borderBottom: '8px rgba(255,255,255,1) solid',
  },
  return: {
    cursor: 'pointer',
  },
  designCanvas: {
    paddingRight: 50,
    paddingBottom: 50,
  },
});
export default styles;
