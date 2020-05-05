/*
 * @Author: wei zhao
 * @Date:   2020-03-19 16:45:09
 * @Last Modified by: jieyun ren
 * @Last Modified time: 2020-04-30 17:11:44
 */
const styles = theme => ({
  rowIcon: {
    display: 'inline-block',
    width: 'auto',
    // height: '30px',
    textAlign: 'center',
    cursor: 'pointer',
    // '& .text': {
    //   fontSize: '15px',
    //   marginLeft: '4px',
    // },
  },
  columnIcon: {
    display: 'inline-block',
    width: 'auto',
    height: '50px',
    textAlign: 'center',
    cursor: 'pointer',
    '& .text': {
      fontSize: '14px',
      display: 'block',
    },
  },
  icon: {
    width: '16px',
    height: '16px',
    verticalAlign: '-3px',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  iconShow: {
    height: '50px',
    fontSize: 16,
    float: 'right',
    cursor: 'pointer',
    paddingTop: 0,
    marginRight: 10,
  },
});
export default styles;
