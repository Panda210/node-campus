/* eslint-env browser */
/**
 * 上传文件-fileCode的相关配置
 */
const FILE_CODE_LIST = {
  // 腾讯云视频-活体认证
  FC0000000043: 'FC0000000043'
};

/**
 * 上传文件数据准备
 */
const prepareFormData = (files, fileName, ossConfig) => {
  const formData = new window.FormData();
  // 传递参数
  formData.append('file', files);
  formData.append('fileName', fileName);
  formData.append('ossConfigKey', ossConfig.ossConfigKey);
  formData.append('ossPath', ossConfig.filedir);
  console.log('### fromData info', files, fileName, ossConfig);
  return formData;
};

/**
 * 对文件处理
 * @param {文件处理的请求URL} url
 * @param {参数信息} formData
 */
const dealFile = (url, formData) => {
  let result = {};
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('POST', url);
    request.setRequestHeader('Access-Control-Allow-Origin', '*', 'Content-type', 'multipart/form-data');
    request.send(formData);
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        result = JSON.parse(request.responseText);
        resolve(result);
      }
      if (request.status !== 200) {
        result.success = false;
        result.errorMsg = '文件处理失败';
        reject(result);
      }
    };
  });
};

/**
 * 文件信息保存数据准备
 */
const prepareSaveFileData = (fileInfoList, bizCode) => {
  const fileList = [];
  console.log('## prepareSaveFileData fileInfoList = ', fileInfoList);
  if (Array.isArray(fileInfoList)) {
    fileInfoList.map((record) => {
      const fileInfo = {
        fileName: record.fileName,
        filePath: record.filePath,
        bizCode
      };
      fileList.push(fileInfo);
      return fileInfoList;
    });
  }
  const data = {
    bizCode,
    fileList
  };
  console.log('## prepareSaveFileData data =', data);
  return data;
};

export default {
  FILE_CODE_LIST,
  prepareFormData,
  dealFile,
  prepareSaveFileData
};
