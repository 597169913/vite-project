import {
  createRouter,
  createWebHistory
} from 'vue-router'
import calendar from 'src/views/calendar/calendarIndex'
export const appRounter = [{
    path: '/'
  },
  {
    path: '/calendar',
    component: calendar
  }
]
export default createRouter({
  history: createWebHistory(),
  routes: appRounter
})