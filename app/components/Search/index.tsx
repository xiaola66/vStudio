import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import { Grid } from '@material-ui/core';
import { withStyles, Theme } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';

const styles = (theme: Theme) => ({
  root: {
    width: 300,
    borderRadius: '4px',
    border: '1px solid rgba(118,123,138,0.21)',
  },
  input: {
    width: 290,
  },
});
const Search = ({
  classes,
  placeholder,
  value,
  handleChange,
  handleClear,
  intl: { formatMessage },
}: SearchProps) => {
  return (
    <div>
      <Grid container className={classes.root}>
        {/* {true&&
                    <IconButton size='small'>
                            <ArrowBackIcon color="action"/>
                    </IconButton>
                } */}
        <Paper>
          <InputBase
            value={value}
            placeholder={formatMessage({ id: placeholder })}
            startAdornment={
              <SearchIcon
                color="action"
                style={{ marginRight: 10, marginLeft: 10 }}
              />
            }
            endAdornment={
              value.length > 0 ? (
                <IconButton size="small" onClick={handleClear}>
                  <ClearIcon fontSize="inherit" />
                </IconButton>
              ) : null
            }
            onChange={handleChange}
            className={classes.input}
          />
        </Paper>
      </Grid>
    </div>
  );
};

export default withStyles(styles as any)(injectIntl(Search));
