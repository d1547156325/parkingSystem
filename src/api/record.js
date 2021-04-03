import request from '@/utils/request'

// 获取车位列表
export function listRecord(keyword, payment, page, limit) {
  return request({
    url: '/record/listRecord',
    method: 'get',
    params: { keyword, payment, page, limit }
  })
}
