import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Grid, InputLabel } from '@material-ui/core';

const styles = theme => ({
  content: {
    marginTop: 9,
    marginLeft: 35,
  },
  formControl: {
    width: 207,
    height: 25,
    marginLeft: 20,
    '& div': {
      marginTop: 0,
    },
    '& label': {
      top: '-13px',
    },
  },
  gutter: {
    marginLeft: 14,
  },
  optenItem: {
    paddingLeft: 40,
  },
});

function SelectConnectWay(props) {
  const { classes, connectList, handleConnectWay } = props;

  const [connect, setConnect] = useState('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    console.log(event.target.value, 'event.target.value');
    setConnect(event.target.value as string);
    handleConnectWay(event.target.value);
  };

  return (
    <Grid className={classes.content}>
      <span>连接类型</span>
      <FormControl className={classes.formControl}>
        {!connect && <InputLabel htmlFor="grouped-select">Grouping</InputLabel>}
        <Select
          defaultValue=""
          id="grouped-select"
          value={connect}
          onChange={handleChange}
        >
          <ListSubheader disableGutters={true} className={classes.gutter}>
            Category 1
          </ListSubheader>
          <MenuItem value={1} className={classes.optenItem}>
            Option 1
          </MenuItem>
          <MenuItem value={2} className={classes.optenItem}>
            Option 2
          </MenuItem>
          <ListSubheader disableGutters={true} className={classes.gutter}>
            Category 2
          </ListSubheader>
          <MenuItem value={3} className={classes.optenItem}>
            Option 3
          </MenuItem>
          <MenuItem value={4} className={classes.optenItem}>
            Option 4
          </MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
}

export default withStyles(styles as any)(SelectConnectWay);
