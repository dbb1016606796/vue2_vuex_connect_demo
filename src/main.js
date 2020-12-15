import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Button, Toast, Field, Cell, CellGroup } from "vant";

Vue.use(Toast);
Vue.use(Button);
Vue.use(Field);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
