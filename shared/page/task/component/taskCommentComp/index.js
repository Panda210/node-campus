import React, { Component as C } from 'react';
import { Form, Input, Button, Pagination, Modal, Popconfirm } from 'antd';
import * as styles from './style.scss';
import * as commonTool from '../../../../utils/tool';


const FormItem = Form.Item;
const { TextArea } = Input;
class TaskComment extends C {
  constructor() {
    super();
    this.handleAdd = this.handleAdd.bind(this);
    this.handleAddCancel = this.handleAddCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleReply = this.handleReply.bind(this);
    this.handleReplyComment = this.handleReplyComment.bind(this);
    this.handleReplySave = this.handleReplySave.bind(this);
    this.handleReplyCancel = this.handleReplyCancel.bind(this);
    this.handleQueryComments = this.handleQueryComments.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleModifyComment = this.handleModifyComment.bind(this);
    this.handleModify = this.handleModify.bind(this);
    this.handleModifyCancel = this.handleModifyCancel.bind(this);
    this.state = {
      isShowAddComment: false,
      isAllowAdd: false,
      isShowReplyComment: false,
      showReplyIndex: -1,
      isAllowReply: false,
      allowModifyIndex: -1
    };
  }

  /**
   * 添加评论
   */
  handleAdd() {
    this.setState({
      isShowAddComment: true,
      isAllowAdd: true
    });
  }

  /**
   * 添加评论 - 取消
   */
  handleAddCancel() {
    this.setState({
      isShowAddComment: false,
      isAllowAdd: false
    });
  }

  /**
   * 添加评论 - 保存
   */
  handleSave() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 保存评论信息
        console.log('#### 添加评论信息', values);
        const taskComment = {
          taskCode: values.taskCode,
          comments: values.comments
        };
        // 保存信息判断成功 则关闭-添加评论的框
        this.props.createTaskComment(taskComment);
        const timer = setInterval(
          () => {
            if (this.props.createTaskCommentResult && this.props.createTaskCommentResult.success === true) {
              // 查询评论列表
              this.handleQueryComments(1);
              this.handleAddCancel();
              Modal.success({
                title: '成功',
                content: '处理成功'
              });
              clearInterval(timer);
            }
            if (this.props.createTaskCommentResult && this.props.createTaskCommentResult.success === false) {
              Modal.error({
                title: '错误',
                content: this.props.createTaskCommentResult.errorMsg
              });
              clearInterval(timer);
            }
          }, 1000
        );
      }
    });
  }

  handleQueryComments(pageNum) {
    const { dataFctf } = this.props;
    const taskCode = dataFctf.taskSearchParam.bizCode;
    const queryParam = {
      pageNum,
      pageSize: commonTool.commonPageSize,
      param: {
        taskCode
      },
      sort: [
        {
          direction: 'ASC',
          property: 'submitTime'
        }
      ]
    };
    this.props.queryTaskCommentList(queryParam);
  }

  /**
   * 弹出回复框
   */
  handleReply(record, index) {
    this.setState({
      isShowReplyComment: true,
      showReplyIndex: index,
      isAllowReply: true
    });
    console.log('### 弹出回复框 ', this.state.showReplyIndex);
    const { dataFctf } = this.props;
    const replyTaskInfo = {
      parentId: record.id,
      taskCode: record.taskCode
    };
    dataFctf.replyTaskInfo = replyTaskInfo;
    this.props.transDataFctf(dataFctf);
  }

  /**
   * 回复框关闭
   */
  handleReplyCancel() {
    this.setState({
      isShowReplyComment: false,
      showReplyIndex: -1,
      isAllowReply: false
    });
    const { dataFctf } = this.props;
    const replyTaskInfo = {};
    dataFctf.replyTaskInfo = replyTaskInfo;
    this.props.transDataFctf(dataFctf);
  }

  /**
   * 回复评论内容填写
   */
  handleReplyComment(e) {
    const { dataFctf } = this.props;
    const { replyTaskInfo } = this.props.dataFctf;
    replyTaskInfo.comments = e.target.value;
    dataFctf.replyTaskInfo = replyTaskInfo;
    this.props.transDataFctf(dataFctf);
  }

  /**
   * 评论回复 保存
   */
  handleReplySave() {
    const { replyTaskInfo } = this.props.dataFctf;
    if (!replyTaskInfo) {
      Modal.error({
        title: '错误',
        content: '待回复评论信息不存在'
      });
    }
    // 保存评论信息
    if (replyTaskInfo) {
      const param = {
        parentId: replyTaskInfo.parentId,
        comments: replyTaskInfo.comments
      };
      this.props.replyTaskComment(param);
      // 保存信息判断成功 则关闭-添加评论的框
      const timer = setInterval(
        () => {
          if (this.props.replyTaskCommentResult && this.props.replyTaskCommentResult.success === true) {
            // 查询评论列表
            this.handleQueryComments(1);
            // 回复框关闭
            this.handleReplyCancel();
            Modal.success({
              title: '成功',
              content: '处理成功'
            });
            clearInterval(timer);
          }
          if (this.props.replyTaskCommentResult && this.props.replyTaskCommentResult.success === false) {
            Modal.error({
              title: '错误',
              content: this.props.replyTaskCommentResult.errorMsg
            });
            clearInterval(timer);
          }
        }, 1000
      );
    }
  }

  /**
   * 删除评论
   */
  handleDelete(record) {
    const param = {
      id: record.id
    };
    this.props.delTaskComment(param);
    // 评论删除成功 则重新刷新页面
    const timer = setInterval(
      () => {
        if (this.props.delTaskCommentResult && this.props.delTaskCommentResult.success === true) {
          // 查询评论列表
          this.handleQueryComments(1);
          Modal.success({
            title: '成功',
            content: '处理成功'
          });
          clearInterval(timer);
        }
        if (this.props.delTaskCommentResult && this.props.delTaskCommentResult.success === false) {
          Modal.error({
            title: '错误',
            content: this.props.delTaskCommentResult.errorMsg
          });
          clearInterval(timer);
        }
      }, 1000
    );
  }

  /**
   * 取消修改
   *
   * 【修改】点击对应的TextArea可以修改，并且【修改】文字改为【确定】
   *  修改具体内容
   * 【确定】点击了之后才真实修改了数据信息
   */
  handleModifyCancel() {
    this.setState({
      allowModifyIndex: -1
    });
    // 删除修改内容
    const { dataFctf } = this.props;
    const replyTaskInfo = {};
    dataFctf.replyTaskInfo = replyTaskInfo;
    this.props.transDataFctf(dataFctf);
  }

  /**
   * 修改数据信息
   * @param {*} record
   */
  handleModifyComment(e) {
    const { dataFctf } = this.props;
    const { modifyTaskInfo } = this.props.dataFctf;
    modifyTaskInfo.comments = e.target.value;
    dataFctf.modifyTaskInfo = modifyTaskInfo;
    this.props.transDataFctf(dataFctf);
  }

  /**
   * 修改评论
   */
  handleModify(record, modifyMode, index) {
    const { dataFctf } = this.props;
    if (modifyMode === 'MODIFY') {
      const modifyTaskInfo = {
        id: record.id
      };
      dataFctf.modifyTaskInfo = modifyTaskInfo;
      this.props.transDataFctf(dataFctf);
      this.setState({
        allowModifyIndex: index
      });
    }
    if (modifyMode === 'MODIFY_CONFIRM') {
      const param = {
        id: record.id,
        taskCode: record.taskCode,
        comments: dataFctf.modifyTaskInfo.comments
      };
      this.props.modifyTaskComment(param);
      // 评论修改成功 则重新刷新页面
      const timer = setInterval(
        () => {
          if (this.props.modifyTaskCommentResult && this.props.modifyTaskCommentResult.success === true) {
            // 查询评论列表
            this.handleQueryComments(1);
            // 删除修改内容
            const replyTaskInfo = {};
            dataFctf.replyTaskInfo = replyTaskInfo;
            this.props.transDataFctf(dataFctf);
            this.setState({
              allowModifyIndex: -1
            });
            Modal.success({
              title: '成功',
              content: '处理成功'
            });
            clearInterval(timer);
          }
          if (this.props.modifyTaskCommentResult && this.props.modifyTaskCommentResult.success === false) {
            console.log('this.props.modifyTaskCommentResult.errorMsg', this.props.modifyTaskCommentResult.errorMsg);
            Modal.error({
              title: '错误',
              content: this.props.modifyTaskCommentResult.errorMsg
            });
            clearInterval(timer);
          }
        }, 1000
      );
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loginUserInfo, dataFctf, queryTaskCommentListResult } = this.props;
    let searchParam = {};
    let mode = 'view';
    if (dataFctf) {
      mode = dataFctf.taskMode;
      searchParam = dataFctf.taskSearchParam;
    }
    const taskCommentList = queryTaskCommentListResult ? queryTaskCommentListResult.value : [];
    console.log('### render  this.state.isAllowAdd', this.state.isAllowAdd);
    return (
      <div>
        <div className={styles.commentAll}>
          <div>
            {
              taskCommentList && taskCommentList.length > 0 ?
                <div className={styles.commentList}>
                  {
                      taskCommentList.map((record, index) => (
                        <div key={index} className={styles.commentRecord}>
                          {/* 评论标题 */}
                          <div className={styles.commentTitle} >
                            <div className={styles.commentTitleLeft} >
                              {
                              record.parentId ?
                                <span>{record.submitUserName} <span className={styles.commentTitleSpec}>回复</span> {record.replyToUserName} 的评论:</span>
                              :
                                <span> {record.submitUserName}的评论: </span>
                              }
                            </div>
                            <div className={styles.commentTitleRight} >
                              { commonTool.formatDate(record.submitTime, commonTool.dateFormats.TIMESTAMP_FMT) }
                            </div>
                          </div>
                          {/* 评论内容 */}
                          <div className={styles.commentTextArea}>
                            <Input type='hidden' value={record.id} />
                            <div>
                              {
                                mode === 'edit' && index === this.state.allowModifyIndex ?
                                  <TextArea defaultValue={record.comments} disabled={false} autosize={true} onChange={this.handleModifyComment} />
                                :
                                  <TextArea value={record.comments} disabled={true} autosize={true} />
                              }
                            </div>
                          </div>

                          {/* 每个评论可以的操作  mode为edit表示可编辑，那么可以进行回复，删除，修改等操作 */}
                          <div>
                            {
                              mode === 'edit' ?
                                <div>
                                  <div>
                                    {
                                      this.state.isShowReplyComment && index === this.state.showReplyIndex ?
                                        <div className={styles.commentReplyInfo} >
                                          <div className={styles.commentReplyInfo} >
                                            <TextArea onChange={this.handleReplyComment} autosize={true} />
                                          </div>
                                          <div className={styles.commentActionFather}>
                                            <div className={styles.commentActionButtonLeft}>
                                              <Button onClick={this.handleReplySave} style={{ marginRight: '10px' }}>保存</Button>
                                            </div>
                                            <div className={styles.commentActionButtonRight}>
                                              <Button onClick={this.handleReplyCancel} >取消</Button>
                                            </div>
                                          </div>
                                        </div>
                                      :
                                        <div className={styles.commentAction}>
                                          {
                                            loginUserInfo && loginUserInfo.userAccount !== record.submitUser ?
                                              <span onClick={(e) => { e.preventDefault(); this.handleReply(record, index); }}>回复</span>
                                            :
                                            ''
                                          }
                                        </div>
                                    }
                                  </div>
                                  <div className={styles.commentAction}>
                                    {
                                      loginUserInfo && loginUserInfo.userAccount === record.submitUser ?
                                        <div>
                                          <div className={styles.commentEachAction}>
                                            <Popconfirm title='是否确定删除?' onConfirm={(e) => { e.preventDefault(); this.handleDelete(record); }} okText='是' cancelText='否'>
                                              <span>删除</span>
                                            </Popconfirm>
                                          </div>
                                          <div className={styles.commentEachAction}>
                                            <span style={{ margin: '0 10px' }} >|</span>
                                          </div>
                                          <div className={styles.commentEachAction}>
                                            {
                                              index === this.state.allowModifyIndex ?
                                                <div>
                                                  <span onClick={(e) => { e.preventDefault(); this.handleModify(record, 'MODIFY_CONFIRM', index); }}>确定</span>
                                                  <span style={{ margin: '0 10px' }} >|</span>
                                                  <span onClick={(e) => { e.preventDefault(); this.handleModifyCancel(); }}>取消</span>
                                                </div>
                                              :
                                                <span onClick={(e) => { e.preventDefault(); this.handleModify(record, 'MODIFY', index); }}>修改</span>
                                            }
                                          </div>
                                        </div>
                                      :
                                      ''
                                    }
                                  </div>
                                </div>
                              : ''
                            }
                          </div>
                        </div>
                    ))
                  }
                </div>
                : ''
              }
          </div>
          <div>
            {
                taskCommentList && taskCommentList.length > 0 ?
                  <div className={styles.commentPagination}>
                    <Pagination
                      total={queryTaskCommentListResult.totalCount}
                      pageSize={queryTaskCommentListResult.pageSize}
                      current={queryTaskCommentListResult.pageNum}
                      onChange={this.handleQueryComments}
                    />
                  </div>
                : ''
              }
          </div>
          <div>
            { mode === 'edit' ?
              <div className={styles.commentAddModel}>
                <div className={styles.commentAddButton}>
                  <Button onClick={this.handleAdd} disabled={this.state.isAllowAdd} style={{ background: this.state.isAllowAdd ? 'grey' : '#1890ff' }}>添加评论</Button>
                </div>
                <div className={styles.commentAddInfo}>
                  {
                  this.state.isShowAddComment ?
                    <Form>
                      <FormItem
                        style={{ fontSize: '0.9rem', textIndent: '0.5rem' }}
                        placeholder='请输入评论内容'
                      >
                        {getFieldDecorator('taskCode', {
                          initialValue: searchParam ? searchParam.bizCode : ''
                        })(
                          <Input type='hidden' />
                        )}
                        {getFieldDecorator('comments', {
                          rules: [{
                            required: true, message: '请输入评论内容'
                          }]
                        })(
                          <TextArea autosize={true} />
                        )}
                      </FormItem>
                      <div className={styles.commentActionFather}>
                        <div className={styles.commentActionButtonLeft}>
                          <Button onClick={this.handleSave} >保存</Button>
                        </div>
                        <div className={styles.commentActionButtonRight}>
                          <Button onClick={this.handleAddCancel} >取消</Button>
                        </div>
                      </div>
                    </Form>
                  : ''
                }
                </div>
              </div>
            : ''
            }
          </div>

        </div>
      </div>
    );
  }
}
const TaskCommentComp = Form.create()(TaskComment);
export default TaskCommentComp;
