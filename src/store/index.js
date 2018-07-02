import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'

Vue.use(Vuex)

import mutations from './mutations'
import actions from './actions'

const store = new Vuex.Store({
  modules: {
    mutations,
    i18n: vuexI18n.store
  },
  actions
})

Vue.use(vuexI18n.plugin, store)

export default store
