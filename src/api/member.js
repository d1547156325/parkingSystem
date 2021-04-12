import request from '@/utils/request'

// 获取车位列表
export function listMember(keyword, memberType, page, limit) {
  return request({
    url: '/member/listMember',
    method: 'get',
    params: { keyword, memberType, page, limit }
  })
}

export function updateMember(data) {
  return request({
    url: '/member/updateMember',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

export function memberLogin(phone) {
  return request({
    url: '/member/memberLogin',
    method: 'get',
    params:{ phone }
  })
}
