/**
 * 新建任务评论
 */
const create = async (ctx, next) => {
  ctx.requestOptions = {
    path: '/taskComment/create',
    options: {
      method: 'POST',
      body: ctx.request.body
    }
  };
  return next();
};

/**
 * 回复任务评论
 */
const reply = async (ctx, next) => {
  ctx.requestOptions = {
    path: '/taskComment/reply',
    options: {
      method: 'POST',
      body: ctx.request.body
    }
  };
  return next();
};

/**
 * 查询评论列表
 */
const findCommentInfoListWithSort = async (ctx, next) => {
  console.log('##findTaskCommentListWithSort');
  ctx.requestOptions = {
    path: '/taskComment/findCommentInfoListWithSort',
    options: {
      method: 'POST',
      body: ctx.request.body
    }
  };
  return next();
};

/**
 * 删除评论
 */
const deleteByPrimaryKey = async (ctx, next) => {
  ctx.requestOptions = {
    path: '/taskComment/deleteByPrimaryKey',
    options: {
      method: 'POST',
      body: ctx.request.body
    }
  };
  return next();
};

/**
 * 修改评论
 */
const updateByPrimaryKey = async (ctx, next) => {
  ctx.requestOptions = {
    path: '/taskComment/updateByPrimaryKey',
    options: {
      method: 'POST',
      body: ctx.request.body
    }
  };
  return next();
};

module.exports = {
  create,
  reply,
  findCommentInfoListWithSort,
  deleteByPrimaryKey,
  updateByPrimaryKey
};

