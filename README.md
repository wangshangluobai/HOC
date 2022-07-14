# **HOC**

- 功能 > 记录拉粑粑时间，整理为柱状视图
- 目标 > 个人健康自我监测系统
- 愿景 > 智能化健康管理助手

---



**使用说明**

- 0.1版本

![Image text](https://gitee.com/otherChannel/health-of-coder/blob/master/static/redemeImg/tabBar0.1.jpg)

​		目前只有这三个tabBar，从左至右，第一个是首页，第二个是数据展示，第三个是个人中心，其中前两个的基础功能已完善。个人中心尚未着手开发，预计等到下个下个左右版本。

​		

![Image text](https://gitee.com/otherChannel/health-of-coder/blob/master/static/redemeImg/index0.1.jpg)

​		这是首页，目前只有添加日期的按钮，点击Yaho按钮将当下时间以及其它相应的参数传递至仓库存储，仓库会立即将存储的信息更新保存至本地存储，(本想使用json-server模拟请求数据的，但是json-server的东西，我实在是迷糊。还是再缓缓吧，后期直接上数据库好了)

![Image text](https://gitee.com/otherChannel/health-of-coder/blob/master/static/redemeImg/prompt0.1.jpg)

​		当点击Yaho时，会给用户确认一下，防止误添加，目前没有删除记录功能，后期可能会添加，但几率不大，这个是出于我对产品的考虑。点击确定弹出成功提示框并将数据存储至仓库...  

![Image text](https://gitee.com/otherChannel/health-of-coder/blob/master/static/redemeImg/success0.1.jpg)



​		点击取消会弹出提交失败的弹框，(刚注意到这是个对号，后期可能需要修改图标，细节还是挺不到位的。)

![Image text](https://gitee.com/otherChannel/health-of-coder/blob/master/static/redemeImg/fail0.1.jpg)

---

![Image text](https://gitee.com/otherChannel/health-of-coder/blob/master/static/redemeImg/data-visualization0.1.jpg)


​		这是数据展示页面，0.1的功能主要集合到这里。目前分为两部分，**第一块是柱状图区域**，该区域使用Echarts结合renderJS完成，**第二部分是卡片容器**，该内容使用uniApp的card组件结合uni-list完成，其中数据全部是响应式的。

​		点击柱状图会更新下方卡片数据，下方数据为点击柱状图月份的所有数据遍历，同时在首页进行添加新数据，也会被检测到，实时更新数据。

​		(该页面卡片列表后续会添加点击功能，展示被点击记录的其他信息，其他信息会在首页中进行添加新功能获取。)