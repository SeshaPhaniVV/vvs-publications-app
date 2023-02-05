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
    component: () => import('@/views/UsersView.vue'),
  },
  {
    path: '/users/:id',
    name: 'user-view',
    props: true,
    component: () => import('@/views/UserView.vue'),
  },
];
