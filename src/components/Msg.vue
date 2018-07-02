<template>
    <div>
        <msg :title="info.title" :description="info.description" :buttons="info.buttons" :icon="info.icon"></msg>
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
      methods: {}
    }
</script>
