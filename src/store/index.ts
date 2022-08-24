import actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import { createStore, createLogger } from 'vuex'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state,
  mutations,
  actions,
  getters,
  strict: debug,
  plugins: debug ? [createLogger({})] : []
})
