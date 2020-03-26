module.exports = () => async (ctx, next) => {
  console.log('cookie middleware start');
  const { cookies } = ctx;
  const { cookie } = ctx.fsConfig;

  // path以/api开始
  if (ctx.request.path.indexOf('/api') >= 0) {
    ctx.logger.silly('node接收前端请求的时候讲cookie添加上 ', ctx.request.path);
    ctx.logger.silly('sso check cookie effective start');
    const userAccount = cookies.get(cookie.cookie4userAccount);
    const { body } = ctx.request;
    const opUser = {
      account: userAccount
    };
    body.opUser = opUser;
    ctx.logger.silly('###node接收前端请求ctx.request.body ', body);
    return next();
  }
  return next();
};
