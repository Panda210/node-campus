// import React from 'react';
import { FIELD_TYPE } from 'funsee-smart';
import { TASK_CONSTANT } from '../../constant';

const querySchema = {
  columnCount: 4,
  rowCount: 2,
  fields: [
    {
      key: 'name',
      label: '任务名称',
      placeholder: '请输入任务名称',
      type: FIELD_TYPE.INPUT
    }
  ]
  // ,
  // buttons: [{
  //   text: '查询',
  //   type: 'primary',
  //   click: 'smartQuery',
  //   width: '4'
  // }, {
  //   text: '清除',
  //   isReset: true,
  //   width: '4'
  // }]
};

const editSchema = {
  primaryKey: 'id',
  fields: [{
    key: 'id',
    label: '主键Id',
    placeholder: '任务Id',
    type: FIELD_TYPE.INPUT,
    visibility: false
  }, {
    key: 'owner',
    label: '负责人',
    placeholder: '请选择负责人员',
    type: FIELD_TYPE.SELECT,
    required: true,
    url: '/api/smart/user/select',
    param: {
      pageNum: 1, pageSize: 20, param: { companyId: TASK_CONSTANT.companyId, deptId: TASK_CONSTANT.deptId }, extraInfo: {}
    },
    formatter: (responseData) => {
      console.log('taskAssingComp responseData', responseData);
      if (Array.isArray(responseData.value)) {
        return responseData.value.map(subItem => ({ key: subItem.account, value: subItem.name }));
      }
    }
  }]
};

export default {
  querySchema,
  editSchema
};
