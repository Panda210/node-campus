import React, { Component as C } from 'react';
import connect from 'funsee/connect';
import { CRUD, FIELD_TYPE } from 'funsee-smart';
import { Select } from 'antd';
import TaskFileComp from '../taskFileComp/index';
import TaskAssignComp from '../taskAssignComp/index';
import * as commonAction from '../../../../common/action';
import * as actions from '../../action';
import { TASK_CONSTANT } from '../../constant';
import TaskComp from '../taskComp';

const { Option } = Select;

class TaskQueryComp extends C {
  constructor() {
    super();
    this.convertListToOptions = this.convertListToOptions.bind(this);
    this.buildOptionsFromList = this.buildOptionsFromList.bind(this);
    this.handleUpdateTask = this.handleUpdateTask.bind(this);
    this.state = {
      comp: 'TaskQueryComp'
    };
  }

  componentDidMount() {
    const dictGroupList = ['TASK_STATE', 'TASK_STATUS', 'TASK_TYPE', 'TASK_GRADE', 'TASK_CATEGORY'];
    this.props.searchDictByGroupList(dictGroupList);
    this.props.initQueryObj();
    this.props.queryUserInfo({
      companyId: TASK_CONSTANT.companyId,
      deptId: TASK_CONSTANT.deptId
    });
  }

  /**
   * list转options
   */
  convertListToOptions(data, idProperty, codeProperty, nameProperty) {
    console.log('TaskQueryComp convertListToOptions', this.state.comp);
    let options = [];
    if (Array.isArray(data)) {
      options = data.map(record =>
        <Option key={record[idProperty]} value={record[codeProperty]}>{record[nameProperty]}</Option>
      );
    }
    return options;
  }

  /**
   * 将数据转成需要的options的要求
   */
  buildOptionsFromList(data, idProperty, codeProperty, nameProperty) {
    console.log('TaskQueryComp buildOptionsFromList', this.state.comp);
    const optionList = [];
    if (Array.isArray(data)) {
      data.map((record) => {
        const optionRecord = {
          key: record[codeProperty],
          value: record[nameProperty],
          name: record[nameProperty],
          id: record[idProperty]
        };
        optionList.push(optionRecord);
        return data;
      });
    }
    return optionList;
  }

  handleUpdateTask(values) {
    this.props.updateTask(values);
  }

  render() {
    const {
      moduleData, loginUserInfo, ssoUserInfo, userInfo, parentTaskList
    } = this.props;
    console.log('loginUserInfo:', loginUserInfo);
    console.log('taskQueryComp render moduleData', moduleData);
    if (moduleData && moduleData.value && this.props.dictGroupListResult && this.props.dictGroupListResult.value) {
      if (Array.isArray(moduleData.value)) {
        moduleData.value.map((record) => {
          record.dictGroupList = this.props.dictGroupListResult.value;
          record.ssoUserInfo = ssoUserInfo;
          if (loginUserInfo) {
            record.loginUserInfo = loginUserInfo.userAccount;
            if (record.submitUser === record.loginUserInfo) {
              record.fileDelAuth = true;
              record.editAuth = true;
            } else {
              record.fileDelAuth = false;
              record.editAuth = false;
            }
          }
          if (userInfo) {
            const assignSchema = {
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
                options: this.buildOptionsFromList(userInfo, 'id', 'account', 'name')
              }]
            };
            console.log('assignSchema', assignSchema);
            record.assignSchema = assignSchema;
          }
          if (parentTaskList) {
            record.parentTaskList = parentTaskList;
          }
          return moduleData.value;
        });
      }
    }

    console.log('taskQueryComp render moduleData after', moduleData);
    return (
      <div>
        <div >
          <CRUD
            {...this.props}
          />
        </div>
        <div>
          <TaskFileComp
            dataFctf={this.props.dataFctf}
            transDataFctf={this.props.transDataFctf}
            fileListResult={this.props.fileListResult}
            tempFileList={this.props.tempFileList}
            delFileResult={this.props.delFileResult}
            tempSingleFile={this.props.tempSingleFile}
            saveSinglefileResult={this.props.saveSinglefileResult}
            saveTempFileInfo={this.props.saveTempFileInfo}
            saveTempSingleFileInfo={this.props.saveTempSingleFileInfo}
            saveSingleFileInfo={this.props.saveSingleFileInfo}
            queryFileInfo={this.props.queryFileInfo}
            deleteFileInfo={this.props.deleteFileInfo}
          />
        </div>
        <div>
          <TaskAssignComp
            dataFctf={this.props.dataFctf}
            assign={this.props.assign}
            transDataFctf={this.props.transDataFctf}
            {...this.props}
          />
        </div>
        <div>
          <TaskComp
            dataFctf={this.props.dataFctf}
            transDataFctf={this.props.transDataFctf}
            fileListResult={this.props.fileListResult}
            tempFileList={this.props.tempFileList}
            delFileResult={this.props.delFileResult}
            tempSingleFile={this.props.tempSingleFile}
            saveSinglefileResult={this.props.saveSinglefileResult}
            saveTempFileInfo={this.props.saveTempFileInfo}
            saveTempSingleFileInfo={this.props.saveTempSingleFileInfo}
            saveSingleFileInfo={this.props.saveSingleFileInfo}
            queryFileInfo={this.props.queryFileInfo}
            deleteFileInfo={this.props.deleteFileInfo}
            loginUserInfo={this.props.loginUserInfo}
            createTaskComment={this.props.createTaskComment}
            createTaskCommentResult={this.props.createTaskCommentResult}
            replyTaskComment={this.props.replyTaskComment}
            replyTaskCommentResult={this.props.replyTaskCommentResult}
            queryTaskCommentList={this.props.queryTaskCommentList}
            queryTaskCommentListResult={this.props.queryTaskCommentListResult}
            delTaskComment={this.props.delTaskComment}
            delTaskCommentResult={this.props.delTaskCommentResult}
            modifyTaskComment={this.props.modifyTaskComment}
            modifyTaskCommentResult={this.props.modifyTaskCommentResult}
            editSchema={this.props.editSchema}
            editData={this.props.taskEditData}
            onSubmit={this.handleUpdateTask}
            setEditData={this.props.setEditData}
          />
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  loginUserInfo: state.common.loginUserInfo,
  saveSinglefileResult: state.common.saveSinglefileResult,
  tempFileList: state.common.tempFileList,
  fileListResult: state.common.fileListResult,
  delFileResult: state.common.delFileResult,
  tempSingleFile: state.common.tempSingleFile,
  dictGroupListResult: state.common.dictGroupListResult,
  dataFctf: state.common.dataFctf,
  ssoUserInfo: state.common.ssoUserInfo,
  userInfo: state.common.userInfo,
  assignResult: state.module.task.assignResult,
  resolveResult: state.module.task.resolveResult,
  closeResult: state.module.task.closeResult,
  completeResult: state.module.task.completeResult,
  parentTaskList: state.module.task.parentTaskList,
  createTaskCommentResult: state.module.task.createTaskCommentResult,
  replyTaskCommentResult: state.module.task.replyTaskCommentResult,
  queryTaskCommentListResult: state.module.task.queryTaskCommentListResult,
  delTaskCommentResult: state.module.task.delTaskCommentResult,
  modifyTaskCommentResult: state.module.task.modifyTaskCommentResult,
  taskEditData: state.module.task.editData,
  updateTaskResult: state.module.task.updateTaskResult
}), {
  getloginUserInfo: commonAction.loginUserInfo,
  saveTempFileInfo: commonAction.saveTempFileInfo,
  saveSingleFileInfo: commonAction.saveSingleFileInfo,
  queryFileInfo: commonAction.queryFileInfo,
  deleteFileInfo: commonAction.deleteFileInfo,
  saveTempSingleFileInfo: commonAction.saveTempSingleFileInfo,
  searchDictByGroupList: commonAction.searchDictByGroupList,
  transDataFctf: commonAction.transDataFctf,
  querySsoUserInfo: commonAction.querySsoUserInfo,
  queryUserInfo: commonAction.queryUserInfo,
  assign: actions.assign,
  resolve: actions.resolve,
  complete: actions.complete,
  close: actions.close,
  initQueryObj: actions.initQueryObj,
  createTaskComment: actions.createTaskComment,
  replyTaskComment: actions.replyTaskComment,
  queryTaskCommentList: actions.queryTaskCommentList,
  delTaskComment: actions.delTaskComment,
  modifyTaskComment: actions.modifyTaskComment,
  updateTask: actions.updateByPrimaryKey,
  setEditData: actions.setEditData
})(TaskQueryComp);
