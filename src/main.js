// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import routes from '@/config/routeConfig.js'
import store from '@/store/index.js'
import axios from 'axios'

// 加载常量类
import 'constants'
import 'urls'

// 加载自定义过滤器
import commonFiltes from '@/filter/index'
Object.keys(commonFiltes).forEach(function (key, index, arr) {
  Vue.filter(key, commonFiltes[key])
})

Vue.use(VueRouter)
const router = new VueRouter({
  routes
})

// 加载通用配置
var config = require('../config')

// 通用样式配置
require('@/assets/css/cloud.css')

// 后台数据请求配置
axios.defaults.baseURL = (process.env.NODE_ENV !== 'production' ? config.dev.env.SERVER_URL : config.prod.env.SERVER_URL)
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 5000
axios.interceptors.request.use((request) => {
  store.dispatch('loading', {
    showFlag: true,
    info: '加载中'
  })
  return request
}, (error) => {
  console.log(error)
})

axios.interceptors.response.use((response) => {
  store.dispatch('loading', {
    showFlag: false
  })
  return response
}, (error) => {
  // 关闭加载中提示
  store.dispatch('loading', {
    showFlag: false
  })
  // 提示用户出错了，并跳转到错误页面
  // store.dispatch('setInfo', {
  //   title: '出错了！',
  //   description: '请联系管理员',
  //   icon: 'warn',
  //   buttons: [{
  //     type: 'default',
  //     text: '返回首页',
  //     link: urls.common.routes.home
  //   }]
  // })
  router.push({
    path: urls.common.routes.error
  })
  console.log(error)
})
Vue.prototype.$ajax = axios

FastClick.attach(document.body)

import Vuefilter from 'vue-filter'
Vue.use(Vuefilter)

// 表单验证库
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

// 动态title
Vue.use(require('vue-wechat-title'))

// 事件处理
import VueBus from 'vue-bus'
Vue.use(VueBus)

// 引入echarts图表组件
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

