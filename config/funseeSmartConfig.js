module.exports = {
  responseFormatter: (response) => {
    const { totalCount, pageSize, pageNum } = response;
    response.extraInfo = {
      totalCount,
      pageNum,
      pageSize
    };
    delete response.totalCount;
    delete response.pageNum;
    delete response.pageSize;
    return response;
  },
  // routers path中配置的是java后端path
  serverRouter: {
    user: {
      serviceName: 'sso',
      path: {
        select: '/user/findPage'
      }
    },
    task: {
      serviceName: 'default',
      path: {
        dropdown: '/dictCode/findPage',
        // parentList - 查询未完成的任务
        parentList: '/task/parentList'
      }
    },
    requireTask: {
      serviceName: 'default',
      path: {
        select: '/task/findPage',
        update: '/task/updateByPrimaryKey',
        insert: '/task/create',
        delete: '/task/deleteByPrimaryKey'
      }
    },
    jobTask: {
      serviceName: 'default',
      path: {
        select: '/task/findPage',
        update: '/task/updateByPrimaryKey',
        insert: '/task/create',
        delete: '/task/deleteByPrimaryKey'
      }
    },
    testTask: {
      serviceName: 'default',
      path: {
        select: '/task/findPage',
        update: '/task/updateByPrimaryKey',
        insert: '/task/create',
        delete: '/task/deleteByPrimaryKey'
      }
    },
    bugTask: {
      serviceName: 'default',
      path: {
        select: '/task/findPage',
        update: '/task/updateByPrimaryKey',
        insert: '/task/create',
        delete: '/task/deleteByPrimaryKey'
      }
    }
  }
};
