import getters from './getters'

const state = {
  openId: '',
  dict: [],
  info: {
    title: '操作成功',
    description: '',
    icon: 'success',
    buttons: [{
      type: 'primary',
      text: '返回首页',
      link: '/index'
    }, {
      type: 'default',
      text: '',
      link: ''
    }]
  },
  searchCaseCondition: {
  },
  cases: {
  },
  CaseMenus: {
    '01': [{
      label: '受理',
      type: 'Primary',
      value: 'assign'
    }],
    '05': [{
      label: '完成',
      type: 'Primary',
      value: 'close'
    }, {
      label: '转单',
      type: 'Primary',
      value: 'rollback'
    }]
  },
  loading: {
    showFlag: false,
    info: '加载中'
  }
}

const mutations = {
  setOpenId (state, openId) {
    state.openId = openId
  },
  setDict (state, dict) {
    state.dict = dict
  },
  setInfo (state, info) {
    state.info = info
  },
  setSearchCaseCondition (state, searchCaseCondition) {
    state.searchCaseCondition = searchCaseCondition
  },
  setCases (state, cases) {
    state.cases = cases
  },
  setCaseMenus (state, CaseMenus) {
    state.CaseMenus = CaseMenus
  },
  loading (state, loading) {
    state.loading = loading
  }
}

export default {
  state,
  mutations,
  getters
}
