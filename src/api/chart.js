import request from '@/utils/request'

export function cakeData(start, end) {
  return request({
    url: '/chart/cakeData',
    method: 'get',
    params: { start, end }
  })
}

export function lineData(year) {
  return request({
    url: '/chart/lineData',
    method: 'get',
    params: { year }
  })
}
