import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, setToken } from '@/utils/auth'
import router from '@/router'

// create an axios instance
const service = axios.create({
  // baseURL: '/',
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an eror.
    if (res.code !== 20000 && res.code !== 200 && res.code !== 408 && res.code !== 410) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 2 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      // Message({
      //   message: res.msg,
      //   type: 'success',
      //   duration: 1000
      // })
      return res
    }
  },
  error => {
    if (error.response.status === 402) {
      MessageBox.confirm('您未登录或者登录已失效，请重新登录', '提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    } else if (error.response.status === 403) {
      MessageBox.alert('您的权限不够，请联系管理员', '未授权', {
        confirmButtonText: '确定',
        callback: action => {
          router.push('/')
        }
      })
      // MessageBox.confirm('您的权限不够，请联系管理员', '未授权', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   router.push('/')
      // })
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 2 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
