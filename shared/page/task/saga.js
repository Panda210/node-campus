import { takeLatest } from 'redux-saga';
import { call, put, all, select } from 'redux-saga/effects';
import * as smartAction from 'funsee-smart/dist/redux/action';
import { moduleNameSelector, queryObjSelector } from 'funsee-smart/dist/util/selectors';
import { showError } from 'funsee-smart';
import * as actions from './action';
import * as services from './service';
import * as commonService from '../../common/service';

// 分页查询
function* findPageCustom(action) {
  try {
    // 调用smartQuery
    const data = yield put(smartAction.smartQuery(action.payload));
    console.log('findPageCustom data :', data);
    // 结果进行解析
  } catch (error) {
    console.log(error);
    yield call(showError, error);
  }
}

// 查询结果处理
function* pageResult(action) {
  try {
    // 调用smartQuery
    const data = yield put(smartAction.smartQuery(action.payload));
    console.log('pageResult data :', data);
    // 结果进行解析
  } catch (error) {
    console.log(error);
    yield call(showError, error);
  }
}

// 初始化查询参数
function* initQueryObj() {
  try {
    const moduleName = yield select(moduleNameSelector);
    console.log('###saga initQueryObj moduleName', moduleName);
    const queryObj = yield select(queryObjSelector(moduleName));
    console.log('###saga initQueryObj queryObj', queryObj);
    const sort = [
      {
        direction: 'DESC',
        property: 'gmtModified'
      }
    ];
    queryObj.sort = sort;
    if (moduleName) {
      if (moduleName === 'requireTask') {
        queryObj.param = {
          type: 1
        };
      } else if (moduleName === 'bugTask') {
        queryObj.param = {
          type: 4
        };
        // 查询主任务信息
        const param = {
          pageNum: 1, pageSize: 10, param: { type: '3' }, extraInfo: { stateList: ['2', '3'] }
        };
        const parentTaskResult = yield call(services.queryParentTaskService, param);
        if (parentTaskResult) {
          yield put(actions.queryParentTaskSuccess(parentTaskResult.value));
        }
      } else if (moduleName === 'testTask') {
        queryObj.param = {
          type: 3
        };
      } else if (moduleName === 'jobTask') {
        queryObj.param = {
          type: 2
        };
      }
      // reset pageNum
      queryObj.pageNum = 1;
      yield put(smartAction.smartInitQueryObj(queryObj, moduleName));
    }
  } catch (error) {
    console.log('###saga initQueryObj exception', error);
    yield call(showError, error);
  }
}

// 创建
function* create(action) {
  try {
    const data = yield call(services.createService, action.payload);
    yield put(actions.createSuccess(data));
    if (data.success) yield put(smartAction.smartSelect());
    yield put(smartAction.smartResMessage({
      ...data,
      mode: 'save'
    }));
  } catch (error) {
    console.log(error);
    yield call(showError, error);
  }
}

// 更新
function* updateByPrimaryKey(action) {
  try {
    const data = yield call(services.updateByPrimaryKeyService, action.payload);
    yield put(actions.updateByPrimaryKeySuccess(data));
    // 如下处理是单独使用CRUD的时候的处理方式
    if (data.success) yield put(smartAction.smartSelect());
    yield put(smartAction.smartResMessage({
      ...data,
      mode: 'update'
    }));
  } catch (error) {
    console.log(error);
    yield call(showError, error);
  }
}

// 删除
function* deleteByPrimaryKey(action) {
  try {
    const data = yield call(services.deleteByPrimaryKeyService, action.payload);
    yield put(actions.deleteByPrimaryKeySuccess(data));
  } catch (error) {
    console.log(error);
    yield call(showError, error);
  }
}

// 分配
function* assign(action) {
  try {
    const data = yield call(services.assignService, action.payload);
    yield put(smartAction.smartResMessage({
      ...data,
      mode: 'assign'
    }));
    yield put(actions.assignSuccess(data));
    if (data.success) yield put(smartAction.smartSelect());
  } catch (error) {
    console.log(error);
    yield call(showError, error);
  }
}

// 解决
function* resolve(action) {
  try {
    const data = yield call(services.resolveService, action.payload);
    yield put(smartAction.smartResMessage({
      ...data,
      mode: 'resolve'
    }));
    yield put(actions.resolveSuccess(data));
    if (data.success) yield put(smartAction.smartSelect());
  } catch (error) {
    console.log(error);
    yield call(showError, error);
  }
}

// 关闭
function* close(action) {
  try {
    const data = yield call(services.closeService, action.payload);
    yield put(smartAction.smartResMessage({
      ...data,
      mode: 'close'
    }));
    yield put(actions.closeSuccess(data));
    if (data.success) yield put(smartAction.smartSelect());
  } catch (error) {
    console.log(error);
    yield call(showError, error);
  }
}

// 完成
function* complete(action) {
  try {
    const data = yield call(services.completeService, action.payload);
    yield put(smartAction.smartResMessage({
      ...data,
      mode: 'complete'
    }));
    yield put(actions.completeSuccess(data));
    if (data.success) yield put(smartAction.smartSelect());
  } catch (error) {
    console.log(error);
    yield call(showError, error);
  }
}

// 创建评论
function* createTaskComment(action) {
  try {
    const data = yield call(services.createTaskCommentService, action.payload);
    yield put(actions.createTaskCommentSuccess(data));
  } catch (error) {
    console.log(error);
    yield call(showError, error);
  }
}

// 回复评论
function* replyTaskComment(action) {
  try {
    const data = yield call(services.replyTaskCommentService, action.payload);
    yield put(actions.replyTaskCommentSuccess(data));
  } catch (error) {
    console.log(error);
    yield call(showError, error);
  }
}

// 查询评论
function* queryTaskCommentList(action) {
  try {
    const data = yield call(services.queryTaskCommentListService, action.payload);
    const ssoUserInfoResult = yield call(commonService.querySsoUserInfo);
    const convertColumns = [{ oldColumn: 'submitUser', newColumn: 'submitUserName' }, { oldColumn: 'replyToUser', newColumn: 'replyToUserName' }];
    const param = {
      oldResult: data,
      convertColumns,
      ssoUserInfo: ssoUserInfoResult.value
    };
    const result = yield call(commonService.convertAccountWithName, param);
    yield put(actions.queryTaskCommentListSuccess(result));
  } catch (error) {
    console.log(error);
    yield call(showError, error);
  }
}

// 删除评论
function* delTaskComment(action) {
  try {
    const data = yield call(services.delTaskCommentService, action.payload);
    yield put(actions.delTaskCommentSuccess(data));
  } catch (error) {
    console.log(error);
    yield call(showError, error);
  }
}

// 修改评论
function* modifyTaskComment(action) {
  try {
    const data = yield call(services.modifyTaskCommentService, action.payload);
    yield put(actions.modifyTaskCommentSuccess(data));
  } catch (error) {
    console.log(error);
    yield call(showError, error);
  }
}

export default function* () {
  yield all([
    takeLatest(actions.FIND_PAGE_CUSTOM, findPageCustom),
    takeLatest(actions.PAGE_RESULT, pageResult),
    takeLatest(actions.INIT_QUERY_OBJ, initQueryObj),
    takeLatest(actions.CREATE, create),
    takeLatest(actions.UPDATE_BY_PRIMARY_KEY, updateByPrimaryKey),
    takeLatest(actions.DELETE_BY_PRIMARY_KEY, deleteByPrimaryKey),
    takeLatest(actions.ASSIGN, assign),
    takeLatest(actions.RESOLVE, resolve),
    takeLatest(actions.COMPLETE, complete),
    takeLatest(actions.CLOSE, close),
    takeLatest(actions.CREATE_TASK_COMMENT, createTaskComment),
    takeLatest(actions.REPLY_TASK_COMMENT, replyTaskComment),
    takeLatest(actions.QUERY_TASK_COMMENT_LIST, queryTaskCommentList),
    takeLatest(actions.DEL_TASK_COMMENT, delTaskComment),
    takeLatest(actions.MODIFY_TASK_COMMENT, modifyTaskComment)
  ]);
}
