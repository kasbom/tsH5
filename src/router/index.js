import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import mymap from '@/components/map'
import my from '@/components/my'
import login from '@/components/login'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },{
      path: '/mymap',
      name: 'mymap',
      component: mymap
    },{
      path: '/my',
      name: 'my',
      component: my
    },{
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
