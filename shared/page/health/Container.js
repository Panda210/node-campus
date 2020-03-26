import React, { Component as C } from 'react';
import * as style from './style.scss';

class ConcernTitle extends C {
  render() {
    return (
      <div className={style.container} />
    );
  }
}
ConcernTitle.pageTitle = '健康检查';

export default ConcernTitle;
