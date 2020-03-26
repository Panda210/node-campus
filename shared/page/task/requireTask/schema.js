import React from 'react';
import { FIELD_TYPE } from 'funsee-smart';
import { TASK_CONSTANT } from '../constant';
import * as commonTool from '../../../utils/tool';


const querySchema = {
  columnCount: 4,
  rowCount: 2,
  fields: [
  //   {
  //   key: 'name',
  //   label: '任务名称',
  //   placeholder: '请输入任务名称',
  //   type: FIELD_TYPE.INPUT
  // },
    {
      key: 'type',
      label: '任务类型',
      placeholder: '请选择任务类型',
      type: FIELD_TYPE.SELECT,
      initialValue: '1',
      disabled: true,
      url: '/api/smart/task/dropdown',
      param: {
        pageNum: 1, pageSize: 10, param: { dictGroup: 'TASK_TYPE' }, extraInfo: {}
      },
      formatter: (responseData) => {
        if (Array.isArray(responseData.value)) {
          return responseData.value.map(subItem => ({ key: subItem.code, value: subItem.name }));
        }
      }
    }, {
      key: 'state',
      label: '任务状态',
      placeholder: '请选择任务状态',
      type: FIELD_TYPE.SELECT,
      url: '/api/smart/task/dropdown',
      param: {
        pageNum: 1, pageSize: 10, param: { dictGroup: 'TASK_STATE' }, extraInfo: {}
      },
      formatter: (responseData) => {
        if (Array.isArray(responseData.value)) {
          return responseData.value.map(subItem => ({ key: subItem.code, value: subItem.name }));
        }
      }
    }, {
      key: 'status',
      label: '任务处理状态',
      placeholder: '请选择任务处理状态',
      type: FIELD_TYPE.SELECT,
      url: '/api/smart/task/dropdown',
      param: {
        pageNum: 1, pageSize: 10, param: { dictGroup: 'TASK_STATUS' }, extraInfo: {}
      },
      formatter: (responseData) => {
        if (Array.isArray(responseData.value)) {
          return responseData.value.map(subItem => ({ key: subItem.code, value: subItem.name }));
        }
      }
    }, {
      key: 'owner',
      label: '负责人',
      placeholder: '请选择负责人',
      type: FIELD_TYPE.SELECT,
      url: '/api/smart/user/select',
      param: {
        pageNum: 1, pageSize: 20, param: { companyId: TASK_CONSTANT.companyId, deptId: TASK_CONSTANT.deptId }, extraInfo: {}
      },
      formatter: (responseData) => {
        if (Array.isArray(responseData.value)) {
          return responseData.value.map(subItem => ({ key: subItem.account, value: subItem.name }));
        }
      }
    }],
  buttons: [{
    text: '查询',
    type: 'primary',
    click: 'smartQuery',
    width: '4'
  }, {
    text: '清除',
    isReset: true,
    width: '4'
  }]
};

const tableSchema = {
  primaryKey: 'id',
  columns: [{
    key: 'code',
    title: '任务代码'
  }, {
    key: 'name',
    title: '任务名称'
  },
  // {
  //   key: 'description',
  //   title: '任务描述'
  // }
  {
    key: 'type',
    title: '任务类型',
    render: (text, record) => (
      <span>
        {
          commonTool.getNameByCodeFromMap(record.type, record.dictGroupList, 'TASK_TYPE', 'code', 'name')
        }
      </span>
    )
  }, {
    key: 'grade',
    title: '紧急程度',
    render: (text, record) => (
      <span>
        {
          commonTool.getNameByCodeFromMap(record.grade, record.dictGroupList, 'TASK_GRADE', 'code', 'name')
        }
      </span>
    )
  }, {
    key: 'category',
    title: '严重程度',
    render: (text, record) => (
      <span>
        {
          commonTool.getNameByCodeFromMap(record.category, record.dictGroupList, 'TASK_CATEGORY', 'code', 'name')
        }
      </span>
    )
  },
  // {
  //   key: 'parentId',
  //   title: '主任务'
  // }, {
  //   key: 'relatedId',
  //   title: '关联任务'
  // },
  {
    key: 'state',
    title: '任务状态',
    render: (text, record) => (
      <span>
        {
          commonTool.getNameByCodeFromMap(record.state, record.dictGroupList, 'TASK_STATE', 'code', 'name')
        }
      </span>
    )
  }, {
    key: 'status',
    title: '任务处理状态',
    render: (text, record) => (
      <span>
        {
          commonTool.getNameByCodeFromMap(record.status, record.dictGroupList, 'TASK_STATUS', 'code', 'name')
        }
      </span>
    )
  }, {
    key: 'owner',
    title: '负责人',
    render: (text, record) => (
      <span>
        {
          commonTool.getNameByCode(record.owner, record.ssoUserInfo, 'account', 'name')
        }
      </span>
    )
  }, {
    key: 'submitUser',
    title: '创建人员',
    render: (text, record) => (
      <span>
        {
          commonTool.getNameByCode(record.submitUser, record.ssoUserInfo, 'account', 'name')
        }
      </span>
    )
  }, {
    key: 'submitTime',
    title: '创建时间',
    render: (text, record) => (
      <span>
        {
          commonTool.formatDate(record.submitTime, commonTool.dateFormats.TIMESTAMP_FMT)
        }
      </span>
    )
  }, {
    key: 'expectEndDate',
    title: '期望完成日期',
    render: (text, record) => (
      <span>
        {
          commonTool.formatDate(record.expectEndDate, commonTool.dateFormats.DATE_FMT)
        }
      </span>
    )
  }, {
    key: 'resolveTime',
    title: '任务解决时间',
    render: (text, record) => (
      <span>
        {
          commonTool.formatDate(record.resolveTime, commonTool.dateFormats.TIMESTAMP_FMT)
        }
      </span>
    )
  }, {
    key: 'finishTime',
    title: '任务完成时间',
    render: (text, record) => (
      <span>
        {
          commonTool.formatDate(record.finishTime, commonTool.dateFormats.TIMESTAMP_FMT)
        }
      </span>
    )
  }],
  toolbarButtons: [{
    text: '新增',
    type: 'primary',
    click: 'smartAdd'
  }],
  optionButtons: [{
    text: '删除',
    click: 'smartDelete'
  }, {
    text: '查看',
    click: 'taskView'
  }, {
    text: '编辑',
    click: 'taskEdit'
  }, {
    text: '转交',
    click: 'taskAssign'
  }, {
    text: '解决',
    click: 'taskResolve'
  }, {
    text: '完成',
    click: 'taskComplete'
  }, {
    text: '关闭',
    click: 'taskClose'
  }],
  optionButtonFilter: (record, optionsButtons) => {
    const authButtons = [];
    if (Array.isArray(optionsButtons)) {
      optionsButtons.map((item, index) => {
        if (item.text === '查看' || item.text === '查看详情') {
          authButtons.push(index);
        }
        // 任务的提交人员
        if (record.submitUser === record.loginUserInfo) {
          if (item.text === '编辑详情' || item.text === '删除') {
            // 只有新建任务的人才能再次编辑，或者删除
            authButtons.push(index);
          }
          if (record.status === '3' && item.text === '完成') {
            // 任务解决的情况才可以操作完成
            authButtons.push(index);
          }
          if (record.status !== '4' && record.status !== '5' && item.text === '关闭') {
            // 任务complete或者close的情况不可以操作关闭
            authButtons.push(index);
          }
        }
        // 任务的责任人员或者创建人员可以转交
        if (record.owner === record.loginUserInfo || record.submitUser === record.loginUserInfo) {
          if (item.text === '编辑') {
            authButtons.push(index);
          }
          if (record.status !== '4' && record.status !== '5' && item.text === '转交') {
            // 任务在complete或者close的情况是不能进行操作：转交
            authButtons.push(index);
          }
        }
        // 任务的责任人员可以解决
        if (record.owner === record.loginUserInfo) {
          if (record.status !== '3' && record.status !== '4' && record.status !== '5' && item.text === '解决') {
            // 任务在resolve或者complete或者close的情况是不能进行操作：解决
            authButtons.push(index);
          }
        }
        return optionsButtons;
      });
      return authButtons;
    }
  }
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
    key: 'type',
    label: '任务类型',
    placeholder: '请选择任务类型',
    type: FIELD_TYPE.SELECT,
    initialValue: '1',
    disabled: true,
    required: true,
    url: '/api/smart/task/dropdown',
    param: {
      pageNum: 1, pageSize: 10, param: { dictGroup: 'TASK_TYPE' }, extraInfo: {}
    },
    formatter: (responseData) => {
      if (Array.isArray(responseData.value)) {
        return responseData.value.map(subItem => ({ key: subItem.code, value: subItem.name }));
      }
    }
  }, {
    key: 'name',
    label: '任务名称',
    placeholder: '请输入任务名称',
    type: FIELD_TYPE.INPUT,
    required: true
  }, {
    key: 'grade',
    label: '紧急程度',
    placeholder: '请选择紧急程度',
    type: FIELD_TYPE.SELECT,
    initialValue: '1',
    required: true,
    url: '/api/smart/task/dropdown',
    param: {
      pageNum: 1, pageSize: 10, param: { dictGroup: 'TASK_GRADE' }, extraInfo: {}
    },
    formatter: (responseData) => {
      if (Array.isArray(responseData.value)) {
        return responseData.value.map(subItem => ({ key: subItem.code, value: subItem.name }));
      }
    }
  }, {
    key: 'category',
    label: '严重程度',
    placeholder: '请选择严重程度',
    type: FIELD_TYPE.SELECT,
    initialValue: '1',
    required: true,
    url: '/api/smart/task/dropdown',
    param: {
      pageNum: 1, pageSize: 10, param: { dictGroup: 'TASK_CATEGORY' }, extraInfo: {}
    },
    formatter: (responseData) => {
      if (Array.isArray(responseData.value)) {
        return responseData.value.map(subItem => ({ key: subItem.code, value: subItem.name }));
      }
    }
  }, {
    key: 'owner',
    label: '负责人',
    placeholder: '请选择负责人员',
    type: FIELD_TYPE.SELECT,
    url: '/api/smart/user/select',
    param: {
      pageNum: 1, pageSize: 20, param: { companyId: TASK_CONSTANT.companyId, deptId: TASK_CONSTANT.deptId }, extraInfo: {}
    },
    formatter: (responseData) => {
      if (Array.isArray(responseData.value)) {
        return responseData.value.map(subItem => ({ key: subItem.account, value: subItem.name }));
      }
    }
  }, {
    key: 'expectEndDate',
    label: '期望完成日期',
    placeholder: '请选择期望完成日期',
    type: FIELD_TYPE.DATEPICKER
  }, {
    key: 'description',
    label: '任务描述',
    required: true,
    placeholder: '请输入任务描述',
    type: FIELD_TYPE.TEXTAREA,
    span: 3
  }]
};

export default {
  querySchema,
  tableSchema,
  editSchema
};
