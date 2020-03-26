// 自定义查询
export const FIND_PAGE_CUSTOM = 'FIND_PAGE_CUSTOM';
export const FIND_PAGE_CUSTOM_SUCCESS = 'FIND_PAGE_CUSTOM_SUCCESS';
export const findPageCustom = data => ({ type: FIND_PAGE_CUSTOM, payload: data });
export const findPageCustomSuccess = data => ({ type: FIND_PAGE_CUSTOM_SUCCESS, result: data });
// 页面数据处理
export const PAGE_RESULT = 'PAGE_RESULT';
export const PAGE_RESULT_SUCCESS = 'PAGE_RESULT_SUCCESS';
export const pageResult = data => ({ type: PAGE_RESULT, payload: data });
export const pageResultSuccess = data => ({ type: PAGE_RESULT_SUCCESS, result: data });
// 初始化查询条件
export const INIT_QUERY_OBJ = 'INIT_QUERY_OBJ';
export const INIT_QUERY_OBJ_SUCCESS = 'INIT_QUERY_OBJ_SUCCESS';
export const initQueryObj = data => ({ type: INIT_QUERY_OBJ, payload: data });
export const initQueryObjSuccess = data => ({ type: INIT_QUERY_OBJ_SUCCESS, result: data });
// 创建任务
export const CREATE = 'CREATE';
export const CREATE_SUCCESS = 'CREATE_SUCCESS';
export const create = data => ({ type: CREATE, payload: data });
export const createSuccess = data => ({ type: CREATE_SUCCESS, result: data });
// 更新任务
export const UPDATE_BY_PRIMARY_KEY = 'UPDATE_BY_PRIMARY_KEY';
export const UPDATE_BY_PRIMARY_KEY_SUCCESS = 'UPDATE_BY_PRIMARY_KEY_SUCCESS';
export const updateByPrimaryKey = data => ({ type: UPDATE_BY_PRIMARY_KEY, payload: data });
export const updateByPrimaryKeySuccess = data => ({ type: UPDATE_BY_PRIMARY_KEY_SUCCESS, result: data });
// 删除任务
export const DELETE_BY_PRIMARY_KEY = 'DELETE_BY_PRIMARY_KEY';
export const DELETE_BY_PRIMARY_KEY_SUCCESS = 'DELETE_BY_PRIMARY_KEY_SUCCESS';
export const deleteByPrimaryKey = data => ({ type: DELETE_BY_PRIMARY_KEY, payload: data });
export const deleteByPrimaryKeySuccess = data => ({ type: DELETE_BY_PRIMARY_KEY_SUCCESS, result: data });
// 分配任务
export const ASSIGN = 'ASSIGN';
export const ASSIGN_SUCCESS = 'ASSIGN_SUCCESS';
export const assign = data => ({ type: ASSIGN, payload: data });
export const assignSuccess = data => ({ type: ASSIGN_SUCCESS, result: data });
// 任务解决
export const RESOLVE = 'RESOLVE';
export const RESOLVE_SUCCESS = 'RESOLVE_SUCCESS';
export const resolve = data => ({ type: RESOLVE, payload: data });
export const resolveSuccess = data => ({ type: RESOLVE_SUCCESS, result: data });
// 任务关闭
export const CLOSE = 'CLOSE';
export const CLOSE_SUCCESS = 'CLOSE_SUCCESS';
export const close = data => ({ type: CLOSE, payload: data });
export const closeSuccess = data => ({ type: CLOSE_SUCCESS, result: data });
// 任务完成
export const COMPLETE = 'COMPLETE';
export const COMPLETE_SUCCESS = 'COMPLETE_SUCCESS';
export const complete = data => ({ type: COMPLETE, payload: data });
export const completeSuccess = data => ({ type: COMPLETE_SUCCESS, result: data });
// 查询主任务
export const QUERY_PARENT_TASK = 'QUERY_PARENT_TASK';
export const QUERY_PARENT_TASK_SUCCESS = 'QUERY_PARENT_TASK_SUCCESS';
export const queryParentTask = data => ({ type: QUERY_PARENT_TASK, payload: data });
export const queryParentTaskSuccess = data => ({ type: QUERY_PARENT_TASK_SUCCESS, result: data });
// 创建评论
export const CREATE_TASK_COMMENT = 'CREATE_TASK_COMMENT';
export const CREATE_TASK_COMMENT_SUCCESS = 'CREATE_TASK_COMMENT_SUCCESS';
export const createTaskComment = data => ({ type: CREATE_TASK_COMMENT, payload: data });
export const createTaskCommentSuccess = data => ({ type: CREATE_TASK_COMMENT_SUCCESS, result: data });
// 删除评论
export const DEL_TASK_COMMENT = 'DEL_TASK_COMMENT';
export const DEL_TASK_COMMENT_SUCCESS = 'DEL_TASK_COMMENT_SUCCESS';
export const delTaskComment = data => ({ type: DEL_TASK_COMMENT, payload: data });
export const delTaskCommentSuccess = data => ({ type: DEL_TASK_COMMENT_SUCCESS, result: data });
// 修改评论
export const MODIFY_TASK_COMMENT = 'MODIFY_TASK_COMMENT';
export const MODIFY_TASK_COMMENT_SUCCESS = 'MODIFY_TASK_COMMENT_SUCCESS';
export const modifyTaskComment = data => ({ type: MODIFY_TASK_COMMENT, payload: data });
export const modifyTaskCommentSuccess = data => ({ type: MODIFY_TASK_COMMENT_SUCCESS, result: data });
// 回复评论
export const REPLY_TASK_COMMENT = 'REPLY_TASK_COMMENT';
export const REPLY_TASK_COMMENT_SUCCESS = 'REPLY_TASK_COMMENT_SUCCESS';
export const replyTaskComment = data => ({ type: REPLY_TASK_COMMENT, payload: data });
export const replyTaskCommentSuccess = data => ({ type: REPLY_TASK_COMMENT_SUCCESS, result: data });
// 查询评论清单
export const QUERY_TASK_COMMENT_LIST = 'QUERY_TASK_COMMENT_LIST';
export const QUERY_TASK_COMMENT_LIST_SUCCESS = 'QUERY_TASK_COMMENT_LIST_SUCCESS';
export const queryTaskCommentList = data => ({ type: QUERY_TASK_COMMENT_LIST, payload: data });
export const queryTaskCommentListSuccess = data => ({ type: QUERY_TASK_COMMENT_LIST_SUCCESS, result: data });
// 列表数据处理
export const SET_EDIT_DATA = 'SET_EDIT_DATA';
export const setEditData = payload => ({ type: SET_EDIT_DATA, payload });
