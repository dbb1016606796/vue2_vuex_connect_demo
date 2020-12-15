//防抖函数:是触发事件后函数不会立即执行，而是在 n 秒后执行，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。
export function debounce(func, wait = 500) {
  let timeout;
  return function() {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

// 节流函数:是触发事件后函数会立即执行，然后 n 秒内不触发事件才能继续执行函数的效果。
export function throttle(func, wait = 500) {
  let timeout;
  return function() {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);

    let callNow = !timeout;
    timeout = setTimeout(() => {
      timeout = null;
    }, wait);

    if (callNow) func.apply(context, args);
  };
}

export const imgSrc = (src) => `${src}?time=${new Date().getTime()}`;

//对用户信息存储在sesition进行加密
export function b6En(obj) {
  if (typeof obj !== "object") return;
  let str = window.btoa(encodeURIComponent(JSON.stringify(obj)));
  return str;
}

//对用户信息存储在sesition进行解密
export function b6De(str) {
  let obj = JSON.parse(decodeURIComponent(window.atob(str)));
  return obj;
}
