import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { BasicTable, Confirm } from 'components';
import { Pagination } from 'config';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from './messages';

const styles = withStyles({});

const DeployTask = (props: any) => {
  const {
    classes,
    intl: { formatMessage },
  } = props;

  const columns = [
    { id: '*', type: 'fold', xs: 1 },
    { id: 'name', label: '名称', xs: 2 },
    { id: 'version', label: '版本', xs: 2 },
    { id: 'ReleaseNotes', label: '发布备注', xs: 3 },
    { id: 'ReleaseUser', label: '发布用户', xs: 3 },
  ];

  const listData = [
    {
      id: '0',
      name: 'algorithm-01',
      version: 'v4.0',
      ReleaseNotes: '执行完成',
      ReleaseUser: 'admin',
    },
    {
      id: '1',
      name: 'algorithm-01',
      version: 'v4.0',
      ReleaseNotes: '执行完成',
      ReleaseUser: 'admin',
    },
    {
      id: '3',
      name: 'algorithm-01',
      version: 'v4.0',
      ReleaseNotes: '执行完成',
      ReleaseUser: 'admin',
    },
    {
      id: '4',
      name: 'algorithm-01',
      version: 'v4.0',
      ReleaseNotes: '执行完成',
      ReleaseUser: 'admin',
    },
    {
      id: '5',
      name: 'algorithm-01',
      version: 'v4.0',
      ReleaseNotes: '执行完成',
      ReleaseUser: 'admin',
    },
    {
      id: '6',
      name: 'algorithm-01',
      version: 'v4.0',
      ReleaseNotes: '执行完成',
      ReleaseUser: 'admin',
    },
    {
      id: '7',
      name: 'algorithm-01',
      version: 'v4.0',
      ReleaseNotes: '执行完成',
      ReleaseUser: 'admin',
    },
    {
      id: '8',
      name: 'algorithm-01',
      version: 'v4.0',
      ReleaseNotes: '执行完成',
      ReleaseUser: 'admin',
    },
  ];
  const columns2 = [
    { id: '*', type: 'fold2', xs: 1, align: 'right' },
    { id: 'name', label: '名称', xs: 1 },
    { id: 'type', label: '类型', xs: 1 },
    { id: 'taskStatus', label: '任务状态', xs: 1 },
    { id: 'errorMessage', label: '出错信息', xs: 1 },
    { id: 'operation', label: '操作', xs: 1 },
    { id: 'topic', label: 'Topic', xs: 1 },
    { id: 'executionInterval', label: '执行间隔', xs: 1 },
    { id: 'inputSignal', label: '输入信号', xs: 3 },
    { id: 'executionTime', label: '执行时间', xs: 1 },
  ];
  const columns3 = [
    { id: '*', xs: 1 },
    { id: 'name', label: '名称2', xs: 1 },
    { id: 'type', label: '类型', xs: 1 },
    { id: 'taskStatus', label: '任务状态', xs: 1 },
    { id: 'errorMessage', label: '出错信息', xs: 1 },
    { id: 'operation', label: '操作', xs: 1 },
    { id: 'topic', label: 'Topic', xs: 1 },
    { id: 'executionInterval', label: '执行间隔', xs: 1 },
    { id: 'inputSignal', label: '输入信号', xs: 3 },
    { id: 'executionTime', label: '执行时间', xs: 1 },
  ];
  const listData2 = [
    {
      id: '20',
      parentId: '0',
      name: 'algorithm-01',
      type: '云端2',
      listData: [
        {
          id: '_01',
          taskStatus: '1',
          errorMessage: '11',
          operation: '21',
          topic: '31',
          executionInterval: '41',
          inputSignal: '51',
          executionTime: '61',
        },
        // {
        //   id: '_02',
        //   taskStatus: '2',
        //   errorMessage: '12',
        //   operation: '22',
        //   topic: '32',
        //   executionInterval: '42',
        //   inputSignal: '52',
        //   executionTime: '62',
        // },
        // {
        //   id: '_03',
        //   taskStatus: '3',
        //   errorMessage: '13',
        //   operation: '23',
        //   topic: '33',
        //   executionInterval: '43',
        //   inputSignal: '53',
        //   executionTime: '63',
        // },
        // {
        //   id: '_04',
        //   taskStatus: '4',
        //   errorMessage: '14',
        //   operation: '24',
        //   topic: '34',
        //   executionInterval: '44',
        //   inputSignal: '54',
        //   executionTime: '64',
        // },
      ],
    },
    {
      id: '23',
      parentId: '0',
      name: 'algorithm-01',
      type: '云端',
      listData: [
        {
          id: '_01',
          taskStatus: '1',
          errorMessage: '11',
          operation: '21',
          topic: '31',
          executionInterval: '41',
          inputSignal: '51',
          executionTime: '61',
        },
        {
          id: '_02',
          taskStatus: '2',
          errorMessage: '12',
          operation: '22',
          topic: '32',
          executionInterval: '42',
          inputSignal: '52',
          executionTime: '62',
        },
        {
          id: '_03',
          taskStatus: '3',
          errorMessage: '13',
          operation: '23',
          topic: '33',
          executionInterval: '43',
          inputSignal: '53',
          executionTime: '63',
        },
        {
          id: '_04',
          taskStatus: '4',
          errorMessage: '14',
          operation: '24',
          topic: '34',
          executionInterval: '44',
          inputSignal: '54',
          executionTime: '64',
        },
      ],
    },
    {
      id: '21',
      parentId: '1',
      name: 'algorithm-01',
      type: '云端',
      listData: [
        {
          id: '_01',
          taskStatus: '1',
          errorMessage: '11',
          operation: '21',
          topic: '31',
          executionInterval: '41',
          inputSignal: '51',
          executionTime: '61',
        },
        {
          id: '_02',
          taskStatus: '2',
          errorMessage: '12',
          operation: '22',
          topic: '32',
          executionInterval: '42',
          inputSignal: '52',
          executionTime: '62',
        },
        {
          id: '_03',
          taskStatus: '3',
          errorMessage: '13',
          operation: '23',
          topic: '33',
          executionInterval: '43',
          inputSignal: '53',
          executionTime: '63',
        },
        {
          id: '_04',
          taskStatus: '4',
          errorMessage: '14',
          operation: '24',
          topic: '34',
          executionInterval: '44',
          inputSignal: '54',
          executionTime: '64',
        },
      ],
    },
  ];

  const titleRender = [
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      <Typography color="textPrimary">{'current workspace'}</Typography>
      <Typography color="textPrimary">
        <FormattedMessage {...messages.title} />
      </Typography>
    </Breadcrumbs>,
  ];

  return (
    <div>
      <BasicTable
        data={listData}
        columnData={columns}
        foldData={listData2}
        foldColumnData={columns2}
        foldColumnData2={columns3}
        emptyText="No Data"
        type={4}
        scrollHeight={800}
        foldScrollHeight={200}
        page={{ ...Pagination, total: 3 }}
        title={titleRender}
        caption={formatMessage(messages.caption)}
      />
    </div>
  );
};
export default injectIntl(DeployTask);
