import {
  createRouter,
  createWebHistory
} from 'vue-router'
import calendar from '@/views/calendar/calendarIndex.vue'
import test from '@/views/test/testIndex.vue'
const appRounter = [{
    path: '/',
    component: calendar
  },
  {
    path: '/calendar',
    component: calendar
  },
  {
    path: '/test',
    component: test
  }
]
export default createRouter({
  history: createWebHistory(),
  routes: appRounter
})