// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import JsonExcel from 'vue-json-excel'

var VueFire = require('vuefire')

Vue.component('downloadExcel', JsonExcel)
Vue.config.productionTip = false

Vue.use(VueFire)
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
