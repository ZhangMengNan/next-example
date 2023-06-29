import axios,{ AxiosInstance,AxiosError,AxiosRequestConfig,AxiosResponse } from 'axios'
import { IResult, RequestEnums} from './types'

class Request {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);

    this.service.interceptors.request.use(
      (config: AxiosRequestConfig | any) => config,
      (error: AxiosError) => Promise.reject(error)
    )

    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        if (response?.status === RequestEnums.SUCCESS) return response?.data;
        else {
          return {
            code: -1,
            msg: '未知错误',
            data: null,
          };
        }
      },
      (error: AxiosError) => Promise.reject(error)
    )
  }

  get<T, P = any>(url: string, params?: P, headers?: AxiosRequestConfig['headers']): Promise<IResult<T>> {
    return this.service.get(url, { params, headers });
  }
  post<T, P = any>(url: string, params?: P, headers?: AxiosRequestConfig): Promise<IResult<T>> {
    return this.service.post(url, params, headers);
  }
  put<T, P = any>(url: string, params?: P, headers?: AxiosRequestConfig): Promise<IResult<T>> {
    return this.service.put(url, params, headers);
  }
  delete<T, P = any>(url: string, params?: P, headers?: AxiosRequestConfig['headers']): Promise<IResult<T>> {
    return this.service.delete(url, { params, headers });
  }
}

const requestInstance = new Request({
  baseURL: '/',
  timeout: RequestEnums.TIMEOUT,
  withCredentials: true
});

export default requestInstance
