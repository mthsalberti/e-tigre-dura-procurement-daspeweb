import Vue from 'vue'
import App from './App.vue'
import i18n from './translations/index'
import vuetify from "@/plugins/vuetify";
import router from "@/router";
import store from '@/store'


Vue.config.productionTip = false

// Vue.use(router)

new Vue({
  i18n,
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
