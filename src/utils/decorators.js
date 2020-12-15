//防抖函数，只执行最后一次的事件
export function debounce(timeout = 200) {
  return function(target, key, descriptor) {
    const oldValue = descriptor.value;
    let timer = null;
    descriptor.value = function() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        oldValue.apply(this, arguments);
      }, timeout);
    };
    return descriptor;
  };
}

//节流函数，会立马触发函数，但是limit之后才能继续触发函数
export function throttle(limit = 500) {
  let flag = true;
  return (target, key, descriptor) => {
    let func = descriptor.value;
    descriptor.value = async (...args) => {
      if (!flag) return;
      flag = false;
      try {
        func.apply(this, ...args);
      } catch (error) {
        console.log(error);
      }
      if (!limit) return (flag = true);
      setTimeout(() => {
        flag = true;
      }, limit);
    };
  };
}
