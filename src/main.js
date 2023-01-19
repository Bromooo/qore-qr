import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueIziToast from 'vue-izitoast';


import 'izitoast/dist/css/iziToast.min.css';


Vue.use(VueIziToast);
Vue.prototype.$toastPosition = {
  position: "topRight",
};
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
