export const dbb = {
  namespaced: true,
  state: () => ({
    name: "我是dbb",
    count: 0,
  }),
  mutations: {
    setState(state) {
      state.count++;
    },
  },
  actions: {
    testAction({ commit }) {
      console.log("我是第二个store");
      commit("setState");
    },
    twoAction(){
      console.log('我是dbb仓库的第二个actions方法')
    }
  },
};
