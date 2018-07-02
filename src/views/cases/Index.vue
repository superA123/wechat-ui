<template>
  <div>
    <div class="">
      <img src="../../assets/img/img_title.jpg" style="width:100%; height:auto;">
    </div>
    <br>
    <grid>
      <grid-item :link="{ path: urls.cases.routes.backlog}" :label="menuNames.backlogQuery">
        <img slot="icon" src="../../assets/img/icon_04.png">
      </grid-item>
      <grid-item :link="{ path: urls.cases.routes.history.search}" :label="menuNames.historyQuery">
        <img slot="icon" src="../../assets/img/icon_05.png">
      </grid-item>
      <grid-item :link="{ path: urls.cases.routes.binding}" :label="menuNames.IdBinding">
        <img slot="icon" src="../../assets/img/icon_binding.png">
      </grid-item>
      <!--<grid-item :link="{ path: urls.cases.routes.analysis}" :label="menuNames.analysis">-->
        <!--<img slot="icon" src="../../assets/img/icon_03.png">-->
      <!--</grid-item>-->
    </grid>
    <div class="weui-footer">
      <P class="weui-footer__text">Copyright @ 2015-2017 东软云科技</P>
      <P class="weui-footer__text">V0.8.0</P>
    </div>
  </div>
</template>

<script>
  import {Grid, GridItem} from 'vux'

  export default {
    components: {
      Grid,
      GridItem
    },
    mounted () {
      if (window.sessionStorage.getItem('userId') == null) {
        window.sessionStorage.setItem('userId', this.$route.query.userId)
      }

      if (window.sessionStorage.getItem('dict') == null) {
        this.$ajax.post(urls.common.api.dict, {})
          .then((response) => {
            if (response.data.resultFlag === constants.resultFlag.success) {
              window.sessionStorage.setItem('dict', JSON.stringify(response.data.dictList))
            }
          })
      }

      if (this.$route.query.redirectTo) {
        this.$router.push({path: this.$route.query.redirectTo, query: this.$route.query})
      }
    },
    methods: {},
    data () {
      return {
        menuNames: {
          backlogQuery: '待办列表',
          historyQuery: '历史查询',
          IdBinding: '身份验证',
          analysis: '工单统计'
        },
        urls: urls
      }
    }
  }
</script>

<style>
  @import "~weui/dist/style/weui.min.css"
</style>
