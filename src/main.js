import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './plugins/element.js'

// 配置请求根路径
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 设置拦截器
axios.interceptors.request.use(config => {
  // console.log(config)
  // 添加token验证的authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 挂载到Vue原型属性中
Vue.prototype.$http = axios

import './assets/css/global.less'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
