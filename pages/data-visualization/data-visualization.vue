<template>
  <view>
    <view class="container">
      <!-- 数据可视化组件 -->
      <data-visualization 
        class="data-visualization "
        :optionData="option" 
        @getClickData="getClickData"
        ></data-visualization>
      <!-- 卡片容器 -->
      <view class="card-box">
        <uni-card :is-shadow="true"  :title="title">
        	<uni-list>
        		<uni-list-item v-for="(item, index) in card.detailCotent" :title="item.time_for_read" showArrow></uni-list-item>
        	</uni-list>
        </uni-card>
        <!-- 卡片 -->
        <uni-card :is-shadow="true">
        	<text>这是一个基础卡片示例，内容较少，此示例展示了一个没有任何属性不带阴影的卡片。</text>
        </uni-card>
      </view>
    </view>
  </view>
</template>

<script>
  import {getTime} from '@/utils/tools/date.js'
  // 这里没有引入组件 而是直接使用
  // import ets from '@/static/data-visualization/echarts.min.js' 
  import {
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {
        // 卡片信息
        card: {
          month: "07",
          frequency: "3",
          detailCotent:[]
        },
        // 频率和月份
        recordMouth: null,
        // echarts配置项
        option: {
          color: ["#5e86c1", "#cd5c5c"],
          title: {
            text: 'shitRecode',
            right: "0%",
            bottom: "auto",
          },
          // 图例组件
          legend: {
            // canvas容器居中
            top: "middle",
            align: "center"
          },
          // 点击提示
          tooltip: {
            // 坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
            trigger: 'axis',
            axisPointer: {
              type: 'line',
              label: {
                backgroundColor: '#ff6347'
              }
            },
            backgroundColor: 'rgb(255,255,255)',
            borderWidth: '0',
            textStyle: {
              color: '#6495ed'
            }
          },
          grid: {
            left: "20rpx",
            right: "50rpx",
            // top: "center",
            bottom: "3%",
            width: "80%",
            // height: "60%",
            containLabel: true
          },
          xAxis: {
            type: 'category',
            name: "月份",
            data: [],
            nameTextStyle: {
              verticalAlign: "top"
            },
          },
          yAxis: {
            type: 'value',
            name: '次数/频率'
          },
          series: [{
            name: '频率',
            type: 'bar',
            data: []
          }]
        },
      }
    },
    computed: {
      ...mapGetters([
        'shit_record',
      ]),
      // 解析出月分以及计算出每月的频率存放在Map中
      dataS: function() {
        let keys = [],
          vals = []
        for (var key of this.recordMouth.keys()) {
          keys.push(key)
        }
        for (var val of this.recordMouth.values()) {
          vals.push(val)
        }
        return {
          keys,
          vals
        }
      },
      // 整理title参数
      title: function(){
        return this.card.month+"月份,您有"+this.card.frequency+"次记录"
        
      }
    },
    watch: { 
      // 监视被点击月份数据的变化 将新的长度更新
      "card.detailCotent": {
        handler(newVal, oldVal) {
          this.card.frequency = newVal.length;
        }
      }
    },
    
    methods: {
      // 更新图标数据
      changeOption() {
        // 调用解析方法
        this.getRecordMouth()
        // 将解析出的月份赋予echarts配置项
        this.option.xAxis.data = this.dataS.keys
        this.option.series[0].data = this.dataS.vals
        
      },
      // 解析出月分以及计算出每月的频率存放在Map中
      getRecordMouth() {
        this.recordMouth = new Map(Object.keys(this.shit_record).map(i => {
          return [i.slice(i.length - 2, i.length), this.shit_record[i].length]
        }))
      },
      // 父子通信 回调函数
      getClickData(data){
        // 收集子组件传来的参数
        this.card.month = data.name;
        this.card.frequency = data.value;
        // 解析点击月份内容详情 
        for(let key in this.shit_record){
          if(key.indexOf(data.name, -1) !== -1){
            this.card.detailCotent = this.shit_record[key]
            return 
          }
        }
      },
      // 初始化详细记录信息
      initDetailRecord(){
        if(this.shit_record[getTime().id]){
          this.card.detailCotent = this.shit_record[getTime().id]
        }else if(this.shit_record[getTime().id-1]){
          this.card.detailCotent = this.shit_record[getTime().id-1]
        }else{
          uni.showToast({
            title: "获取记录日期出现错误!",
          })
        }
      },
    },
    // 生命周期函数
    created() {
      // 调用解析方法
      this.changeOption()
    },
    mounted() {
      // 调用初始化详情卡片数据
      this.initDetailRecord()
    },
      
    // uniapp生命周期钩子
    onShow() {
      // 调用解析方法
      this.changeOption()
    },
  }
</script>

<style lang="scss">
  // 总容器
  .container{
    // background-color: #f4f4f4;
    height: 100%;
    // height: 900rpx;
    display: flex;
    flex-direction: column;
    // align-items: center;
    // justify-content: center;
    
    // 柱状图
    .data-visualization {
      background-color: #dfdfdf;
    }
    
    // 卡片容器
    .card-box{}
  }
</style>
