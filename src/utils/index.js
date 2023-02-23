/**
 * @description 获取类型
 * @param {string} val 
 * @returns string
 */
export const getType = (val) => {
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase();
}
