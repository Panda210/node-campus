# node-campus简易JIRA

## 技术框架
基于`react`的框架-`Funsee、Funsee Smart等相关框架`（架构师友人提供），具体可参考[Funsee Wiki](https://github.com/TheSecondLab/FunSee/wiki)。UI使用`antd`.

## 功能
* 统一登录验证
* 需求清单的维护，可上传需求文档
* 开发清单，关联需求。并可以分配到具体开发人员、设置完成截止日期。开发人员可进行解决-resolve。
* 测试清单，关联需求。并可以分配到具体测试人员、设置完成截止日期。测试人员可进行解决-resolve。
* Bug清单，关联需求。测试人员进行创建，并可指定分配给到开发人员。开发人员解决-resolve，测试人员进行bug复验，最终close.
* 在处理bug过程中，开发人员和测试人员都可以新增评论，并回复，方便直接沟通。将有效信息保存，方便后续回顾。

JIRA任务状态修改会自动发送邮件给到具体人员。
