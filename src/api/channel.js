import instance from '../utils/myhttp'
// import store from '../store/index'
// 获取频道信息
function getChannels () {
  return instance({
    url: '/v1_0/user/channels',
    method: 'get',
  })
}
// 获取所有的频道列表
function getChannelsAll () {
  return instance({
    url: '/v1_0/channels',
    method: 'get',
  })
}
// 修改频道列表
function apiResetChannel (data) {
  return instance({
    url: '/v1_0/user/channels',
    method: 'PUT',
    data
  })
}
export { getChannels, getChannelsAll, apiResetChannel }