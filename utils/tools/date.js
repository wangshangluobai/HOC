
  /** 获取时间信息
   *  用于记录日期数据
   * 两种模式
   *  A 传入参数 使用传入的时间戳获取事件信息
   *  B 没有参数传入 获取此时此刻时间戳构建时间信息
   */
  function getTime(time_stamp_params) {
    // 声明变量
    let date, year, month, day, hour, minute, second, time_for_read, time_for_use, time_stamp = null
    // 判断是否有参数进入 有则使用参数的时间戳 没有则获取当前的时间戳
    // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
    time_stamp_params ? date = new Date(time_stamp_params * 1000) : date = new Date()
    year = date.getFullYear()
    // 月份是从0开始计算的
    month = date.getMonth() + 1
    day = date.getDate()
    // 为个位时间前添加0
    hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
    minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
    month >= 1 && month <= 9 ? (month = "0" + month) : ""
    day >= 0 && day <= 9 ? (day = "0" + day) : ""
    // 组装供用户识别的时间信息
    time_for_read = year + '年' + month + '月' + day + '日' + hour + '时' + minute + '分' + second + '秒'
    // 组装供程序方便运行的时间信息
    time_for_use = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
    // 如果有时间戳进入 则使用 没有则创建
    time_stamp = time_stamp_params || + new Date()
    // 时间戳  年月ID  适用于阅读的时间  适用于转换的时间 年
    return {
      time_stamp, 
      id: '' + year + month, 
      time_for_read, time_for_use,
      year
    }
  }
  /** 时间信息转时间戳
   *  根据传入的时间信息 转换成对应的时间戳
   */
  function getTimeStamp(timeInfo){
    let time = (new Date(timeInfo).getTime()) / 1000; //除1000 是变成秒级的时间戳 不除就是毫秒级
    return time;
  }
  
  export { 
    getTime,
    getTimeStamp
  }