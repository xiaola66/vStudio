/*
 * @Author: changchun Zhang
 * @Date:   2020-4-7 12:40:17
 * @Last Modified by: changChun Zhang
 * @Last Modified time: 2020-04-07 17:35:00
 */
/*
 * DataUpload Messages
 *
 * This contains all the text for the DataUpload component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'vstudio.connect';
export const swal = 'vstudio.connect.swal';

export default defineMessages({
  addConnect: {
    id: `${scope}.addConnect`,
    defaultMessage: 'addConnect',
  },
  swal: {
    delete: {
      id: `${swal}.delete`,
      defaultMessage: 'You are sure you want to delete the connection',
    },
    impactTitle: {
      id: `${swal}.impactTitle`,
      defaultMessage: 'Detection of associated data in use',
    },
    impactContent: {
      id: `${swal}.impactContent`,
      defaultMessage: 'Do not delete the connection',
    },
    confim: {
      id: `${swal}.confim`,
      defaultMessage: 'confim',
    },
    cancel: {
      id: `${swal}.cancel`,
      defaultMessage: 'cancel',
    },
  },
  link: {
    link: {
      id: `${scope}.link.link`,
      defaultMessage: 'link',
    },
    workSpace: {
      id: `${scope}.link.workSpace`,
      defaultMessage: 'workSpace',
    },
  },
  caption: {
    id: `${scope}.caption`,
    defaultMessage: 'caption',
  },
  tableOperations: {
    edit: {
      id: `${scope}.tableOperations.edit`,
      defaultMessage: '编辑参数',
    },
    preview: {
      id: `${scope}.tableOperations.preview`,
      defaultMessage: '预览链接',
    },
    delete: {
      id: `${scope}.tableOperations.delete`,
      defaultMessage: '删除',
    },
  },
  selectConnectWay: {
    header: {
      id: `${scope}.selectConnectWay.header`,
      defaultMessage: '添加一个新的连接',
    },
  },
  ConfigurationPage: {
    header: {
      id: `${scope}.ConfigurationPage.header`,
      defaultMessage: '请填写连接参数',
    },
  },
  dataPreview: {
    inputLable: {
      id: `${scope}.dataPreview.inputLable`,
      defaultMessage: '输入名称',
    },
    saveConnect: {
      id: `${scope}.dataPreview.saveConnect`,
      defaultMessage: '保存连接',
    },
  },
});
