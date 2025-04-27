import { createRouter, createWebHistory } from 'vue-router';

import type { RouteRecordRaw } from 'vue-router';
const ClubDetails = () => import('../views/ClubDetails.vue');
const Home = () => import('../views/Home.vue');
const Clubs = () => import('../views/Clubs.vue');
const Events = () => import('../views/Events.vue');
const Login = () => import('../pages/auth/Login.vue');

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/:pathMatch(.*)*', 
    name: 'NotFound',
    component: () => import('../pages/NotFound.vue'),
  },
  {
    path: '/clubs',
    name: 'Clubs',
    component: Clubs,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = localStorage.getItem('auth-token');
      if (isAuthenticated) {
        next();
      } else {
        next({ name: 'Login' });
      }
    },
  },
  {
    path: '/clubs/:id',
    name: 'ClubDetails',
    component: ClubDetails,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = localStorage.getItem('auth-token');
      if (isAuthenticated) {
        next();
      } else {
        next({ name: 'Login' });
      }
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/events',
    name: 'Events',
    component: Events,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = localStorage.getItem('auth-token');
      if (isAuthenticated) {
        next();
      } else {
        next({ name: 'Login' });
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
