import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { VsDialog } from 'components';
import { isOverflowLength } from 'utils/utils';
import messages from './messages';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const styles = withStyles({
  root: {
    margin: '0',
    width: '450px',
    maxWidth: '450px',
    boxShadow: '0px 2px 17px 1px rgba(29, 2, 1, 0.06)',
    borderRadius: '2px',
    fontSize: '14px',
  },
  label: {
    textAlign: 'right',
    paddingRight: '20px',
    paddingTop: '5px',
    fontSize: '14px',
    color: 'rgba(51,51,51,1)',
  },
  parameterInput: {
    marginBottom: '20px',
  },
  midLine: {
    width: '400px',
    height: '1px',
    border: '1px solid rgba(221,223,224,1)',
    marginBottom: '20px',
  },
  radioText: {
    fontSize: '12px',
  },
  basicDialogButtons: {
    paddingLeft: '12px',
    '& button': {
      height: '28px',
      paddingTop: 3,
      transition: 'none',
    },
    '& button:nth-child(1)': {
      minWidth: '55px',
      background: '#fff',
      border: '1px solid rgba(222,222,222,1)',
    },
    '& button:nth-child(1):hover': {
      background: 'rgb(223, 223, 223)',
    },
    '& button:nth-child(2)': {
      minWidth: '94px',
      marginLeft: '14px',
      background: 'rgba(244, 173, 69, 1)',
      color: 'rgba(255, 255, 255, 1)',
      border: '1px solid rgba(244, 173, 69, 1)',
    },
    '& button:nth-child(2):hover': {
      background: 'rgb(243, 167, 54)',
    },
    '& button:nth-child(2):disabled': {
      background: '#ADADAD',
      color: '#fff',
      borderColor: '#ADADAD',
    },
  },
});

function Create(props: any) {
  const {
    classes,
    intl: { formatMessage },
  } = props;

  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, item) => {
    item.onChange && item.onChange(event.target.value, item.id);
  };

  const [dataType, setDataType] = React.useState('');
  const handleChangeSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDataType(event.target.value as string);
  };

  const [radioQosValue, setRadioQosValue] = React.useState('1');
  const [radioAutoValue, setRadioAutoValue] = React.useState('否');
  const [radioRetainValue, setRadioRetainValue] = React.useState('是1');
  const handleChangeQosRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioQosValue((event.target as HTMLInputElement).value);
  };
  const handleChangeAutoRadio = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRadioAutoValue((event.target as HTMLInputElement).value);
  };
  const handleChangeRetainRadio = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRadioRetainValue((event.target as HTMLInputElement).value);
  };
  // const qosRadioLabel = [
  //   '1',
  //   '2',
  //   '3',
  // ];
  // const autoRadioLabel = [
  //   '是',
  //   '否'
  // ];

  const handleSubmit = () => {
    //TODO
    //post apis
  };

  const inputRenderTop = [
    {
      label: formatMessage(messages.create.topic),
      placeholder: formatMessage(messages.placeholder.required),
    },
    {
      label: formatMessage(messages.create.url),
      placeholder: formatMessage(messages.placeholder.required),
    },
    {
      label: formatMessage(messages.create.username),
      placeholder: formatMessage(messages.placeholder.unrequired),
    },
    {
      label: formatMessage(messages.create.password),
      placeholder: formatMessage(messages.placeholder.unrequired),
    },
    {
      label: formatMessage(messages.create.test),
      placeholder: formatMessage(messages.placeholder.unrequired),
    },
  ];
  const inputRenderDown = [
    {
      inputType: 1,
      label: formatMessage(messages.create.serialization),
    },
    {
      inputType: 2,
      label: formatMessage(messages.create.qosLevel),
    },
    {
      inputType: 3,
      label: formatMessage(messages.create.timeout),
    },
    {
      inputType: 4,
      label: formatMessage(messages.create.automaticReconnect),
    },
    {
      inputType: 5,
      label: formatMessage(messages.create.retainMessage),
    },
  ];
  const content = [
    inputRenderTop.map((item, index) => [
      <Grid
        className={classes.parameterInput}
        container
        key={`d-grid-${index}`}
      >
        <Grid item xs={4} className={classes.label}>
          {item.label}
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="name"
            placeholder={item.placeholder}
            onChange={e => handleChange(e, item)}
            // value={item.value}
          />
        </Grid>
      </Grid>,
    ]),
    <div className={classes.midLine}></div>,
    inputRenderDown.map((item, index) => [
      <Grid className={classes.parameterInput} container>
        <Grid item xs={4} className={classes.label}>
          {item.label}
        </Grid>
        <Grid item xs={6}>
          {item.inputType === 1 ? (
            <Select value={dataType} onChange={handleChangeSelect} displayEmpty>
              <MenuItem value="">
                <em>Jason（默认）</em>
              </MenuItem>
              <MenuItem value={10}>delimited</MenuItem>
            </Select>
          ) : item.inputType === 2 ? (
            <FormControl component="fieldset" className={classes.radioText}>
              <RadioGroup
                row
                value={radioQosValue}
                onChange={handleChangeQosRadio}
              >
                {/* {qosRadioLabel.map((item) => (
                <FormControlLabel value={item} control={<Radio color="primary" />} label={item} />
              ))} */}
                <FormControlLabel
                  value="1"
                  control={<Radio color="primary" />}
                  label="1"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio color="primary" />}
                  label="2"
                />
                <FormControlLabel
                  value="3"
                  control={<Radio color="primary" />}
                  label="3"
                />
              </RadioGroup>
            </FormControl>
          ) : item.inputType === 3 ? (
            <TextField
              id="name"
              placeholder="1000ms"
              onChange={e => handleChange(e, item)}
            />
          ) : item.inputType === 4 ? (
            <FormControl component="fieldset" className={classes.radioText}>
              <RadioGroup
                row
                value={radioAutoValue}
                onChange={handleChangeAutoRadio}
              >
                {/* {autoRadioLabel.map((item) => (
            <FormControlLabel value={item} control={<Radio color="primary" />} label={item} />
            ))} */}
                <FormControlLabel
                  value="是"
                  control={<Radio color="primary" />}
                  label={formatMessage({ id: 'common.yes' })}
                />
                <FormControlLabel
                  value="否"
                  control={<Radio color="primary" />}
                  label={formatMessage({ id: 'common.no' })}
                />
              </RadioGroup>
            </FormControl>
          ) : item.inputType === 5 ? (
            <FormControl component="fieldset" className={classes.radioText}>
              <RadioGroup
                row
                value={radioRetainValue}
                onChange={handleChangeRetainRadio}
              >
                <FormControlLabel
                  value="是1"
                  control={<Radio color="primary" />}
                  label={formatMessage({ id: 'common.yes' })}
                />
                <FormControlLabel
                  value="否2"
                  control={<Radio color="primary" />}
                  label={formatMessage({ id: 'common.no' })}
                />
              </RadioGroup>
            </FormControl>
          ) : null}
        </Grid>
      </Grid>,
    ]),
    <Grid container>
      <Grid item xs={3}></Grid>
      <Grid item xs={9} className={classes.basicDialogButtons}>
        <Button onClick={handleClose}>
          {formatMessage({ id: 'common.close' })}
        </Button>
        <Button onClick={handleSubmit}>
          {formatMessage({ id: 'common.ok' })}
        </Button>
      </Grid>
    </Grid>,
  ];

  return (
    <div>
      <Button
        key="data-add-btn"
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        {formatMessage(messages.create.add)}
      </Button>
      <VsDialog
        type={2}
        className={classes.root}
        open={open}
        onCancel={handleClose}
        title={formatMessage(messages.create.title)}
        content={content}
        onSubmit={handleSubmit}
        formatMessage={formatMessage}
      />
    </div>
  );
}

export default styles(injectIntl(Create));
