import { bfsSsoHttp } from '@/utils/http';

export function login() {
  // return bfsSsoHttp({
  //   url: '/order/customer/page',
  //   method: 'post',
  //   data,
  // });
  return {
    token: 'access token',
    user: {
      name: '运荔枝',
      avatar: 'http://www.yunlizhi.cn/static/image/logo-fixed.png',
    },
  };
}

export function logout() {
  return bfsSsoHttp({
    url: '/vue-admin-template/user/logout',
    method: 'post',
  });
}
