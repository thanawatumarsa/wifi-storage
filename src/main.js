// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import JsonExcel from 'vue-json-excel'

var VueFire = require('vuefire')
var printjs = require('print-js')

Vue.component('downloadExcel', JsonExcel)
Vue.config.productionTip = false

Vue.use(VueFire, printjs)
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
