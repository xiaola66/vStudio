import { defineMessages } from 'react-intl';
import defaultMessages from 'translations/en';

export const scope = 'vstudio.DeployTask';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: defaultMessages[`${scope}.title`],
  },
  // columns: {
  //   name: {
  //     id: `${scope}.columns.name`,
  //     defaultMessage: defaultMessages[`${scope}.columns.name`],
  //   },
  //   updateTime: {
  //     id: `${scope}.columns.updateTime`,
  //     defaultMessage: defaultMessages[`${scope}.columns.updateTime`],
  //   },
  //   description: {
  //     id: 'common.description',
  //     defaultMessage: defaultMessages['common.description'],
  //   },
  //   total: {
  //     id: `${scope}.columns.total`,
  //     defaultMessage: defaultMessages[`${scope}.columns.total`],
  //   },
  //   operations: {
  //     id: `${scope}.columns.operations`,
  //     defaultMessage: defaultMessages[`${scope}.columns.operations`],
  //   },
  // },
  caption: {
    id: `${scope}.caption`,
    defaultMessage: defaultMessages[`${scope}.caption`],
  },
  // operations: {
  //   export: {
  //     id: 'common.operations.export',
  //     defaultMessage: defaultMessages['common.operations.export'],
  //   },
  //   drawing: {
  //     id: 'common.operations.drawing',
  //     defaultMessage: defaultMessages['common.operations.drawing'],
  //   },
  //   delete: {
  //     id: 'common.operations.delete',
  //     defaultMessage: defaultMessages['common.operations.delete'],
  //   },
  // },
  // delete: {
  //   title: {
  //     id: 'common.deleteTitle',
  //     defaultMessage: defaultMessages['common.deleteTitle'],
  //   },
  //   des: {
  //     id: 'common.delete',
  //     defaultMessage: defaultMessages['common.delete'],
  //   }
  // },
  // create: {
  //   add: {
  //     id: `${scope}.create.add`,
  //     defaultMessage: defaultMessages[`${scope}.create.add`],
  //   },
  //   title: {
  //     id: `${scope}.create.title`,
  //     defaultMessage: defaultMessages[`${scope}.create.title`],
  //   },
  //   name: {
  //     id: `${scope}.create.name`,
  //     defaultMessage: defaultMessages[`${scope}.create.name`],
  //   },
  //   description: {
  //     id: 'common.description',
  //     defaultMessage: defaultMessages['common.description'],
  //   },
  //   isExist: {
  //     id: `${scope}.create.existing`,
  //     defaultMessage: defaultMessages[`${scope}.create.existing`],
  //   },
  // },
  // placeholder: {
  //   name: {
  //     id: 'common.placeholder.name',
  //     defaultMessage: defaultMessages['common.placeholder.name'],
  //   },
  //   description: {
  //     id: 'common.placeholder.des',
  //     defaultMessage: defaultMessages['common.placeholder.des'],
  //   }
  // },
});
