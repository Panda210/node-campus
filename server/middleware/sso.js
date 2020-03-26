import { URL } from 'url';
import * as ssoUtil from '../../shared/utils/ssoUtil';
import { encrypt, decrypt } from '../../shared/utils/aes128cbc';

module.exports = () => async (ctx, next) => {
  console.log('sso middleware start');
  const { request, cookies } = ctx;
  const { path } = request;
  console.log('ctx', ctx);
  const { sso } = ctx.fsConfig;
  const { cookie } = ctx.fsConfig;

  // 过滤不需要的检查
  console.log('sso.excludeCheckPath', sso.excludeCheckPath);
  console.log('path', path);
  if (ssoUtil.isCheckExcluded4Path(sso.excludeCheckPath, path)) {
    return next();
  }

  // 登录Cookie有效性验证
  console.log('sso check cookie effective start');
  const userAccount = cookies.get(cookie.cookie4userAccount);
  const userInfoCookie = cookies.get(cookie.cookie4user);
  console.log('sso check cookie userAccount = ', userAccount, userInfoCookie);
  if (userAccount && userInfoCookie) {
    const decryptUserInfo = JSON.parse(decrypt(cookies.get(cookie.cookie4user)));
    // console.log('解密用户信息：',decryptUserInfo);
    const userRealAccount = decryptUserInfo.account;
    // console.log('用户真实姓名:',userRealAccount);
    if (userAccount === userRealAccount) {
      return next();
    }
  }

  // 登录验证-ticket不为空的情况，获取有效性
  console.log('sso start ticket check -- ctx.request.query:', ctx.request.query);
  const { ticket } = ctx.request.query;

  if (ticket) {
    const validatePath = `${sso.validate}?service=${sso.serviceSource}&ticket=${ticket}`;
    const validateOptions = {
      method: 'GET',
      service: sso.host
    };
    const result = await ctx.ajax.request(validatePath, validateOptions);

    console.log('result:', result);

    // 登录验证成功set-Cookie
    if (result.success) {
      const option = {
        signed: true,
        expires: (new Date(Date.now() + cookie.expireTime)),
        httpOnly: false
      };
      const userInfo = result.value;
      console.log('userInfo:', userInfo);
      console.log('userInfo json.stringify:', JSON.stringify(userInfo));
      cookies.set(cookie.cookie4userAccount, userInfo.account, option);
      cookies.set(cookie.cookie4userNameCN, encodeURIComponent(userInfo.name), option);
      cookies.set(cookie.cookie4user, encrypt(JSON.stringify(userInfo)), option);
      cookies.set(cookie.cookie4userId, userInfo.userId, option);

      const url = new URL(ctx.request.href);
      url.searchParams.delete('service');
      url.searchParams.delete('ticket');
      console.log('validate success redirect url:', url);
      return ctx.redirect(url);
    }

    // 登录验证失败
    ctx.status = 500;
    ctx.body = '登录状态错误，请重新登录';
    return;
  }

  // 调用登录
  console.log('-------------login start-------------');
  console.log(ctx.request.path);
  const url = new URL(sso.login, sso.host);
  url.searchParams.append('service', sso.serviceSource);
  url.searchParams.append('callback', sso.callback);
  console.log('sso login url:', url);
  console.log('-------------login end---------------');
  return ctx.redirect(url);
};
