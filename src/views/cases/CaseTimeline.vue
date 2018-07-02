<template>
    <div>
      <timeline>
        <timeline-item v-for="(item, i) in processList" :key="item">
          <h4 :class="[i === 0 ? 'recent' : '']">&nbsp;{{ item.processType | mapDict('case_caseStatus')}}</h4>
          <p :class="[i === 0 ? 'recent' : '']">&nbsp;{{ item.processTime | timeFilter}}</p>
        </timeline-item>
      </timeline>
    </div>
</template>
<script>
  import {Timeline, TimelineItem} from 'vux'

  export default {
    props: ['processList'],
    components: {
      Timeline,
      TimelineItem
    },
    data () {
      return {}
    }
  }
</script>
<style>
  @import "~weui/dist/style/weui.min.css";
</style>
