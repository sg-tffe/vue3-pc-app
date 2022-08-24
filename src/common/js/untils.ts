import { PureObject } from '@/constants/variableType'

export function initExportParams(searchInfo: any = {}) {
  let query = ''
  Object.keys(searchInfo).forEach((item) => {
    if (Array.isArray(searchInfo[item])) {
      searchInfo[item].forEach((ele: any, ind: number) => {
        query += `${item}[${ind}]=${ele}&`
      })
    } else {
      query += `${item}=${!searchInfo[item] ? '' : searchInfo[item]}&`
    }
  })
  return query
}

export function formatDate(date: Date, format = 'yyyy-MM-dd') {
  const o: PureObject = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}

export function getDate(index: number = 0) {
  const timestamp = new Date().setDate(new Date().getDate() + index)
  return new Date(timestamp)
}

export function getCookie(name: string) {
  const value = '; ' + document.cookie
  const parts: any = value.split('; ' + name + '=')
  if (parts.length === 2) {
    return parts.pop().split(';').shift()
  }
}

/** 判断时间选择范围 */
export function dateRageValidate(startTime: string, endTime: string) {
  if (startTime && endTime) {
    const _startTime = new Date(startTime)
    const _endTime = new Date(endTime)
    return _startTime.getTime() <= _endTime.getTime()
  }
  return false
}

/** 一维数组转换为二维数组 */
export function transformArray(arr: any, size: number = 2) {
  // arr是一维数组 size是二维数组包含几条数据
  if (Array.isArray(arr) && !arr.length) {
    return []
  }
  const newArr = []
  for (let i = 0; i < arr.length; i = i + size) {
    newArr.push(arr.slice(i, i + size))
  }
  return newArr // 新的二维数组
}

/** 简易版 深度克隆 */
export function clone(target: PureObject, map = new Map()) {
  if (typeof target === 'object' && target !== null) {
    const cloneTarget: PureObject = Array.isArray(target) ? [] : {}
    if (map.get(target)) {
      return map.get(target)
    }
    map.set(target, cloneTarget)
    for (const key in target) {
      if (target[key] !== undefined) {
        cloneTarget[key] = clone(target[key], map)
      }
    }
    return cloneTarget
  } else {
    return target
  }
}
