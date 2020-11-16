import Vue from 'vue'
import Router from 'vue-router'
import UserLocation from '@/pages/UserLocation'
import ChronicMap from '@/pages/ChronicMap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      component: UserLocation
    },
    {
      path: '/chronic-map',
      component: ChronicMap
    }
  ]
})
