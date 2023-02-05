export default [
  {
    path: '',
    name: 'base',
    component: () => import('@/views/UsersView.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/UsersView.vue'),
  },
  {
    path: '/pinia',
    name: 'pinia',
    component: () => import('@/views/UsersView.vue'),
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
