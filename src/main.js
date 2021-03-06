import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import myAxios from './utils/axios/axios'  //封装好的axios
import info from './utils/info'     //封装好的提示框

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'

import '@/icons' // icon

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
