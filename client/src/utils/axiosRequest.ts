import { AxiosInstance, AxiosResponse } from 'axios';

const axiosRequest = (
  instance: AxiosInstance,
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  body?: any,
  opt?: any,
) => {
  return instance[method](url, body, opt).then(
    (response: AxiosResponse) => response.data,
  );
};

export default axiosRequest;
