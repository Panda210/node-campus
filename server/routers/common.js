const commonRouter = router => ([
  router.post('/dictCode/findList', 'common.searchDict', 'common.request'),
  router.post('/dictCode/findPage', 'common.searchDictPage', 'common.request'),
  router.post('/dictCode/findByGroupList', 'common.searchDictByGroupList', 'common.request'),
  // 获取登录用户信息
  router.post('/common/getLoginUserInfo', 'common.getLoginUserInfo'),
  router.post('/common/convertAccountWithName', 'common.convertAccountWithName'),
  // 文件相关
  router.post('/common/saveFileInfo', 'common.saveFileInfo', 'common.request'),
  router.post('/common/queryFileInfo', 'common.queryFileInfo', 'common.request', 'common.buildFileInfo'),
  router.post('/common/saveSingleFileInfo', 'common.saveSingleFileInfo', 'common.request'),
  router.post('/common/deleteFileInfo', 'common.deleteFileInfo', 'common.request'),
  router.post('/common/tempUploadFile', 'common.tempUploadFile')
]);

module.exports = commonRouter;
