import React, { Component as C } from 'react';
import connect from 'funsee/connect';
import { MenuNav, Header } from '../../components';
import * as style from './layout.scss';
import * as commonAction from '../../common/action';
import './reset.scss';

class Layout extends C {
  constructor() {
    super();
    this.state = {
      isFold: false
    };
  }

  componentDidMount() {
    // 获取登录用户账号信息
    this.props.getloginUserInfo();
    this.props.querySsoUserInfo();
    // 设定延时
    const timer = setInterval(
      () => {
        const { loginUserInfo } = this.props;
        if (loginUserInfo) {
          clearInterval(timer);
          // 获取用户的菜单清单
          this.props.menuGroup({
            userId: loginUserInfo.userId
          });
        }
      }, 1000
    );
  }

  render() {
    const { isFold, loginUserInfo, menuGroupInfo } = this.props;
    const userName = loginUserInfo ? loginUserInfo.userName : '小主';
    const menuTreeInfo = menuGroupInfo ? menuGroupInfo.value.title : [];
    console.log(' ### this.props.children = ', this.props.children);
    return (
      <section className={style.wrapper}>
        <nav className={isFold ? style.foldedMenu : style.unfoldedMenu} style={{ transition: 'width .3s' }}>
          <div className={isFold ? style.foldedLogo : style.unfoledLogo}>禾下园区</div>
          <MenuNav
            isFold={isFold}
            menuTreeInfo={menuTreeInfo}
          />
        </nav>
        <section className={style.content}>
          <Header userName={userName} isFold={isFold} menuToggle={this.props.menuToggle} />
          {/* <BreadCrumbNav /> */}
          <div className={style.childenContent}>{this.props.children}</div>
        </section>
      </section>
    );
  }
}
export default connect(state => ({
  isFold: state.common.isFold,
  loginUserInfo: state.common.loginUserInfo,
  menuGroupInfo: state.common.menuGroupInfo
}), {
  menuToggle: commonAction.menuToggle,
  getloginUserInfo: commonAction.loginUserInfo,
  menuGroup: commonAction.menuGroup,
  querySsoUserInfo: commonAction.querySsoUserInfo
})(Layout);
