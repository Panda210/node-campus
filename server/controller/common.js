import { decrypt } from '../../shared/utils/aes128cbc';
import * as commonTool from '../../shared/utils/tool';

/**
 * 公用组装并发起请求
 * @param {} ctx
 * @param {*} next
 */
const request = async (ctx, next) => {
  console.log('controller request start');
  try {
    const { requestOptions } = ctx;
    const { path, options } = requestOptions;
    options.header = options.header || {};
    options.header.cookie = ctx.request.headers.cookie;
    console.log('ctx.request.headers.cookie', ctx.request.headers.cookie);
    const data = await ctx.ajax.request(path, options);
    ctx.body = data;
    ctx.status = 200;
    console.log('controller request end');
    console.log('request ctx.status = ', ctx.status);
    return next();
  } catch (e) {
    ctx.body = e;
    ctx.status = 500;
  }
};

/**
 * 查询字典代码清单
 */
const searchDict = async (ctx, next) => {
  ctx.requestOptions = {
    path: '/dictCode/findList',
    options: {
      method: 'POST',
      body: ctx.request.body
    }
  };
  return next();
};

/**
 * 查询字典代码清单 - 分页
 */
const searchDictPage = async (ctx, next) => {
  ctx.requestOptions = {
    path: '/dictCode/findPage',
    options: {
      method: 'POST',
      body: ctx.request.body
    }
  };
  return next();
};

/**
 * 查询字典代码Map详情 - 条件是分组代码列表
 */
const searchDictByGroupList = async (ctx, next) => {
  ctx.requestOptions = {
    path: '/dictCode/findByGroupList',
    options: {
      method: 'POST',
      body: ctx.request.body
    }
  };
  return next();
};

// 获取登录用户信息
const getLoginUserInfo = async (ctx, next) => {
  try {
    const { cookies } = ctx;
    const { cookie } = ctx.fsConfig;
    const decryptUserInfo = JSON.parse(decrypt(cookies.get(cookie.cookie4user)));
    console.log('getLoginUserInfo 解密用户信息：', decryptUserInfo);
    const data = {
      userId: decryptUserInfo.userId,
      userName: decryptUserInfo.name,
      userAccount: decryptUserInfo.account
    };
    console.log('getLoginUserInfo data', data);
    ctx.body = data;
    ctx.status = 200;
    return next();
  } catch (e) {
    ctx.body = e;
    ctx.status = 500;
  }
};

/**
 * 查询附件信息
 */
const queryFileInfo = async (ctx, next) => {
  console.log('controller queryFileInfo start');
  ctx.requestOptions = {
    path: '/file/findList',
    options: {
      method: 'POST',
      body: ctx.request.body
    }
  };
  console.log('controller queryFileInfo end');
  console.log('queryFileInfo ctx.status = ', ctx.status);
  return next();
};

/**
 * 后端查询文件信息的重新梳理成前端需要的附件信息
 */
const buildFileInfo = async (ctx, next) => {
  try {
    const data = ctx.body;
    console.log('buildFileInfo original data:', data);
    if (!data.success) {
      return next();
    }
    // 通用的直接上传文件或者压缩文件的方法
    const fileList = [];
    if (Array.isArray(data.value)) {
      data.value.map((record) => {
        const fileInfo = {
          uid: record.id,
          name: record.fileName,
          status: 'done',
          url: record.filePath
        };
        fileList.push(fileInfo);
        return fileList;
      });
    }
    const fileInfo = {
      fileList,
      fileConfig: ctx.fsConfig.file,
      ossConfig: ctx.fsConfig.ossConfig
    };
    console.log('buildFileInfo fileInfo:', fileInfo);
    data.value = fileInfo;
    console.log('buildFileInfo data:', data);
    ctx.body = data;
    ctx.status = 200;
    console.log('buildFileInfo ctx.status = ', ctx.status);
    return next();
  } catch (e) {
    ctx.body = e;
    ctx.status = 500;
  }
};

/**
 * 查询附件信息 - 多个文件
 */
const saveFileInfo = async (ctx, next) => {
  ctx.requestOptions = {
    path: '/file/saveFileInfo',
    options: {
      method: 'POST',
      body: ctx.request.body
    }
  };
  return next();
};

/**
 * 查询附件信息 - 单个文件
 */
const saveSingleFileInfo = async (ctx, next) => {
  ctx.requestOptions = {
    path: '/file/saveSingleFileInfo',
    options: {
      method: 'POST',
      body: ctx.request.body
    }
  };
  return next();
};

/**
 * 删除附件信息 - 单个文件
 */
const deleteFileInfo = async (ctx, next) => {
  ctx.requestOptions = {
    path: '/file/deleteByPrimaryKey',
    options: {
      method: 'POST',
      body: ctx.request.body
    }
  };
  return next();
};

/**
 * 假文件处理 - 不做任何处理
 */
const tempUploadFile = async (ctx, next) => {
  ctx.status = 200;
  return next();
};

/**
 * 参数根据账号添加对应的姓名
 * 参数：{
 * oldResult:{},
 * convertColumns: [oldColumn,newColumn],
 * ssoUserInfo:[]
 * }
 * 返回的数据是oldData转化之后的结果
 */
const convertAccountWithName = async (ctx, next) => {
  try {
    const data = ctx.request.body;
    const { oldResult, convertColumns, ssoUserInfo } = data;
    const newData = oldResult;
    const arrayData = newData.value;
    console.log('###arrayData', arrayData);
    if (Array.isArray(arrayData)) {
      arrayData.map((record) => {
        // 每组数据，将需要替换
        if (Array.isArray(convertColumns)) {
          convertColumns.map((columnRecord) => {
            console.log('************* convertColumns', columnRecord);
            console.log('**** columnRecord.newColumn', columnRecord.newColum);
            console.log('**** columnRecord.oldColumn', columnRecord.oldColumn);
            record[columnRecord.newColumn] = commonTool.getNameByCode(record[columnRecord.oldColumn], ssoUserInfo, 'account', 'name');
            return convertColumns;
          });
        }
        return arrayData;
      });
    }
    ctx.body = newData;
    ctx.status = 200;
    return next();
  } catch (error) {
    console.log('### convertAccountWithName error', error);
    ctx.status = 500;
    return next();
  }
};

module.exports = {
  request,
  searchDict,
  searchDictPage,
  searchDictByGroupList,
  getLoginUserInfo,
  queryFileInfo,
  buildFileInfo,
  saveFileInfo,
  saveSingleFileInfo,
  deleteFileInfo,
  tempUploadFile,
  convertAccountWithName
};
