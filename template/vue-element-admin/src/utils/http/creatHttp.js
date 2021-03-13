import Http from '@thales/http/src/index';
import { Message } from 'element-ui';
import { getToken } from '../auth';
import sessionExpiredHandler from './sessionExpiredHandler';

export default (prefix, options = {}) => Http.create({
  withCredentials: options.withCredentials || false,
  prefix,
  $message: (error) => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    });
  },
  sessionExpiredHandler,
  tokenHandler(config) {
    let { headers, token } = config;
    if (!token) {
      token = getToken();
    }
    headers = headers || {};
    headers.Authorization = token;
    return { ...config, headers };
  },
  ...options,
});
