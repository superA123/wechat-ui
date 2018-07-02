<template>
  <div>
    <div class="weui-cells">
      <div>
        <calendar title="开单-开始日期" v-model="searchCreateDateBegin"></calendar>
      </div>
      <div>
        <calendar title="开单-结束日期" v-model="searchCreateDateEnd"></calendar>
      </div>
    </div>
    <box gap="13px 13px">
      <x-button type="primary" action-type="button" @click.native="searchCases">查询</x-button>
    </box>
  </div>
</template>

<script>
  import {Box, XInput, Selector, XButton, Search, Calendar} from 'vux'

  export default {
    components: {
      Box,
      XInput,
      Selector,
      XButton,
      Search,
      Calendar
    },
    mounted () {
    },
    methods: {
      searchCases () {
        this.$store.dispatch('setSearchCaseCondition', {
          searchCreateDateBegin: this.searchCreateDateBegin,
          searchCreateDateEnd: this.searchCreateDateEnd
        })

        this.$router.push({
          path: urls.cases.routes.history.list
        })
      }
    },
    data () {
      return {
        searchCreateDateBegin: '',
        searchCreateDateEnd: ''
      }
    }
  }
</script>

<style>

</style>
