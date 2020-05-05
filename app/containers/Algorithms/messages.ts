/*
 * Algorithms Messages
 *
 * This contains all the text for the Algorithms component.
 */
import { defineMessages } from 'react-intl';
import defaultMessages from 'translations/en';

export const scope = 'vstudio.Algorithm';

export default defineMessages({
  title: {
    workspaces: {
      id: 'vstudio.Project.title.workspaces',
      defaultMessage: defaultMessages['vstudio.Project.title.workspaces'],
    },
    projects: {
      id: 'vstudio.Project.title.projects',
      defaultMessage: defaultMessages['vstudio.Project.title.projects'],
    },
    caption: {
      id: `${scope}.caption`,
      defaultMessage: defaultMessages[`${scope}.caption`],
    },
    help: {
      id: `${scope}.help`,
      defaultMessage: defaultMessages[`${scope}.help`],
    },
  },
  button: {
    perform: {
      id: `${scope}.button.perform`,
      defaultMessage: defaultMessages[`${scope}.button.perform`],
    },
    lookAll: {
      id: `${scope}.button.lookAll`,
      defaultMessage: defaultMessages[`${scope}.button.lookAll`],
    },
    current: {
      id: `${scope}.button.current`,
      defaultMessage: defaultMessages[`${scope}.button.current`],
    },
    published: {
      id: `${scope}.button.published`,
      defaultMessage: defaultMessages[`${scope}.button.published`],
    },
  },
  columns: {
    name: {
      id: `${scope}.columns.name`,
      defaultMessage: defaultMessages[`${scope}.columns.name`],
    },
    status: {
      id: `${scope}.columns.status`,
      defaultMessage: defaultMessages[`${scope}.columns.status`],
    },
    createTime: {
      id: `${scope}.columns.createTime`,
      defaultMessage: defaultMessages[`${scope}.columns.createTime`],
    },
    elapsedTime: {
      id: `${scope}.columns.elapsedTime`,
      defaultMessage: defaultMessages[`${scope}.columns.elapsedTime`],
    },
    errorMessage: {
      id: `${scope}.columns.errorMessage`,
      defaultMessage: defaultMessages[`${scope}.columns.errorMessage`],
    },
    description: {
      id: 'common.description',
      defaultMessage: defaultMessages['common.description'],
    },
    versions: {
      id: 'common.versions',
      defaultMessage: defaultMessages['common.versions'],
    },
    releaseNotes: {
      id: 'common.releaseNotes',
      defaultMessage: defaultMessages['common.releaseNotes'],
    },
    releaseTime: {
      id: 'common.releaseTime',
      defaultMessage: defaultMessages['common.releaseTime'],
    },
  },
  create: {
    title: {
      id: `${scope}.create.title`,
      defaultMessage: defaultMessages[`${scope}.create.title`],
    },
    placeholder: {
      name: {
        id: 'common.placeholder.name',
        defaultMessage: defaultMessages['common.placeholder.name'],
      },
      des: {
        id: 'common.placeholder.des',
        defaultMessage: defaultMessages['common.placeholder.des'],
      },
      note: {
        id: 'common.placeholder.note',
        defaultMessage: defaultMessages['common.placeholder.note'],
      },
    },
    menuButton: {
      add: {
        id: `${scope}.create.add`,
        defaultMessage: defaultMessages[`${scope}.create.add`],
      },
      newAlgorithm: {
        id: `${scope}.button.newAlgorithm`,
        defaultMessage: defaultMessages[`${scope}.button.newAlgorithm`],
      },
      importAlgorithm: {
        id: `${scope}.button.importAlgorithm`,
        defaultMessage: defaultMessages[`${scope}.button.importAlgorithm`],
      },
      newTask: {
        id: `${scope}.button.newTask`,
        defaultMessage: defaultMessages[`${scope}.button.newTask`],
      },
    },
    name: {
      id: `${scope}.create.name`,
      defaultMessage: defaultMessages[`${scope}.create.name`],
    },
    existing: {
      id: `${scope}.create.existing`,
      defaultMessage: defaultMessages[`${scope}.create.existing`],
    },
  },
  import: {
    title: {
      id: `${scope}.import.title`,
      defaultMessage: defaultMessages[`${scope}.import.title`],
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
  operations: {
    export: {
      id: 'common.operations.export',
      defaultMessage: defaultMessages['common.operations.export'],
    },
    release: {
      id: 'common.operations.release',
      defaultMessage: defaultMessages['common.operations.release'],
    },
    delete: {
      id: 'common.operations.delete',
      defaultMessage: defaultMessages['common.operations.delete'],
    },
  },
});
