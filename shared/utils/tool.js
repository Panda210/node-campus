/**
 * 根据 List<Object> object中的某个属性codeProperty对应的值nameProperty
 * @param {*} code
 * @param {*} allDistrctInfo
 */
const getNameByCode = (code, list, codeProperty, nameProperty) => {
  let name = '';
  if (code && Array.isArray(list)) {
    list.some((record) => {
      if (record[codeProperty] === code) {
        name = record[nameProperty];
        return true;
      }
      return false;
    });
  }
  return name;
};

/**
 * 根据 List<Object> object中的某个属性codeProperty对应的值nameProperty
 * @param {*} code
 * @param {*} allDistrctInfo
 */
const getNameByCodeFromMap = (code, groupMap, group, codeProperty, nameProperty) => {
  if (!groupMap) {
    return code;
  }
  const list = groupMap[group];
  let name = code;
  if (code && Array.isArray(list)) {
    list.some((record) => {
      if (record[codeProperty] === code) {
        name = record[nameProperty];
        return true;
      }
      return false;
    });
  }
  return name;
};

/**
 * 正式日期
 * @param {日期} date
 */
const normalizeDate = (date) => {
  if (date === null) {
    return '';
  }
  if (typeof dete === 'string') {
    date = date.replace(/-/g, '/');
    date = new Date(date);
  }
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  if (date.toString() === 'Invalid Date') {
    return '';
  }
  return date;
};

/**
 * 日期-时间格式化
 * @param {日期} date
 * @param {格式} fmt
 */
const formatDate = (date, fmt) => {
  const _date = normalizeDate(date);
  if (_date) {
    const o = {
      'M+': _date.getMonth() + 1, // 月份
      'd+': _date.getDate(), // 日
      'h+': _date.getHours(), // 小时
      'm+': _date.getMinutes(), // 分
      's+': _date.getSeconds(), // 秒
      'q+': Math.floor((_date.getMonth() + 3) / 3), // 季度
      S: _date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (`${_date.getFullYear()}`).substr(4 - RegExp.$1.length));
    for (const k in o) { if (new RegExp(`(${k})`).test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length))); }
    return fmt;
  }
  return '';
};

/**
 * 日期格式
 */
const dateFormats = {
  DATE_FMT: 'yyyy-MM-dd',
  TIMESTAMP_FMT: 'yyyy-MM-dd hh:mm:ss'
};

/**
 * 通用分页数量
 */
const commonPageSize = 10;

export default {
  getNameByCode,
  getNameByCodeFromMap,
  normalizeDate,
  formatDate,
  dateFormats,
  commonPageSize
};
