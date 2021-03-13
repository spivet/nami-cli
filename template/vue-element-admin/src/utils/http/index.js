import creatHttp from './creatHttp';
import env from '../../../env/index';

const otmsHttp = creatHttp(env.OTMS_WEB_PLUS_SERVER);
const bfsSsoHttp = creatHttp(env.BFS_SSO_SERVER);
const bfsUserWebHttp = creatHttp(env.BFS_USER_WEB_SERVER);
const sfHttp = creatHttp(env.SF_SERVER);
const bigDataHttp = creatHttp(env.BIG_DATA_SERVER);
// 老服务使用此 Http 服务
const noPrefixHttp = creatHttp('/');
const scHttp = creatHttp(env.SC_SERVER);
const omsTemplateServer = creatHttp(env.OMS_TEMPLATE_SERVER);

export {
  otmsHttp,
  bfsSsoHttp,
  bfsUserWebHttp,
  noPrefixHttp,
  scHttp,
  sfHttp,
  bigDataHttp,
  omsTemplateServer,
};
