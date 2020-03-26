import React, { Component as C } from 'react';
import { Form, Button } from 'antd';
import { formBuilder } from 'funsee-smart';
import * as styles from './style.scss';

class TaskForm extends C {
  constructor(p) {
    super(p);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { form, onSubmit } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onSubmit(values);
      }
    });
  }

  render() {
    const {
      form, initialData, mode, editAuth
    } = this.props;

    console.log('########## initialData', initialData);
    let { schema } = this.props;

    const viewFlag = mode === 'view' || !editAuth;

    // 控制Form-item不可编辑
    const disabledUtil = arr => arr.forEach((item) => {
      if (!Array.isArray(item.fields)) {
        item.disabled = true;
      } else {
        disabledUtil(item.fields);
      }
    });

    // 查看mode情况
    if (viewFlag) {
      const viewSchema = JSON.parse(JSON.stringify(schema));
      disabledUtil(viewSchema.fields);
      schema = viewSchema;
    }

    return (
      <div>
        <div>
          {
            formBuilder(form, schema, initialData)
          }
        </div>
        <div className={styles.taskEditButton}>
          {
            viewFlag ?
            ''
            :
            <Button type='primary' onClick={this.handleSubmit}>提交</Button>
          }
        </div>
      </div>
    );
  }
}

export default Form.create()(TaskForm);
