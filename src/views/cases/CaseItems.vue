<template>
  <div>
    <div v-if="items!==null&&items.length > 0">
      <div v-for="item in items">
        <CaseItem :item="item"></CaseItem>
      </div>
    </div>
  </div>
</template>
<script>
  import CaseItem from './CaseItem.vue'

  export default {
    props: ['items'],
    components: {
      CaseItem
    }
  }
</script>
<style>
</style>
