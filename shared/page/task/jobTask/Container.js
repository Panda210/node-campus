import { smart } from 'funsee-smart';
import { Modal } from 'antd';
import { TaskQueryComp } from '../component';
import * as schema from './schema';
import * as actions from '../action';
import * as commonAction from '../../../common/action';
import * as commonTool from '../../../utils/tool';

export default smart({
  moduleName: 'jobTask',
  schema,
  findPageCustom: (props) => {
    console.log('findPage props:', props);
    console.log('findPage props.queryObj:', props.queryObj);
    props.dispatch(actions.findPageCustom(props.queryObj));
  },
  taskEdit: (props, record) => {
    props.dispatch(actions.setEditData(record));
    props.dispatch(commonAction.transDataFctf({
      taskModalVisible: true,
      taskMode: 'edit',
      fileDelAuth: record.fileDelAuth,
      taskSearchParam: {
        bizCode: record.code
      }
    }));
    props.dispatch(commonAction.queryFileInfo({
      bizCode: record.code
    }));
    props.dispatch(actions.queryTaskCommentList({
      pageNum: 1,
      pageSize: commonTool.commonPageSize,
      param: {
        taskCode: record.code
      },
      sort: [
        {
          direction: 'ASC',
          property: 'submitTime'
        }
      ]
    }));
  },
  taskView: (props, record) => {
    props.dispatch(actions.setEditData(record));
    props.dispatch(commonAction.transDataFctf({
      taskModalVisible: true,
      taskMode: 'view',
      taskSearchParam: {
        bizCode: record.code
      }
    }));
    props.dispatch(commonAction.queryFileInfo({
      bizCode: record.code
    }));
    props.dispatch(actions.queryTaskCommentList({
      pageNum: 1,
      pageSize: commonTool.commonPageSize,
      param: {
        taskCode: record.code
      },
      sort: [
        {
          direction: 'ASC',
          property: 'submitTime'
        }
      ]
    }));
  },
  taskAssign: (props, record) => {
    props.dispatch(commonAction.transDataFctf({
      assignModalVisible: true,
      record,
      mode: 'assign',
      editSchema: record.assignSchema
    }));
  },
  taskResolve: (props, record, primaryKey) => {
    Modal.confirm({
      title: '确认解决',
      content: `当前被选中的行: ${record[primaryKey]}`,
      onOk: () => {
        props.dispatch(actions.resolve({ id: record.id }));
      }
    });
  },
  taskComplete: (props, record, primaryKey) => {
    Modal.confirm({
      title: '确认完成',
      content: `当前被选中的行: ${record[primaryKey]}`,
      onOk: () => {
        props.dispatch(actions.complete({ id: record.id }));
      }
    });
  },
  taskClose: (props, record, primaryKey) => {
    Modal.confirm({
      title: '确认关闭',
      content: `当前被选中的行: ${record[primaryKey]}`,
      onOk: () => {
        props.dispatch(actions.close({ id: record.id }));
      }
    });
  }
})(TaskQueryComp);
