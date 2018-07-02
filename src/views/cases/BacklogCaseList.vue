<template>
  <div>
    <tab :animate="false" :line-width="0">
      <tab-item selected @on-item-click="findOwnList4Emp" active-class="active-05">已受理</tab-item>
      <tab-item @on-item-click="findBacklogList4Emp" active-class="active-01">待受理</tab-item>
    </tab>
    <CaseItems :items="cases"></CaseItems>
    <div v-if="lastPage"><load-more :show-loading="false" :tip="'没有更多数据'" background-color="#fbf9fe"></load-more></div>
    <div v-else><box gap="10px 10px"><x-button plain type="primary" @click.native="loadMore">加载更多</x-button></box></div>
  </div>
</template>

<script>
  import {Tab, TabItem, LoadMore, XButton, Box} from 'vux'
  import CaseItems from './CaseItems.vue'

  export default {
    components: {
      Tab,
      TabItem,
      LoadMore,
      XButton,
      Box,
      CaseItems
    },
    mounted () {
      this.findOwnList4Emp()

      this.$store.dispatch('setCaseMenus', {
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
      })
    },
    methods: {
      findOwnList4Emp () {
        this.actionUrl = urls.cases.api.findOwnList4Emp
        this.pageNo = 1
        this.$ajax.post(this.actionUrl, {
          openId: window.sessionStorage.getItem('userId'),
          scroller: {
            pageNo: this.pageNo
          }
        })
          .then((response) => {
            if (response.data.resultFlag === constants.resultFlag.success) {
              this.cases = response.data.caseList
              this.pageNo = response.data.pageNo
              this.lastPage = response.data.lastPage
            }
          })
      },
      findBacklogList4Emp () {
        this.actionUrl = urls.cases.api.findBacklogList4Emp
        this.pageNo = 1
        this.$ajax.post(this.actionUrl, {
          openId: window.sessionStorage.getItem('userId'),
          scroller: {
            pageNo: this.pageNo
          }
        })
          .then((response) => {
            if (response.data.resultFlag === constants.resultFlag.success) {
              this.cases = response.data.caseList
              this.pageNo = response.data.pageNo
              this.lastPage = response.data.lastPage
            }
          })
      },
      loadMore () {
        if (!this.lastPage) {
          this.$ajax.post(this.actionUrl, {
            openId: window.sessionStorage.getItem('userId'),
            scroller: {
              pageNo: this.pageNo
            }
          })
            .then((response) => {
              if (response.data.resultFlag === constants.resultFlag.success) {
                this.cases.push(...response.data.caseList)
                this.pageNo = response.data.pageNo
                this.lastPage = response.data.lastPage
              }
            })
        }
      }
    },
    data () {
      return {
        lastPage: false,
        pageNo: 1,
        actionUrl: urls.cases.api.findOwnList4Emp,
        cases: {},
        processList: []
      }
    }
  }
</script>
<style>
  .active-01 {
    color: #FFFFFF !important;
    background-color: #40a0eb !important;
  }

  .active-05 {
    color: #FFFFFF !important;
    background-color: #B4C976 !important;
  }
</style>
