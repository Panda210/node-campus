import { takeLatest } from 'redux-saga';
import { call, put, all, fork } from 'redux-saga/effects';
import { smartSaga, smartAction } from 'funsee-smart';
import { showError, showSuccess } from '../utils/notification';
import * as commonAction from './action';
import * as commonService from './service';
import * as authUtil from '../utils/auth';
import * as localStorageUtil from '../utils/localStorageInfo';


// 当前环境
function* loadEnv() {
  try {
    // const env = yield call(commonService.loadEnv);
    yield put(commonAction.loadEnvSuccess('dev'));
  } catch (err) {
    // yield call(showError, err);
    console.log(err);
  }
}

function* smartResHandler(action = { payload: {} }) {
  const {
    payload: {
      success, mode, errorMsg, message
    }
  } = action;

  if (success) {
    if (mode !== 'select') yield showSuccess(errorMsg || message);
  } else {
    yield showError(errorMsg || message);
  }
}

/**
 * 子组件的数据传递给父组件
 */
function* transDataFctf(action) {
  try {
    yield put(commonAction.transDataFctfSuccess(action.payload));
  } catch (err) {
    console.log(err);
  }
}

/**
 * 清空子组件中的数据信息
 */
function* clearDataFctf() {
  try {
    yield put(commonAction.transDataFctfSuccess(''));
  } catch (err) {
    console.log(err);
  }
}

/**
 * 子组件传递给父组件 --  增加数据 push，而不是直接替换
 *
 * 参数格式为：
 * {
 *  dataFctf,
 *  column,
 *  value
 * }
 */
function* pushDataFctf(action) {
  try {
    const { dataFctf, column, value } = action.payload;
    dataFctf[column] = value;
    yield put(commonAction.transDataFctfSuccess(dataFctf));
  } catch (err) {
    console.log(err);
  }
}

/**
 * 查询字典列表数据信息
 * @param {action.payload} actions
 */
function* searchDictService(actions) {
  try {
    const data = yield call(commonService.searchDictService, actions.payload);
    yield put(commonAction.searchDictSuccess(data));
  } catch (error) {
    console.log(error);
  }
}

/**
 * 查询字典列表数据信息 - 查询条件List<String>- groupList
 * @param {action.payload} actions
 */
function* searchDictByGroupList(actions) {
  try {
    const data = yield call(commonService.searchDictByGroupList, actions.payload);
    yield put(commonAction.searchDictByGroupListSuccess(data));
  } catch (error) {
    console.log(error);
  }
}

/**
 * 获取登录用户的信息
 */
function* getLoginUserInfo() {
  try {
    const data = yield call(commonService.getLoginUserInfo);
    yield put(commonAction.loginUserInfoSuccess(data));
  } catch (error) {
    console.log(error);
  }
}

/**
 * 获取用户的菜单信息
 * @param {*} action
 */
function* getMenuGroup(action) {
  try {
    const data = yield call(commonService.getMenuGroup, action.payload);
    yield put(commonAction.menuGroupSuccess(data));
    // 将信息保存到localStorage
    if (data.success) {
      const { value } = data;
      if (value) {
        const { titles, userPermissionList, menuList } = value;
        const menuFirstLevelKeys = [];
        if (Array.isArray(menuList)) {
          menuList.map((record) => {
            if (record.levels === 1) {
              menuFirstLevelKeys.push(String(record.id));
            }
            return menuList;
          });
        }
        authUtil.localAuthSave(titles, userPermissionList, menuList, menuFirstLevelKeys);
      }
    } else {
      authUtil.localAuthSave([], [], [], []);
    }
    console.log(data, 'saga');
  } catch (err) {
    console.log(err);
  }
}

/**
 * 获取所有用户信息
 * @param {*} action
 */
function* querySsoUserInfo(action) {
  try {
    let ssoUserInfo = localStorageUtil.getDataFromLocalStorage(localStorageUtil.CONSTANT.SSO_USER_INFO);
    console.log('querySsoUserInfo localStorage:', ssoUserInfo);
    // 判断缓存中是否存在
    if (!ssoUserInfo) {
      console.log('querySsoUserInfo send request');
      const data = yield call(commonService.querySsoUserInfo, action.payload);
      ssoUserInfo = data.value;
    }
    console.log('querySsoUserInfo final ssoUserInfo:', ssoUserInfo);
    // 将SSO用户信息保存到localStorage
    if (ssoUserInfo) {
      authUtil.localCommonSave(localStorageUtil.CONSTANT.SSO_USER_INFO, ssoUserInfo);
      yield put(commonAction.querySsoUserInfoSuccess(ssoUserInfo));
    }
    console.log(ssoUserInfo, 'saga');
  } catch (err) {
    console.log(err);
  }
}

/**
 * 根据条件查询用户信息
 * @param {*} action
 */
function* queryUserInfo(action) {
  try {
    // 缓存key组装
    const queryUserInfoParam = action.payload;
    let userInfoKey = 'USER_INFO';
    let userInfoKeyParam = '';
    if (queryUserInfoParam) {
      Object.keys(queryUserInfoParam).map((key) => {
        console.log(queryUserInfoParam[key]);
        userInfoKey = `${userInfoKey}_${queryUserInfoParam[key]}`;
        userInfoKeyParam = `${userInfoKeyParam}_${queryUserInfoParam[key]}`;
        return queryUserInfoParam;
      });
    }

    let userInfo;
    if (userInfoKeyParam) {
      userInfo = localStorageUtil.getDataFromLocalStorage(userInfoKey);
      console.log('queryUserInfo localStorage:', userInfo);
    }
    // 判断缓存中是否存在
    if (!userInfo) {
      console.log('queryUserInfo send request');
      const data = yield call(commonService.querySsoUserInfo, queryUserInfoParam);
      userInfo = data.value;
    }
    console.log('queryUserInfo final ssoUserInfo:', userInfo);
    // 将SSO用户信息保存到localStorage
    if (userInfo) {
      authUtil.localCommonSave(userInfoKey, userInfo);
      yield put(commonAction.queryUserInfoSuccess(userInfo));
    }
    console.log(userInfo, 'saga');
  } catch (err) {
    console.log(err);
  }
}

/**
 * 保存文件信息 - 多个文件
 * @param {*} action
 */
function* saveFileInfo(action) {
  try {
    const data = yield call(commonService.saveFileInfo, action.payload);
    yield put(commonAction.saveFileInfoSuccess(data));
  } catch (err) {
    console.log(err);
  }
}

/**
 * 保存文件信息 - 单个文件
 * @param {*} action
 */
function* saveSingleFileInfo(action) {
  try {
    const data = yield call(commonService.saveSingleFileInfo, action.payload);
    yield put(commonAction.saveSingleFileInfoSuccess(data));
  } catch (err) {
    console.log(err);
  }
}

/**
 * 文件的临时信息 - 附件列表
 * @param {*} action
 */
function* saveTempFileInfo(action) {
  try {
    yield put(commonAction.saveTempFileInfoSuccess(action.payload));
  } catch (err) {
    console.log(err);
  }
}

/**
 * 文件的临时信息 - 单个附件
 * @param {*} action
 */
function* saveTempSingleFileInfo(action) {
  try {
    yield put(commonAction.saveTempSingleFileInfoSuccess(action.payload));
  } catch (err) {
    console.log(err);
  }
}

/**
* 查询文件信息
* @param {*} action
*/
function* queryFileInfo(action) {
  try {
    console.log('saga queryFileInfo params:', action.payload);
    const data = yield call(commonService.queryFileInfo, action.payload);
    data.value.searchParam = action.payload;
    yield put(commonAction.queryFileInfoSuccess(data));
    console.log('saga queryFileInfo:', data);
    // 查询的附件放到tempFileInfo - 保证上传了附件再次进入页面可以查看到附件信息
    if (data.success) {
      console.log('saga setTmepFileInfo:', data.value.fileList);
      yield put(commonAction.saveTempFileInfoSuccess(data.value.fileList));
    }
  } catch (err) {
    console.log(err);
  }
}

/**
 * 删除文件信息
 * @param {*} action
 */
function* deleteFileInfo(action) {
  try {
    const data = yield call(commonService.deleteFileInfo, action.payload);
    yield put(commonAction.deleteFileInfoSuccess(data));
  } catch (err) {
    console.log(err);
  }
}

/**
 * 账号转姓名处理
 * 参数格式为：{oldData: result格式, convertColumns:[oldColumn,newColumn] -- 支持数据格式, ssoUserInfo}
 * @param {*} action
 */
function* convertAccountWithName(action) {
  try {
    const data = yield call(commonService.convertAccountWithName, action.payload);
    yield put(commonAction.convertAccountWithNameSuccess(data));
  } catch (err) {
    console.log(err);
  }
}

export default function* () {
  yield all([
    fork(smartSaga),
    takeLatest(commonAction.LOAD_ENV.REQUEST, loadEnv),
    takeLatest(smartAction.SMART_RES_MESSAGE, smartResHandler),
    takeLatest(commonAction.TRANS_DATA_FCTF, transDataFctf),
    takeLatest(commonAction.CLEAR_DATA_FCTF, clearDataFctf),
    takeLatest(commonAction.PUSH_DATA_FCTF, pushDataFctf),
    takeLatest(commonAction.DICT_SEARCH, searchDictService),
    takeLatest(commonAction.DICT_GROUP_LIST_SEARCH, searchDictByGroupList),
    takeLatest(commonAction.LONGIN_USER_INFO, getLoginUserInfo),
    takeLatest(commonAction.MENU_GROUP, getMenuGroup),
    takeLatest(commonAction.QUERY_SSO_USER_INFO, querySsoUserInfo),
    takeLatest(commonAction.QUERY_USER_INFO, queryUserInfo),
    takeLatest(commonAction.SAVE_FILE_INFO, saveFileInfo),
    takeLatest(commonAction.SAVE_SINGLE_FILE_INFO, saveSingleFileInfo),
    takeLatest(commonAction.SAVE_TEMP_FILE_INFO, saveTempFileInfo),
    takeLatest(commonAction.QUERY_FILE_INFO, queryFileInfo),
    takeLatest(commonAction.DELETE_FILE_INFO, deleteFileInfo),
    takeLatest(commonAction.SAVE_TMEP_SINGLE_FILE_INFO, saveTempSingleFileInfo),
    takeLatest(commonAction.CONVERT_ACCOUNT_WITH_NAME, convertAccountWithName)
  ]);
}
