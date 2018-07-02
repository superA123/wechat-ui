/**
 * Created by Clark on 2017/2/8.
 */
import Msg from '@/components/Msg'
import Error from '@/components/Error'

import Index from '@/views/cases/Index'
import IdBinding from '@/views/cases/IdBinding'
import BacklogCaseList from '@/views/cases/BacklogCaseList'
import CaseSearch from '@/views/cases/CaseSearch'
import CaseList from '@/views/cases/CaseList'
import CaseDetail from '@/views/cases/CaseDetail'
import CaseTransfer from '@/views/cases/CaseTransfer'
import CaseAnalysis from '@/views/cases/CaseAnalysis'

export default [{
  path: urls.common.routes.home,
  meta: {
    title: '自助办理'
  },
  component: Index
}, {
  path: urls.common.routes.msg,
  meta: {
    title: '提示消息'
  },
  component: Msg
}, {
  path: urls.cases.routes.binding,
  meta: {
    title: '身份验证'
  },
  component: IdBinding
}, {
  path: urls.cases.routes.backlog,
  meta: {
    title: '待办列表'
  },
  component: BacklogCaseList
}, {
  path: urls.cases.routes.history.search,
  meta: {
    title: '历史查询'
  },
  component: CaseSearch
}, {
  path: urls.cases.routes.history.list,
  meta: {
    title: '查询结果'
  },
  component: CaseList
}, {
  path: urls.cases.routes.detail,
  meta: {
    title: '工单详情'
  },
  component: CaseDetail
}, {
  path: urls.cases.routes.transfer + ':caseNo',
  meta: {
    title: '工单转单'
  },
  component: CaseTransfer
}, {
  path: urls.cases.routes.analysis,
  meta: {
    title: '工单统计'
  },
  component: CaseAnalysis
}, {
  path: urls.common.routes.error,
  meta: {
    title: '错误'
  },
  component: Error
}]
