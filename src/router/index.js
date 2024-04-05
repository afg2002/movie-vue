import Vue from 'vue'
import store from '@/store';
import VueRouter from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import MoviesView from '@/components/Movies/MoviesView.vue'
import MoviesDetailView from '@/views/MoviesDetailView.vue'
import Profile from '@/components/ProfileComponent.vue'
import BookingHistoryView from '@/components/BookingHistory/BookingHistoryView.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: LoginView,
    meta : {layout : false, requiresAuth : false}
    
  },
  {
    path: '/movies',
    name: 'Movies',
    component: MoviesView,
    meta: { requiresAuth: true }
  },
  {
    path : '/movies/:id',
    name : 'MoviesDetail',
    component : MoviesDetailView,
    meta: { requiresAuth: true }
  },
  {
    path : '/profile',
    name : 'profile',
    component : Profile,
    meta: { requiresAuth: true }
  },
  {
    path : '/history',
    name : 'history',
    component : BookingHistoryView,
    meta: { requiresAuth: true }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return new Promise((resolve) => {
      resolve({ left: 0, top: 0 })
    })
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});


export default router
