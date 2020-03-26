import React, { Component as C } from 'react';
import { Modal } from 'antd';
import { SingleFileUploadComp } from '../../../../components';

class TaskFileComp extends C {
  constructor() {
    super();
    this.handleCancel = this.handleCancel.bind(this);
  }

  /**
   * 关闭展示框
   */
  handleCancel() {
    this.props.transDataFctf({
      taskViewFileVisible: false,
      searchFileParam: {}
    });
    this.props.saveTempFileInfo([]);
  }

  render() {
    const { dataFctf } = this.props;
    let modalVisible = false;
    let searchParam = {};
    let mode = 'view';
    let delFileAuth = false;
    if (dataFctf) {
      console.log('TaskFileComp Render - this.props.dataFctf ', dataFctf);
      modalVisible = dataFctf.fileModalVisible;
      searchParam = dataFctf.searchFileParam;
      mode = dataFctf.singleUploadMode;
      delFileAuth = dataFctf.fileDelAuth;
      console.log('TaskFileComp fileModalVisible', modalVisible);
      console.log('TaskFileComp searchFileParam', searchParam);
      console.log('TaskFileComp singleUploadMode', mode);
      console.log('TaskFileComp Render after - this.props.dataFctf ', this.props.dataFctf);
    }
    return (
      <div>
        <Modal
          visible={modalVisible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <div>
            {/* 自定义组件 */}
            <SingleFileUploadComp
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
            />
          </div>
        </Modal>
      </div>
    );
  }
}
export default TaskFileComp;
