import request from '@/utils/request'

// 获取车位列表
export function listPark() {
  return request({
    url: '/park/listPark',
    method: 'get'
  })
}

export function updatePark(data) {
  return request({
    url: '/park/updatePark',
    method: 'post',
    data
  })
}
