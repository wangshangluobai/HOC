// 导入请求方法 将本地储存备份至本地数据库
import {saveTheDateToDB} from '@/request/request.js'
export default {
  // 开启命名空间
  namespaced: true,
  // state 仓库数据
  state: {
    user_db: {
      // 用户提交记录
      shit_record: uni.getStorageSync('shit') || {},
      // 用户个人信息
      // user_info:{}
    }
  },
  // 操作state方法
  mutations: {
    // 将数据存储至本地服务器  停止开发
    async saveDateToLocalServer(state){
      // console.log(state.user_db.shit_record)
      // const res = await saveTheDateToDB(state.user_db.shit_record)
      // console.log(res)
    },
    // 将仓库中的信息存储到localStorage
    saveDataToLocal(state){
      uni.setStorageSync('shit', state.user_db.shit_record)
    },
    // 将传入的信息保存至仓库
    saveDataToState(state,val){
      if(val.id in state.user_db.shit_record){
        state.user_db.shit_record[val.id].push(val)
      }else{
        state.user_db.shit_record[val.id] = [val]
      }
      this.commit('user_data/saveDataToLocal')
      // 保存至服务器 功能暂时停止开发
      // this.commit('user_data/saveDateToLocalServer')
      uni.showToast({
        title: 'success!'
      })
    },
  },
  // 异步处理方法
  actions: {
    getsome(){
      
    }
  },
  // 简化获取数据方法
  getters: {}
}