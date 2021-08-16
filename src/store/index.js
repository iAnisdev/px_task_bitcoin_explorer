import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

export default new Vuex.Store({
  state: {
    blocks:[],
    currentBlock:{},
    loaderStatus: false
  },
  getters,
  mutations,
  actions
})
