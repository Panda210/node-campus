/* eslint-env browser */

/**
 * 定义所有的local storage的常量
 */
const CONSTANT = {
  // 登录用户的菜单tree
  MENU_TREE: 'MENU_TREE',
  // 登录用户按钮权限信息
  AUTH_BTN_LIST: 'AUTH_BTN_LIST',
  // 所有省市区信息
  ALL_DISTRICT_INFO: 'ALL_DISTRICT_INFO',
  // 所有SSO用户信息
  SSO_USER_INFO: 'SSO_USER_INFO'
};

/**
 * 删除所有本地缓存
 */
const delAllDataFromLocalStorage = () => {
  window.localStorage.clear();
};

/**
 * 从本地缓存删除 key对应的数据信息
 * @param {} key
 */
const delDataFromLocalStorage = (key) => {
  window.localStorage.removeItem(key);
};

/**
 * 缓存数据的方法
 * @param {本地缓存Key}} key
 * @param {本地缓存value} value
 */
const saveDataToLocalStorage = (key, value) => {
  // 先清除localStorage中key对应的内容
  delDataFromLocalStorage(key);
  // 保存权限信息到localStorage
  window.localStorage.setItem(key, JSON.stringify(value));
};

/**
 * 从本地缓存中获取数据
 * @param {缓存key} key
 */
const getDataFromLocalStorage = (key) => {
  const value = window.localStorage.getItem(key);
  return JSON.parse(value);
};

const viewAllDataFromLocalStorage = () => {
  for (let i = 0; i < localStorage.length;) {
    console.log(`localStorage里存储的第${i}条数据的名字为：${localStorage.key(i)},值为：${localStorage.getItem(localStorage.key(i))}`);
    i += 1;
  }
};

export default {
  CONSTANT,
  delDataFromLocalStorage,
  delAllDataFromLocalStorage,
  saveDataToLocalStorage,
  getDataFromLocalStorage,
  viewAllDataFromLocalStorage
};

