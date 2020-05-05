import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { FormattedMessage, injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';

import { warnMessage } from 'components/Message';
import messages from '../../messages';

const style = withStyles({
  body: {
    position: 'absolute',
    marginTop: '-32px',
    maxWidth: 400,
    paddingTop: 8,
    paddingLeft: 7,
  },
  uploadArea: {
    position: 'relative',
    width: 400,
    height: 150,
    border: '1px solid rgba(201,205,209,1)',
    borderRadius: 2,
  },
  inputFile: {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
    width: '100%',
    height: '100%',
    cursor: 'pointer',
  },
  selectGroup: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 23,
    fontSize: 14,
  },
  select: {
    width: 207,
    height: 25,
    marginLeft: 19,
  },
});

const dataType = [
  'blf',
  'asc',
  'trc',
  'mdf',
  'pcap',
  'dat',
  'gps',
  'rsp',
  'csv',
  'pcd',
  'hdf5',
  'bag',
  'json',
  'avro',
  'parquet',
  'xls',
  'xlsx',
  'txt',
];

function Upload(props: any) {
  const {
    classes,
    changeStepNum,
    handleAllowNextStep,
    handleUploadDataType,
    handleUploadData,
  } = props;

  const [selectOpen, setSelectOpen] = useState(false);
  const [uploadDataType, setUploadDataType] = useState('');
  const [existUploadData, setExistUploadData] = useState(false);

  useEffect(() => {
    existUploadData && uploadDataType ? handleAllowNextStep() : null;
  }, [uploadDataType, existUploadData]);

  const handleSelectOpen = (isOpen: boolean) => {
    setSelectOpen(isOpen);
  };

  const onChangeUploadDataType = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    handleUploadDataType(event.target.value as string);
    setUploadDataType(event.target.value as string);
  };

  const onChangeUploadData = event => {
    const formData = new FormData();
    const { files } = event.target;
    files.forEach(item => {
      formData.append('data', item);
    });
    handleUploadData(formData);
    setExistUploadData(true);
  };

  return (
    <Grid container className={classes.body}>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.uploadArea}
      >
        <span>
          <FormattedMessage {...messages.upload.uploadAreaFont} />
        </span>
        <input
          type="file"
          multiple
          className={classes.inputFile}
          onChange={onChangeUploadData}
        />
      </Grid>
      <Grid wrap="nowrap" className={classes.selectGroup}>
        <span>
          <FormattedMessage {...messages.upload.selectDataFormatFont} />
        </span>
        <Select
          open={selectOpen}
          onClose={() => handleSelectOpen(false)}
          onOpen={() => handleSelectOpen(true)}
          value={uploadDataType}
          onChange={onChangeUploadDataType}
          className={classes.select}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {dataType.map(item => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
}

export default style(injectIntl(Upload));
