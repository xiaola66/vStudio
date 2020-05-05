import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { injectIntl, FormattedMessage } from 'react-intl';
import { VsDialog } from 'components';
import messages from './messages';
import LocalUpload from './processControl/LocalUpload';
import ConnectUpload from './processControl/ConnectUpload';
import DataPreview from './processControl/DataPreview';
import SelectUploadWay from './processControl/SelectUploadWay';
import { Grid, Input, Select, MenuItem } from '@material-ui/core';
import { Iconfont } from 'components';
import getInstance from 'utils/http';

const style = theme => ({
  createDataDialog: {
    margin: '0',
    minWidth: 450,
    maxWidth: 1720,
    minHeight: 350,
    boxShadow: '0px 2px 17px 1px rgba(29, 2, 1, 0.06)',
    borderRadius: 2,
    color: theme.color.gray,
    fontSize: 14,
  },
  dataPreviewDialog: {
    margin: '0',
    width: 1720,
    maxWidth: 1720,
    minHeight: 350,
    boxShadow: '0px 2px 17px 1px rgba(29, 2, 1, 0.06)',
    borderRadius: 2,
    color: theme.color.gray,
    fontSize: 14,
  },
  connectUploadDialog: {
    margin: '0',
    width: 790,
    maxWidth: 790,
    minHeight: 530,
    boxShadow: '0px 2px 17px 1px rgba(29, 2, 1, 0.06)',
    borderRadius: 2,
    color: theme.color.gray,
    fontSize: 14,
  },
  selectUploadDataFooterBar: {
    width: '100%',
    marginLeft: 140,
    marginBottom: -20,
    '& button': {
      width: 95,
      height: 30,
      padding: 0,
    },
    '& button:nth-child(2)': {
      marginLeft: 14,
    },
  },
  uploadFooterBar: {
    width: '100%',
    marginLeft: 146,
    marginBottom: '-23px',
    '& button': {
      width: 95,
      height: 30,
      padding: 0,
    },
    '& button:nth-child(2)': {
      marginLeft: 18,
    },
  },
  connectUploadFooterBar: {
    width: '100%',
    paddintTop: 30,
    paddingLeft: 110,
    '& button': {
      width: 95,
      height: 30,
      padding: 0,
    },
    '& button:nth-child(2)': {
      marginLeft: 18,
    },
  },
  uploadselect: {
    width: 205,
    height: 30,
    marginLeft: 20,
  },
  dataPreviewTitle: {
    paddingRight: 80,
    '& button': {
      '& .text': {
        fontSize: '15px',
      },
      position: 'absolute',
      top: 13,
      right: 90,
      width: 120,
      height: 35,
      padding: 0,
      background: 'rgba(255,162,19,1)',
      fontSize: 16,
      color: 'rgba(51,51,51,1)',
      borderRadius: 6,
      cursor: 'pointer',
    },
  },
  changeDataBtn: {
    padding: 0,
    '& span': {
      fontSize: 16,
      color: '#FFFFFF',
    },
  },
  changeDataBtnFont: {
    marginLeft: 10,
  },
  dataPreviewFotterBar: {
    width: '100%',
    marginLeft: 470,
    marginTop: 40,
    fontSize: 14,
    '& button': {
      width: 95,
      height: 30,
      padding: 0,
    },
  },
  input: {
    width: 210,
    height: 25,
    marginLeft: 24,
  },
  lastBtn: {
    marginLeft: 47,
  },
  submitBtn: {
    marginLeft: 18,
  },
});

function DataUpload(props: any) {
  const {
    classes,
    handleShowUploadData,
    open,
    intl: { formatMessage },
  } = props;

  const [stepNum, setStepNum] = useState(0);

  const [title, setTitle] = useState<any>();
  const [content, setContent] = useState(<div></div>);
  const [actions, setActions] = useState(<div></div>);

  const [dataName, setDataName] = useState('');
  const [uploadType, setUploadType] = useState('local');
  const [connectName, setConnectName] = useState('');

  const [selectTable, setSelectTable] = useState('');
  const [connectData, setConnectData] = useState<any>({});

  const [previewData, setPreviewData] = useState({});
  const [uploadDisable, setUploadDisable] = useState(true);
  const [uploadDataType, setUploadDataType] = useState('');
  const [uploadDataTypeList, setUploadDataTypeList] = useState([]);
  const [uploadData, setUploadData] = useState(new FormData());

  const [submitDisable, setSubmitDisable] = useState(false);

  useEffect(() => {
    changeStepNum(stepNum);
  }, [
    stepNum,
    uploadType,
    connectName,
    uploadDataTypeList,
    connectData,
    uploadDisable,
    submitDisable,
    previewData,
    selectTable,
  ]);

  const onCancel = () => {
    handleShowUploadData(false);
  };

  const handleUpladType = (type: string) => {
    setUploadType(type);
  };

  const handleConnectName = (name: string) => {
    setConnectName(name);
  };

  const handleAllowNextStep = () => {
    setUploadDisable(false);
  };

  const handleUploadDataType = (type: string) => {
    setUploadDataType(type);
  };

  const handleUploadData = (data: any) => {
    setUploadData(data);
  };

  const handleSelectTable = name => {
    setSelectTable(name);
  };

  const getResponseData = async () => {
    const formData = uploadData;
    formData.append('dataType', uploadDataType);
    const res = await getInstance('').post('/user', formData);
    console.log(res, 'res');
    return res;
  };

  const jumpUploadData = async (step: number) => {
    if (uploadType === 'connect') {
      const typeList: any = await getInstance('').get(
        '/api/workbench/dataUpload/type'
      );
      const data: any = await getInstance('').get(
        '/api/workbench/connect/name'
      );
      setConnectData(data.data);
      setUploadDataTypeList(typeList.data);
    }
    changeStepNum(step);
  };

  const jumpDataPreview = () => {
    if (uploadDataType === 'local') {
      console.log(uploadData, 'uploadData');
      const responseData = getResponseData();
    } else {
      getInstance('')
        .get('/api/workbench/connect/name/id')
        .then(res => {
          setPreviewData(res.data);
        });
    }
    changeStepNum(2);
  };

  const clearUploadAllData = () => {
    console.log('clear');
    setUploadData(new FormData());
    setUploadDataType('');
  };

  const rollBackUploadPage = () => {
    setDataName('');
    setUploadDisable(true);
    clearUploadAllData();
    changeStepNum(1);
  };

  const hadleDataName = event => {
    // console.log(event.target.value);
    // setDataName(event.target.value);
    setSubmitDisable(false);
    changeStepNum(2, event.target.value);
  };

  const handlePreviewData = () => {
    getInstance('')
      .get('/api/workbench/connect/ccc')
      .then(res => {
        setPreviewData(res.data);
      });
  };

  const submit = async () => {
    //   调用接口， 将数据添加到列表
    // 等待解析完成，返回数据预览数据
    // asyn + await
    const { status } = await getInstance('').post('/api/workbench/connect', {
      id: 'xx',
      name: 'name',
    });
    console.log(status, typeof status, 'status');
    if (status === 2) {
      setSubmitDisable(true);
      return;
    }
    onCancel();
  };

  const changeStepNum = (step: number, dataName: string = '') => {
    setStepNum(step);
    setDataName(dataName);
    switch (step) {
      case 1:
        if (uploadType === 'local') {
          setTitle(formatMessage(messages.upload.title));
          setContent(
            <LocalUpload
              handleUploadData={handleUploadData}
              handleUploadDataType={handleUploadDataType}
              handleAllowNextStep={handleAllowNextStep}
            />
          );
          setActions(
            <Grid className={classes.uploadFooterBar}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => changeStepNum(0)}
              >
                <FormattedMessage {...messages.upload.lastStep} />
              </Button>
              <Button
                disabled={uploadDisable}
                variant="contained"
                color="primary"
                onClick={() => jumpDataPreview()}
              >
                <FormattedMessage {...messages.upload.nextStep} />
              </Button>
            </Grid>
          );
        } else {
          console.log(uploadDataTypeList, 'uploadDataTypeList');
          setTitle(formatMessage(messages.connentUpload.title));
          setContent(
            <ConnectUpload
              selectTable={selectTable}
              connectData={connectData}
              handleSelectTable={handleSelectTable}
            />
          );
          setActions(
            <Grid
              container
              wrap="nowrap"
              alignItems="center"
              className={classes.connectUploadFooterBar}
            >
              <span>{formatMessage(messages.connentUpload.selectFormat)}</span>
              <Select
                // open={selectOpen}
                // onClose={() => handleSelectOpen(false)}
                // onOpen={() => handleSelectOpen(true)}
                // value={selectValue}
                // onChange={handleSelectChange}
                className={classes.uploadselect}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {uploadDataTypeList.map((item, index) => (
                  <MenuItem key={`${index}-${item}`} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              <Button
                variant="outlined"
                color="primary"
                className={classes.lastBtn}
                onClick={() => changeStepNum(0)}
              >
                {formatMessage(messages.upload.lastStep)}
              </Button>
              <Button
                disabled={Boolean(!selectTable)}
                variant="contained"
                color="primary"
                className={classes.submitBtn}
                onClick={jumpDataPreview}
              >
                {formatMessage(messages.upload.nextStep)}
              </Button>
            </Grid>
          );
        }
        break;
      case 2:
        setTitle(
          <Grid
            container
            justify="space-between"
            alignItems="center"
            className={classes.dataPreviewTitle}
          >
            {formatMessage(messages.dataPreview.title)}
            <Button
              variant="contained"
              color="primary"
              className={classes.changeDataBtn}
              onClick={handlePreviewData}
            >
              <Iconfont icon="icon-Refresh-copy" />
              <span className={classes.changeDataBtnFont}>
                {formatMessage(messages.dataPreview.changeData)}
              </span>
            </Button>
          </Grid>
        );
        setContent(<DataPreview previewData={previewData} />);
        setActions(
          <Grid
            container
            wrap="nowrap"
            alignItems="center"
            className={classes.dataPreviewFotterBar}
          >
            <span>{formatMessage(messages.dataPreview.dataName)}</span>
            <Input
              value={dataName}
              onChange={hadleDataName}
              className={classes.input}
            />
            <Button
              variant="outlined"
              color="primary"
              className={classes.lastBtn}
              onClick={() => rollBackUploadPage()}
            >
              {formatMessage(messages.dataPreview.lastStep)}
            </Button>
            <Button
              disabled={submitDisable}
              variant="contained"
              color="primary"
              className={classes.submitBtn}
              onClick={submit}
            >
              {formatMessage(messages.dataPreview.nextStep)}
            </Button>
          </Grid>
        );
        break;
      default:
        setTitle(formatMessage(messages.selectUploadWay.title));
        setContent(
          <SelectUploadWay
            uploadType={uploadType}
            handleUpladType={handleUpladType}
            handleConnectName={handleConnectName}
          />
        );
        setActions(
          <div className={classes.selectUploadDataFooterBar}>
            <Grid>
              <Button variant="outlined" onClick={() => onCancel()}>
                <FormattedMessage {...messages.selectUploadWay.close} />
              </Button>
              <Button
                // uploadType === 'local' ? false : Boolean(!connectName)
                disabled={
                  uploadType === 'local' ? false : Boolean(!connectName)
                }
                variant="contained"
                color="primary"
                onClick={() => jumpUploadData(1)}
              >
                <FormattedMessage {...messages.selectUploadWay.connentUpload} />
              </Button>
            </Grid>
          </div>
        );
        break;
    }
  };

  const getClassName = () => {
    let style = '';
    if (stepNum === 1 && uploadType === 'connect') {
      style = classes.connectUploadDialog;
    } else if (stepNum === 2) {
      style = classes.dataPreviewDialog;
    } else {
      style = classes.createDataDialog;
    }
    return style;
  };

  return (
    <div>
      <VsDialog
        open={open}
        onCancel={onCancel}
        title={title}
        content={content}
        actions={actions}
        type={2}
        className={getClassName()}
        // className={
        //   stepNum === 2 ? classes.dataPreviewDialog : classes.createDataDialog
        // }
      />
    </div>
  );
}

export default withStyles(style as any)(injectIntl(DataUpload));
