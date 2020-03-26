// 检查路径是否被排除检查,支持正则
const isCheckExcluded4Path = (excludePaths, path) => {
  if (!excludePaths || !(excludePaths instanceof Array)) {
    return false;
  }
  for (let index = 0, length = excludePaths.length; index < length; index++) {
    const excludePath = excludePaths[index];
    if (((typeof (excludePath) === 'string') && path === excludePath)
      || ((excludePath instanceof RegExp) && excludePath.test(path))) {
      return true;
    }
  }
  return false;
  };

export default {
	isCheckExcluded4Path
};