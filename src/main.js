import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store.js'
import echarts from 'echarts'
import Axios from 'axios'

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = Axios;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
