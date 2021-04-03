import request from '@/utils/request'

// 获取车位列表
export function listCar(keyword, page, limit) {
  return request({
    url: '/car/listCar',
    method: 'get',
    params: { keyword, page, limit }
  })
}

// 获取车位列表
export function carLicense(data) {
  return request({
    url: '/car/license',
    method: 'post',
    data
  })
}
