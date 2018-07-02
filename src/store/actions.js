export default {
  setOpenId: ({
    commit
  }, openId) => {
    commit('setOpenId', openId)
  },
  setDict: ({
    commit
  }, dict) => {
    commit('setDict', dict)
  },
  setInfo: ({
    commit
  }, info) => {
    commit('setInfo', info)
  },
  setSearchCaseCondition: ({
    commit
  }, searchCaseCondition) => {
    commit('setSearchCaseCondition', searchCaseCondition)
  },
  setCases: ({
    commit
  }, cases) => {
    commit('setCases', cases)
  },
  setCaseMenus: ({
    commit
  }, caseMenus) => {
    commit('setCaseMenus', caseMenus)
  },
  loading: ({
    commit
  }, loading) => {
    commit('loading', loading)
  }
}
