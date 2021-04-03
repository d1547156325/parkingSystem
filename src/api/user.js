import request from '@/utils/request'

export function listUser(keyword, page, limit) {
  return request({
    url: '/user/listUser',
    method: 'get',
    param: { keyword, page, limit }
  })
}

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
