import React, { Component as C } from 'react';
import { Modal } from 'antd';
import { SingleFileUploadComp, ContentFrame } from '../../../../components';
import TaskCommentComp from '../taskCommentComp/index';
import TaskForm from './taskForm';

/**
 * 任务详情、附件、评论合并
 */
class TaskComp extends C {
  constructor() {
    super();
    this.handleCancel = this.handleCancel.bind(this);
  }

  /**
   * 关闭展示框
   */
  handleCancel() {
    this.props.transDataFctf({
      taskModalVisible: false,
      taskSearchParam: {},
      taskMode: ''
    });
    this.props.saveTempFileInfo([]);
    this.props.setEditData({});
  }

  render() {
    const {
      dataFctf, editSchema, editData, onSubmit
    } = this.props;
    let modalVisible = false;
    let searchParam = {};
    let mode = 'view';
    let delFileAuth = false;
    if (dataFctf) {
      modalVisible = dataFctf.taskModalVisible;
      searchParam = dataFctf.taskSearchParam;
      mode = dataFctf.taskMode;
      delFileAuth = dataFctf.fileDelAuth;
      console.log('TaskEditComp Render dataFctf: ', dataFctf);
    }

    const taskForm = (mode && <TaskForm
      mode={mode}
      editAuth={editData ? editData.editAuth : false}
      schema={editSchema}
      initialData={editData}
      onSubmit={onSubmit}
    />);

    const fileComp = (<SingleFileUploadComp
      singleUploadMode={mode}
      delFileAuth={delFileAuth}
      searchFileParam={searchParam}
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
    />);

    const commentComp = (<TaskCommentComp
      loginUserInfo={this.props.loginUserInfo}
      dataFctf={this.props.dataFctf}
      transDataFctf={this.props.transDataFctf}
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
    />);


    return (
      <div>
        <Modal
          title='编辑'
          visible={modalVisible}
          onCancel={this.handleCancel}
          footer={null}
          width='80%'
          centered={true}
        >
          <div>
            <div>
              <ContentFrame
                title='任务详情'
                content={taskForm}
              />
            </div>
            <div>
              <ContentFrame
                title='附件信息'
                content={fileComp}
              />
            </div>
            <div>
              <ContentFrame
                title='评论信息'
                content={commentComp}
              />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default TaskComp;
