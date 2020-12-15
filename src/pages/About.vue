<template lang="pug">
.about
  h5  测试connects函数的
  h5  我是test仓库：{{store_test.name}}
  <van-button type="primary" @click="dvClick">点我：{{store_test.count}}</van-button>
  h1  ============
  h5  下面是第二个仓库
  h5  我是dbb仓库：{{store_dbb.name}}
  <van-button type="danger" @click="dbbClick">dbb仓库{{store_dbb.count}}</van-button>
  p {{message}}
</template>

<script>
import connects from "@/utils/connects";

const mixin = {
  data(){
    return {
       message: 'hello'
    }
  },
  methods:{
    mixinsTestClick(cb){
      cb();
    }
  }
};

export default connects("test,dbb", {
  name: "About",
  mixins: [mixin],
  methods: {
    dvClick() {
      this.mixinsTestClick(this.callback);
      console.log('开始测试自定义指令:防抖')
      this.test_testAction();
    },
    dbbClick(){
       console.log('开始测试自定义指令:节流')
      this.dbb_testAction();
      this.dbb_twoAction();
    },
    callback(){
      console.log('我是传给mixins的函数')
    }
  },
});
</script>
