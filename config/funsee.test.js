import { funseeSmartMidWare } from 'funsee-smart';
import funseeSmartConfig from './funseeSmartConfig';

module.exports = {
  log: {
    silly: '/data1/admin/logs/node-campus/all.log',
    info: '/data1/admin/logs/node-campus/info.log',
    error: '/data1/admin/logs/node-campus/error.log'
  },
  customMiddleware: [{
    name: 'sso',
    sort: '1700'
  }, {
    name: 'cookie',
    sort: '1800',
    desc: 'request cookie middleware'
  }, {
    name: funseeSmartMidWare,
    param: funseeSmartConfig,
    sort: '5000',
    desc: 'funsee-smart middleware'
  }],
  customParam: {
    sso: {
      host: '##统一登录平台的host',
      login: '##统一登录平台的 login path',
      validate: '##统一登录平台的 login validate',
      logout: '##统一登录平台的 logout path',
      serviceSource: 'campus',
      callback: 'http://localhost:8080',
      excludeCheckPath: [/^\/error/, '/health', '/api/sso/logout', '/favicon.ico', '/__webpack_hmr', /\.js$/, /\.css$/, /hot-update\.json$/]
    },
    cookie: {
      cookie4user: '_sso_user',
      cookie4userNameCN: 'sso_user_name_cn',
      cookie4userName: 'sso_user_name',
      cookie4userAccount: 'sso_user_account',
      cookie4userId: 'sso_user_id',
      expireTime: 360000000
    },
    ossConfig: {
      ossConfigKey: '##nodejs-core中配置的ossConfig-config_1',
      endpoint: '##nodejs-core中配置的ossConfig-endpoint',
      accessKeyId: '##nodejs-core中配置的ossConfig-accessKeyId',
      accessKeySecret: '##nodejs-core中配置的ossConfig-accessKeySecret',
      bucketName: '##nodejs-core中配置的ossConfig-bucketName',
      filedir: '##文件想要上传到的目录'
    },
    file: {
      uploadFileUrl: 'https://*****/file/uploadFile',
      compressAndUploadFileUrl: 'https://*****/file/compressAndUploadFile'
    }
  },
  service: {
    default: 'https://**** 对应调用后端接口域名',
    sso: 'https://sso*** 对应统一登录平台域名'
  }
};

