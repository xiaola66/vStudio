import React, { useEffect, useState } from 'react';
import { BasicTable, Iconfont, NoData, Confirm } from 'components';
import { Pagination } from 'config';
import { withStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import styles from './algonrithStyle-jss';
import Create from './create';
import messages from './messages';
import { injectIntl, FormattedMessage } from 'react-intl';
import { isOverflowLength } from 'utils/utils';
import { VsDialog } from 'components';
import { useKeycloak } from '@react-keycloak/web';
import { get, del, put, post } from 'utils/request';
import getInstance from 'utils/http';

const Algorithms = (props: any) => {
  const {
    classes,
    intl: { formatMessage },
    match: {
      params: { id },
    },
  } = props;

  const keycloak: any | undefined = useKeycloak().keycloak;
  const [projectName, setProjectName] = useState<string>('');
  const [projectSum, setProjectSum] = useState<number>(0);
  const [performView, performSetView] = useState(true);
  const [publishedView, setPublishedView] = useState(true);
  const [page, setPage] = useState<number>(0);
  const [searchValue, setSearchValue] = useState('');
  const [total, setTotal] = useState(0);

  const getRecentlyAlgorithm = () => {
    //TODO
    // post api to get info
    const proInfo = {
      name: 'project1',
      total: 1,
      id: '_01',
    };
    setProjectName(proInfo.name);
    setProjectSum(proInfo.total);
  };

  useEffect(() => {
    getRecentlyAlgorithm();
  }, [id]);
  useEffect(() => {
    if (performView) {
      getPerform();
    } else {
      getAllAlgorithm();
    }
  }, [performView]);
  useEffect(() => {
    if (performView && publishedView) {
      getCurrentAlgorithm();
    }
    if (performView && !publishedView) {
      getPublished();
    }
  }, [publishedView]);
  useEffect(() => {
    getPerform();
    getCurrentAlgorithm();
    getAllAlgorithm();
  }, []);

  const deleteById = id => {
    //TODO
    //del by id
  };
  const [allData, setAllData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [publishedData, setPublishedData] = useState([]);
  const [performData, setPerformData] = useState([]);
  //全部算法
  const getAllAlgorithm = async () => {
    //TODO
    const gdata: any = await getInstance(keycloak.token).get(
      '/workbench/modules/all'
    );
    const data = (gdata && gdata.elements) || [];
    setAllData(data);
    setTotal(data.length);
  };
  //当前算法
  const getCurrentAlgorithm = async () => {
    //TODO
    const gdata: any = await getInstance(keycloak.token).get(
      '/workbench/modules/current'
    );
    const data = (gdata && gdata.elements) || [];
    setCurrentData(data);
  };
  //已发布
  const getPublished = async () => {
    //TODO
    const gdata: any = await getInstance(keycloak.token).get(
      '/workbench/modules/published'
    );
    const data = (gdata && gdata.elements) || [];
    setPublishedData(data);
  };
  //最近执行
  const getPerform = async () => {
    //TODO
    const gdata: any = await getInstance(keycloak.token).get(
      '/workbench/modules/perform'
    );
    const data = (gdata && gdata.elements) || [];
    setPerformData(data);
  };

  const handleDelete = (name: string, id: string) => {
    Confirm(
      formatMessage(messages.delete.title),
      formatMessage(messages.delete.des) + ` ${name} ?`,
      () => {
        deleteById(id);
      }
    );
  };
  const [openIssue, setOpenIssue] = useState(false);
  const handleCloseIssue = () => {
    setOpenIssue(false);
  };
  const handleOpenIssue = () => {
    setOpenIssue(true);
  };
  const handleSubmit = () => {
    //提交表单数据
  };

  const [data, setData] = useState({ comment: '' });
  const handleChange = (value, param) => {
    setData({
      ...data,
      [param]: value,
    });
  };
  const perform = () => {
    performSetView(true);
  };
  const lookAll = () => {
    performSetView(false);
  };
  //滚动加载数据
  const getScrollPerformData = async () => {
    const gdata: any = await getInstance(keycloak.token).get(
      '/workbench/modules/perform'
    );
    const data: any = (gdata && gdata.elements) || [];
    return data;
  };
  const getScrollCurrentData = async () => {
    const gdata: any = await getInstance(keycloak.token).get(
      '/workbench/modules/current'
    );
    const data: any = (gdata && gdata.elements) || [];
    return data;
  };
  const getScrollPublishedData = async () => {
    const gdata: any = await getInstance(keycloak.token).get(
      '/workbench/modules/published'
    );
    const data: any = (gdata && gdata.elements) || [];
    return data;
  };
  const getScrollAllData = async () => {
    const gdata: any = await getInstance(keycloak.token).get(
      '/workbench/modules/all'
    );
    const data: any = (gdata && gdata.elements) || [];
    return data;
  };

  const currentButton = () => {
    setPublishedView(true);
  };
  const publishedButton = () => {
    setPublishedView(false);
  };
  // const remarksOver = isOverflowLength(data.comment, 50);
  const content = [
    {
      id: 'comment',
      placeholder: formatMessage(messages.create.placeholder.note),
      value: data.comment,
      error: formatMessage({ id: 'error.beyond' }, { number: 50 }),
      isError: isOverflowLength(data.comment, 50),
      isRequired: true,
      onChange: handleChange,
    },
  ];

  const issueRender: any = (
    <div>
      <VsDialog
        type={3}
        open={openIssue}
        onCancel={handleCloseIssue}
        title={formatMessage({ id: 'common.releaseNotes' })}
        content={content}
        onSubmit={handleSubmit}
        formatMessage={formatMessage}
      />
    </div>
  );

  const operationsRender = (item: any) => {
    return [
      {
        name: formatMessage(messages.operations.export),
        onClick: () => {},
      },
      {
        name: formatMessage(messages.operations.release),
        onClick: () => {
          handleOpenIssue();
        },
      },
      {
        name: formatMessage(messages.operations.delete),
        onClick: () => {
          handleDelete(item.name, item.id);
        },
      },
    ];
  };
  const operationsRender2 = (item: any) => {
    return [
      {
        name: formatMessage(messages.operations.export),
        onClick: () => {},
      },
    ];
  };
  /** 最近执行列名 */
  const performColumns = [
    {
      id: 'name',
      label: formatMessage(messages.columns.name),
      xs: 1,
    },
    {
      id: 'status',
      label: formatMessage(messages.columns.status),
      type: 'status',
      xs: 2,
    },
    {
      id: 'updateAt',
      label: formatMessage(messages.columns.createTime),
      type: 'time',
      xs: 2,
    },
    {
      id: 'elapsedTime',
      label: formatMessage(messages.columns.elapsedTime),
      xs: 2,
    },
    {
      id: 'errorMessage',
      label: formatMessage(messages.columns.errorMessage),
      xs: 3,
    },
  ];
  /** 当前算法列名 */
  const currentColumns = [
    {
      id: 'name',
      label: formatMessage(messages.columns.name),
      type: 'name',
      xs: 3,
      render: (value, item) => (
        <Link className={classes.link} href={`/algorithm/${item.id}`}>
          {value}
        </Link>
      ),
      // link: '/algorithm',
      // linkParam: 'id',
    },
    {
      id: 'updateAt',
      label: formatMessage(messages.columns.createTime),
      type: 'time',
      xs: 3,
    },
    {
      id: 'description',
      label: formatMessage(messages.columns.description),
      type: 'description',
      xs: 5,
    },
    {
      id: '*',
      type: 'operations',
      xs: 1,
      operations: item => operationsRender(item),
    },
  ];
  /** 全部算法列名 */
  const allColumns = [
    {
      id: 'name',
      label: formatMessage(messages.columns.name),
      // type: 'name',
      xs: 3,
      render: (value, item) => (
        <Link className={classes.link} href={`/algorithm/${item.id}`}>
          {value}
        </Link>
      ),
      // link: '/algorithm',
      // linkParam: 'id',
    },
    {
      id: 'updateAt',
      label: formatMessage(messages.columns.createTime),
      type: 'time',
      xs: 3,
    },
    {
      id: 'description',
      label: formatMessage(messages.columns.description),
      type: 'description',
      xs: 5,
    },
  ];
  /** 已发布列名 */
  const publishedColumns = [
    {
      id: 'icon',
      xs: 1,
      align: 'center',
      render: () => <Iconfont icon="icon-lock" iconClass={classes.iconfont} />,
    },
    {
      id: 'name',
      label: formatMessage(messages.columns.name),
      align: 'left',
      type: 'name',
      xs: 1,
      render: (value, item) => (
        <Grid container>
          <Link className={classes.link} href={`/algorithm/${item.id}`}>
            {value}
          </Link>
        </Grid>
      ),
    },
    {
      id: 'version',
      label: formatMessage(messages.columns.versions),
      xs: 2,
    },
    {
      id: 'releaseNotes',
      label: formatMessage(messages.columns.releaseNotes),
      type: 'description',
      xs: 2,
    },
    {
      id: 'releaseAt',
      label: formatMessage(messages.columns.releaseTime),
      type: 'time',
      xs: 2,
    },
    {
      id: 'monitoring',
      xs: 3,
      render: (value, item) => (
        <Link className={classes.link} href={`/algorithm/${item.id}`}>
          {value}
        </Link>
      ),
    },
    {
      id: '*',
      align: 'right',
      type: 'operations',
      xs: 1,
      operations: item => operationsRender2(item),
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
      <Link color="textPrimary" href="/app/projects">
        <FormattedMessage {...messages.title.projects} />
      </Link>
      <Typography color="textPrimary">{projectName}</Typography>
    </Breadcrumbs>,
  ];

  const tableRender = [
    <Paper>
      <Grid container className={classes.topGrid}>
        <Grid
          id="topGridLeft"
          className={performView ? classes.topGridLeft : classes.topGridLeft2}
          onClick={perform}
        >
          <FormattedMessage {...messages.button.perform} />
        </Grid>
        <Grid
          id="topGridRight"
          className={performView ? classes.topGridRight : classes.topGridRight2}
          onClick={lookAll}
        >
          {formatMessage(messages.button.lookAll)}({total > 0 ? total : null})
        </Grid>
      </Grid>
      <Grid>
        {performView ? (
          <Paper>
            <BasicTable
              data={performData}
              page={{ ...Pagination, total: 3 }}
              columnData={performColumns}
              emptyText="No Data"
              type={3}
              scrollHeight={210}
              getScrollData={getScrollPerformData}
            />
            <div className={classes.buttonGroup}>
              <Button
                className={
                  publishedView
                    ? classes.currentButton
                    : classes.publishedButton
                }
                onClick={currentButton}
              >
                {formatMessage(messages.button.current)}
              </Button>
              <Button
                className={
                  publishedView
                    ? classes.publishedButton
                    : classes.currentButton
                }
                onClick={publishedButton}
              >
                {formatMessage(messages.button.published)}
              </Button>
              <div className={classes.nullDiv}></div>
            </div>
            <BasicTable
              data={publishedView ? currentData : publishedData}
              page={{ ...Pagination, total: 3 }}
              columnData={publishedView ? currentColumns : publishedColumns}
              emptyText="No Data"
              type={3}
              scrollHeight={320}
              getScrollData={
                publishedView ? getScrollCurrentData : getScrollPublishedData
              }
              tooltip={
                publishedView ? null : formatMessage({ id: 'common.released' })
              }
            />
          </Paper>
        ) : (
          <BasicTable
            data={allData}
            page={{ ...Pagination, total: 3 }}
            columnData={allColumns}
            emptyText="No Data"
            type={3}
            scrollHeight={650}
            getScrollData={getScrollAllData}
            tooltip={
              publishedView ? null : formatMessage({ id: 'common.released' })
            }
          />
        )}
      </Grid>
    </Paper>,
  ];

  return (
    <div className={classes.root}>
      <Paper className={classes.rootTableTitle} elevation={1}>
        <div className={classes.title}>
          <span>{titleRender}</span>
        </div>
        <Grid container className={classes.tableTopPaper}>
          <Grid item xs={8}>
            <span className={classes.titleText}>
              <FormattedMessage {...messages.title.caption} />
            </span>
            <span>
              <Link className={classes.helpText}>
                <FormattedMessage {...messages.title.help} />
              </Link>
            </span>
          </Grid>
          <Grid item className={classes.settings} xs={4}>
            {<Create projectSum={projectSum} />}
          </Grid>
        </Grid>
      </Paper>
      {projectSum > 0 ? tableRender : <NoData text="vstudio.Algorithm.null" />}
      {issueRender}
    </div>
  );
};

export default withStyles(styles as any)(injectIntl(Algorithms));
