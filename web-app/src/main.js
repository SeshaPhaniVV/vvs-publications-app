/* eslint-disable import/order */
import { createApp } from 'vue';
import App from './App.vue';
import naive from 'naive-ui';
import Vue3Toasity from 'vue3-toastify';

import router from './router';
import store from './store';

import '@/assets/main.css';
import 'vue3-toastify/dist/index.css';

createApp(App).use(router).use(store).use(naive).use(Vue3Toasity).mount('#app');
