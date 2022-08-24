import axiosInstance from '@/interceptors/axios'
import { commonApi } from '@/constants/api'
import { Result } from '@/constants/variableType'

export const getSelectItems = (callback: (data: any) => void) => {
  axiosInstance({
    method: 'post',
    url: commonApi.select
  }).then((res: Result) => {
    callback(res)
  })
}
