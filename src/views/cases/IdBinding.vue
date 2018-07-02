<template>
  <div>
    <group>
      <x-input title="邮箱" name="email" placeholder="必填" v-model="email" :max="30"></x-input>
    </group>
    <group>
      <x-input title="验证码" type="text" placeholder="填写验证码" v-model="vcode" id="vcode" :max="4">
        <x-button mini slot="right" type="primary" @click.native="sendVcode">发送</x-button>
      </x-input>
    </group>
    <box gap="13px 13px">
      <x-button type="primary" action-type="button" @click.native="save">确定</x-button>
    </box>

    <popup-msg :popupInfo="popupInfo"></popup-msg>
  </div>
</template>
<script>
  import {Group, Box, XInput, XButton} from 'vux'
  import PopupMsg from '@/components/PopupMsg.vue'
  import { required } from 'vuelidate/lib/validators'
  import { email } from '@/validator/email'

  export default {
    components: {
      PopupMsg,
      Group,
      Box,
      XInput,
      XButton
    },
    mounted () {
      // TODO 已绑定验证
    },
    methods: {
      checkData () {
        let info = {
          position: 'top',
          msgClass: 'popupError',
          isShowMsg: true
        }

        if (this.$v.email.$invalid) {
          this.popupInfo = Object.assign(info, {
            msg: '请填写有效邮箱'
          })
          return false
        } else if (this.$v.vcode.$invalid) {
          this.popupInfo = Object.assign(info, {
            msg: '请填写有效验证码'
          })
          return false
        }

        return true
      },
      sendVcode () {
        this.popupInfo = {
          position: 'top',
          msgClass: 'popupSuccess',
          msg: '验证码已发送',
          isShowMsg: true
        }
      },
      save () {
        if (!this.checkData()) {
          return false
        }

        this.$ajax.post(urls.cases.api.idBinding, {
          openId: window.sessionStorage.getItem('userId'),
          weUserId: window.sessionStorage.getItem('userId'),
          email: this.email
        })
          .then((response) => {
            if (response.data.resultFlag === constants.resultFlag.success) {
              this.$store.dispatch('setInfo', {
                title: '绑定成功',
                description: '欢迎使用云协作平台办公',
                icon: 'success',
                buttons: [{
                  type: 'primary',
                  text: '返回首页',
                  link: urls.common.routes.home
                }]
              })

              this.$router.push({
                path: urls.common.routes.msg
              })
            } else {
              this.$store.dispatch('setInfo', {
                title: '绑定失败',
                description: '请与系统管理员联系',
                icon: 'warn',
                buttons: [{
                  type: 'primary',
                  text: '返回',
                  link: urls.cases.routes.binding
                }]
              })

              this.$router.push({
                path: urls.common.routes.msg
              })
            }
          })
      }
    },
    data () {
      return {
        popupInfo: {},
        email: '',
        vcode: ''
      }
    },
    validations: {
      email: {
        required,
        email
      },
      vcode: {
        required
      }
    }
  }
</script>

<style>
  #vcode .weui-input {
    width: 50% !important;
  }
</style>
