<template>
    <div>
        <router-view v-wechat-title="$route.meta.title" :img-set="logo"></router-view>
        <loading v-model="getLoading.showFlag" :text="getLoading.info"></loading>
    </div>
</template>

<script>
  import {Loading} from 'vux'
  import {mapGetters} from 'vuex'

  export default {
    components: {
      Loading
    },
    computed: {
      ...mapGetters([
        'getLoading'
      ])
    },
    data () {
      return {
        logo: require('./assets/img/icon_1.png')
      }
    }
  }
</script>

<style lang="less">
    @import '~vux/src/styles/reset.less';

    body {
        background-color: #fbf9fe;
    }
</style>
