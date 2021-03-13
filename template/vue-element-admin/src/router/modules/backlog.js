import MainContent from '@/layout/MainContent.vue';

export default {
  path: '/backlog',
  name: '待办',
  component: MainContent,
  children: [
    {
      path: 'list',
      name: '待办列表',
      component: () => import(/* webpackChunkName: "backlog-list" */ '@/views/backlog/backlogList/index.vue'),
    },
    {
      path: 'edit',
      name: '待办编辑',
      component: () => import(/* webpackChunkName: "backlog-edit" */ '@/views/backlog/backlogEdit/index.vue'),
    },
  ],
};
