/*
 * @Author: Chunyu shi
 * @Date:   2020-04-18 11:45:02
 */
import { defineMessages } from 'react-intl';
import defaultMessages from 'translations/en';

export const scope = 'vstudio.MonitorBoard';

export default defineMessages({
  title: {
    workspaces: {
      id: `${scope}.title.workspaces`,
      defaultMessage: defaultMessages[`${scope}.title.workspaces`],
    },
    MonitorBoard: {
      id: `${scope}.title.MonitorBoard`,
      defaultMessage: defaultMessages[`${scope}.title.MonitorBoard`],
    },
  },
  select: {
    arithmetic: {
      id: `${scope}.select.arithmetic`,
      defaultMessage: defaultMessages[`${scope}.select.arithmetic`],
    },
    versions: {
      id: `${scope}.select.versions`,
      defaultMessage: defaultMessages[`${scope}.select.versions`],
    },
    topic: {
      id: `${scope}.select.topic`,
      defaultMessage: defaultMessages[`${scope}.select.topic`],
    },
    edgeDevice: {
      id: `${scope}.select.edgeDevice`,
      defaultMessage: defaultMessages[`${scope}.select.edgeDevice`],
    },
    dataImport: {
      id: `${scope}.select.dataImport`,
      defaultMessage: defaultMessages[`${scope}.select.dataImport`],
    },
  },
});
