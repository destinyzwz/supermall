// 防抖函数
export function debounce(func, delay) {
  let timer = null;
  return function(...args) {
    if(timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay)
  }
}

// 时间戳转为时间格式, (date是一个Date对象, fmt是时间格式字符串)
export function formatDate(date, fmt) {
  // 1. 获取年份
  if(/(y+)/.test(fmt)) {
    // RegExp.$1是RegExp(js内置对象-正则表达式)的一个属性，指与正则表达式匹配的第一个子匹配(以括号为标志)字符串，RegExp.$2，RegExp.$3，..RegExp.$99总共可以有99个匹配
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  // 2.
 /* ？表示可有可无，至多一个
  * 表示可有可无,多了不限
  + 表示至少一个,多了不限 */
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };

  for(let k in o) {
    if(new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

// 保证格式是两位，只有一位用0补齐 04:04:04
function padLeftZero(str) {
  return ('00' + str).substr((str.length));
}
