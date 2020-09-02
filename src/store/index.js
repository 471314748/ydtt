import Vue from 'vue'
import Vuex from 'vuex'
import { getLocal } from '../utils/mylocal'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: getLocal('userInfo') || {}
  },
  mutations: {
    setUserInfo: function (state, value) {
      state.userInfo = value
    }
  },
  actions: {
  },
  modules: {
  }
})
