/*
 * @Author: changchun Zhang
 * @Date:   2020-3-14 17:34:49
 * @Last Modified by: changChun Zhang
 * @Last Modified time: 2020-04-18 15:06:44
 */
/*
 * DataUpload Messages
 *
 * This contains all the text for the DataUpload component.
 */
import { defineMessages } from 'react-intl';

const error = 'vstudio.dataUplaod.error';
const scope = 'vstudio.dataUplaod';
const select = 'selectUploadWay.select';

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
  selectUploadWay: {
    title: {
      id: `${scope}.selectUploadWay.title`,
      defaultMessage: 'title',
    },
    select: {
      selectWay: {
        id: `${scope}.${select}.selectWay`,
        defaultMessage: 'selectWay',
      },
      localUpload: {
        id: `${scope}.${select}.localUpload`,
        defaultMessage: 'localUpload',
      },
      connentUpload: {
        id: `${scope}.${select}.connentUpload`,
        defaultMessage: 'connentUpload',
      },
    },
    close: {
      id: `${scope}.selectUploadWay.close`,
      defaultMessage: 'close',
    },
    connentUpload: {
      id: `${scope}.selectUploadWay.nextStep`,
      defaultMessage: 'nextStep',
    },
  },
  upload: {
    title: {
      id: `${scope}.upload.title`,
      defaultMessage: 'title',
    },
    uploadAreaFont: {
      id: `${scope}.upload.uploadAreaFont`,
      defaultMessage: 'uploadAreaFont',
    },
    selectDataFormatFont: {
      id: `${scope}.upload.selectDataFormatFont`,
      defaultMessage: 'selectDataFormatFont',
    },
    connentUpload: {
      id: `${scope}.upload.connentUpload`,
      defaultMessage: 'connentUpload',
    },
    lastStep: {
      id: `${scope}.upload.lastStep`,
      defaultMessage: 'lastStep',
    },
    nextStep: {
      id: `${scope}.upload.nextStep`,
      defaultMessage: 'nextStep',
    },
  },
  connentUpload: {
    title: {
      id: `${scope}.connentUpload.title`,
      defaultMessage: 'title',
    },
    selectFormat: {
      id: `${scope}.connentUpload.selectFormat`,
      defaultMessage: 'selectFormat',
    },
  },
  dataPreview: {
    title: {
      id: `${scope}.dataPreview.title`,
      defaultMessage: 'title',
    },
    changeData: {
      id: `${scope}.dataPreview.changeData`,
      defaultMessage: 'changeData',
    },
    dataName: {
      id: `${scope}.dataPreview.dataName`,
      defaultMessage: 'dataName',
    },
    lastStep: {
      id: `${scope}.dataPreview.lastStep`,
      defaultMessage: 'lastStep',
    },
    nextStep: {
      id: `${scope}.dataPreview.submit`,
      defaultMessage: 'submit',
    },
  },
});
