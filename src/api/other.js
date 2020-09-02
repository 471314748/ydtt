// 封装其他接口
import instance from '../utils/myhttp'
// 获取联想建议
function apiThink (params) {
  return instance({
    url: '/v1_0/suggestion',
    method: 'get',
    params
  })
}
export { apiThink }