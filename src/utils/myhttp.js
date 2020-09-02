// 导入 axios
import axios from 'axios'
import store from '../store/index'
import JSONbig from 'json-bigint'

// 创建一个 axios 实例
var instance = axios.create({
  // 设置基地址
  // 开发测试接口，生产正式接口
  baseURL: process.env.VUE_APP_URL,
  // 响应前修改数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    try {
      // 处理数字超过16位的精度丢失
      return JSONbig.parse(data)
    } catch (error) {
      return data
    }
  }],
})
// 给 axios 设置拦截器
// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 如果有token加token到请求头
    let token = store.state.userInfo.token
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
// 响应拦截器
instance.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 导入 axios 对象
export default instance
