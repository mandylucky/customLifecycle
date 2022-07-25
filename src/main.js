import Vue from 'vue'
import App from './App.vue'
import customHooks from "../customHooks/index.js";
customHooks.init();
Vue.config.productionTip = false
const rootVm=new Vue({
  render: h => h(App),
}).$mount('#app');

customHooks.observe(rootVm);