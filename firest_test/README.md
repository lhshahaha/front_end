> 基本实现腾讯天气所有功能，以下为自认为较为重要的几个功能：

> >   1.运用cookie进行历史记录的添加、删除等操作
> >
> >   2.点击头部平滑展现搜索栏等
> >
> >   3.实现页面头部湿度和西北风的淡入淡出自动轮播图
> >
> >   4.运用echart实现一周温度的平滑曲线图（每天都标记温度）
> >
> >   5.实现底部生活指数栏的手指平滑切换和底部显示当前页面等
> >
> >   6.运用mock.random模拟出一周七天的最高温度和最低温度（list对象里两个temphigh和tmeplow数组）并通过ajax调出数据在echart中展现（因为所有数据都能获得，写着写着就忘了mock接口，直到最后一天才经老师提醒记起mock，因时间因素和担心再次添加与原有代码产生冲突，只得简单模拟一周的最高和最低温度）

> 2、3、5都用上了CSS3中的动画（此外还有空气质量也用上了），同时5还通过跟踪手指页面坐标进行页面滑动、判断是否切换页面和判断是否点击具体某项生活指数等。

> 笔者可能还有遗漏之处，具体效果可以进入https://husruo.ltd/firest_test/index.html查看,同时在index.js代码中也给每个功能块进行了注释

> 文件中该页面的CSS文件、JS文件和HTML文件名为index，其余CSS等文件均为笔者草稿或模块等