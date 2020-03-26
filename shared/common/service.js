import { request } from 'funsee-request';

// 获取字典代码列表
export const searchDictService = data => request.post('/api/common/dictCode/findList', data);
export const searchDictPageService = data => request.post('/api/common/dictCode/findPage', data);
export const searchDictByGroupList = data => request.post('/api/common/dictCode/findByGroupList', data);

// 登录相关
export const getLoginUserInfo = data => request.post('/api/common/common/getLoginUserInfo', data);
export const getMenuGroup = data => request.post('/api/menu/menu/getMenuGroup', data);

// SSO相关
export const querySsoUserInfo = data => request.post('/api/sso/user/findList', data);
export const convertAccountWithName = data => request.post('/api/common/common/convertAccountWithName', data);
// 文件相关
export const saveFileInfo = data => request.post('/api/common/common/saveFileInfo', data);
export const saveSingleFileInfo = data => request.post('/api/common/common/saveSingleFileInfo', data);
export const queryFileInfo = data => request.post('/api/common/common/queryFileInfo', data);
export const deleteFileInfo = data => request.post('/api/common/common/deleteFileInfo', data);
