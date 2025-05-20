import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const ClubDetails = () => import('../views/ClubDetails.vue');
const Home = () => import('../views/Home.vue');
const Clubs = () => import('../views/Clubs.vue');
const Events = () => import('../views/Events.vue');
const Login = () => import('../pages/auth/Login.vue');
const Register = () => import('../pages/auth/Register.vue');
const NotFound = () => import('../pages/NotFound.vue');
const ResetPassword = () => import('../pages/auth/ResetPassword.vue');

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/clubs',
    name: 'Clubs',
    component: Clubs,
    meta: { requiresAuth: true },
  },
  {
    path: '/clubs/:id',
    name: 'ClubDetails',
    component: ClubDetails,
    meta: { requiresAuth: true },
  },
  {
    path: '/events',
    name: 'Events',
    component: Events,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { hideHeaderFooter: true },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
  },
  {
  path: '/register',
  name: 'Register',
  component: Register,
  meta: { hideHeaderFooter: true }, 
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
    meta: { hideHeaderFooter: true }, 
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('auth-token');

  if (to.meta.requiresAuth && !token) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
