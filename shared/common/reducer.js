import { smartReducer } from 'funsee-smart';
import * as commonAction from './action';

export default {
  smart: smartReducer,
  common: function common(state = {
    menuInfo: [],
    menuMap: {},
    isFold: false,
    tempFileList: []
  }, action) {
    switch (action.type) {
      case commonAction.LOAD_ENV.SUCCESS:
        return {
          ...state,
          env: action.payload.env
        };
      case commonAction.LOGIN_SUCCESS:
        return {
          ...state,
          userName: action.payload.userName,
          userCName: action.payload.userCName
        };
      case commonAction.COM_SET_UI_PARAM:
        return {
          ...state,
          [action.payload.key]: action.payload.value
        };
      case commonAction.SHOW_LOADING:
        return {
          ...state,
          isFetching: true
        };
      case commonAction.HIDE_LOADING:
        return {
          ...state,
          isFetching: false
        };
      case commonAction.MENU_TOGGLE:
        return {
          ...state,
          isFold: !state.isFold
        };
      case commonAction.SHOW_MESSAGE:
        return {
          ...state,
          msg: action.payload
        };
      case commonAction.QUERY_SSO_USER_INFO_SUCCESS:
        return {
          ...state,
          ssoUserInfo: action.result
        };
      case commonAction.QUERY_USER_INFO_SUCCESS:
        return {
          ...state,
          userInfo: action.result
        };
      case commonAction.TRANS_DATA_FCTF_SUCCESS:
        return {
          ...state,
          dataFctf: action.result
        };
      case commonAction.CLEAR_DATA_FCTF_SUCCESS:
        return {
          ...state,
          dataFctf: action.result
        };
      case commonAction.PUSH_DATA_FCTF_SUCCESS:
        return {
          ...state,
          dataFctf: action.result
        };
      case commonAction.DICT_SEARCH_SUCCESS:
        return {
          ...state,
          dictResult: action.result
        };
      case commonAction.DICT_GROUP_LIST_SEARCH_SUCCESS:
        return {
          ...state,
          dictGroupListResult: action.result
        };
      case commonAction.LONGIN_USER_INFO_SUCCESS:
        return {
          ...state,
          loginUserInfo: action.payload
        };
      case commonAction.MENU_GROUP_SUCCESS:
        return {
          ...state,
          menuGroupInfo: action.payload
        };
      case commonAction.SAVE_FILE_INFO_SUCCESS:
        return {
          ...state,
          savefileResult: action.result
        };
      case commonAction.SAVE_SINGLE_FILE_INFO_SUCCESS:
        return {
          ...state,
          saveSinglefileResult: action.result
        };
      case commonAction.SAVE_TEMP_FILE_INFO_SUCCESS:
        return {
          ...state,
          tempFileList: action.result
        };
      case commonAction.QUERY_FILE_INFO_SUCCESS:
        return {
          ...state,
          fileListResult: action.result
        };
      case commonAction.DELETE_FILE_INFO_SUCCESS:
        return {
          ...state,
          delFileResult: action.result
        };
      case commonAction.SAVE_TMEP_SINGLE_FILE_INFO_SUCCESS:
        return {
          ...state,
          tempSingleFile: action.result
        };
      case commonAction.CONVERT_ACCOUNT_WITH_NAME_SUCCESS:
        return {
          ...state,
          convertAccountWithNameResult: action.result
        };
      default:
        return state;
    }
  }
};
