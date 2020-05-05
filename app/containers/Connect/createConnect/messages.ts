/*
 * @Author: changchun Zhang
 * @Date:   2020年4月1日11:14:00
 * @Last Modified by: changChun Zhang
 * @Last Modified time: 2020-03-31 15:20:50
 */
/*
 * connect Messages
 *
 * This contains all the text for the connect component.
 */
import { defineMessages } from 'react-intl';

const error = 'vstudio.connect.error';
const scope = 'vstudio.connect';
const selectConnectWay = 'vstudio.connect.selectConnectWay';
const configurationPage = 'vstudio.connect.configurationPage';
const dataPreview = 'vstudio.connect.dataPreview';

export default defineMessages({
  error: {
    noFile: {
      id: `${error}.noFile`,
      defaultMessage: 'noFile.',
    },
    multifileFile: {
      id: `${error}.multifileFile`,
      defaultMessage: 'multifileFile.',
    },
    notSupportedFormat: {
      id: `${error}.notSupportedFormat`,
      defaultMessage: 'notSupportedFormat.',
    },
  },
  selectConnectWay: {
    header: {
      id: `${selectConnectWay}.header`,
      defaultMessage: '添加一个新的连接',
    },
  },
  configurationPage: {
    header: {
      id: `${configurationPage}.header`,
      defaultMessage: '请填写连接参数',
    },
  },
  dataPreview: {
    header: {
      id: `${dataPreview}.header`,
      defaultMessage: '预览连接中的内容',
    },
    inputLable: {
      id: `${dataPreview}.inputLable`,
      defaultMessage: '输入名称',
    },
    saveConnect: {
      id: `${dataPreview}.saveConnect`,
      defaultMessage: 'saveConnect',
    },
  },
  footer: {
    close: {
      id: 'common.close',
      defaultMessage: 'close',
    },
    lastStep: {
      id: 'common.lastStep',
      defaultMessage: 'lastStep',
    },
    nextStep: {
      id: 'common.nextStep',
      defaultMessage: 'nextStep',
    },
  },
});
