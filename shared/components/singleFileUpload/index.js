import React, { Component as C } from 'react';
import { Upload, Icon, Modal } from 'antd';
import * as dealFileUtil from '../../utils/dealFile';
import * as styles from './style.scss';

class SingleFileUploadComp extends C {
  constructor() {
    super();
    this.state = {
      previewVisible: false,
      previewFile: {},
      fileList: [],
      index: 0
    };
    this.handlePreview = this.handlePreview.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBeforeUpload = this.handleBeforeUpload.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handlePreviewDirectFlag = this.handlePreviewDirectFlag.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
  }


  componentWillReceiveProps(props) {
    if (props.tempFileList && props.tempFileList.length === 0) {
      console.log('componentWillReceiveProps test filelist');
      this.setState({ fileList: [] });
    }
  }

  /**
   * 上传之前检查
   * @param {*} file
   * @param {*} fileInfoList
   */
  handleBeforeUpload(file, fileInfoList) {
    console.log('# handleBeforeUpload file = ', file);
    console.log('# handleBeforeUpload fileInfoList = ', fileInfoList);
    let errMsg = '';
    const { tempFileList } = this.props;
    console.log('handleBeforeUpload tempFileInfo=', tempFileList);
    fileInfoList.map((val) => {
      const isJPG = val.type === 'image/jpeg' || val.type === 'application/pdf' || val.type === 'image/png' || val.type === 'application/zip'
      || val.type === 'application/x-zip-compressed';
      const isLt2M = val.size / 1024 / 1024 < 20;
      if (!isJPG) {
        errMsg = '上传文件支持的类型jpeg,pdf,png,zip';
        return false;
      }
      if (!isLt2M) {
        errMsg = '上传文件不得大于20MB!';
        return false;
      }
      tempFileList.push(val);
      return isJPG && isLt2M;
    });
    if (fileInfoList.length === tempFileList.length) {
      this.props.saveTempFileInfo(tempFileList);
    }
    if (fileInfoList.length > tempFileList.length) {
      this.props.saveTempFileInfo([]);
      Modal.error({
        title: '错误',
        content: errMsg
      });
    }
  }

  /**
   * 关闭预览
   */
  handleCancel() {
    this.setState({ previewVisible: false });
  }

  /**
   * 文件预览
   * @param {文件} file
   */
  handlePreview(file) {
    console.log('handlePreview file', file);
    this.setState({
      previewFile: file,
      previewVisible: true,
      fileList: this.props.tempFileList
    });
  }

  /**
   * 上传文件 -- 单个文件上传成功 - 调用后端
   * @param {文件列表} fileList
   */
  handleChange(info) {
    console.log('## handleChange files:', info);
    console.log('## handleChange file.status:', info.file.status);
    if (info.file.status === 'uploading') {
      // 上传文件信息
      const uploadFile = info.file.originFileObj;
      this.props.saveTempSingleFileInfo(uploadFile);
      console.log('## handleChange uploadFile', uploadFile);
    }
    if (info.file.status === 'done') {
      console.log('文件上传成功了');
      // 处理index
      if (this.props.fileListResult) {
        const { extraInfo } = this.props.fileListResult;
        if (extraInfo.countIncludeLogicDelete && extraInfo.countIncludeLogicDelete > 0) {
          this.setState({
            index: extraInfo.countIncludeLogicDelete
          });
        }
      }
      // 进行真实处理
      const { ossConfig, fileConfig, searchParam } = this.props.fileListResult.value;
      console.log('## handleChange this.props.fileListResult.value:', this.props.fileListResult.value);
      const { bizCode } = searchParam;
      let fileName = `F_${bizCode}`;
      const { tempFileList } = this.props;
      console.log('## handleChange tempFileList', tempFileList);
      if (Array.isArray(tempFileList)) {
        tempFileList.some((record) => {
          console.log('record = ', record);
          if (record.uid === info.file.uid) {
            fileName = `${fileName}_${this.state.index}`;
            console.log('#### uid fileName = ', fileName);
            return true;
          }
          return false;
        });
      }
      console.log('## handleChange tempFileList after', tempFileList);
      console.log('## handleChange uploadFile after done', this.props.tempSingleFile);
      if (this.props.tempSingleFile) {
        const formData = dealFileUtil.prepareFormData(this.props.tempSingleFile, fileName, ossConfig);
        const dealFileUrl = fileConfig.uploadFileUrl;
        const promise = dealFileUtil.dealFile(dealFileUrl, formData);
        promise.then(
          (result) => {
            console.log('#### 调用promise.then result = ', result);
            if (result.success === false) {
              Modal.error({
                title: '错误',
                content: result.errorMsg
              });
            } else {
              const fileInfoList = result.value;
              console.log('### 上传之后的fileInfoList信息：', fileInfoList);
              const fileInfo = {};
              if (Array.isArray(fileInfoList)) {
                const fileRecord = fileInfoList[0];
                fileInfo.fileName = fileRecord.fileName;
                fileInfo.filePath = fileRecord.filePath;
                fileInfo.bizCode = bizCode;
              }
              console.log('### 组装上传文件相关信息：', fileInfo);
              if (fileInfo) {
                // 文件信息存在-保存到数据库
                this.props.saveSingleFileInfo(fileInfo);
                const timer = setInterval(
                  () => {
                    if (this.props.saveSinglefileResult && this.props.saveSinglefileResult.success === true) {
                      // 查询文件
                      this.handleQuery(searchParam);
                      this.props.saveTempSingleFileInfo({});
                      clearInterval(timer);
                    }
                    if (this.props.saveSinglefileResult && this.props.saveSinglefileResult.success === false) {
                      Modal.error({
                        title: '错误',
                        content: this.props.saveSinglefileResult.errorMsg
                      });
                      clearInterval(timer);
                    }
                  }, 1000
                );
              }
            }
          }
        ).catch((result) => {
          Modal.error({
            title: '错误',
            content: result.errorMsg
          });
        });
      }
    }
    if (info.file.status === 'error') {
      this.props.saveTempFileInfo([]);
      this.setState({
        fileList: []
      });
      Modal.error({
        title: '错误',
        content: '上传文件失败'
      });
    }
  }

  /**
   * 删除文件
   * @param {*} file
   */
  handleRemove(file) {
    console.log('## handleRemove file', file);
    // 调用后台方法删除文件
    const delFileInfo = {
      id: file.uid
    };
    Modal.confirm({
      title: '确认删除',
      onOk: () => {
        console.log('## handleRemove delFileInfo', delFileInfo);
        this.props.deleteFileInfo(delFileInfo);
        const { searchParam } = this.props.fileListResult.value;
        const timer = setInterval(
          () => {
            if (this.props.delFileResult && this.props.delFileResult.success === true) {
              // 查询文件
              this.handleQuery(searchParam);
              clearInterval(timer);
            }
            if (this.props.delFileResult && this.props.delFileResult.success === false) {
              // 删除失败
              Modal.error({
                title: '错误',
                content: this.props.delFileResult.errorMsg
              });
              clearInterval(timer);
            }
          }, 1000
        );
      }
    });
  }

  /**
   * 查询附件处理
   * @param {查询条件} searchParam
   */
  handleQuery(searchParam) {
    console.log('## handleQuery 查询文件信息searchParam：', searchParam);
    this.props.queryFileInfo(searchParam);
    const queryTimer = setInterval(
      () => {
        if (this.props.fileListResult && this.props.fileListResult.success === true) {
          // 前台界面渲染
          const { extraInfo } = this.props.fileListResult;
          this.setState({
            fileList: this.props.tempFileList,
            bizCode: searchParam.bizCode,
            index: extraInfo ? extraInfo.countIncludeLogicDelete : 0
          });
          clearInterval(queryTimer);
        }
        if (this.props.fileListResult && this.props.fileListResult.success === false) {
          // 查询失败
          Modal.error({
            title: '错误',
            content: this.props.fileListResult.errorMsg
          });
          clearInterval(queryTimer);
        }
      }, 1000
    );
  }

  /**
   * 文件是否直接展示
   * @param {*} file
   */
  handlePreviewDirectFlag(file) {
    console.log('file:', file);
    console.log('previewFile:', this.state.previewFile);
    let isPreviewDirect = false;
    const fileName = file.name;
    if (fileName) {
      if (fileName.indexOf('pdf') !== -1 || fileName.indexOf('png') !== -1 || fileName.indexOf('jpeg') !== -1
      || fileName.indexOf('mp4') !== -1 || fileName.indexOf('mov') !== -1 || fileName.indexOf('MP4') !== -1 || fileName.indexOf('MOV') !== -1) {
        isPreviewDirect = true;
      }
    }
    return isPreviewDirect;
  }

  render() {
    const {
      previewVisible, previewFile, fileList
    } = this.state;

    const { tempFileList, delFileAuth } = this.props;

    console.log('SingleFileUploadComp render tempFileList', tempFileList);
    console.log('SingleFileUploadComp render this.state.index', this.state.index);
    console.log('SingleFileUploadComp render fileList', fileList);

    const isPreviewDirect = this.handlePreviewDirectFlag(previewFile);

    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div className='ant-upload-text'>Upload</div>
      </div>
    );

    // 附件查看的情况下修改样式，不允许删除
    const uploadClassResult = this.props.singleUploadMode === 'view' || !delFileAuth ? styles.singleUpload : '';

    return (
      <div className='clearfix'>
        <div className={uploadClassResult}>
          <Upload
            listType='picture-card'
            action='/api/common/common/tempUploadFile'
            fileList={fileList && fileList.length > 0 ? fileList : tempFileList}
            onPreview={this.handlePreview}
            beforeUpload={(file, fileInfoList) => this.handleBeforeUpload(file, fileInfoList)}
            onChange={this.handleChange}
            onRemove={this.handleRemove}
          >
            {tempFileList.length >= 10 || this.props.singleUploadMode === 'view' ? null : uploadButton }
          </Upload>
        </div>

        <Modal
          title='附件预览'
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
          width='60%'
        >
          {
            isPreviewDirect ?
              <div >
                <iframe
                  title={previewFile.uid}
                  allowFullScreen={true}
                  src={previewFile.url}
                  frameBorder={0}
                  style={{
                    width: '100%',
                    height: '700px'
                  }}
                />
              </div>
            :
              <div >
                <span ><a href={previewFile.url} >文件不能预览请前往下载</a></span>
              </div>
          }
        </Modal>
      </div>
    );
  }
}
SingleFileUploadComp.pageTitle = '上传文件';
export default SingleFileUploadComp;
