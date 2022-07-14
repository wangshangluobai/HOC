// 导入Vue和Vuex
import Vue from 'vue'
import Vuex from 'vuex'
// 导入各个仓库模块
import user_data from '@/store/modules/user_data'
// 导入简化属性
import getters from '@/store/getters.js'

// 使用仓库插件
Vue.use(Vuex)

// 创建Store实例化对象
const store = new Vuex.Store({
  // 挂载
  modules: {
    user_data,
  },
  getters
})
// 导出
export default store