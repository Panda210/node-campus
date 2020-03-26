/* eslint-env browser */
/* eslint guard-for-in: "error" */
import * as localStorageUtil from './localStorageInfo';
/**
 * 按钮权限配置对应的URL参数 必须与后端保持一致
 */
const BTN_KEY = {
  // 采购汇总 界面按钮 ##############################################################################################
  // 修改  付款申请 付款确认
  BTN_PURCHASE_MOIDFY: '/button/purchaseSum/modify',
  BTN_PURCHASE_PAY_APPLY: '/button/purchaseSum/payApply',
  BTN_PURCHASE_PAY_CONFIRM: '/button/purchaseSum/payConfirm',
  // 库存管理 界面按钮 ##############################################################################################
  // 车辆到库  车辆修改信息 GPS安装  GPS查询  权证到库 权证信息查询
  BTN_STOCKMAMAGE_VEHICLE_TO_LIB: '/button/stockManage/vehicleToLib',
  BTN_STOCKMAMAGE_VEHICLE_MOIDFY_INFO: '/button/stockManage/vehicleModifyInfo',
  BTN_STOCKMAMAGE_GPS_INSTALL: '/button/stockManage/gpsInstall',
  BTN_STOCKMAMAGE_GPS_SEARCH: '/button/stockManage/gpsSearch',
  BTN_STOCKMAMAGE_WARRANTS_TO_LIB: '/button/stockManage/warrantsToLib',
  BTN_STOCKMAMAGE_WARRANTS_MOIDFY_INFO: '/button/stockManage/warrantsModifyInfo'

};

/**
 * 登录成功后用户的菜单权限，按钮权限都保存到localStorage中
 * @param {有权限的菜单} title
 * @param {有权限的按钮} authList
 */
const localAuthSave = (titles, authList, menuList, menuFirstLevelKeys) => {
  // 先清除localStorage中内容
  localStorageUtil.delDataFromLocalStorage(localStorageUtil.CONSTANT.MENU_MOUDULE_MAPPING);
  localStorageUtil.delDataFromLocalStorage(localStorageUtil.CONSTANT.MENU_TREE);
  localStorageUtil.delDataFromLocalStorage(localStorageUtil.CONSTANT.AUTH_BTN_LIST);
  localStorageUtil.delDataFromLocalStorage(localStorageUtil.CONSTANT.MENU_FIRST_LEVEL_KEYS);
  // 保存权限信息到localStorage
  localStorageUtil.saveDataToLocalStorage(localStorageUtil.CONSTANT.MENU_MOUDULE_MAPPING, menuList);
  localStorageUtil.saveDataToLocalStorage(localStorageUtil.CONSTANT.MENU_TREE, titles);
  localStorageUtil.saveDataToLocalStorage(localStorageUtil.CONSTANT.AUTH_BTN_LIST, authList);
  localStorageUtil.saveDataToLocalStorage(localStorageUtil.CONSTANT.MENU_FIRST_LEVEL_KEYS, menuFirstLevelKeys);
};

/**
 * 信息保存到localStorage中
 * @param {键值} key
 * @param {信息} value
 */
const localCommonSave = (key, value) => {
  localStorageUtil.delDataFromLocalStorage(key);
  localStorageUtil.saveDataToLocalStorage(key, value);
};

/**
 * 判断按钮是否存在权限，如果返回为true表示有权限，返回为flase则没有权限
 * 这个是不存在业务权限
 * @param {按钮路径} path
 */
const authButtonNoBizAuth = (path) => {
  let authFlag = false;
  // const authList = JSON.parse(window.localStorage.getItem(localStorageUtil.CONSTANT.AUTH_BTN_LIST));
  const authList = localStorageUtil.getDataFromLocalStorage(localStorageUtil.CONSTANT.AUTH_BTN_LIST);
  if (Array.isArray(authList)) {
    authList.some((authRecord) => {
      if (path === authRecord.url) {
        authFlag = true;
        // Array.some在return ture的时候会跳出循环
        return true;
      }
      return false;
    });
  }
  return authFlag;
};

/**
 * 存在业务逻辑的判断按钮权限
 * 判断按钮是否存在权限，如果返回为true表示有权限，返回为flase则没有权限
 * @param {按钮路径} path
 * @param {业务权限} bizAuthFlag
 */
const authButton = (path, bizAuthFlag) => {
  let authFlag = false;
  const authList = JSON.parse(window.localStorage.getItem(localStorageUtil.CONSTANT.AUTH_BTN_LIST));
  if (Array.isArray(authList)) {
    authList.some((authRecord) => {
      if (path === authRecord.url) {
        authFlag = true;
        authFlag = authFlag && bizAuthFlag;
        // Array.some在return ture的时候会跳出循环
        return true;
      }
      return false;
    });
  }
  return authFlag;
};

/**
 * 获取登录用户有权限的所有一级菜单清单
 */
const genAuthMenuFirstLevelKeys = () => {
  const menuFirstLevelKeys = localStorageUtil.getDataFromLocalStorage(localStorageUtil.CONSTANT.MENU_FIRST_LEVEL_KEYS);
  return menuFirstLevelKeys;
};

export default {
  BTN_KEY,
  localAuthSave,
  localCommonSave,
  authButtonNoBizAuth,
  authButton,
  genAuthMenuFirstLevelKeys
};
