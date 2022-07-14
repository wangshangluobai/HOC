<template>
	<view class="container" :style="{height:screenHeight+'px'}">
    <!-- 添加按钮 -->
    <view class="addBtn" @click="addBtn">
      <text>Yaho</text>
    </view>
	</view>
</template>

<script>
  import {getTime} from '@/utils/tools/date.js'
  import {saveTheDateToDB} from '@/request/request.js'
  import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
        userInfo: {
          name: 'oc',
          age: 22,
          occupation: '前端开发',
        },
        screenHeight: '',
			}
		},
		methods: {
      ...mapMutations('user_data', ['saveDataToState']),
      // 按钮响应事件
      async addBtn() {
        uni.showModal({
          title:"再次确认",
          content: "请确认添加此次信息",
          success: (status) => status.confirm ? this.saveDataToState(this.getCurrTimeInfo()) : uni.showToast({ title:"提交失败!"})
        })
        // 将数据存储至仓库
        // this.saveDataToState(getTime())
        // 发送请求 记录此次
        // const res = await saveTheDateToDB()
      },
      // 拿取需要的时间数据
      getCurrTimeInfo(){
        const {id, time_for_read, time_for_use, time_stamp} = getTime();
        return {id, time_for_read, time_for_use, time_stamp};
      },
		},
    mounted() {
      this.screenHeight = uni.getSystemInfoSync().windowHeight;
      // console.log(this.saveDataToState())
    },
	}
</script>

<style lang="scss">
  // 外层容器
	.container {
    width: 100%;
    background-color: #efefef;
    display: flex;
    align-items: center;
    justify-content: center;
    // 添加按钮
    .addBtn {
      width: 166rpx;
      height: 166rpx;
      border-radius: 66%;
      background-color: tomato;
      border: 2px solid white;
      display: flex;
      align-items: center;
      justify-content: center;
      // 文本
      text {
        font-size: 19px;
        font-weight: bold;
      }
    }
	}
</style>
