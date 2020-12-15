<template lang="pug" >
#app
  van-button(type="info") 我是vuex：{{ store.name }}
  van-button(type="primary", @click="dvClick") 点我：{{ store.count }}
  //- 这是一个注释
  div
    van-button(plain, hairline, type="primary", @click="debounceFun") 我是防抖函数：{{ $store.state.dbb.name }}
  div
    <van-button type="danger" @click="throttleFun">我是节流函数</van-button>  
  div
    van-button(plain, hairline, type="primary", @click="messageTest") 测试弹出消息
  <van-cell-group>
    <van-field label="文本" v-model="text" placeholder="请输入用户名" />
  </van-cell-group>  
  .skeleton
  #nav
    <router-link to="/">Home</router-link>|
    router-link(to="/about") About
  router-view 
</template>

<script>
import connect from "@/utils/connect";
import Test from "@/utils/test";
import { debounce } from "@/utils/func";
import { mapActions } from "vuex";
import network from "@/api/test";

export default connect("test", {
  name: "App",
  data() {
    return {
      text: "",
    };
  },
  methods: {
    messageTest() {
      this.$toast.loading("12312");
      console.log();
    },
    debounceFun() {
      Test.debounceClick();
    },
    throttleFun() {
      Test.throttleClick();
    },
    dvClick: debounce(function () {
      console.log("防抖函数开启");
      this.testAction();
      this.test2();
    }),
  },
  created() {
    network._getAdcode();
  },
});
</script>

<style lang="scss">
@import "@/sass/reset.scss";
</style>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<style lang="scss" scoped>
@import "@/sass/test.scss";
</style>
