import React, { Component as C } from 'react';
import { EditForm } from 'funsee-smart';

class TaskAssignComp extends C {
  constructor() {
    super();
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }

  /**
   * 关闭展示框
   */
  handleCancel() {
    this.props.transDataFctf({
      assignModalVisible: false
    });
  }

  /**
   * 确认按钮
   */
  handleOk() {
    const form = this.assignForm;
    if (form) {
      if (this.props.dataFctf && this.props.dataFctf.record && form.getFieldValue('owner')) {
        const taskId = this.props.dataFctf.record.id;
        this.props.assign({
          id: taskId,
          owner: form.getFieldValue('owner')
        });
      }
    }
  }

  render() {
    const { dataFctf } = this.props;
    return (
      <div>
        <EditForm
          ref={(form) => { this.assignForm = form; }}
          schema={dataFctf ? dataFctf.editSchema : {}}
          mode={dataFctf ? dataFctf.mode : ''}
          smartSave={this.handleOk}
          smartHideModal={this.handleCancel}
        />
      </div>
    );
  }
}

export default TaskAssignComp;
