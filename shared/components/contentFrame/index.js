import React, { Component as C } from 'react';
import * as styles from './style.scss';

class ContentFrame extends C {
  render() {
    const { title, content } = this.props;
    return (
      <div className={styles.contentCommon}>
        <div className={styles.contentTitle}>
          <span className={styles.title}>{title}</span>
        </div>
        <div className={styles.content}>
          {content}
        </div>
      </div>
    );
  }
}

export default ContentFrame;
