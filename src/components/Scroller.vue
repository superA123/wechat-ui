<template>
  <div>
    <div v-if="(total > list.length)">
      <box gap="10px 10px">
        <x-button plain type="primary" @click.native="loadMore">加载更多</x-button>
      </box>
    </div>
    <div v-else>
      <load-more :show-loading="false" :tip="'没有更多数据'" background-color="#fbf9fe"></load-more>
    </div>
  </div>
</template>
<script>
  import {LoadMore, Box, XButton} from 'vux'

  export default {
    props: {
      total: Number,
      list: Array,
      loadMore: Function
    },
    components: {
      LoadMore,
      Box,
      XButton
    },
    methods: {
      getInitScroller () {
        return {
          pageNo: 1,
          pageSize: constants.page.pageSize
        }
      },
      getScroller () {
        return {
          pageNo: Math.ceil(this.list.length / constants.page.pageSize) + 1,
          pageSize: constants.page.pageSize
        }
      }
    },
    data () {
      return {}
    }
  }
</script>
<style>
</style>
