import createRequestTypes from '../utils/actionCreator';

export const LOAD_ENV = createRequestTypes('LOAD_ENV');

export const loadEnv = () => ({ type: LOAD_ENV.REQUEST });
export const loadEnvSuccess = env => ({ type: LOAD_ENV.SUCCESS, payload: { env } });
// 菜单展开/收缩状态
export const MENU_TOGGLE = 'MENU_TOGGLE';
export const menuToggle = () => ({ type: MENU_TOGGLE });

// sso公用信息
export const QUERY_SSO_USER_INFO = 'QUERY_SSO_USER_INFO';
export const QUERY_SSO_USER_INFO_SUCCESS = 'QUERY_SSO_USER_INFO_SUCCESS';
export const querySsoUserInfo = data => ({ type: QUERY_SSO_USER_INFO, payload: data });
export const querySsoUserInfoSuccess = data => ({ type: QUERY_SSO_USER_INFO_SUCCESS, result: data });

export const QUERY_USER_INFO = 'QUERY_USER_INFO';
export const QUERY_USER_INFO_SUCCESS = 'QUERY_USER_INFO_SUCCESS';
export const queryUserInfo = data => ({ type: QUERY_USER_INFO, payload: data });
export const queryUserInfoSuccess = data => ({ type: QUERY_USER_INFO_SUCCESS, result: data });

// 子组件与父组件传递信息
export const TRANS_DATA_FCTF = 'TRANS_DATA_FCTF';
export const TRANS_DATA_FCTF_SUCCESS = 'TRANS_DATA_FCTF_SUCCESS';
export const transDataFctf = data => ({ type: TRANS_DATA_FCTF, payload: data });
export const transDataFctfSuccess = data => ({ type: TRANS_DATA_FCTF_SUCCESS, result: data });

export const CLEAR_DATA_FCTF = 'CLEAR_DATA_FCTF';
export const CLEAR_DATA_FCTF_SUCCESS = 'CLEAR_DATA_FCTF_SUCCESS';
export const clearDataFctf = () => ({ type: CLEAR_DATA_FCTF });
export const clearDataFctfSuccess = data => ({ type: CLEAR_DATA_FCTF_SUCCESS, result: data });

export const PUSH_DATA_FCTF = 'PUSH_DATA_FCTF';
export const PUSH_DATA_FCTF_SUCCESS = 'PUSH_DATA_FCTF_SUCCESS';
export const pushDataFctf = () => ({ type: PUSH_DATA_FCTF });
export const pushDataFctfSuccess = data => ({ type: PUSH_DATA_FCTF_SUCCESS, result: data });


// 获取字典代码表数据
export const DICT_SEARCH = 'DICT_SEARCH';
export const DICT_SEARCH_SUCCESS = 'DICT_SEARCH_SUCCESS';
export const searchDict = data => ({ type: DICT_SEARCH, payload: data });
export const searchDictSuccess = data => ({ type: DICT_SEARCH_SUCCESS, result: data });

export const DICT_GROUP_LIST_SEARCH = 'DICT_GROUP_LIST_SEARCH';
export const DICT_GROUP_LIST_SEARCH_SUCCESS = 'DICT_GROUP_LIST_SEARCH_SUCCESS';
export const searchDictByGroupList = data => ({ type: DICT_GROUP_LIST_SEARCH, payload: data });
export const searchDictByGroupListSuccess = data => ({ type: DICT_GROUP_LIST_SEARCH_SUCCESS, result: data });

// 登录
export const LONGIN_USER_INFO = 'LONGIN_USER_INFO';
export const LONGIN_USER_INFO_SUCCESS = 'LONGIN_USER_INFO_SUCCESS';
export const MENU_GROUP = 'MENU_GROUP';
export const MENU_GROUP_SUCCESS = 'MENU_GROUP_SUCCESS';

export const loginUserInfo = data => ({ type: LONGIN_USER_INFO, payload: data });
export const loginUserInfoSuccess = data => ({ type: LONGIN_USER_INFO_SUCCESS, payload: data });
export const menuGroup = data => ({ type: MENU_GROUP, payload: data });
export const menuGroupSuccess = data => ({ type: MENU_GROUP_SUCCESS, payload: data });

// 附件相关
// 附件列表中信息
export const SAVE_TEMP_FILE_INFO = 'SAVE_TEMP_FILE_INFO';
export const SAVE_TEMP_FILE_INFO_SUCCESS = 'SAVE_TEMP_FILE_INFO_SUCCESS';
export const saveTempFileInfo = data => ({ type: SAVE_TEMP_FILE_INFO, payload: data });
export const saveTempFileInfoSuccess = data => ({ type: SAVE_TEMP_FILE_INFO_SUCCESS, result: data });
// 保存多个附件
export const SAVE_FILE_INFO = 'SAVE_FILE_INFO';
export const SAVE_FILE_INFO_SUCCESS = 'SAVE_FILE_INFO_SUCCESS';
export const saveFileInfo = data => ({ type: SAVE_FILE_INFO, payload: data });
export const saveFileInfoSuccess = data => ({ type: SAVE_FILE_INFO_SUCCESS, result: data });
// 单个附件 - 上传之前内容信息
export const SAVE_TMEP_SINGLE_FILE_INFO = 'SAVE_TMEP_SINGLE_FILE_INFO';
export const SAVE_TMEP_SINGLE_FILE_INFO_SUCCESS = 'SAVE_TMEP_SINGLE_FILE_INFO_SUCCESS';
export const saveTempSingleFileInfo = data => ({ type: SAVE_TMEP_SINGLE_FILE_INFO, payload: data });
export const saveTempSingleFileInfoSuccess = data => ({ type: SAVE_TMEP_SINGLE_FILE_INFO_SUCCESS, result: data });
// 保存单个附件
export const SAVE_SINGLE_FILE_INFO = 'SAVE_SINGLE_FILE_INFO';
export const SAVE_SINGLE_FILE_INFO_SUCCESS = 'SAVE_SINGLE_FILE_INFO_SUCCESS';
export const saveSingleFileInfo = data => ({ type: SAVE_SINGLE_FILE_INFO, payload: data });
export const saveSingleFileInfoSuccess = data => ({ type: SAVE_SINGLE_FILE_INFO_SUCCESS, result: data });
// 查询附件信息
export const QUERY_FILE_INFO = 'QUERY_FILE_INFO';
export const QUERY_FILE_INFO_SUCCESS = 'QUERY_FILE_INFO_SUCCESS';
export const queryFileInfo = data => ({ type: QUERY_FILE_INFO, payload: data });
export const queryFileInfoSuccess = data => ({ type: QUERY_FILE_INFO_SUCCESS, result: data });
// 删除附件信息
export const DELETE_FILE_INFO = 'DELETE_FILE_INFO';
export const DELETE_FILE_INFO_SUCCESS = 'DELETE_FILE_INFO_SUCCESS';
export const deleteFileInfo = data => ({ type: DELETE_FILE_INFO, payload: data });
export const deleteFileInfoSuccess = data => ({ type: DELETE_FILE_INFO_SUCCESS, result: data });

// 对于返回信息中的账号添加对应的名称
export const CONVERT_ACCOUNT_WITH_NAME = 'CONVERT_ACCOUNT_WITH_NAME';
export const CONVERT_ACCOUNT_WITH_NAME_SUCCESS = 'CONVERT_ACCOUNT_WITH_NAME_SUCCESS';
export const convertAccountWithName = data => ({ type: CONVERT_ACCOUNT_WITH_NAME, payload: data });
export const convertAccountWithNameSuccess = data => ({ type: CONVERT_ACCOUNT_WITH_NAME_SUCCESS, result: data });
