/**
 * Created by dlwr1 on 2017/5/8.
 */
export const common = {
  routes: {
    home: '/index',
    msg: '/msg',
    error: '/error'
  },
  api: {
    dict: '/api/service/cases/dictList'
  }
}

export const cases = {
  routes: {
    history: {
      search: '/cases/history/search',
      list: '/cases/history/list'
    },
    detail: '/cases/detail',
    transfer: '/cases/transfer/',
    backlog: '/cases/backlog/list',
    binding: '/cases/binding',
    analysis: '/cases/analysis'
  },
  api: {
    idBinding: '/api/service/cases/idBinding',
    findOwnList4Emp: '/api/service/cases/ownList4Emp',
    findBacklogList4Emp: '/api/service/cases/backlogList4Emp',
    findHistoryList4Emp: '/api/service/cases/historyList4Emp',
    getCase: '/api/service/cases/getCase',
    assignCase: '/api/service/cases/assignCase',
    finishCase: '/api/service/cases/finishCase',
    employees: '/api/service/cases/employeeList',
    transfer: '/api/service/cases/transferCase'
  }
}
