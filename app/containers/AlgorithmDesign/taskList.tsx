import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import { BasicTable } from 'components';

const styles = withStyles({
  root: {
    marginTop: '76px',
    position: 'relative',
  },
});

function TaskList(props: any) {
  const {
    classes,
    intl: { formatMessage },
  } = props;

  const getScrollData = () => {
    //滚动加载任务列表，一次20条
    return [];
  };

  const columns = [
    {
      id: 'status',
      label: formatMessage({ id: 'common.statuName' }),
      type: 'status',
      width: '25%',
      xs: 2,
    },
    {
      id: 'taskName',
      label: formatMessage({ id: 'common.taskName' }),
      width: '25%',
      xs: 4,
    },
    {
      id: 'elapsedTime',
      label: formatMessage({ id: 'common.elapsedTime' }),
      width: '25%',
      xs: 2,
    },
    {
      id: 'submitTime',
      label: formatMessage({ id: 'common.submit.time' }),
      type: 'time',
      width: '25%',
      xs: 4,
    },
  ];

  const listTask = [
    {
      id: '1',
      status: '3',
      taskName: '计算等效气体工程计算等效气体工',
      elapsedTime: `5.3h`,
      submitTime: '2020-02-20 13: 20',
    },
    {
      id: '2',
      status: '2',
      taskName: '计算等效气体工程计算等效气体工',
      elapsedTime: `3.1h`,
      submitTime: '2020-02-20 13: 20',
    },
    {
      id: '3',
      taskName: '计算等效气体工程计算等效气体工',
      status: '1',
      elapsedTime: `48min`,
      submitTime: '2020-02-20 13: 20',
    },
    {
      id: '4',
      status: '0',
      taskName: '计算等效气体工程计算等效气体工',
      elapsedTime: `2h46min`,
      submitTime: '2020-02-20 13: 20',
    },
    {
      id: '5',
      status: '2',
      taskName: '计算等效气体工程计算等效气体工',
      elapsedTime: `20min`,
      submitTime: '2020-02-20 13: 20',
    },
    {
      id: '6',
      status: '3',
      taskName: '计算等效气体工程计算等效气体工',
      elapsedTime: `20min`,
      submitTime: '2020-02-20 13: 20',
    },
    {
      id: '7',
      status: '1',
      taskName: '计算等效气体工程计算等效气体工',
      elapsedTime: `10min`,
      submitTime: '2020-02-20 13: 20',
    },
    {
      id: '8',
      status: '3',
      taskName: '计算等效气体工程计算等效气体工',
      elapsedTime: `10min`,
      submitTime: '2020-02-20 13: 20',
    },
  ];

  return (
    <div className={classes.root}>
      <BasicTable
        data={listTask}
        columnData={columns}
        emptyText="亲，您暂无运行内容~"
        type={0}
        scrollHeight={214}
        getScrollData={getScrollData}
      />
    </div>
  );
}

export default styles(injectIntl(TaskList));
