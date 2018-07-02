<template>
  <div>
    <group>
      <popup-picker title="工程师" :data="employees | picker('0')" :columns="3" v-model="empNo" show-name cancel-text="取消" confirm-text="确定"></popup-picker>
    </group>
    <box gap="13px 13px">
      <x-button type="primary" action-type="button" @click.native="saveCase">确定</x-button>
    </box>

    <popup-msg :popupInfo="popupInfo"></popup-msg>
  </div>
</template>
<script>
  import {Box, Popup, Group, PopupPicker, XButton, Divider} from 'vux'
  import PopupMsg from '@/components/PopupMsg.vue'
  import { required } from 'vuelidate/lib/validators'

  export default {
    components: {
      PopupMsg,
      Box,
      Popup,
      Group,
      PopupPicker,
      XButton,
      Divider
    },
    mounted () {
      this.$ajax.post(urls.cases.api.employees, {})
        .then((response) => {
          if (response.data.resultFlag === constants.resultFlag.success) {
            window.sessionStorage.setItem('employeeList', JSON.stringify(response.data.employeeList))
            var employeeList = response.data.employeeList
            var employees = employeeList.map(function (item) {
              return {name: item.name, value: item.empNo, parent: item.type + constants.dictType.caseEmployeeType}
            })
            var employeeTypes = JSON.parse(window.sessionStorage.getItem('dict')).filter(item => (item.type === constants.dictType.caseEmployeeType)).map(function (item) {
              return {name: item.label, value: item.value + constants.dictType.caseEmployeeType, parent: 0}
            })
            this.employees = employees.concat(employeeTypes)
          }
        })
    },
    methods: {
      checkData () {
        let info = {
          position: 'top',
          msgClass: 'popupError',
          isShowMsg: true
        }
        if (this.$v.empNo.$invalid) {
          this.popupInfo = Object.assign(info, {
            msg: '请选择工程师'
          })
          return false
        }
        return true
      },

      saveCase () {
        if (!this.checkData()) {
          return false
        }

        this.$ajax.post(urls.cases.api.transfer, {
          caseNo: this.$route.params.caseNo,
          openId: window.sessionStorage.getItem('userId'),
          order: {
            ownerEmpNo: this.empNo[this.empNo.length - 1]
          }
        })
          .then((response) => {
            if (response.data.resultFlag === constants.resultFlag.success) {
              this.$store.dispatch('setInfo', {
                title: '转单申请成功',
                description: '请点击待办列表继续查询或返回首页',
                icon: 'success',
                buttons: [{
                  type: 'primary',
                  text: '待办列表',
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
      }
    },
    data () {
      return {
        popupInfo: {},
        employees: [],
        empNo: []
      }
    },
    validations: {
      empNo: {
        required
      }
    }
  }
</script>
<style>
</style>
