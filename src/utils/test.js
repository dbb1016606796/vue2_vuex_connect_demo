import { debounce, throttle } from "./decorators";

class Test {
  @debounce()
  debounceClick() {
    console.log("防抖函数，点击了");
  }
  @throttle(1000)
  throttleClick() {
    console.log("节流函数，点击了");
  }
}

export default new Test();
