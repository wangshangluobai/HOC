// 引入下载的插件
import Request from '@/utils/luch-request/index.js'
const URL = 'http://localhost:1258'
const http = new Request()
const config = {
  baseUrl: '',
  header: {
    'content-type': 'application/json'
  },
  method: 'GET',
  dataType: 'json',
  // #ifndef MP-ALIPAY || APP-PLUS
  responseType: 'text',
  // #endif
  // 注：如果局部custom与全局custom有同名属性，则后面的属性会覆盖前面的属性，相当于Object.assign(全局，局部)
  custom: {}, // 全局自定义参数默认值
  // #ifdef MP-ALIPAY
  timeout: 30000,
  // #endif
  // #ifdef APP-PLUS
  sslVerify: true,
  // #endif
  // 局部优先级高于全局，返回当前请求的task,options。请勿在此处修改options。非必填
  // getTask: (task, options) => {
  // 相当于设置了请求超时时间500ms
  // setTimeout(() => {
  // task.abort()
  // }, 500)
  // }
}
/** 请求默认配置
 * 
 */



http.setConfig((config) => {
  /* config 为默认全局配置*/
  config.baseURL = URL; /* 根域名 */
  // 只等待5秒
  config.timeout = 5000;
  return config
})

/** 请求拦截器
 *  在请求之前统一做出一些操作
 */
http.interceptors.request.use((config) => { // 可使用async await 做异步操作
  return config
}, config => { // 可使用async await 做异步操作
  return Promise.reject(config)
})

/** 响应拦截器
 *  在响应被得到之前统一做出一些操作
 */
http.interceptors.response.use((response) => {
  /* 对响应成功做点什么 可使用async await 做异步操作*/
  //  if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
  //    return Promise.reject(response) // return Promise.reject 可使promise状态进入catch
  // if (response.config.custom.verification) { // 演示自定义参数的作用
  //   return response.data
  // }
  return response
}, (response) => {
  /*  对响应错误做点什么 （statusCode !== 200）*/
  return Promise.reject(response)
})

export {
  http
}
