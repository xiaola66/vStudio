/*
 * @Author: jieyun Ren
 * @Date:   2020-03-31 16:44:02
 * @Last Modified by:   jieyun Ren
 * @Last Modified time: 2020-04-04 11:16:19
 */
/*
 * Sidebar Messages
 *
 * This contains all the text for the sidebar component.
 */
import { defineMessages } from 'react-intl';
import defaultMessages from 'translations/en';

const scope = 'vstudio.workspace';

export default defineMessages({
  workspace: {
    create: {
      id: `${scope}.create`,
      defaultMessage: defaultMessages[`${scope}.create`],
    },
    save: {
      name: {
        id: 'common.name',
        defaultMessage: defaultMessages['common.name'],
      },
    },
    delete: {
      btnText: {
        id: `${scope}.delete`,
        defaultMessage: defaultMessages[`${scope}.delete`],
      },
      confirm: {
        title: {
          id: 'common.deleteText',
          defaultMessage: defaultMessages['common.deleteText'],
        },
        text01: {
          id: `${scope}.delete.confirm`,
          defaultMessage: defaultMessages[`${scope}.delete.confirm`],
        },
        text02: {
          id: 'common.deleteTitle',
          defaultMessage: defaultMessages['common.deleteTitle'],
        },
      },
    },
    placeholder: {
      title: {
        id: 'common.placeholder.name',
        defaultMessage: defaultMessages['common.placeholder.name'],
      },
      rename: {
        id: `${scope}.rename.placeholder`,
        defaultMessage: defaultMessages[`${scope}.rename.placeholder`],
      },
    },
    error: {
      save: {
        isExist: {
          id: `${scope}.create.existing`,
          defaultMessage: defaultMessages[`${scope}.create.existing`],
        },
      },
    },
  },
});
