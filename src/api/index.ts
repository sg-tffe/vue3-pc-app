import axiosInstance from '@/interceptors/axios'
import { siteApi } from '@/constants/api'
import { Result } from '@/constants/variableType'

// login  module
export const login = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: siteApi.login,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const loginOut = (callback?: any) => {
  axiosInstance({
    method: 'post',
    url: siteApi.loginOut
  }).then((res: Result) => {
    callback(res)
  })
}

export const getList = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: siteApi.getList,
    data
  }).then((res: Result) => {
    callback(res)
  })
}
