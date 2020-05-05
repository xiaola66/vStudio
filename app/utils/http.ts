/*
 * @Author: changchun zhang
 * @Date:   2020-04-17 16:52:22
 * @Last Modified by: jieyun ren
 * @Last Modified time: 2020-04-30 16:37:05
 */
import Axios from 'axios';

import { warnMessage } from 'components';
import EnErrorMessage from 'translations/enUS/error';
import ZhErrorMessage from 'translations/zhCN/error';

// true use MockURL
// false use nativeURL
const testList = {
  workspaces: {
    get: true,
  },
  project: {
    get: true,
  },
  algorithms:{
    get: true,
  },
  all:{
    get: true
  },
  current:{
    get: true
  },
  published:{
    get: true
  },
  perform:{
    get: true
  },
  connection: {
    get: true,
    post: true,
    put: true,
    delete: true,
  },
  datasources: {
    get: true,
  },
  design: {
    get: true,
  },
};

const getBaseURL = config => {
  const { url, method } = config;
  const testName = Object.keys(testList);
  const testItem = testName.find(item => url.includes(item));
  return testItem && testList[testItem][method];
};

/**
 * create Axios instance
 * @param token token
 */

const MockTESTURL = 'http://139.198.177.241:3000/mock/15';
const TESTURL = null;

const getInstance = (token: string, lanuage: string = 'zh') => {
  const instance = Axios.create({
    baseURL: TESTURL || process.env.API_BASE,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use((config: any) => {
    if (config.method === 'get') {
      config.data = true;
    }
    config.headers['Authorization'] = `Bearer ${token}`;
    //config.headers['Frontend-Version'] = 'v001-release39';
    //config.headers['Accept-Language'] = 'zh-cn';
    getBaseURL(config) ? (config.baseURL = MockTESTURL) : null;
    return config;
  });

  instance.interceptors.response.use(
    response => response.data,
    error => {
      const { response, message } = error;
      if (response) {
        const errorCode = lanuage === 'zh' ? ZhErrorMessage : EnErrorMessage;
        const errorMessage =
          errorCode[response.data && response.data.errorCode] || message;
        switch (response.status) {
          case 400:
            warnMessage(errorMessage);
            break;
          case 401:
            warnMessage(errorMessage);
            break;
          case 403:
            if (response.config.url.indexOf('workspaces') === -1) {
              // is not workspaces api
              warnMessage(errorMessage);
            }
            break;
          case 404:
            warnMessage(errorMessage);
            break;
          case 500:
            warnMessage(errorMessage);
            break;
          default:
            warnMessage(errorMessage);
            break;
        }
      } else {
        if (!window.navigator.onLine) {
          // 无网络，可跳转断网页面
        }
      }
    }
  );
  return instance;
};

export default getInstance;
