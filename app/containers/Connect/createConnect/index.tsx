import React, { useState, useEffect } from 'react';
import { VsDialog } from 'components';
import getInstance from 'utils/http';
import { warnMessage } from 'components';
import { useKeycloak } from '@react-keycloak/web';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Grid, Button, Input } from '@material-ui/core';

import messages from './messages';
import DataPreview from './processControl/DataPreview';
import SelectConnectWay from './processControl/SelectConnectWay';
import ConfigurationPage from './processControl/ConfigurationPage';

const testConfig = [
  {
    lable: '参数1',
    type: 'input',
    value: '参数1 value',
    defaultValue: '参数1 value',
    required: true,
  },
  {
    lable: '参数2',
    type: 'inputPassword',
    value: '参数2 value',
    defaultValue: '参数2 defaultvalue',
    required: true,
  },
];

let dataPreviewTestData = {
  title: [
    {
      id: 'name',
      columnName: '姓名',
    },
    {
      id: 'age',
      columnName: '年龄',
    },
    {
      id: 'name',
      columnName: '姓名',
    },
    {
      id: 'name',
      columnName: '姓名',
    },
    {
      id: 'age',
      columnName: '年龄',
    },
    {
      id: 'name',
      columnName: '姓名',
    },
    {
      id: 'name',
      columnName: '姓名',
    },
    {
      id: 'age',
      columnName: '年龄',
    },
    {
      id: 'name',
      columnName: '姓名',
    },
    {
      id: 'name',
      columnName: '姓名',
    },
    {
      id: 'age',
      columnName: '年龄',
    },
    {
      id: 'name',
      columnName: '姓名',
    },
    {
      id: 'name',
      columnName: '姓名',
    },
    {
      id: 'age',
      columnName: '年龄',
    },
    {
      id: 'name',
      columnName: '姓名',
    },
    {
      id: 'name',
      columnName: '姓名',
    },
    {
      id: 'age',
      columnName: '年龄',
    },
    {
      id: 'name',
      columnName: '姓名',
    },
    {
      id: 'name',
      columnName: '姓名',
    },
    {
      id: 'age',
      columnName: '年龄',
    },
    {
      id: 'name',
      columnName: '姓名',
    },
    {
      id: 'name',
      columnName: '姓名',
    },
    {
      id: 'age',
      columnName: '年龄',
    },
    {
      id: 'name',
      columnName: '姓名',
    },
    {
      id: 'name',
      columnName: '姓名',
    },
    {
      id: 'age',
      columnName: '年龄',
    },
    {
      id: 'name',
      columnName: '姓名',
    },
  ],
  content: [
    {
      name: '张三',
      age: '11',
    },
    {
      name: '李四',
      age: '90',
    },
    {
      name: '张三',
      age: '11',
    },
    {
      name: '李四',
      age: '90',
    },
    {
      name: '张三',
      age: '11',
    },
    {
      name: '李四',
      age: '90',
    },
    {
      name: '张三',
      age: '11',
    },
    {
      name: '李四',
      age: '90',
    },
    {
      name: '张三',
      age: '11',
    },
    {
      name: '张三',
      age: '11',
    },
    {
      name: '李四',
      age: '90',
    },
    {
      name: '张三',
      age: '11',
    },
    {
      name: '张三',
      age: '11',
    },
    {
      name: '李四',
      age: '90',
    },
    {
      name: '张三',
      age: '11',
    },
    {
      name: '张三',
      age: '11',
    },
    {
      name: '李四',
      age: '90',
    },
    {
      name: '张三',
      age: '11',
    },
    {
      name: '张三',
      age: '11',
    },
    {
      name: '李四',
      age: '90',
    },
    {
      name: '张三',
      age: '11',
    },
    {
      name: '张三',
      age: '11',
    },
    {
      name: '李四',
      age: '90',
    },
    {
      name: '张三',
      age: '11',
    },
    {
      name: '张三',
      age: '11',
    },
    {
      name: '李四',
      age: '90',
    },
    {
      name: '张三',
      age: '11',
    },
    {
      name: '张三',
      age: '11',
    },
    {
      name: '李四',
      age: '90',
    },
    {
      name: '张三',
      age: '11',
    },
  ],
};

const style = theme => ({
  createSelectWayDialog: {
    width: 455,
    maxWidth: 455,
    height: 250,
  },
  createConfigurationPageDialog: {
    width: 495,
    maxWidth: 540,
    height: 540,
  },
  createDataPreviewDialog: {
    width: 840,
    maxWidth: 840,
    height: 660,
  },
  selectConnectWayFooterBar: {
    width: '100%',
    marginLeft: 135,
    marginTop: 30,
    '& button': {
      width: 95,
      height: 30,
      padding: 0,
    },
    '& button:nth-child(2)': {
      marginLeft: 14,
    },
  },
  dataPreviewFotterBar: {
    width: '100%',
    marginTop: 45,
    marginLeft: 150,
    marginBottom: 20,
    fontSize: 14,
    '& button': {
      width: 95,
      height: 30,
      padding: 0,
    },
    '& button:nth-of-type(1)': {
      marginLeft: 47,
    },
    '& button:nth-of-type(2)': {
      marginLeft: 18,
    },
    '& div': {
      width: 210,
      height: 25,
      marginLeft: 16,
    },
  },
  previewBtn: {
    width: '100%',
    marginTop: 45,
    marginBottom: 20,
    fontSize: 14,
    '& button': {
      width: 95,
      height: 30,
      padding: 0,
    },
  },
});

function Connect(props) {
  const {
    classes,
    open,
    id = '',
    curStep = 0,
    type = 'create',
    dataPreviewData = {},
    configListData = [{}],
    handleShowUploadData,
    intl: { formatMessage },
  } = props;

  const [step, setStep] = useState(curStep);
  const [title, setTitle] = useState<any>();
  const [content, setContent] = useState(<div></div>);
  const [actions, setActions] = useState(<div></div>);

  const [connectWay, setConnectWay] = useState('');
  const [connectList, setConnectList] = useState([]);
  const [configList, setConfigList] = useState(configListData);
  const [previewData, setPrevewData] = useState(dataPreviewData);
  const [connectName, setConnetName] = useState('');

  useEffect(() => {
    const connectList = getConnectList();
    setConnectList(connectList);
    connectSteper(step, connectList, configList);
  }, [step]);

  const keycloak: any | undefined = useKeycloak().keycloak;

  const getConnectList = () => {
    return [];
  };

  const onCancel = () => {
    handleShowUploadData(false);
  };

  const handleConnectWay = (way: string) => {
    setConnectWay(way);
  };

  const handleConfigList = configList => {
    setConfigList(configList);
    connectSteper(1, connectList, configList);
  };

  const handleConnectName = (e: React.ChangeEvent<{ value: unknown }>) => {
    const name = e.target.value as string;
    setConnetName(name);
    connectSteper(2, connectList, configList, dataPreviewTestData, name);
  };

  const rollBackConfigPage = () => {
    connectSteper(1, connectList, configList);
  };

  const jumpConfigPage = () => {
    //  axios  请求config列表
    const res = testConfig;
    setConfigList(testConfig);
    connectSteper(1, connectList, res);
  };

  const jumpDataPreviewPage = async configList => {
    console.group('jumpDataPreviewPage');
    console.log(connectWay, 'connectWay jumpDataPreviewPage');
    console.log(configList, 'configList jumpDataPreviewPage');
    console.groupEnd();
    // 发送请求， 验证参数正确
    // const data = { id, configList, connectWay };
    // const res = await getInstance(keycloak.token).post('/url', data);
    const previewData = await getInstance(keycloak.token).get(
      `/api/workbench/connnection/perviewData/${id}`
    );
    setPrevewData(previewData);
    connectSteper(2, connectList, configList, dataPreviewTestData);
  };

  const submit = name => {
    console.group('submit');
    console.log(connectWay, 'connectWay submit');
    console.log(configList, 'configList submit');
    console.log(name, 'connectName submit');
    console.groupEnd();

    if (type === 'create') {
      const data = { connectWay, configList, name };
      getInstance(keycloak.token).post('/create', data);
    } else {
      const data = { id, configList, name };
      getInstance(keycloak.token).post('/edit', data);
    }
    onCancel();
  };

  function connectSteper(
    step,
    connectWayList = connectList,
    configPageList = configList,
    data = previewData,
    name = connectName
  ) {
    setStep(step);
    switch (step) {
      case 1:
        setTitle(formatMessage(messages.configurationPage.header));
        setContent(
          <ConfigurationPage
            configList={configPageList}
            handleConfigList={handleConfigList}
          />
        );
        setActions(
          <div className={classes.selectConnectWayFooterBar}>
            <Grid>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => connectSteper(0)}
              >
                <FormattedMessage {...messages.footer.lastStep} />
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => jumpDataPreviewPage(configPageList)}
              >
                <FormattedMessage {...messages.footer.nextStep} />
              </Button>
            </Grid>
          </div>
        );
        break;
      case 2:
        setTitle(formatMessage(messages.dataPreview.header));
        setContent(<DataPreview data={data} />);
        type === 'view'
          ? setActions(
              <Grid
                container
                wrap="nowrap"
                alignItems="center"
                justify="center"
                className={classes.previewBtn}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onCancel}
                  className={classes.viewSubmitBtn}
                >
                  {formatMessage(messages.dataPreview.saveConnect)}
                </Button>
              </Grid>
            )
          : setActions(
              <Grid
                container
                wrap="nowrap"
                alignItems="center"
                className={classes.dataPreviewFotterBar}
              >
                <span>{formatMessage(messages.dataPreview.inputLable)}</span>
                <Input
                  value={name}
                  onChange={e => handleConnectName(e)}
                  className={classes.input}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.lastBtn}
                  onClick={rollBackConfigPage}
                >
                  {formatMessage(messages.footer.lastStep)}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.submitBtn}
                  onClick={() => submit(name)}
                >
                  {formatMessage(messages.dataPreview.saveConnect)}
                </Button>
              </Grid>
            );
        break;
      default:
        setTitle(formatMessage(messages.selectConnectWay.header));
        setContent(
          <SelectConnectWay
            connectList={connectWayList}
            handleConnectWay={handleConnectWay}
          />
        );
        setActions(
          <div className={classes.selectConnectWayFooterBar}>
            <Grid>
              <Button variant="outlined" onClick={() => onCancel()}>
                <FormattedMessage {...messages.footer.close} />
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => jumpConfigPage()}
              >
                <FormattedMessage {...messages.footer.nextStep} />
              </Button>
            </Grid>
          </div>
        );
        break;
    }
  }

  const getVsDialogClass = () => {
    const obj = {
      0: () => classes.createSelectWayDialog,
      1: () => classes.createConfigurationPageDialog,
      2: () => classes.createDataPreviewDialog,
    };
    return obj[step]();
  };

  return (
    <div>
      <VsDialog
        type={2}
        open={open}
        onCancel={onCancel}
        title={title}
        content={content}
        actions={actions}
        className={getVsDialogClass()}
      />
    </div>
  );
}

export default withStyles(style as any)(injectIntl(Connect));
