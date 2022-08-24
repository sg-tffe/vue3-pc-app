import axios from 'axios'
import { Message } from 'view-ui-plus'

let axiosInstance: any = {}
axiosInstance = axios.create({
  timeout: 40000,
  maxContentLength: 2000,
  headers: {},
  responseType: 'json'
})

axiosInstance.interceptors.request.use(
  (config: any) => {
    if (config.method.toLowerCase() === 'get') {
      config.params = config.data
    }
    const requestConfig = Object.assign({}, config)
    return requestConfig
  },
  (error: any) => {
    Message.error({
      content: error.message || '服务器异常'
    })
    return Promise.reject(error.message)
  }
)

axiosInstance.interceptors.response.use(
  (response: any) => {
    const data = response.data
    if (+data.code === 10010) {
      window.location.href = '/login'
      return
    }
    if (+data.code !== 200) {
      Message.error({
        content: data.msg || '服务器异常'
      })
    }
    return data
  },
  (error: any) => {
    Message.error({
      content: error.message || '服务器异常'
    })
    return Promise.reject(error)
  }
)
export default axiosInstance
