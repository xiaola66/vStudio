/*
 * @Author: Chunyu shi
 * @Date:   2020-03-27 16:26:02
 * @Last Modified by:   jieyun Ren
 * @Last Modified time: 2020-03-27 16:42:29
 */
import { defineMessages } from 'react-intl';
import defaultMessages from 'translations/en';

export const scope = 'vstudio.MessageChannel';

export default defineMessages({
  title: {
    workspaces: {
      id: `${scope}.title.workspaces`,
      defaultMessage: defaultMessages[`${scope}.title.workspaces`],
    },
    MessageChannels: {
      id: `${scope}.title.MessageChannels`,
      defaultMessage: defaultMessages[`${scope}.title.MessageChannels`],
    },
    help: {
      id: `${scope}.help`,
      defaultMessage: defaultMessages[`${scope}.help`],
    },
  },
  columns: {
    topic: {
      id: `${scope}.columns.topic`,
      defaultMessage: defaultMessages[`${scope}.columns.topic`],
    },
    url: {
      id: `${scope}.columns.url`,
      defaultMessage: defaultMessages[`${scope}.columns.url`],
    },
    encrypt: {
      id: `${scope}.columns.encrypt`,
      defaultMessage: defaultMessages[`${scope}.columns.encrypt`],
    },
    test: {
      id: `${scope}.columns.test`,
      defaultMessage: defaultMessages[`${scope}.columns.test`],
    },
    serialization: {
      id: `${scope}.columns.serialization`,
      defaultMessage: defaultMessages[`${scope}.columns.serialization`],
    },
    qosLevel: {
      id: `${scope}.columns.qosLevel`,
      defaultMessage: defaultMessages[`${scope}.columns.qosLevel`],
    },
    timeout: {
      id: `${scope}.columns.timeout`,
      defaultMessage: defaultMessages[`${scope}.columns.timeout`],
    },
    automaticReconnect: {
      id: `${scope}.columns.automaticReconnect`,
      defaultMessage: defaultMessages[`${scope}.columns.automaticReconnect`],
    },
    retainMessage: {
      id: `${scope}.columns.retainMessage`,
      defaultMessage: defaultMessages[`${scope}.columns.retainMessage`],
    },
    operations: {
      id: `${scope}.columns.operations`,
      defaultMessage: defaultMessages[`${scope}.columns.operations`],
    },
  },
  caption: {
    id: `${scope}.caption`,
    defaultMessage: defaultMessages[`${scope}.caption`],
  },
  operations: {
    export: {
      id: 'common.operations.export',
      defaultMessage: defaultMessages['common.operations.export'],
    },
    drawing: {
      id: 'common.operations.drawing',
      defaultMessage: defaultMessages['common.operations.drawing'],
    },
    delete: {
      id: 'common.operations.delete',
      defaultMessage: defaultMessages['common.operations.delete'],
    },
  },
  delete: {
    title: {
      id: 'common.deleteTitle',
      defaultMessage: defaultMessages['common.deleteTitle'],
    },
    des: {
      id: 'common.delete',
      defaultMessage: defaultMessages['common.delete'],
    },
  },
  create: {
    add: {
      id: `${scope}.create.add`,
      defaultMessage: defaultMessages[`${scope}.create.add`],
    },
    title: {
      id: `${scope}.create.title`,
      defaultMessage: defaultMessages[`${scope}.create.title`],
    },
    topic: {
      id: `${scope}.create.topic`,
      defaultMessage: defaultMessages[`${scope}.create.topic`],
    },
    url: {
      id: `${scope}.create.url`,
      defaultMessage: defaultMessages[`${scope}.create.url`],
    },
    username: {
      id: `${scope}.create.username`,
      defaultMessage: defaultMessages[`${scope}.create.username`],
    },
    password: {
      id: `${scope}.create.password`,
      defaultMessage: defaultMessages[`${scope}.create.password`],
    },
    test: {
      id: `${scope}.create.test`,
      defaultMessage: defaultMessages[`${scope}.create.test`],
    },
    serialization: {
      id: `${scope}.create.serialization`,
      defaultMessage: defaultMessages[`${scope}.create.serialization`],
    },
    qosLevel: {
      id: `${scope}.create.qosLevel`,
      defaultMessage: defaultMessages[`${scope}.create.qosLevel`],
    },
    timeout: {
      id: `${scope}.create.timeout`,
      defaultMessage: defaultMessages[`${scope}.create.timeout`],
    },
    automaticReconnect: {
      id: `${scope}.create.automaticReconnect`,
      defaultMessage: defaultMessages[`${scope}.create.automaticReconnect`],
    },
    retainMessage: {
      id: `${scope}.create.retainMessage`,
      defaultMessage: defaultMessages[`${scope}.create.retainMessage`],
    },
  },
  placeholder: {
    required: {
      id: `${scope}.placeholder.required`,
      defaultMessage: defaultMessages[`${scope}.placeholder.required`],
    },
    unrequired: {
      id: `${scope}.placeholder.unrequired`,
      defaultMessage: defaultMessages[`${scope}.placeholder.unrequired`],
    },
  },
});
