import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

function Description(props: IDescription) {
  const { value = '', length = 20 } = props;

  const handleDescripe = str => {
    if (str.length > length) {
      const subStr1 = str.substr(0, length);
      str = `${subStr1}...`;
    }
    return str;
  };

  return (
    <Tooltip title={value} placement="top">
      <Grid>{handleDescripe(value)}</Grid>
    </Tooltip>
  );
}

export default Description;
