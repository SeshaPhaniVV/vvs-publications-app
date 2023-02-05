/* eslint-disable import/order */
import { createApp } from 'vue';
import App from './App.vue';
import naive from 'naive-ui';

import router from './router';
import store from './store';

import '@/assets/main.css';
// import '@/style/index.less';

createApp(App).use(router).use(store).use(naive).mount('#app');
