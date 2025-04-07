import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MainModelView from '../views/MainModelView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/3d/:id', component: MainModelView, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
