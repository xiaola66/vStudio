import React, { useState } from 'react';
import {
  Grid,
  Radio,
  Input,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  withStyles,
  Dialog,
  Tooltip,
  TextareaAutosize,
  TextField,
} from '@material-ui/core';

import classNames from 'classnames';
import { injectIntl } from 'react-intl';
import { Scrollbars } from 'react-custom-scrollbars';

import Title from '../Title';
import Tree from 'components/Tree';
import { ReactAce, Iconfont, Description } from 'components';

const style = {
  labelBox: {
    width: '100%',
  },
  filterTextBox: {
    maxWidth: 120,
    fontSize: 14,
    minWidth: 120,
  },
  filterText: {
    width: 120,
    maxWidth: 120,
    textAlign: 'right',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: 14,
    fontWeight: 400,
    fontFamily: 'PingFang',
    color: 'rgba(51,51,51,1)',
  },
  aceFilterText: {
    marginTop: 30,
  },
  filterIcon: {
    color: '#FFAA21',
  },
  codeArea: {
    paddingTop: 30,
    paddingLeft: 10,
  },
  reactAce: {
    width: 1050,
    height: 160,
    paddingTop: 10,
    paddingRight: 30,
  },
  settingItem: {
    height: 45,
    paddingTop: 20,
    paddingLeft: 10,
  },
  textarea: {
    height: 105,
    '& div': {
      '& div': {
        '& textarea': {
          width: 537,
          minHeight: 70,
        },
      },
    },
  },
  textareaBox: {
    width: 560,
    marginLeft: 15,
  },
  errorText: {
    marginLeft: 20,
    fontSize: 14,
    color: '#DC143C',
  },
  outputIcon: {
    '& .iconfont': {
      fontSize: 18,
      marginLeft: 10,
    },
  },
  input: {
    width: 560,
    height: 25,
    marginLeft: 15,
  },
  select: {
    width: 207,
    height: 25,
    marginLeft: 13,
  },
  radioGroup: {
    height: 25,
  },
  radio: {
    height: 25,
    marginLeft: 6,
  },
  CompressedSelect: {
    width: 207,
    height: 25,
    marginLeft: 15,
  },
};

function getRender(props: any) {
  const {
    classes,
    data,
    handleValue,
    // intl: { locale },
  } = props;

  const locale = 'zh';
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const handleDialogIsOpen = (isOpen: boolean) => {
    setDialogIsOpen(isOpen);
  };

  const getFilterTextRender = (label: string) => {
    const required = label.includes('*');
    const lableFont = label.replace('*', '').trim();
    return (
      <Grid className={classes.labelArea}>
        <Grid
          container
          wrap="nowrap"
          alignItems="center"
          justify="flex-end"
          className={classes.filterTextBox}
        >
          <Tooltip title={lableFont} placement="top-end">
            <div className={classes.filterText}>{lableFont}</div>
          </Tooltip>
          {required && <span className={classes.filterIcon}>*</span>}
        </Grid>
      </Grid>
    );
  };

  const getItemRender = (itemData, index) => {
    let render;
    try {
      const {
        type,
        label,
        required,
        value,
        defaultValue,
        errorTestShow,
        errorText,
        outputPathData,
      } = itemData;

      const labelValue = value;
      // const labelValue = value || defaultValue;
      switch (type) {
        case 'outputPath':
          render = (
            <Grid
              key={`${label}-${index}`}
              container
              wrap="nowrap"
              alignItems="center"
              className={classes.settingItem}
            >
              {getFilterTextRender(label)}
              <Input
                type="text"
                value={labelValue}
                className={classes.input}
                onChange={event => handleValue(event, index)}
              />
              <Iconfont
                icon="icon-folder"
                direction="row"
                iconClass={classes.outputIcon}
                onClick={() => handleDialogIsOpen(true)}
              />
              <Dialog
                open={dialogIsOpen}
                onClose={() => handleDialogIsOpen(false)}
                classes={{ paperWidthSm: classes.dialogRoot }}
              >
                <Title
                  title="选择输出路径"
                  isOutput={true}
                  handleDetailShow={handleDialogIsOpen}
                />
                <Scrollbars
                  autoHide
                  autoHideTimeout={500}
                  autoHideDuration={200}
                >
                  {/* <Tree
                    treeData={outputPathData}
                    type={2}
                    handleValue={event => handleValue(event, index)}
                    handleDialogIsOpen={handleDialogIsOpen}
                  /> */}
                </Scrollbars>
              </Dialog>
              {errorTestShow && (
                <span className={classes.errorText}>{errorText}</span>
              )}
            </Grid>
          );
          break;
        case 'radio':
          render = (
            <Grid
              container
              wrap="nowrap"
              className={classes.settingItem}
              key={`${label}-${index}`}
            >
              {getFilterTextRender(label)}
              <RadioGroup
                row
                value={labelValue}
                className={classes.radioGroup}
                onChange={event => handleValue(event, index)}
              >
                {itemData.child.map((item, index) => {
                  return (
                    <FormControlLabel
                      value={item.value}
                      label={item.label}
                      labelPlacement="end"
                      className={classes.radio}
                      key={`${item.value}-${index}`}
                      control={<Radio color="primary" />}
                    />
                  );
                })}
              </RadioGroup>
              {errorTestShow && (
                <span className={classes.errorText}>{errorText}</span>
              )}
            </Grid>
          );
          break;
        case 'ace':
          render = (
            <Grid className={classes.codeArea} key={`${label}-${index}`}>
              <Grid container>
                {getFilterTextRender(label[locale])}
                {errorTestShow && (
                  <Grid className={classes.errorText}>{errorText}</Grid>
                )}
              </Grid>
              <Grid className={classes.reactAce}>
                <ReactAce getAceValue={value => handleValue(value, index)} />
              </Grid>
            </Grid>
          );
          break;
        case 'text':
          render = (
            <Grid
              key={`${label}-${index}`}
              container
              wrap="nowrap"
              alignItems="center"
              className={classes.settingItem}
            >
              {getFilterTextRender(label[locale])}
              <Input
                type="text"
                value={labelValue}
                className={classes.input}
                onChange={event => handleValue(event, index)}
              />
              {errorTestShow && (
                <span className={classes.errorText}>{errorText}</span>
              )}
            </Grid>
          );
          break;
        case 'password':
          render = (
            <Grid
              key={`${label}-${index}`}
              container
              wrap="nowrap"
              alignItems="center"
              className={classes.settingItem}
            >
              {getFilterTextRender(label[locale])}
              <Input
                type="password"
                value={labelValue}
                className={classes.input}
                onChange={event => handleValue(event, index)}
              />
              {errorTestShow && (
                <span className={classes.errorText}>{errorText}</span>
              )}
            </Grid>
          );
          break;
        case 'select':
          render = (
            <Grid
              container
              wrap="nowrap"
              className={classes.settingItem}
              key={`${label}-${index}`}
            >
              {getFilterTextRender(label[locale])}
              <Select
                // open={itemData.isOpen}
                // onClose={() => handleSelectOpen(index, false)}
                // onOpen={() => handleSelectOpen(index, true)}
                value={labelValue}
                onChange={event => handleValue(event, index)}
                className={classes.CompressedSelect}
              >
                {itemData.options.map((item, index) => {
                  return (
                    <MenuItem key={`${item.value}-${index}`} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
              {errorTestShow && (
                <span className={classes.errorText}>{errorText}</span>
              )}
            </Grid>
          );
          break;
        case 'textarea':
          render = (
            <Grid
              container
              wrap="wrap"
              className={classNames(classes.settingItem, classes.textarea)}
              key={`${label}-${index}`}
            >
              {getFilterTextRender(label[locale])}
              {errorTestShow && (
                <span className={classes.errorText}>{errorText}</span>
              )}
              <Grid className={classes.textareaBox}>
                <ReactAce getAceValue={value => handleValue(value, index)} />
              </Grid>
            </Grid>
          );
          // render = (
          //   <Grid
          //     container
          //     wrap="nowrap"
          //     className={classNames(classes.settingItem, classes.textarea)}
          //     key={`${label}-${index}`}
          //   >
          //     {getFilterTextRender(label[locale])}
          //     <Grid className={classes.textareaBox}>
          //       <TextField
          //         multiline
          //         rowsMax="0"
          //         value={labelValue}
          //         key={`${label}-${index}`}
          //         onChange={event => handleValue(event, index)}
          //       />
          //     </Grid>
          //     {errorTestShow && (
          //       <span className={classes.errorText}>{errorText}</span>
          //     )}
          //   </Grid>
          // );
          break;
        case 'number':
          render = (
            <Grid
              container
              wrap="nowrap"
              className={classNames(classes.settingItem)}
              key={`${label}-${index}`}
            >
              {getFilterTextRender(label[locale])}
              <Grid>
                <Input
                  type="number"
                  className={classes.input}
                  onChange={event => handleValue(event, index)}
                />
              </Grid>
              {errorTestShow && (
                <span className={classes.errorText}>{errorText}</span>
              )}
            </Grid>
          );
          break;
        default:
          render = <h1>unknow Label</h1>;
          break;
      }
    } catch (error) {
      console.log(error, 'error');
      return <h1>error</h1>;
    }
    return render;
  };

  const renderCell = (data: any) =>
    data.map((item, index) => getItemRender(item, index));

  return <div>{renderCell(data)}</div>;
}

export default withStyles(style as any)(injectIntl(getRender));
