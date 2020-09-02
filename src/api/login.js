import instance from '../utils/myhttp'
// 获取token
function userInfo (data) {
  return instance({
    url: '/v1_0/authorizations',
    method: 'POST',
    data
  })
}
// 获取token
function getCode (params) {
  return instance({
    url: 'v1_0/sms/codes',
    method: 'GET',
    params
  })
}
export { userInfo, getCode }