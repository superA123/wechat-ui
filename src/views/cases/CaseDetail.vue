<template>
  <div>
    <div>
      <d-player :video="video"
                :autoplay="autoplay"
                @play="play"
                ref="player">
      </d-player>
      <form-preview :body-items="list" :footer-buttons="buttons"></form-preview>
    </div>
    <CaseFunc :item="item" :processList="processList"></CaseFunc>
  </div>
</template>

<script>
  import {FormPreview} from 'vux'
  import CaseFunc from './CaseFunc'
  import VueDPlayer from 'vue-dplayer'
  var config = require('../../../config')

  export default {
    mounted () {
      this.$ajax.post(urls.cases.api.getCase, {
        caseNo: this.$route.query.caseNo,
        openId: window.sessionStorage.getItem('userId')
      })
        .then((response) => {
          if (response.data.resultFlag === constants.resultFlag.success) {
            this.item = response.data.cases
            this.processList = response.data.cases.processList

            this.list.push({label: '工单编号', value: this.item.caseNo})
            this.list.push({label: '联系人', value: this.item.contactsName})
            this.list.push({label: '联系电话', value: this.item.phone})
            this.list.push({label: '售后地址', value: this.item.address})
            this.list.push({label: '项目名称', value: this.item.product.name})
            this.list.push({label: '问题描述', value: this.item.describes})

            // 初始化视频
            var video = {
              url: (process.env.NODE_ENV !== 'production' ? config.dev.env.VIDEO_URL : config.prod.env.VIDEO_URL) + this.item.videoName
            }
            this.$refs.player.dp.switchVideo(video)
          } else if (response.data.resultFlag === constants.resultFlag.error) {
            this.$store.dispatch('setInfo', {
              title: '操作失败',
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

            this.$router.push({
              path: urls.common.routes.msg
            })
          }
        })
    },
    components: {
      'd-player': VueDPlayer,
      FormPreview,
      CaseFunc
    },
    methods: {
      play () {
        console.log('play callback')
      }
    },
    data () {
      return {
        video: {
          url: ''
        },
        autoplay: false,
        item: {},
        list: [],
        processList: [],
        buttons: [{
          style: 'default',
          text: '返回',
          onButtonClick: (name) => {
            if (this.$route.query.redirectTo) {
              this.$router.push(urls.common.routes.home)
            } else {
              this.$router.go(-1)
            }
          }
        }, {
          style: 'primary',
          text: '操作',
          onButtonClick: (name) => {
            // 延时发送显示case 操作菜单，防止弹出层不置灰
            setTimeout(() => {
              this.$bus.emit('case-menu-show', this.item.caseNo)
            }, 200)
          }
        }]
      }
    }
  }
</script>
<style>
</style>
