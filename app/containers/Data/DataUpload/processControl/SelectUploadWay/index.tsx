import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FormattedMessage } from 'react-intl';
import getInstance from 'utils/http';
import messages from '../../messages';

const style = theme => ({
  body: {
    marginTop: 30,
    marginLeft: 50,
    fontSize: 14,
    color: 'rgba(51,51,51,1)',
  },
  content: {
    marginTop: 28,
  },
  upLoadWayText: {
    width: 70,
    fontSize: 14,
  },
  upLoadWayRadioText: {
    fontSize: 12,
  },
  selectText: {
    fontSize: 14,
  },
  radio: {
    marginLeft: 15,
  },
  select: {
    width: 210,
    height: 25,
    marginLeft: 13,
  },
});

function SelectUploadWay(props: any) {
  const { classes, uploadType, handleUpladType, handleConnectName } = props;

  const [selectValue, setSelectValue] = useState('');
  const [selectOpen, setSelectOpen] = useState(false);
  const [connnctList, setConnectList] = useState([]);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleUpladType(event.target.value);
  };

  const getConnectList = async () => {
    const list: any = await getInstance('').get('/api/workbench/connect');
    setConnectList(list.data);
  };

  const handleSelectOpen = async (isOpen: boolean) => {
    if (uploadType === 'connect') {
      isOpen && getConnectList();
      setSelectOpen(isOpen);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectValue(event.target.value as string);
    handleConnectName(event.target.value as string);
  };
  return (
    <Grid className={classes.body}>
      <Grid container wrap="nowrap" alignItems="center">
        <Grid className={classes.upLoadWayText}>
          <FormattedMessage {...messages.selectUploadWay.select.selectWay} />
        </Grid>
        <FormControl
          component="fieldset"
          className={classes.upLoadWayRadioText}
        >
          <RadioGroup
            row
            aria-label="position"
            name="position"
            value={uploadType}
            className={classes.radio}
            onChange={handleRadioChange}
          >
            <FormControlLabel
              value="local"
              control={<Radio color="primary" />}
              label={
                <FormattedMessage
                  {...messages.selectUploadWay.select.localUpload}
                />
              }
              labelPlacement="end"
            />
            <FormControlLabel
              value="connect"
              label={
                <FormattedMessage
                  {...messages.selectUploadWay.select.connentUpload}
                />
              }
              labelPlacement="end"
              control={<Radio color="primary" />}
              className={classes.radio}
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid className={classes.content}>
        {uploadType === 'connect' && (
          <div>
            <span className={classes.selectText}>connect</span>
            <Select
              open={selectOpen}
              onClose={() => handleSelectOpen(false)}
              onOpen={() => handleSelectOpen(true)}
              value={selectValue}
              onChange={handleSelectChange}
              className={classes.select}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {connnctList.map((item, index) => (
                <MenuItem key={`${index}-${item}`} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </div>
        )}
      </Grid>
    </Grid>
  );
}

export default withStyles(style as any)(SelectUploadWay);
