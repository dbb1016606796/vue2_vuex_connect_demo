/**
 ** vuex 的 modules 链接函数(单个)
 ** 针对命名空间的store
 **  @params { name } 命名空间的名字
 ** @return 被函数增强之后的vue组件，将会多一个store属性，
 ** 例如传入的store是test这个仓库，在vue里面 this.store将可以，访问到test这个仓库
 ** 将会自动将该命名空间 store的 mutations和actions 绑定到vue组件，直接this.xxxx()调用
 */
import { mapState, mapActions, mapMutations } from "vuex";
import { commitName } from "../store";

const connect = (name, vue) => {
  try {
    const computed = vue?.computed ?? {},
      store = mapState({ store: (state) => state[name] }),
      methods = {};
    //开始绑定actions
    if (commitName[name]?.actions?.length) {
      const addMethods = mapActions(name, commitName[name].actions);
      Object.assign(methods, addMethods);
    }
    // 开始绑定 mutations
    if (commitName[name]?.mutations?.length) {
      const addMutaions = mapMutations(name, commitName[name].mutations);
      Object.assign(methods, addMutaions);
    }
    return Object.assign(vue, {
      computed: { ...computed, ...store },
      methods: { ...vue.methods, ...methods },
    });
  } catch (err) {
    console.log(err);
  }
};

export default connect;
