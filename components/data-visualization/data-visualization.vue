<template>
  <view class="otherChannel">
    <!-- #ifdef APP-PLUS || H5 -->
    <view 
      class="echarts" 
      :id="optionData.id" 
      :prop="optionData" 
      :change:prop="echarts.updateEcharts"
      @click="echarts.onClick"
      ></view>
    <!-- #endif -->
    
    <!-- #ifndef APP-PLUS || H5 -->
    <view>非 APP、H5 环境不支持</view>
    <!-- #endif -->
  </view>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    props: {
      optionData: {
        type: Object,
        default: () => {}
      }
    },
    methods: {
      onViewClick(options) {
        // console.log("000",options)
        this.$emit("getClickData",options)
      },
      // 随机echarts容器ID
      creatId(){
        // 设置随机数id
        let t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let len = t.length
        let id = ''
        for (let i = 0; i < 32; i++) {
          id += t.charAt(Math.floor(Math.random() * len))
        }
        this.optionData.id = id
      },
    },
    // Vue 生命周期钩子
    created() {
      this.creatId()
    },
  }
</script>
<script module="echarts" lang="renderjs">
  // 样式配置
  import echartsConfig from '@/common/data-visualization/echarts-config.js'
  export default {
    data() {
      return {
        ocChart: null,
        // 点击相关参数
        clickData: null
      };
    },
    mounted() {
      if (typeof window.echarts === "object") {
        this.initEcharts()
      } else {
        // 动态引入较大类库避免影响页面展示
        const script = document.createElement('script');
        //  view 层的页面运行在  根目录 其相对路径相对于  计算
        script.src = './static/data-visualization/echarts.min.js';
        // script 标签的onload事件都是在外部js文件被加载完成并执行完成后才被触发.bind(this)
        script.onload = this.initEcharts;
        document.head.appendChild(script);
      }
    },
    methods: {
      // 初始化
      initEcharts() {
        // echarts.registerTheme('echartsConfig',echartsConfig )  //注册主题
        this.ocChart = echarts.init(document.getElementById(this.optionData.id))
        this.updateEcharts(this.optionData)
        // 点击事件监听
        this.ocChart.on('click', params => {
          this.clickData = params
        })
      },
      
      // 配置更新
      updateEcharts(option) {
        if (this.ocChart) {
          // 因App端，回调函数无法从renderjs外传递，故在此自定义设置相关回调函数
          if (option) {
            // tooltip
            if (option.tooltip) {
              // 判断是否设置tooltip的位置
              if (option.tooltip.positionStatus) {
                option.tooltip.position = this.tooltipPosition()
              }
              // 判断是否格式化tooltip
              if (option.tooltip.formatterStatus) {
                option.tooltip.formatter = this.tooltipFormatter(
                  option.tooltip.formatterUnit, 
                  option.tooltip.formatFloat2, 
                  option.tooltip.formatThousands)
              }
            }
            // 颜色渐变
            /* if (option.series) {
            	for (let i in option.series) {
            		let linearGradient = option.series[i].linearGradient
         		 		if (linearGradient) {
            			option.series[i].color = new echarts.graphic.LinearGradient(linearGradient[0],linearGradient[1],linearGradient[2],linearGradient[3],linearGradient[4])
            		}
            	}
            } */
          }
          // 设置新的option     , option.notMerge
          this.ocChart.setOption(option)
        }
      },
      onClick(event, ownerInstance) {
        if (this.clickData) {
          // 把echarts点击事件相关的值传递到renderjs外
          ownerInstance.callMethod('onViewClick', {
            value: this.clickData.value,
            name: this.clickData.name,
            dataIndex: this.clickData.dataIndex,
            seriesName: this.clickData.seriesName
          })
          // 清空上次点击数据
          this.clickData = null
        }
      }
    },
  }
</script>

<style lang="scss">
  .otherChannel {
    width: 100%;
    height: 60%;
    
    .echarts {
      // margin-top: 100px;
      width: 100%;
      height: 100%;
      
    }
  }
  

</style>
