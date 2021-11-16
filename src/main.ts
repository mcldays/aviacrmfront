import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import router from './router/index'
import Axios from '@/../axios_settings'
import store from './store/index'

Vue.use(VueRouter)
Vue.prototype.$http = Axios;
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/aut')
  } else {
    next()
  }
})

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = "Bearer " +  token
}
new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
