import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './route';
import handlePermission from './permission';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  handlePermission(to, from, next);
});

export default router;
