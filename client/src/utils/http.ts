import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://lmmmmmm.cn:4016/api',
  timeout: 10000
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      const status = error.response.status;
      const msg = error.response.data.msg;
      console.error(`[Response Error] Status: ${status}, Message: ${msg}`);
      return error.response.data;
    }
    return error;
  }
);

export const getRequest = (url: string, params?: object): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await instance.get(url, { params });
      response.data && resolve(response.data);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const putRequest = (url: string, body: object): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await instance.put(url, body);
      response.data && resolve(response.data);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const patchRequest = (url: string, data: object): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await instance.patch(url, data);
      response.data && resolve(response.data);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
