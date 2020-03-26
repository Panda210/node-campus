const ssoRouter = router => ([
  router.post('/user/findList', 'sso.querySsoUserInfo', 'sso.ssoRequest')
]);

module.exports = ssoRouter;
