import request from '@/utils/request'

// 获取车位列表
export function listSpaceArea() {
  return request({
    url: '/spaceArea/listSpaceArea',
    method: 'get'
  })
}
