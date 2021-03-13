import { getToken } from '@/utils/auth';

// 白名单，不需要登录验证
const whiteList = ['/login'];

export default function handlePermission(to, from, next) {
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      next();
    }
  } else if (whiteList.indexOf(to.path) !== -1) {
    next();
  } else {
    next(`/login?redirect=${to.path}`);
  }
}
