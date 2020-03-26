/**
 * 分页 - 查询任务清单
 */
const findPage = async (ctx, next) => {
  ctx.requestOptions = {
    path: '/task/findPage',
    options: {
      method: 'POST',
      body: ctx.request.body
    }
  };
  console.log('findPage ctx.requestOptions:', ctx.requestOptions);
  return next();
};

/**
 * 新建任务
 */
const create = async (ctx, next) => {
  ctx.requestOptions = {
    path: '/task/create',
    options: {
      method: 'POST',
      body: ctx.request.body
    }
  };
  return next();
};


/**
 * 根据主键修改任务信息
 */
const updateByPrimaryKey = async (ctx, next) => {
  ctx.requestOptions = {
    path: '/task/updateByPrimaryKey',
    options: {
      method: 'POST',
      body: ctx.request.body
    }
  };
  return next();
};

/**
 * 根据主键删除任务
 * @param {} ctx
 * @param {*} next
 */
const deleteByPrimaryKey = async (ctx, next) => {
  ctx.requestOptions = {
    path: '/task/deleteByPrimaryKey',
    options: {
      method: 'POST',
      body: ctx.request.body
    }
  };
  return next();
};

/**
 * 重新分配任务
 * @param {} ctx
 * @param {*} next
 */
const assign = async (ctx, next) => {
  ctx.requestOptions = {
    path: '/task/assign',
    options: {
      method: 'POST',
      body: ctx.request.body
    }
  };
  return next();
};

/**
 * 任务解决
 * @param {} ctx
 * @param {*} next
 */
const resolve = async (ctx, next) => {
  ctx.requestOptions = {
    path: '/task/resolve',
    options: {
      method: 'POST',
      body: ctx.request.body
    }
  };
  return next();
};

/**
 * 任务完成
 * @param {} ctx
 * @param {*} next
 */
const complete = async (ctx, next) => {
  ctx.requestOptions = {
    path: '/task/complete',
    options: {
      method: 'POST',
      body: ctx.request.body
    }
  };
  return next();
};

/**
 * 任务关闭
 * @param {} ctx
 * @param {*} next
 */
const close = async (ctx, next) => {
  ctx.requestOptions = {
    path: '/task/close',
    options: {
      method: 'POST',
      body: ctx.request.body
    }
  };
  return next();
};

/**
 * 主任务查询
 * @param {} ctx
 * @param {*} next
 */
const parentList = async (ctx, next) => {
  ctx.requestOptions = {
    path: '/task/parentList',
    options: {
      method: 'POST',
      body: ctx.request.body
    }
  };
  return next();
};

module.exports = {
  findPage,
  create,
  updateByPrimaryKey,
  deleteByPrimaryKey,
  assign,
  resolve,
  complete,
  close,
  parentList
};

