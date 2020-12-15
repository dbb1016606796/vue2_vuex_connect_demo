import axios from "./config";
import { Toast } from "vant";

/**
 *  @params {Object} data
 *  @params { number } mes
 *  default 0
 *  0====不显示提示消息 1===显示
 *  @params { options } 响应头设置
 *  @ return Promise
 *  */
function $ajax(url, data, methods, mes, options) {
  try {
    return new Promise((resolve, reject) => {
      let obj;
      if (methods == "get") {
        obj = {
          ...options,
          params: data,
        };
      } else {
        obj = data;
      }
      axios[methods](url, obj, options)
        .then(({ data }) => {
          if (mes) Toast.success(data.msg);
          resolve(data);
        })
        .catch((err) => {
          message("warning", "服务器忙，请稍后再试");
          reject(err);
        });
    });
  } catch (error) {
    console.log(error);
  }
}

//无消息提示的get请求
const get = async (url, data = {}, options = {}) =>
  $ajax(url, data, "get", 0, options);
//有消息提示的get请求
const getMes = async (url, data = {}, options = {}) =>
  $ajax(url, data, "get", 1, options);
//无消息提示的post请求
const post = async (url, data = {}, options = {}) =>
  $ajax(url, data, "post", 0, options);
//有消息提示的post请求
const postMes = async (url, data = {}, options = {}) =>
  $ajax(url, data, "post", 1, options);

export default function fetch(target) {
  target.prototype.$get = get;
  target.prototype.$getMes = getMes;
  target.prototype.$post = post;
  target.prototype.$postMes = postMes;
}
