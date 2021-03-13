import { otmsHttp, noPrefixHttp } from '@/utils/http/index';

// 新增货主
export function createCustomer(data) {
  return otmsHttp.post('/customer/create', data);
}

// 修改货主
export function updateCustomer(data) {
  return otmsHttp.post('/customer/update', data);
}

// 修改服务设置
export function updateSetting(data) {
  return otmsHttp.post('/crm-plus/customer/update/setting', data);
}

// 查询下级列表
export function getChildrenPage(data, query) {
  return otmsHttp.post('/customer/bind_children_page', data, {
    params: query,
  });
}

export function getBindListByPage(data) {
  return noPrefixHttp.post('/hope-saas-tcs-web/tcsTransportSupplier/selectBindListByPage', data);
}

// 货主列表
export function getCustomerList(data, query) {
  return otmsHttp.post('/customer/page_by_platform', data, {
    params: {
      ...query,
      sort: 'create_time__DESC',
    },
  });
}

// 货主详情
export function getCustomerDetail(data) {
  return otmsHttp.post('/customer/detail/list', data);
}
