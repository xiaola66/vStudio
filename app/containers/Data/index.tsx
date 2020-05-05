import React, { useState, useEffect } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { BasicTable } from 'components';
import { Pagination } from 'config';
import messages from './messages';
import DataUpload from './DataUpload';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Confirm, warnMessage } from 'components';
import getInstance from 'utils/http';
import { useKeycloak } from '@react-keycloak/web';

const DataManage = (props: any) => {
  const {
    intl: { formatMessage },
  } = props;

  const [dataList, setDataList] = useState([{}]);
  const [showUploadData, setShowUploadData] = useState(false);
  const keycloak: any | undefined = useKeycloak().keycloak;

  useEffect(() => {
    getInstance(keycloak.token)
      .get('/api/workbench/datasources')
      .then((res: any) => {
        setDataList(res);
      });
  }, []);

  const getDataList = () => {};

  const handleShowUploadData = (isShow: boolean) => {
    setShowUploadData(isShow);
  };

  const deleteItem = async (id: string) => {
    const res: string = await getInstance(keycloak.token).delete(
      `/api/workbench/dataSource/${id}`
    );
    if (res === 'success') {
      const datalistRes: any = await getInstance(keycloak.token).get(
        '/api/workbench/dataSource'
      );
      setDataList(datalistRes);
    } else {
      warnMessage(res);
    }
  };

  const handleDelete = (name: string, id) => {
    Confirm(
      `${formatMessage(messages.delete)}${name} ?`,
      formatMessage(messages.deleteDes),
      () => deleteItem(id)
    );
  };

  const operationsRender = (item: any) => {
    return [
      {
        name: formatMessage({ id: 'common.preview' }),
        onClick: () => {
          console.log(item, 'item');
        },
      },
      {
        name: formatMessage({ id: 'common.operations.drawing' }),
        onClick: () => {},
      },
      {
        name: formatMessage({ id: 'common.operations.delete' }),
        onClick: () => {
          handleDelete(item.name, item.id);
        },
      },
    ];
  };

  const listData = [
    {
      id: '0',
      name: 'data-01',
      updateTime: '2020-02-20 18: 20',
      description: `Decompression identification, 
        September, October two faw H5 data analysis, 
        decompression identification and more algorithms 
        decompression identification, September, 
        October two faw H5 data analysis, decompression 
        identification decompression identification, September, 
        October two faw H5 data solution`,
    },
    {
      id: '1',
      name: 'data-02',
      updateTime: '2020-02-20 13: 20',
      description: `Decompression identification`,
    },
    {
      id: '2',
      name: 'data-03',
      updateTime: '2020-02-20 3: 20',
      description: `Decompression identification`,
    },
    {
      id: '3',
      name: 'data-02',
      updateTime: '2020-02-20 13: 20',
      description: `Decompression identification`,
    },
    {
      id: '4',
      name: 'data-03',
      updateTime: '2020-02-20 3: 20',
      description: `Decompression identification`,
    },
    {
      id: '5',
      name: 'data-02',
      updateTime: '2020-02-20 13: 20',
      description: `Decompression identification`,
    },
    {
      id: '6',
      name: 'data-03',
      updateTime: '2020-02-20 3: 20',
      description: `Decompression identification`,
    },
    {
      id: '7',
      name: 'data-02',
      updateTime: '2020-02-20 13: 20',
      description: `Decompression identification`,
    },
    {
      id: '8',
      name: 'data-03',
      updateTime: '2020-02-20 3: 20',
      description: `Decompression identification`,
    },
  ];

  const scope = 'vstudio.Data';
  const columns = [
    {
      id: 'name',
      label: formatMessage({ id: `${scope}.columns.name` }),
      type: 'name',
      width: '20%',
    },
    {
      id: 'description',
      label: formatMessage({ id: 'common.description' }),
      type: 'description',
      width: '20%',
    },
    {
      id: 'updatedAt',
      label: formatMessage({ id: `${scope}.columns.updateTime` }),
      type: 'time',
      width: '20%',
    },
    {
      id: '*',
      label: '',
      align: 'left',
      type: 'operations',
      operations: item => operationsRender(item),
      width: '1%',
    },
  ];

  const settingRender = [
    <Button
      key="data-add-btn"
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      onClick={() => handleShowUploadData(true)}
    >
      {formatMessage({ id: `${scope}.add` })}
    </Button>,
  ];

  const LinkRender = () => [
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      <Link color="textPrimary">
        {formatMessage({ id: `${scope}.title.workspaces` })}
      </Link>
      <Typography color="textPrimary">
        {formatMessage({ id: `${scope}.title.data` })}
      </Typography>
    </Breadcrumbs>,
  ];

  return (
    <div>
      <BasicTable
        data={dataList}
        page={{ ...Pagination, total: 3 }}
        columnData={columns}
        setting={settingRender}
        emptyText="No Data"
        caption={formatMessage({ id: `${scope}.caption` })}
        onChange={getDataList}
        type={1}
        title={LinkRender()}
      />
      {showUploadData && (
        <DataUpload
          open={showUploadData}
          handleShowUploadData={handleShowUploadData}
        />
      )}
    </div>
  );
};

export default injectIntl(DataManage);
