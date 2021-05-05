import request from '@/utils/request'

export function listUser(keyword, page, limit) {
  return request({
    url: '/user/listUser',
    method: 'get',
    params: { keyword, page, limit }
  })
}

export function updateUser(data) {
  return request({
    url: '/user/update',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

export function alterPassword(data) {
  return request({
    url: '/user/alterPassword',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

export function addUser(data) {
  return request({
    url: '/user/addUser',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
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
