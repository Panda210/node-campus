import { URL } from 'url';

/**
 * 登录 - 唤起SSO登录界面
 * @param {上下文} ctx
 */
const login = async (ctx) => {
  console.log('login:', ctx);
  const { sso } = ctx.fsConfig.sso;
  const url = new URL(sso.login, sso.host);
  url.searchParams.append('service', sso.serviceSource);
  url.searchParams.append('callback', ctx.request.href);
  console.log('ctx.request.href:', ctx.request.href);
  return ctx.redirect(url);
};

/**
 * 登出 - 需要将Cookie进行删除
 * @param {} ctx
 */
const logout = async (ctx) => {
  const { cookies } = ctx;
  const { sso } = ctx.fsConfig.sso;
  const { cookie } = ctx.fsConfig.cookie;

  // 将cookie清空
  const option = {
    signed: true,
    expires: (new Date(Date.now() - cookie.expireTime)),
    httpOnly: false
  };
  cookies.set(cookie.cookie4userName, '', option);
  cookies.set(cookie.cookie4userNameCN, '', option);
  cookies.set(cookie.cookie4user, '', option);

  const url = new URL(sso.logout, sso.host);
  url.searchParams.append('callback', ctx.request.origin);
  return ctx.redirect(url);
};

/**
 * 请求返回值获取
 * @param {上下文} ctx
 * @param {下一步处理方法} next
 */
const ssoRequest = async (ctx, next) => {
  try {
    const { requestOptions } = ctx;

    const { path, options } = requestOptions;
    options.header = options.header || {};
    options.header.cookie = ctx.request.headers.cookie;
    const data = await ctx.ajax.request(path, options);
    console.log(data);
    ctx.body = data;
    ctx.status = 200;
    return next();
  } catch (e) {
    ctx.body = e;
    ctx.status = 500;
  }
};

/**
 * 查询所有SSO的有效用户信息
 */
const querySsoUserInfo = async (ctx, next) => {
  const { sso } = ctx.fsConfig;
  ctx.requestOptions = {
    path: '/user/findList',
    options: {
      method: 'POST',
      service: sso.host,
      body: ctx.request.body
    }
  };
  return next();
};

export default {
  login,
  logout,
  ssoRequest,
  querySsoUserInfo
};
