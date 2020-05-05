import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Breadcrumbs, Link, Typography, Button } from '@material-ui/core';

import { Pagination } from 'config';
import getInstance from 'utils/http';
import { injectIntl } from 'react-intl';
import { useKeycloak } from '@react-keycloak/web';

import messages from './message';
import 'components/Confirm/style.css';
import CreateConnect from './createConnect';
import { BasicTable, Confirm } from 'components';

// 预览数据
let dataPreviewTestData = {
  title: [
    {
      id: 'name',
      columnName: '姓名2',
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

// 编辑数据
const testConfig = [
  {
    lable: '参数12222',
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

function Connect(props: any) {
  const {
    classes,
    intl: { formatMessage },
  } = props;

  const [id, setId] = useState('');
  const [curStep, setCurStep] = useState(0);
  const [type, setType] = useState('create');
  const [configListData, setConfigListData] = useState([{}]);
  const [previewData, setPreviewData] = useState({});
  const [columns, setColumns] = useState([{}]);
  const [listData, setListData] = useState([{}]);
  const [showConnectDialog, setShowConnectDialog] = useState(false);
  const keycloak: any | undefined = useKeycloak().keycloak;

  const columnsData: any = [
    {
      id: 'name',
      label: 'name',
      type: 'name',
      width: '30%',
    },
    {
      id: 'type',
      label: 'type',
      type: 'type',
      width: '30%',
    },
    {
      id: 'updateTime',
      label: 'updateTime',
      type: 'time',
      width: '30%',
    },
    {
      id: '*',
      label: 'operations',
      align: 'center',
      type: 'operations',
      operations: item => operationsRender(item),
      width: '10%',
    },
  ];

  useEffect(() => {
    getDataList();
  }, []);

  const getDataList = async () => {
    const listData: Object[] = await getInstance(keycloak.token).get(
      '/api/workbench/connection'
    );
    setListData(listData);
    setColumns(columnsData);
  };

  const addNewConnect = () => {
    setId('');
    setCurStep(0);
    setType('create');
    setPreviewData({});
    setConfigListData([{}]);
    handleShowConnectDialog(true);
  };

  const LinkRender = () => [
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      <Link color="textPrimary">{formatMessage(messages.link.workSpace)}</Link>
      <Typography color="textPrimary">
        {formatMessage(messages.link.link)}
      </Typography>
    </Breadcrumbs>,
  ];

  const checkForCorrelation = async () => {
    const code: number = await getInstance(keycloak.token).get('/api/del');
    return code;
  };

  const delItem = (id: string) => {
    // checkForCorrelation().then(res => {
    //   res.code
    // });
    // 根据code来做title和html
    Confirm(
      'title',
      'text',
      () => {
        // TODO
        // del api
      },
      formatMessage(messages.swal.cancel),
      formatMessage(messages.swal.confim)
    );
  };

  const operationsRender = (item: any) => {
    return [
      {
        name: formatMessage(messages.tableOperations.edit),
        onClick: () => {
          setType('edit');
          setId(item.id);
          setCurStep(1);
          setConfigListData(testConfig);
          handleShowConnectDialog(true);
        },
      },
      {
        name: formatMessage(messages.tableOperations.preview),
        onClick: () => {
          setId(item.id);
          setType('view');
          setCurStep(2);
          setPreviewData(dataPreviewTestData);
          handleShowConnectDialog(true);
        },
      },
      {
        name: formatMessage(messages.tableOperations.delete),
        onClick: () => delItem(item.id),
      },
    ];
  };

  const settingRender = [
    <Button
      key="data-add-btn"
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      onClick={addNewConnect}
    >
      {formatMessage(messages.addConnect)}
    </Button>,
  ];

  const handleShowConnectDialog = (isShow: boolean) => {
    setShowConnectDialog(isShow);
  };

  return (
    <div>
      {console.log(listData[0])}
      {Object.keys(listData[0]).length > 0 && (
        <BasicTable
          data={listData}
          page={{ ...Pagination, total: 3 }}
          columnData={columns}
          setting={settingRender}
          emptyText="No Connects"
          caption={formatMessage(messages.caption)}
          type={1}
          apiURL="/api/name"
          title={LinkRender()}
        />
      )}

      {showConnectDialog && (
        <CreateConnect
          open={showConnectDialog}
          handleShowUploadData={handleShowConnectDialog}
          id={id}
          type={type}
          curStep={curStep}
          configListData={configListData}
          dataPreviewData={previewData}
        />
      )}
    </div>
  );
}

export default injectIntl(Connect);
