<template>
  <div id="statusChart" :style="statusChartStyle"></div>
</template>
<script>
  export default {
    mounted () {
      this.statusChart = this.$echarts.init(document.getElementById('statusChart'))
      this.getLastData()
      window.onresize = this.statusChart.resize
    },
    methods: {
      getLastData () {
        let now = new Date()
        let startDate = now.getFullYear() + '-' + ((now.getMonth() - 2) < 10 ? '0' + (now.getMonth() - 2) : (now.getMonth() - 2)) + '-01'
        let sendDate = now.getFullYear() + '-' + ((now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1)) + '-31'

        this.$ajax.post(urls.cases.api.findHistoryList4Emp, Object.assign({
          openId: window.sessionStorage.getItem('userId'),
          searchCreateDateBegin: startDate,
          searchCreateDateEnd: sendDate
        }, {
          scroller: {
            pageNo: 1,
            pageSize: -1
          }
        })).then((response) => {
          if (response.data.resultFlag === '00') {
            this.cases = response.data.caseList
          }
        })
      },
      getOption (newCases) {
        return {
          title: {
            text: '工单工作量统计',
            subtext: '根据最近3个月数据统计',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['已受理', '已完成', '已反馈']
          },
          series: [
            {
              name: '工单数量',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {
                  value: newCases.filter(item => {
                    return item.status === constants.caseStatus.assigned
                  }).length,
                  name: '已受理'
                },
                {
                  value: newCases.filter(item => {
                    return item.status === constants.caseStatus.closed
                  }).length,
                  name: '已完成'
                },
                {
                  value: newCases.filter(item => {
                    return item.status === constants.caseStatus.survey
                  }).length,
                  name: '已反馈'
                }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      }
    },
    watch: {
      cases: function (newCases) {
        this.statusChart.setOption(this.getOption(newCases))
      }
    },
    data () {
      return {
        statusChart: '',
        statusChartStyle: {
          width: document.documentElement.clientWidth + 'px',
          height: document.documentElement.clientHeight + 'px'
        },
        cases: []
      }
    }
  }
</script>
<style>
</style>
