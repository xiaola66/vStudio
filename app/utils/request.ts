import Axios from 'axios';

/**
 * create instance
 * Global request interception, executed before the request
 */
const getInstance = token => {
  const instance = Axios.create({
    baseURL: process.env.API_BASE,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    config => {
      if (config.method === 'get') {
        config.data = true;
      }
      config.headers['Authorization'] = `Bearer ${token}`;
      return config;
    },
    error => Promise.reject(error.response)
  );

  instance.interceptors.response.use(
    response => response.data,
    error => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            console.log('errorStaus: 401');
            break;
          case 403:
            console.log('errorStaus: 403');
            break;
          case 404:
            console.log('errorStaus: 404');
            break;
          case 500:
            console.log('errorStaus: 500');
            break;
          default:
            console.log(`errorStaus: ${error.response.status}`);
            break;
        }
      }
      return Promise.reject(error);
    }
  );
  return instance;
};

// GET/POST/PUT/DELETE Request
const get = (token, url, params = {}) => {
  return getInstance(token)
    .get(url, { params })
    .catch(error => {
      console.log(error, 'error!');
    });
};
const post = (token, url, data) =>
  getInstance(token)
    .post(url, data)
    .catch(error => {
      console.log(error, 'error!');
    });
const put = (token, url, data) =>
  getInstance(token)
    .put(url, data)
    .catch(error => {
      console.log(error, 'error!');
    });
const del = (token, url) =>
  getInstance(token)
    .delete(url)
    .catch(error => {
      console.log(error, 'error!');
    });

class ResponseError extends Error {
  public response: Response;

  constructor(response: Response) {
    super(response.statusText);
    this.response = response;
  }
}

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new ResponseError(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default async function request(
  url: string,
  options?: RequestInit
): Promise<{} | { err: ResponseError }> {
  const fetchResponse = await fetch(url, options);
  const response = await checkStatus(fetchResponse);
  return parseJSON(response);
}

export { ResponseError, get, post, put, del };
