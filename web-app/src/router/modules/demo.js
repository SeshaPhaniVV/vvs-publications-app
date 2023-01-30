export default [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/pinia',
    name: 'pinia',
    component: () => import('@/views/PiniaView.vue'),
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('@/views/UserView.vue'),
  },
];
