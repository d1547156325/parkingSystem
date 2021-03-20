/**
 * Created by PanJiaChen on 16/11/18.
 */

import fa from 'element-ui/src/locale/lang/fa'
import store from '@/store'

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
// 手机号验证
export function isvalidPhone(str) {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  return reg.test(str)
}

export function isvalidzhanghao(str) {
  const reg = /^^[0-9a-zA-Z]+$/
  return reg.test(str)
}
