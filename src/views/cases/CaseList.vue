<template>
  <div>
    <CaseItems :items="cases"></CaseItems>
    <scroller :total="total" :list="cases" :loadMore="loadMore" ref="scroller"></scroller>
  </div>
</template>

<script>
  import {Card, XHeader, Countup, LoadMore, XButton, Box} from 'vux'
  import CaseItems from './CaseItems.vue'
  import Scroller from '../../components/Scroller'

  export default {
    components: {
      Countup,
      XHeader,
      Card,
      LoadMore,
      XButton,
      Box,
      CaseItems,
      Scroller
    },
    mounted () {
      this.refresh()
      this.$store.dispatch('setCaseMenus', {})
    },
    methods: {
      refresh () {
        this.$ajax.post(urls.cases.api.findHistoryList4Emp, Object.assign(this.$store.getters.getSearchCaseCondition, {
          scroller: this.$refs.scroller.getInitScroller()
        })).then((response) => {
          if (response.data.resultFlag === '00') {
            this.cases = response.data.caseList
            this.total = response.data.total
          }
        })
      },
      loadMore () {
        if (this.total > this.cases.length) {
          this.$ajax.post(urls.cases.api.findHistoryList4Emp, Object.assign(this.$store.getters.getSearchCaseCondition, {
            scroller: this.$refs.scroller.getScroller()
          }))
            .then((response) => {
              if (response.data.resultFlag === '00') {
                this.cases.push(...response.data.caseList)
              }
            })
        }
      }
    },
    data () {
      return {
        cases: [],
        total: 0
      }
    }
  }
</script>
<style>
</style>
