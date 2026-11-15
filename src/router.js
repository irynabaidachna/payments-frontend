import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./components/HomePage.vue')
  },
  {
    path: '/accounts',
    name: 'Accounts',
    component: () => import('./components/AccountsPage.vue')
  },
  {
    path: '/payments',
    name: 'Payments',
    component: () => import('./components/PaymentsPage.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('./components/AdminPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
