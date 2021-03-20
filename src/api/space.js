import request from '@/utils/request'

// 获取车位列表
export function listSpace(keyword, spaceRemark, spaceStatus, page, limit) {
  return request({
    url: '/parking/space/listSpace',
    method: 'get',
    params: { keyword, spaceRemark, spaceStatus, page, limit }
  })
}
