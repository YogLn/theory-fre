import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/reset.css'
import * as request from './network/request'

// 导入antd
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);
import { message } from 'ant-design-vue'
Vue.prototype.$message = message;

// 事件总线
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false
// 网络请求
Vue.prototype.$http = request

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
