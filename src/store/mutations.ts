import * as types from './mutation-types'
import { MutationTree } from 'vuex'
import { State } from '@/constants/variableType'

const mutations: MutationTree<State> = {
  [types.GET_SELECT_ITEMS](state, selectItems: []) {
    state.selectItems = selectItems
  },
  [types.SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo
  },
  [types.SET_ROLES](state, roleInfo) {
    state.roleInfo = roleInfo
  }
}

export default mutations
