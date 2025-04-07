import { createRouter, createWebHistory} from 'vue-router';

import type { RouteRecordRaw } from 'vue-router';
const ClubDetails = () => import('../views/ClubDetails.vue');
const Home = () => import('../views/Home.vue');
const Clubs = () => import('../views/Clubs.vue');
const Events = () => import('../views/Events.vue');
// const Login = () => import('../views/Login.vue');

// Define routes
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/clubs',
    name: 'Clubs',
    component: Clubs,
  },
  {
    path: '/clubs/:id',
    name: 'ClubDetails',
    component: ClubDetails,
  },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: Login,
  // },
  {
    path: '/events',
    name: 'Events',
    component: Events,
  //   beforeEnter: (to, from, next) => {
  //     const isAuthenticated = localStorage.getItem('auth-token');
  //     if (isAuthenticated) {
  //       next();
  //     } else {
  //       next({ name: 'Login' });
  //     }
  //   },
  //   // children: [
  //   //   {
  //   //     path: 'profile',
  //   //     name: 'DashboardProfile',
  //   //     component: () => import('../views/DashboardProfile.vue'),
  //   //   },
  //   //   {
  //   //     path: 'settings',
  //   //     name: 'DashboardSettings',
  //   //     component: () => import('../views/DashboardSettings.vue'),
  //   //   },
  //   // ],
  // },
  // {
  //   path: '/:pathMatch(.*)*', // This is the 404 route
  //   name: 'NotFound',
  //   component: () => import('../pages/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
