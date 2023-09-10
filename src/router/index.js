import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/loginView.vue'
import StudentView from '../views/dashboard/studentView.vue'
import StudentDetailView from '../views/dashboard/studentDetailView.vue'
import IndexDashboardView from '../views/dashboard/indexDashboard.vue'
import DashboardView from '../views/dashboard/dashboardView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: { title: "login" },
      component: LoginView
    },
    {
      path: '',
      name: 'Login',
      redirect: '/login'
    },
    {
      path: '/dashboard',
      name: 'indexDashboard',
      component: IndexDashboardView,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          meta: { title: "dashboard" },
          component: DashboardView
        },
        {
          path: '/student',
          name: 'student',
          meta: { title: "Data Santri" },
          component: StudentView
        },
        {
          path: '/student-detail',
          name: 'studentdetail',
          meta: { title: "Detail Santri" },
          component: StudentDetailView
        },
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const isAuthenticated = localStorage.getItem("auth");

  if (isAuthenticated == null || isAuthenticated == undefined || token == null || token == undefined) {
    if (to.path !== '/login') {
      return next('/login');
    }
  }

  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});


export default router
