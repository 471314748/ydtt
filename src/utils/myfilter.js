// 项目所有的过滤器
import Vue from 'vue'
// dayjs时间距离插件
import dayjs from 'dayjs'
// 相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 中文语言包
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
// 时间过滤器
Vue.filter('myTime', function (time) {
  return dayjs().from(dayjs(time))
})