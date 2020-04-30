const formatNum = (num) => {
  num = num.toString()
  return num[1] ? num : '0' + num
}
/**
 *
 * @param {*} time
 * @param {*} separator 年月日的分隔符,默认为'-'
 * @param {*} separatorMinu 分秒的分隔符,默认为':
 */
export const formatDate = (time, separator = '-', separatorMinu = ':') => {
  const date = new Date(time)
  if (!date) { return '' }
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  const min = date.getMinutes()
  // const ss = date.getSeconds()
  return [y, m, d].map(formatNum).join(separator) + ' ' + [d, min].map(formatNum).join(separatorMinu)
}
