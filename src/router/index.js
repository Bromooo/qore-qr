import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store";
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/scan',
    name: 'scan',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Scan.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/Login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/Register')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // console.log(to);
    // return;
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    // console.log(router);
    if (!store.getters.isLoggedIn) {
      var path = to.path
      if (path.charAt(0) === "/") {
        path = path.substring(1);
      } else {
        path = ''
      }

      if (path) {
        localStorage.setItem('re', path)
      }
      next("/login");
    } else {
      next();
    }
  } else {
    if (to.path === "/login" && store.getters.isLoggedIn) {
      next('/'); // make sure to always call next()!
    } else {
      next(); // make sure to always call next()!
    }
  }
});

export default router
