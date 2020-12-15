vue2的项目，使用了vuex3，使用connect函数来进行组件和vuex的链接

因为使用react的redux开发项目过程中，发现connect函数挺好用的，所以打算再vue项目中的vuex中也保持这种写法，所以写了这个移动端demo来实现

------

###### 目录说明

```
├── src
	├── api          网络请求的方法,使用了修饰器
	├── pages            
  		└── About.vue  connect函数的使用测试demo
	├── server   	 axios的封装目录 
	├── store        vuex
		├── modules
		├── index.js 这里写的require.context
	├── utils
		├── connect.js	链接单个仓库
		├── connects.js 链接多个仓库
	├── App.vue	
	├── main.js
├── vue.config.js    配置px转vw
```

------



###### 实现的一些效果：

1. 不再需要使用mapState、mapActions等进行组件和vuex仓库的绑定，统一使用封装函数connect。
2. modules目录下创建的文件，将自动添加到vuex中的命名空间中，例如，创建a.js，modulesName === a。
3. 添加H5调试插件，可以再手机上查看network。
4. 配置了postcss-px-to-viewport，将不再使用rem适配移动端，使用vw。
5. babel方面，配置了修饰器以及 ?. 和 ??  这三个高阶语法的使用支持。

------



###### connect效果

```
<template>
	<h1>{{store.name}}</h1>
</template>

<script>
import connect from "@/utils/connect";

export default connect("test", {
  name: "App",
  created() {
    this.testAction();
  },
});
</script>

//test的modules
export const test = {
  namespaced: true,
  state: () => ({
    name: "我是一个命名空间仓库,仓库名字是：test",
  }),
  mutations: {
    setState(state) {
      state.name = 1111 ;
    },
  },
  actions: {
    async testAction({ commit }) {
      await commit("setState");
    },
  },
};
//具体使用效果请看文件
```

[^connect]:  src/App.vue
[^connects]: src/pages/About.vue





