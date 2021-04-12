import request from '@/utils/request'

// 获取车位列表
export function listSpace(keyword, spaceStatus, page, limit) {
  return request({
    url: '/space/listSpace',
    method: 'get',
    params: { keyword, spaceStatus, page, limit }
  })
}

export function updateSpace(data) {
  return request({
    url: '/space/updateSpace',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

export function editIsOnline(data) {
  return request({
    url: '/space/editIsOnline',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

export function addSpace(data) {
  return request({
    url: '/space/addSpace',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
