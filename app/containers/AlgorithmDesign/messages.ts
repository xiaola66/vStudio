/*
 * @Author: jieyun Ren
 * @Date:   2020-03-08 13:09:43
 * @Last Modified by:   jieyun Ren
 * @Last Modified time: 2020-03-24 16:08:02
 */
/*
 * AlgorithmDesign Messages
 *
 * This contains all the text for the AlgorithmDesign component.
 */
import { defineMessages } from 'react-intl';
import defaultMessages from 'translations/en';

export const scope = 'vstudio.Algorithm';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: defaultMessages[`${scope}.header`],
  },
  itemColumns: {
    id: `${scope}.item.columns`,
    defaultMessage: defaultMessages[`${scope}.item.columns`],
  },
  itemMb: {
    id: `${scope}.item.Mb`,
    defaultMessage: defaultMessages[`${scope}.item.Mb`],
  },
  error: {
    auth: {
      drag: {
        id: `${scope}.error.auth.drag`,
        defaultMessage: defaultMessages[`${scope}.error.auth.drag`],
      },
      delete: {
        id: `${scope}.error.auth.delete`,
        defaultMessage: defaultMessages[`${scope}.error.auth.delete`],
      },
      connect: {
        id: `${scope}.error.auth.connect`,
        defaultMessage: defaultMessages[`${scope}.error.auth.connect`],
      },
    },
    connection: {
      error1: {
        id: `${scope}.error.connection.error1`,
        defaultMessage: defaultMessages[`${scope}.error.connection.error1`],
      },
      error2: {
        id: `${scope}.error.connection.error2`,
        defaultMessage: defaultMessages[`${scope}.error.connection.error2`],
      },
      error3: {
        id: `${scope}.error.connection.error3`,
        defaultMessage: defaultMessages[`${scope}.error.connection.error3`],
      },
    },
    save: {
      isExist: {
        id: `${scope}.create.existing`,
        defaultMessage: defaultMessages[`${scope}.create.existing`],
      },
    },
  },
  save: {
    confirmTitle: {
      id: `${scope}.save.confirm.title`,
      defaultMessage: defaultMessages[`${scope}.save.confirm.title`],
    },
    confirmText: {
      id: `${scope}.save.confirm.text`,
      defaultMessage: defaultMessages[`${scope}.save.confirm.text`],
    },
    title: {
      id: `${scope}.create.title`,
      defaultMessage: defaultMessages[`${scope}.create.title`],
    },
    name: {
      id: `${scope}.create.name`,
      defaultMessage: defaultMessages[`${scope}.create.name`],
    },
    des: {
      id: 'common.description',
      defaultMessage: defaultMessages['common.description'],
    },
    close: {
      id: 'common.close',
      defaultMessage: defaultMessages['common.close'],
    },
    ok: {
      id: 'common.ok',
      defaultMessage: defaultMessages['common.ok'],
    },
  },
  InequalSave: {
    id: `${scope}.inequalSave.confirm.text`,
    defaultMessage: defaultMessages[`${scope}.inequalSave.confirm.text`],
  },
  placeholder: {
    title: {
      id: 'common.placeholder.name',
      defaultMessage: defaultMessages['common.placeholder.name'],
    },
    des: {
      id: 'common.placeholder.des',
      defaultMessage: defaultMessages['common.placeholder.des'],
    },
  },
  operation: {
    save: {
      id: 'common.save',
      defaultMessage: defaultMessages['common.save'],
    },
    revoke: {
      id: 'common.revoke',
      defaultMessage: defaultMessages['common.revoke'],
    },
    redo: {
      id: 'common.redo',
      defaultMessage: defaultMessages['common.redo'],
    },
    cut: {
      id: 'common.cut',
      defaultMessage: defaultMessages['common.cut'],
    },
    copy: {
      id: 'common.copy',
      defaultMessage: defaultMessages['common.copy'],
    },
    paste: {
      id: 'common.paste',
      defaultMessage: defaultMessages['common.paste'],
    },
    delete: {
      id: 'common.delete',
      defaultMessage: defaultMessages['common.delete'],
    },
    shareit: {
      id: 'common.shareit',
      defaultMessage: defaultMessages['common.shareit'],
    },
    export: {
      id: 'common.export',
      defaultMessage: defaultMessages['common.export'],
    },
    Terminate: {
      id: 'common.Terminate',
      defaultMessage: defaultMessages['common.Terminate'],
    },
    run: {
      id: 'common.run',
      defaultMessage: defaultMessages['common.run'],
    },
    Taskqueue: {
      id: 'common.task',
      defaultMessage: defaultMessages['common.task'],
    },
  },
});
