import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { watch } from 'vue'
import LandingPageView from '@/views/LandingPage.vue'
import TutorialPage from '@/views/TutorialPage.vue'
import LoginPage from '@/views/auth/LoginPage.vue'
import DashboardPage from '@/views/dashboard/DashboardPage.vue'
import RegisterPage from '@/views/auth/RegisterPage.vue'
import ForgotPasswordPage from '@/views/auth/ForgotPasswordPage.vue'
import ResetPasswordPage from '@/views/auth/ResetPasswordPage.vue'
import CreateBatchPage from '@/views/batch/CreateBatchView.vue'
import ProgressTracking from '@/views/dashboard/ProgressTracking.vue'
import BatchDetailView from '@/views/batch/BatchDetailView.vue'
import EditBatchView from '@/views/batch/EditBatchView.vue'
import BatchConditionUpdateView from '@/views/batch/BatchConditionUpdateView.vue'
import ProfileSettings from '@/views/dashboard/ProfileSettings.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPageView,
    },
    {
      path: '/tutorial',
      name: 'tutorial',
      component: TutorialPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: { requiresGuest: true },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
      meta: { requiresGuest: true },
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPasswordPage,
      meta: { requiresGuest: true },
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPasswordPage,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/dashboard/create-batch',
      name: 'create-batch',
      component: CreateBatchPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/dashboard/progress',
      name: 'progress-track',
      component: ProgressTracking,
      meta: { requiresAuth: true },
    },
    {
      path: '/dashboard/batch/:id',
      name: 'batch-detail',
      component: BatchDetailView,
      meta: { requiresAuth: true },
    },
    {
      path: '/dashboard/batch/:id/edit',
      name: 'batch-edit',
      component: EditBatchView,
      meta: { requiresAuth: true },
    },
    {
      path: '/dashboard/batch/:id/update-condition',
      name: 'batch-update-condition',
      component: BatchConditionUpdateView,
      meta: { requiresAuth: true },
    },
    {
      path: '/dashboard/profile',
      name: 'profile-settings',
      component: ProfileSettings,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (authStore.loading) {
    await new Promise((resolve) => {
      const unwatch = watch(
        () => authStore.loading,
        (loading) => {
          if (!loading) {
            unwatch()
            resolve()
          }
        },
      )
    })
  }

  const isAuthenticated = authStore.isAuthenticated

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
    return
  }

  if (to.meta.requiresGuest && isAuthenticated) {
    next('/dashboard')
    return
  }

  next()
})

export default router
