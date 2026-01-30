import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/dashboard', component: Dashboard }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Simple auth guard using token in localStorage
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if ((to.path === '/dashboard' || to.meta.requiresAuth) && !token) {
    return next('/login')
  }
  if ((to.path === '/login' || to.path === '/register') && token) {
    return next('/dashboard')
  }
  next()
})

export default router
