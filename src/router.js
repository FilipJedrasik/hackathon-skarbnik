import Vue from 'vue'
import Router from 'vue-router'
import LoginView from './views/LoginView.vue'
import store from './store'

import {
  ifNotAuthenticated,
  ifAuthenticated,
  ifAuthenticatedCustom,
  isAdmin,
  isSupervisor,
  isParent
} from './router/guards'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/change-password',
      name: 'change-password',
      component: () => import('./views/ChangePasswordView.vue'),
      beforeEnter: ifAuthenticatedCustom
    },
    {
      path: '/logout',
      beforeEnter: (to, from, next) => {
        store.dispatch('auth/logout')
        next('/');
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('./views/AdminView.vue'),
      beforeEnter: isAdmin,
      children: [
        {
          path: 'teachers',
          name: 'admin-teachers',
          component: () => import('./views/admin/TeachersAdminView.vue')
        },
        {
          path: 'parents',
          name: 'admin-parents',
          component: () => import('./views/admin/ParentsAdminView.vue')
        },
        {
          path: 'classes',
          name: 'admin-classes',
          component: () => import('./views/admin/ClassesAdminView.vue')
        },
        {
          path: '*',
          name: 'admin-welcome',
          component: () => import('./views/admin/WelcomeAdminView.vue')
        }
      ]
    },
    {
      path: '/supervisor',
      name: 'supervisor',
      component: () => import('./views/supervisor/WelcomeSupervisorView.vue'),
      beforeEnter: isSupervisor,
      children: [
        {
          path: 'payments',
          name: 'supervisor-payments',
          component: () => import('./views/supervisor/PaymentsSupervisorView.vue')
        }
      ]
    },
    {
      path: '/parent',
      name: 'parent',
      component: () => import('./views/parent/WelcomeParentView.vue'),
      beforeEnter: isParent,
      children: [
        {
          path: 'payments',
          name: 'parent-payments',
          component: () => import('./views/parent/PaymentsParentView.vue')
        }
      ]
    }
  ]
})

export default router;