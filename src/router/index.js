import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ThreeDView from '../views/ThreeDView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/3d', component: ThreeDView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;