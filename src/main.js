import Vue from 'vue'
import App from './App.vue'
import i18n from './translations/index'
import vuetify from "@/plugins/vuetify";
import router from "@/router";

Vue.config.productionTip = false

// Vue.use(router)

new Vue({
  i18n,
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
