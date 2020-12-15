import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//这个变量是为了给connect函数用的
export let commitName = {};
/**
 * * 开始批量导入命名空间的store
 * * fileName === storeName
 */
let modules = {},
  files = require.context("./modules", true, /\.js$/);
files.keys().forEach((fileName) => {
  const [name] = fileName
      .replace("/", "")
      .split(".")
      .filter((v) => v),
    value = files(fileName)[name];
  if (!value) return;
  const { actions, mutations } = value;
  if (mutations && Object.keys(mutations).length) {
    commitName[name] = {
      mutations: Object.keys(mutations),
    };
  }
  if (actions && Object.keys(actions).length) {
    commitName[name]["actions"] = Object.keys(actions);
  }
  modules[name] = value;
});

export default new Vuex.Store({
  state: {
    globarUser: {
      name: "asdas",
    },
  },
  mutations: {},
  actions: {},
  modules,
});
