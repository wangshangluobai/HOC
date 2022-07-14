import { http } from '@/request/index.js'///${params.year+''}/${params.month}
/** json-server 暂时舍弃
 * 我草 我真的麻了 我只是想整的规范一点
 * 这json-server有毒 数据库的话等我把java学了再弄吧
 * 真的麻了 这个东西搞了两三天了
 * 没有中文文档 tmd 愿世间所有技术都有中文文档
 * 我一点一点的妥协 但是最后 要实现太恶心了
 * 就这样吧 数据库 后端 老子一定要弄
  */
const saveTheDateToDB = (params) => http.post("/shit_record", {...params, id:params.id});


export {
  saveTheDateToDB,
}