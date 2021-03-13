import AppLayoutTB from '@/layout/AppLayoutTB.vue';

// 批量导入路由
let importRoutes = [];
const ctx = require.context('./modules', true, /.*\.js$/);
ctx.keys().forEach((key) => {
  importRoutes = importRoutes.concat(ctx(key).default);
});

const routes = [
  {
    path: '/',
    name: '首页',
    component: AppLayoutTB,
    redirect: '/backlog/list',
    children: importRoutes,
  },
  {
    path: '/login',
    name: '登录',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue'),
    meta: {
      icon: 'el-icon-s-order',
      hideMenu: true,
    },
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/exception/404.vue'),
  },
];

export default routes;
