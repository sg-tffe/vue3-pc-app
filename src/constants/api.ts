const host = process.env.NODE_ENV === 'production' ? '/tf' : '/api'

export const siteApi = {
  loginOut: `${host}/session/logout`,
  authInfo: `${host}/session/user`,
  login: `${host}/session/login`,
  getList: `${host}/session/getlist`
}

export const commonApi = {
  select: `${host}/config/data`
}
