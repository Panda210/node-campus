import { request } from 'funsee-request';

// 增删改查
export const findPageService = data => request.post('/api/task/task/findPage', data);
export const createService = data => request.post('/api/task/task/create', data);
export const updateByPrimaryKeyService = data => request.post('/api/task/task/updateByPrimaryKey', data);
export const deleteByPrimaryKeyService = data => request.post('/api/task/task/deleteByPrimaryKey', data);
// 任务处理
export const assignService = data => request.post('/api/task/task/assign', data);
export const resolveService = data => request.post('/api/task/task/resolve', data);
export const closeService = data => request.post('/api/task/task/close', data);
export const completeService = data => request.post('/api/task/task/complete', data);
export const queryParentTaskService = data => request.post('/api/task/task/parentList', data);
// 任务评论相关处理
export const createTaskCommentService = data => request.post('/api/task/taskComment/create', data);
export const replyTaskCommentService = data => request.post('/api/task/taskComment/reply', data);
export const queryTaskCommentListService = data => request.post('/api/task/taskComment/findCommentInfoListWithSort', data);
export const delTaskCommentService = data => request.post('/api/task/taskComment/deleteByPrimaryKey', data);
export const modifyTaskCommentService = data => request.post('/api/task/taskComment/updateByPrimaryKey', data);
