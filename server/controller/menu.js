const menuGroupInfo = {
  errorCode: null,
  errorMsg: null,
  extraInfo: null,
  resultMsg: null,
  success: true,
  value: {
    title: [
      {
        children: [
          {
            children: null,
            icon: 'solution',
            id: 2,
            ismenu: 1,
            levels: 2,
            linkedList: [],
            name: '需求清单',
            num: 1,
            parentId: 1,
            url: '/task/requireTask'
          },
          {
            children: null,
            icon: 'profile',
            id: 4,
            ismenu: 1,
            levels: 2,
            linkedList: [],
            name: '开发清单',
            num: 2,
            parentId: 1,
            url: '/task/jobTask'
          },
          {
            children: null,
            icon: 'profile',
            id: 5,
            ismenu: 1,
            levels: 2,
            linkedList: [],
            name: '测试清单',
            num: 2,
            parentId: 1,
            url: '/task/testTask'
          },
          {
            children: null,
            icon: 'bars',
            id: 6,
            ismenu: 1,
            levels: 2,
            linkedList: [],
            name: 'Bug清单',
            num: 3,
            parentId: 1,
            url: '/task/bugTask'
          }
        ],
        icon: 'desktop',
        id: 1,
        ismenu: 1,
        levels: 1,
        linkedList: [
          {
            children: null,
            icon: 'solution',
            id: 2,
            ismenu: 1,
            levels: 2,
            linkedList: [],
            name: '需求清单',
            num: 1,
            parentId: 1,
            url: '/task/requireTask'
          },
          {
            children: null,
            icon: 'profile',
            id: 4,
            ismenu: 1,
            levels: 2,
            linkedList: [],
            name: '工作清单',
            num: 2,
            parentId: 1,
            url: '/task/jobTask'
          },
          {
            children: null,
            icon: 'profile',
            id: 5,
            ismenu: 1,
            levels: 2,
            linkedList: [],
            name: '测试清单',
            num: 2,
            parentId: 1,
            url: '/task/testTask'
          },
          {
            children: null,
            icon: 'bars',
            id: 6,
            ismenu: 1,
            levels: 2,
            linkedList: [],
            name: 'Bug清单',
            num: 3,
            parentId: 1,
            url: '/task/bugTask'
          }
        ],
        name: 'IT信息技术部JIRA',
        num: 2,
        parentId: 0,
        url: '/ITJIRA'
      },
      {
        children: [
          {
            children: null,
            icon: 'save',
            id: 11,
            ismenu: 1,
            levels: 2,
            linkedList: [],
            name: '菜单管理',
            num: 1,
            parentId: 10,
            url: '/systemManagement/menuManagement'
          },
          {
            children: null,
            icon: 'team',
            id: 13,
            ismenu: 1,
            levels: 2,
            linkedList: [],
            name: '角色管理',
            num: 2,
            parentId: 10,
            url: '/systemManagement/roleManagement'
          }
        ],
        icon: 'tool',
        id: 10,
        ismenu: 1,
        levels: 1,
        linkedList: [
          {
            children: null,
            icon: 'save',
            id: 11,
            ismenu: 1,
            levels: 2,
            linkedList: [],
            name: '菜单管理',
            num: 1,
            parentId: 10,
            url: '/systemManagement/menuManagement'
          },
          {
            children: null,
            icon: 'team',
            id: 13,
            ismenu: 1,
            levels: 2,
            linkedList: [],
            name: '角色管理',
            num: 2,
            parentId: 10,
            url: '/systemManagement/roleManagement'
          }
        ],
        name: '系统管理',
        num: 3,
        parentId: 0,
        url: '/systemManagement'
      }
    ],
    userPermissionList: [

    ]
  }
};

/**
 * 获取当前用户的菜单信息
 * @param {*} ctx
 * @param {*} next
 */
const getMenuGroup = async (ctx, next) => {
  ctx.body = menuGroupInfo;
  ctx.status = 200;
  return next();
};

export default {
  getMenuGroup
};
