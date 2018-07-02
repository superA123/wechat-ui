<template>
  <div>
    <div class="weui-panel">
      <div class="weui-panel__hd" @click="handleCase">
        编号：{{item.caseNo}}
      </div>
      <div class="weui-panel__bd" @click="getDetail">
        <div class="weui-media-box weui-media-box_text">
          <p class="weui-media-box__desc">
            项目名称：{{item.product.name}}
          </p>
          <p class="weui-media-box__desc">
          <span v-if="item.status === '01'">开单时间：{{item.updateDate | timeFilter}}</span>
          <span v-if="item.status === '05'">受理时间：{{item.updateDate | timeFilter}}</span>
          <span v-if="item.status === '08'">关闭时间：{{item.updateDate | timeFilter}}</span>
          <p class="weui-media-box__desc">问题描述：{{item.describes}}</p>
        </div>
      </div>
    </div>
    <popup v-model="showStatus">
      <CaseTimeline :processList="processList"></CaseTimeline>
    </popup>
  </div>
</template>
<script>
  import {Step, StepItem, Popup, Actionsheet} from 'vux'
  import {mapGetters} from 'vuex'
  import CaseTimeline from './CaseTimeline'

  export default {
    props: ['item'],
    components: {
      Step,
      StepItem,
      Popup,
      Actionsheet,
      CaseTimeline
    },
    methods: {
      getDetail () {
        // this.$store.dispatch('setCases', this.item)
        this.$router.push(urls.cases.routes.detail + '?caseNo=' + this.item.caseNo)
      },
      handleCase () {
        this.$ajax.post(urls.cases.api.getCase, {
          openId: window.sessionStorage.getItem('userId'),
          caseNo: this.item.caseNo
        })
          .then((response) => {
            this.processList = response.data.cases.processList
            // 延时发送显示case 操作菜单，防止弹出层不置灰
            setTimeout(() => {
              this.showStatus = true
            }, 200)
          })
      }
    },
    computed: {
      ...mapGetters([
        'getDict'
      ])
    },
    data () {
      return {
        showStatus: false,
        processList: []
      }
    }
  }
</script>
<style>
  @import "~weui/dist/style/weui.min.css"
</style>
