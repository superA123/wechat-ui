export default {
  getOpenId: (state) => {
    return state.openId
  },
  getDict: (state) => {
    return state.dict
  },
  getInfo: (state) => {
    return state.info
  },
  getSearchCaseCondition: (state) => {
    return Object.assign(state.searchCaseCondition, {openId: window.sessionStorage.getItem('userId')})
  },
  getCases: (state) => {
    return state.cases
  },
  getCaseMenus: (state) => {
    return state.CaseMenus
  },
  getLoading: (state) => {
    return state.loading
  }
}
