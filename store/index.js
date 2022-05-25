import Vue from 'vue'
import Vuex from 'vuex'
import {
  app,
  user
} from './modules'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
