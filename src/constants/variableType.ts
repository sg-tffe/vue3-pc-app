export interface PureObject {
  [key: string]: any
}

export interface Result {
  code: number | string
  data: Record<string, unknown>
  msg?: string
}

export interface State {
  selectItems: PureObject | Record<string, unknown>
  userInfo: PureObject | Record<string, unknown>
  roleInfo: PureObject | Record<string, unknown>
}

export interface MenuList {
  title: string
  name: string
  icon: string
  subNav: Array<MenuItem>
  roleId?: number
  isShow: boolean
}

export interface MenuItem {
  title: string
  name: string
  icon?: string
  privId?: number
  isShow: boolean
  subNav?: Array<MenuItem>
}

export type ResultCallback = (res: Result) => void
