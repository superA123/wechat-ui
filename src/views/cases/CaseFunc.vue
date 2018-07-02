<template>
  <div>
    <div v-if="Object.keys(caseMenus).join('|').indexOf(item.status) >= 0">
      <actionsheet v-model="showStatus" :menus="caseMenus[item.status]" @on-click-menu="click" show-cancel
                   cancel-text="取消"></actionsheet>
    </div>
    <div v-else>
      <div v-if="processList.length > 0">
        <popup v-model="showStatus">
          <CaseTimeline :processList="processList"></CaseTimeline>
        </popup>
      </div>
    </div>
  </div>
</template>
<script>
  import {Popup, Actionsheet} from 'vux'
  import CaseTimeline from './CaseTimeline'

  export default {
    props: ['item', 'processList'],
    components: {
      Popup,
      Actionsheet,
      CaseTimeline
    },
    mounted () {
      this.$bus.off('case-menu-show', this.showMenu)
      this.$bus.$on('case-menu-show', this.showMenu)
    },
    beforeDestroy () {
      this.$bus.off('case-menu-show', this.showMenu)
    },
    methods: {
      click (key) {
        if (key !== 'cancel') {
          this[key]()
        }
      },
      assign () {
        this.$ajax.post(urls.cases.api.assignCase, {
          openId: window.sessionStorage.getItem('userId'),
          id: this.item.id,
          caseNo: this.item.caseNo
        })
          .then((response) => {
            if (response.data.resultFlag === constants.resultFlag.success) {
              this.$store.dispatch('setInfo', {
                title: '受理成功',
                description: '继续受理请点击待办查询',
                icon: 'success',
                buttons: [{
                  type: 'primary',
                  text: '待办查询',
                  link: urls.cases.routes.backlog
                }, {
                  type: 'default',
                  text: '返回首页',
                  link: urls.common.routes.home
                }]
              })
            } else if (response.data.resultFlag === constants.resultFlag.error) {
              this.$store.dispatch('setInfo', {
                title: '受理失败',
                description: '该工单已被其他工程师受理',
                icon: 'warn',
                buttons: [{
                  type: 'primary',
                  text: '待办查询',
                  link: urls.cases.routes.backlog
                }, {
                  type: 'default',
                  text: '返回首页',
                  link: urls.common.routes.home
                }]
              })
            }

            this.$router.push({
              path: urls.common.routes.msg
            })
          })
      },
      close () {
        this.$ajax.post(urls.cases.api.finishCase, {
          openId: window.sessionStorage.getItem('userId'),
          id: this.item.id,
          caseNo: this.item.caseNo,
          order: {
            cases: {
              caseNo: this.item.caseNo
            }
          }
        })
          .then((response) => {
            if (response.data.resultFlag === constants.resultFlag.success) {
              this.$store.dispatch('setInfo', {
                title: '关单成功',
                description: '工单关闭',
                icon: 'success',
                buttons: [{
                  type: 'primary',
                  text: '待办查询',
                  link: urls.cases.routes.backlog
                }, {
                  type: 'default',
                  text: '返回首页',
                  link: urls.common.routes.home
                }]
              })
            } else if (response.data.resultFlag === constants.resultFlag.error) {
              this.$store.dispatch('setInfo', {
                title: '关单失败',
                description: '该工单已被其他工程师操作',
                icon: 'warn',
                buttons: [{
                  type: 'primary',
                  text: '待办查询',
                  link: urls.cases.routes.backlog
                }, {
                  type: 'default',
                  text: '返回首页',
                  link: urls.common.routes.home
                }]
              })
            }

            this.$router.push({
              path: urls.common.routes.msg
            })
          })
      },
      rollback () {
        this.$router.push({
          path: urls.cases.routes.transfer + this.item.caseNo
        })
      },
      showMenu (caseNo) {
        if (this.item.caseNo === caseNo) {
          this.showStatus = true
        }
      }
    },
    data () {
      return {
        showStatus: false,
        caseMenus: this.$store.getters.getCaseMenus
      }
    }
  }
</script>
<style>
  @import "~weui/dist/style/weui.min.css"
</style>
