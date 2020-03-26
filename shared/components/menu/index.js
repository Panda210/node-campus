import React, { Component as C } from 'react';
import { Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import * as authUtil from '../../utils/auth';


// import * as style from './style.scss';
const { SubMenu } = Menu;

class MenuNav extends C {
  constructor() {
    super();
    this.state = {
      openKeys: ['-1']
    };
    this.onOpenChange = this.onOpenChange.bind(this);
  }
  /**
   * 展示菜单的递归方法
   * @param {*} menuTreeInfo
   */
  showMenu(menuTreeInfo) {
    console.log('this.state = ', this.state);
    if (Array.isArray(menuTreeInfo)) {
      return (
        menuTreeInfo.map(record => (
          record.children ?
            <SubMenu key={record.id} title={<span><Icon type={record.icon} /><span>{record.name}</span></span>}>
              { this.showMenu(record.children) }
            </SubMenu>
            :
            <Menu.Item key={record.id} >
              <NavLink to={record.url}><Icon type={record.icon} />{record.name}</NavLink>
            </Menu.Item>
        ))
      );
    }
  }

  /**
   * 支持打开第二个一级菜单，自动关闭原来的一级菜单
   * @param {} openKeys
   */
  onOpenChange(openKeys) {
    const menuFirstLevelKeys = authUtil.genAuthMenuFirstLevelKeys();
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (menuFirstLevelKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      });
    }
  }

  render() {
    const { isFold, menuTreeInfo } = this.props;
    const MenuTreeRender = this.showMenu(menuTreeInfo);

    return (
      <Menu
        // defaultSelectedKeys={['1']}
        // defaultOpenKeys={['sub1']}
        mode='inline'
        theme='dark'
        inlineCollapsed={isFold}
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
      >
        {MenuTreeRender}
      </Menu>
    );
  }
}

export default MenuNav;
