import axios from "axios";
import { Toast } from "vant";

const timeout = 10000;

const ajax = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  timeout,
});

ajax.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    Toast.loading({
      message: "加载中...",
      duration: timeout,
    });
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    Toast.fail('服务器无响应');
    return Promise.reject(error);
  }
);

ajax.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    Toast.clear();
    return response.data;
  },
  (error) => {
    // 对响应错误做点什么
    Toast.fail('服务器异常');
    return Promise.reject(error);
  }
);

export default ajax;
