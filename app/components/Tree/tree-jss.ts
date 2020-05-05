const styles = theme => ({
  root: {
    height: '25px',
    width: '100%',
    padding: '0 5px',
    '& .MuiList-padding': {
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  dividerFont: {
    width: '100%',
  },
  icon: {
    minWidth: '30px',
    textAlign: 'center',
    display: 'table-cell',
    verticalAlign: 'middle',
    '& .iconfont': {
      fontSize: 18,
    },
  },
  title: {
    height: '30px',
    width: '100%',
    padding: '0 5px',
    background: '#FED795',
    '&:hover': {
      backgroundColor: '#FED795',
    },
    '&:focus': {
      backgroundColor: '#FED795',
    },
  },
  titleFont: {
    color: '#333333',
    fontSize: '16px',
    fontWeight: '600',
    paddingLeft: '10px',
  },
  typeNameFont: {
    width: '80px',
    color: '#333333',
    fontSize: '14px',
    fontWeight: '600',
  },
  name: {
    height: 30,
    padding: '0 5px',
    color: '#666666',
    fontSize: '14px',
  },
  totalFont: {
    fontSize: 13,
    fontFamily: 'PingFang SC',
    fontWeight: 400,
    color: 'rgba(153,153,153,1)',
  },
  labelRoot: {
    width: '100%',
  },
  labelItem: {
    height: '35px',
    padding: '2px 0px',
  },
  labelText: {
    fontSize: '14px',
    padding: '2px 0px',
  },
  designSidebarItem: {
    fontSize: 12,
    lineHeight: '24px',
    borderRadius: 4,
  },
  searchRoot: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 180,
    height: 24,
    borderRadius: '1px',
  },
  search: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 195,
    height: 30,
  },
  CancelIcon: {
    '&:hover': {
      color: '#333333',
    },
  },
  inputInput: {
    borderRadius: '1px',
  },
});
export default styles;
