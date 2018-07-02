<template>
  <div class="textalign">

    <img src="../assets/img/error_icon1.png" class="img180"></br>
    <img src="../assets/img/error_line.png" class="imgpadding35"></br>
    <strong class="strong28"> 哎呀,页面出错了!</strong></br>
    <div class="padding10_margin0 floatleft">

      <ul class="floatcenter">
        <li class="float_color">网络信号弱</li></br>
        <li class="float_color">找不到请求页面</li>
      </ul>
    </div>

    <div  class="paddingtop50">
      <span class="vertical_middle"><img src="../assets/img/refresh_icon.png" class="w40_h60_p10"><router-link :to="error">刷新</router-link></span>
      <span class="vertical_top"><img src="../assets/img/sy_icon.png" class="w40_h60_p10"><router-link :to="home">首页</router-link></span>
    </div>

  </div>
</template>

<script>
  import {Msg} from 'vux'
  import {mapGetters} from 'vuex'

  export default {
    computed: mapGetters({
      info: 'getInfo'
    }),
    components: {
      Msg
    },
    methods: {},
    data () {
      return {
        error: urls.common.routes.error,
        home: urls.common.routes.home
      }
    }
  }
</script>

<style>
  .textalign{text-align: center;padding-top:40px;}
  .img180{width:180px;height:180px;}
  .imgpadding35{padding-top:35px;padding-bottom:20px;}
  .strong28{font-size:28px; color:#7b7b7b;}
  .padding10_margin0{padding:10px 100px;margin:0 auto;}
  .floatcenter{margin:0 auto; padding-left:20%;padding-right:20%; width:100%;}
  .paddingtop50{text-align: center;padding-top:50px;}
  .float_color{float:left; color:#7b7b7b;}
  .vertical_middle{vertical-align: middle;}
  .vertical_top{padding-left:50px; vertical-align: middle;}
  .w40_h60_p10{width:40px;height:60px;padding-top:10px;}
</style>
