/*
 * @Author: changchun Zhang
 * @Date:   2020-3-14 17:34:49
 * @Last Modified by: changChun Zhang
 * @Last Modified time: 2020-03-15 15:54:25
 */
/*
 * DataUpload Messages
 *
 * This contains all the text for the DataUpload component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'vstudio.details';

export default defineMessages({
  inputPage: {
    title: {
      id: `${scope}.inputPage.title`,
      defaultMessage: '输入预览',
    },
    changeData: {
      id: `${scope}.inputPage.button.changeData`,
      defaultMessage: '更换数据',
    },
    showAllData: {
      id: `${scope}.inputPage.button.showAllData`,
      defaultMessage: '查看全部',
    },
  },
  otherPages: {
    label: {
      id: `${scope}.otherPages.label`,
      defaultMessage: '请填写',
    },
    settingButton: {
      id: `${scope}.otherPages.settingButton`,
      defaultMessage: '设置',
    },
    saveButton: {
      id: `${scope}.otherPages.saveButton`,
      defaultMessage: '保存',
    },
  },
  helpArea: {
    title: {
      id: `${scope}.helpArea.title`,
      defaultMessage: '帮助',
    },
  },
});
