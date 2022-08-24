import * as types from './mutation-types'
import { ActionTree, Action } from 'vuex'
import { State } from '@/constants/variableType'
import { getSelectItems } from '@/api/common'

const getSelectList: Action<State, State> = ({ commit }) => {
  return new Promise((resolve, reject) => {
    getSelectItems((res: any) => {
      if (+res.code === 200 && res.data) {
        const data = res.data || {}
        commit(types.GET_SELECT_ITEMS, data)
        resolve(data)
      } else {
        reject(res.msg)
      }
    })
  })
}

const getUserInfo: Action<State, State> = ({ commit }) => {
  const userInfo = localStorage.getItem('u.info')
  if (userInfo) {
    const info = userInfo.split('$%.?')
    const [user_name, rightId] = info
    commit(types.SET_USER_INFO, { user_name, rightId })
  }
}

const setUserInfo: Action<State, State> = ({ commit }, params) => {
  return new Promise((resolve: (value?: any) => void) => {
    localStorage.setItem('u.info', [params.user_name, params.rightId].join('$%.?'))
    commit(types.SET_USER_INFO, params)
    resolve()
  })
}

const actions: ActionTree<State, State> = {
  getSelectList,
  setUserInfo,
  getUserInfo
}

export default actions
