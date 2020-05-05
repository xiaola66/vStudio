import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { BasicTable, Confirm } from 'components';
import { Pagination } from 'config';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { injectIntl, FormattedMessage } from 'react-intl';
import Create from './create';
import messages from './messages';

const styles = withStyles({
  helpText: {
    color: '#FFAA21',
    cursor: 'pointer',
  },
});

const MessageChannel = (props: any) => {
  const {
    classes,
    intl: { formatMessage },
  } = props;

  const listData = [
    {
      id: '0',
      topic: 'topic-01',
      url: 'tpc://ip.xxxxx',
      encrypt: `公开`,
      test: 'data11',
      serialization: 'Jason',
      qosLevel: '0',
      timeout: '1000ms',
      automaticReconnect: '是',
      retainMessage: '否',
    },
    {
      id: '1',
      topic: 'topic-02',
      url: 'tpc://ip.xxxxx',
      encrypt: `加密`,
      test: 'data22',
      serialization: 'Jason',
      qosLevel: '1',
      timeout: '1000ms',
      automaticReconnect: '否',
      retainMessage: '是',
    },
  ];

  const columns = [
    {
      id: 'topic',
      label: formatMessage(messages.columns.topic),
      type: 'topic',
      width: '10%',
    },
    {
      id: 'url',
      label: formatMessage(messages.columns.url),
      type: 'url',
      width: '20%',
    },
    {
      id: 'encrypt',
      label: formatMessage(messages.columns.encrypt),
      type: 'encrypt',
      width: '10%',
    },
    {
      id: 'test',
      label: formatMessage(messages.columns.test),
      type: 'test',
      width: '10%',
    },
    {
      id: 'serialization',
      label: formatMessage(messages.columns.serialization),
      type: 'serialization',
      width: '10%',
    },
    {
      id: 'qosLevel',
      label: formatMessage(messages.columns.qosLevel),
      type: 'qosLevel',
      width: '10%',
    },
    {
      id: 'timeout',
      label: formatMessage(messages.columns.timeout),
      type: 'timeout',
      width: '10%',
    },
    {
      id: 'automaticReconnect',
      label: formatMessage(messages.columns.automaticReconnect),
      type: 'automaticReconnect',
      width: '10%',
    },
    {
      id: 'retainMessage',
      label: formatMessage(messages.columns.retainMessage),
      type: 'retainMessage',
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
        <FormattedMessage {...messages.title.MessageChannels} />
      </Typography>
    </Breadcrumbs>,
  ];

  return (
    <div>
      <BasicTable
        data={listData}
        page={{ ...Pagination, total: 3 }}
        columnData={columns}
        setting={<Create />}
        emptyText="No Data"
        caption={formatMessage(messages.caption)}
        type={1}
        title={titleRender}
      />
    </div>
  );
};

export default styles(injectIntl(MessageChannel));
