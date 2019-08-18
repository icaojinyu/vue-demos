export function formatTime(d) {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

export function afterFormatTime(str, arg1, arg2) {
  return `哈哈哈哈,现在是${str},${arg1},${arg2}`
}