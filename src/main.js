import Vue from 'vue'
import App from './App.vue'

import VueAreaSelector from './VueAreaSelector'
Vue.use(VueAreaSelector)

new Vue({
  el: '#app',
  render: h => h(App)
})
