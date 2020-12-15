import { mapState, mapActions, mapMutations } from "vuex";
import { commitName } from "../store";
/**
 ** 链接多个命名空间的函数
 ** @params {name:string} 如果需要链接多个仓库，请将仓库没以','分割，例如 connects('a,b',vue)
 ** @return  返回给组件的store名字将会是  `store_${storeName}` 
 ** @return  返回给组件的mutations和actions名字将会是  `${storeName}_${functionName}` 
 */
/**
 * * 示例demo
 * * connects('a,b',vue)
 * * store_a 将代表仓库a
 * * store_b 将代表仓库b
 * * 假设a仓库有个actions方法 test；this.a_test将调用仓库a的test方法(mutations和actions同理)
 */

const connects = (name, vue) => {
  try {
    const nameArr = name.split(",");
    const computed = vue?.computed ?? {};
    let store = {},
      methods = {};
    nameArr.forEach((value) => {
      const storeName = `store_${value}`;
      //开始绑定store
      store = {
        ...store,
        ...mapState({ [storeName]: (state) => state[value] }),
      };
      //开始绑定actions
      if (commitName[value]?.actions?.length) {
        commitName[value].actions.map((v) => {
          const addMethods = mapActions(value, { [`${value}_${v}`]: v });
          Object.assign(methods, addMethods);
        });
      }
      // 开始绑定 mutations
      if (commitName[value]?.mutations?.length) {
        commitName[value].mutations.map((v) => {
          const addMutaions = mapMutations(name, { [`${value}_${v}`]: v });
          Object.assign(methods, addMutaions);
        });
      }
    });
    return Object.assign(vue, {
      computed: { ...computed, ...store },
      methods: { ...vue.methods, ...methods },
    });
  } catch (err) {
    console.log(err);
  }
};

export default connects;
