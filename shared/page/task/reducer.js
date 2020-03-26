import * as actions from './action';

export default function (state = { }, action) {
  switch (action.type) {
    case actions.FIND_PAGE_CUSTOM_SUCCESS:
      return {
        ...state,
        mode: 'view',
        result: action.result,
        moduleData: action.result.value
      };
    case actions.INIT_QUERY_OBJ_SUCCESS:
      return {
        ...state,
        initQueryObjResult: action.result
      };
    case actions.CREATE_SUCCESS:
      return {
        ...state,
        mode: 'add',
        result: action.result
      };
    case actions.UPDATE_BY_PRIMARY_KEY_SUCCESS:
      return {
        ...state,
        mode: 'update',
        updateTaskResult: action.result
      };
    case actions.DELETE_BY_PRIMARY_KEY_SUCCESS:
      return {
        ...state,
        result: action.result
      };
    case actions.ASSIGN_SUCCESS:
      return {
        ...state,
        assignResult: action.result
      };
    case actions.RESOLVE_SUCCESS:
      return {
        ...state,
        resolveResult: action.result
      };
    case actions.CLOSE_SUCCESS:
      return {
        ...state,
        closeResult: action.result
      };
    case actions.COMPLETE_SUCCESS:
      return {
        ...state,
        completeResult: action.result
      };
    case actions.QUERY_PARENT_TASK_SUCCESS:
      return {
        ...state,
        parentTaskList: action.result
      };
    case actions.CREATE_TASK_COMMENT_SUCCESS:
      return {
        ...state,
        createTaskCommentResult: action.result
      };
    case actions.REPLY_TASK_COMMENT_SUCCESS:
      return {
        ...state,
        replyTaskCommentResult: action.result
      };
    case actions.QUERY_TASK_COMMENT_LIST_SUCCESS:
      return {
        ...state,
        queryTaskCommentListResult: action.result
      };
    case actions.DEL_TASK_COMMENT_SUCCESS:
      return {
        ...state,
        delTaskCommentResult: action.result
      };
    case actions.MODIFY_TASK_COMMENT_SUCCESS:
      return {
        ...state,
        modifyTaskCommentResult: action.result
      };
    case actions.SET_EDIT_DATA:
      return {
        ...state,
        editData: action.payload
      };
    default:
      return state;
  }
}
