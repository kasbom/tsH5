// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible/flexible.js'
import { get, post } from './utils/http';
import cookies from 'vue-cookies'    // 导入插件
import vueSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import '@/assets/css/base.css'    
Vue.prototype.$cookies = cookies;
Vue.config.productionTip = false
Vue.prototype.$get = get;
Vue.prototype.$post = post;

Vue.use(vueSwiper, /* { default options with global component } */)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
