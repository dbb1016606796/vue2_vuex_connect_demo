
export const test = {
  namespaced: true,
  state: () => ({
    name: "我是一个命名空间仓库,仓库名字是：test",
    count: 1,
  }),
  mutations: {
    setState(state) {
      state.count++;
    },
    test2() {
      console.log("成功了哦,我是mutations的方法");
    },
  },
  actions: {
    async testAction({ commit }) {
      await commit("setState");
    },
  },
};
