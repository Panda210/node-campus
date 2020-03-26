const menuRouter = router => ([
  // 获取用户的菜单信息
  router.post('/menu/getMenuGroup', 'menu.getMenuGroup')
]);

module.exports = menuRouter;
