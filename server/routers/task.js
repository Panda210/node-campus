const taskRouter = router => ([
  router.post('/task/findPage', 'task.findPage', 'common.request'),
  router.post('/task/create', 'task.create', 'common.request'),
  router.post('/task/updateByPrimaryKey', 'task.updateByPrimaryKey', 'common.request'),
  router.post('/task/deleteByPrimaryKey', 'task.deleteByPrimaryKey', 'common.request'),
  router.post('/task/assign', 'task.assign', 'common.request'),
  router.post('/task/resolve', 'task.resolve', 'common.request'),
  router.post('/task/complete', 'task.complete', 'common.request'),
  router.post('/task/close', 'task.close', 'common.request'),
  router.post('/task/parentList', 'task.parentList', 'common.request'),
  router.post('/taskComment/create', 'taskComment.create', 'common.request'),
  router.post('/taskComment/reply', 'taskComment.reply', 'common.request'),
  router.post('/taskComment/findCommentInfoListWithSort', 'taskComment.findCommentInfoListWithSort', 'common.request'),
  router.post('/taskComment/deleteByPrimaryKey', 'taskComment.deleteByPrimaryKey', 'common.request'),
  router.post('/taskComment/updateByPrimaryKey', 'taskComment.updateByPrimaryKey', 'common.request')
]);

module.exports = taskRouter;
