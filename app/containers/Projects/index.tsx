import React, { useEffect, useState } from 'react';
import { BasicTable, Confirm, NoData } from 'components';
import { Pagination } from 'config';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { injectIntl, FormattedMessage } from 'react-intl';
import Create from './create';
import messages from './messages';
import { get, post, del, put } from '../../utils/request';
import getInstance from 'utils/http';
import { useKeycloak } from '@react-keycloak/web';

interface projectDataProps {
  id: string;
  userId: string;
  createdAt: string;
  description: string;
  name: string;
  updatedAt: string;
}

const Projects = (props: any) => {
  const {
    classes,
    intl: { formatMessage },
  } = props;

  const keycloak: any | undefined = useKeycloak().keycloak;
  const [listData, setListData] = useState<Array<projectDataProps>>([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = e => {
    setSearchValue(e);
  };

  useEffect(() => {
    getProjectData();
  }, []);

  useEffect(() => {
    getProjectData();
  }, [searchValue, page]);

  const getProjectData = async () => {
    const gdata: any = await get(keycloak.token, '/api/workbench/projects', {
      dir: 'desc',
      page: page,
      size: pageSize,
      sort: 'updatedAt',
      search: searchValue,
    });
    // const gdata: any = await getInstance(keycloak.token).get('/api/workbench/projects');
    const data = (gdata && gdata.elements) || [];
    setListData(data);
    gdata && setTotal(gdata.total);
  };

  const onDelete = async id => {
    //TODO
    const delByid = await del(keycloak.token, `/api/workbench/projects/${id}`);
    getProjectData();
  };

  const handleDelete = (name: string, id: string) => {
    Confirm(
      formatMessage(messages.delete.title),
      formatMessage(messages.delete.des) + ` ${name} ?`,
      () => {
        onDelete(id);
      }
    );
  };
  const onChangePage = pageIndex => {
    setPage(pageIndex.pageIndex);
    setPageSize(pageIndex.pageSize);
  };
  const handleSubmit = value => {
    value && getProjectData();
  };

  const operationsRender = (item: any) => {
    return [
      {
        name: formatMessage(messages.operations.export),
        onClick: () => {},
      },
      {
        name: formatMessage(messages.operations.drawing),
        onClick: () => {},
      },
      {
        name: formatMessage(messages.operations.delete),
        onClick: () => {
          handleDelete(item.name, item.id);
        },
      },
    ];
  };

  const columns = [
    {
      id: 'name',
      label: formatMessage(messages.columns.name),
      type: 'name',
      width: '20%',
      link: '/app/algorithms',
      linkParam: 'id',
    },
    {
      id: 'updatedAt',
      label: formatMessage(messages.columns.updateTime),
      type: 'time',
      width: '20%',
    },
    {
      id: 'description',
      label: formatMessage(messages.columns.description),
      type: 'description',
      width: '20%',
    },
    {
      id: 'total',
      label: formatMessage(messages.columns.total),
      type: 'total',
      width: '30%',
    },
    {
      id: '*',
      // label: formatMessage(messages.columns.operations),
      align: 'center',
      type: 'operations',
      operations: item => operationsRender(item),
      width: '10%',
    },
  ];

  const titleRender = [
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      <Typography color="textPrimary">
        <FormattedMessage {...messages.title.workspaces} />
      </Typography>
      <Typography color="textPrimary">
        <FormattedMessage {...messages.title.projects} />
      </Typography>
    </Breadcrumbs>,
  ];

  return (
    <div>
      <BasicTable
        data={listData}
        page={{ pageIndex: page, total: total > 0 ? total : 1 }}
        onChange={onChangePage}
        columnData={columns}
        setting={<Create handleSubmit={handleSubmit} />}
        // emptyText={<NoData text='common.nodata'/>}
        emptyText="No Data"
        caption={formatMessage(messages.caption)}
        type={1}
        title={titleRender}
        handleSearchChange={handleSearchChange}
        apiURL="/api/workbench/projects/"
      />
    </div>
  );
};

export default injectIntl(Projects);
