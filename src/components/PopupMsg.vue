<template>
  <div>
    <popup v-model="showMsg" position="top" >
      <div :class="popupInfo.msgClass">
        {{popupInfo.msg}}
      </div>
    </popup>
  </div>
</template>

<script>
  import {Popup} from 'vux'

  export default {
    props: ['popupInfo'],
    components: {
      Popup
    },
    watch: {
      popupInfo (val) {
        if (val.isShowMsg) {
          this.showMsg = val.isShowMsg
          setTimeout(() => {
            this.showMsg = false
          }, 1500)
        }
      }
    },
    data () {
      return {
        showMsg: false
      }
    }
  }
</script>

<style>
  .popupError {
    background-color: #d95353;
    color: #ffffff;
    text-align: center;
    padding: 5px;
  }

  .popupSuccess {
    background-color: #04be02;
    color: #ffffff;
    text-align: center;
    padding: 5px;
  }
</style>
