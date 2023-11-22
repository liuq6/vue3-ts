import {http} from './axios'
import type {
  LoginData,
  LoginRes,
  userInfoRes,
} from '@/types/login'

// // 登录
// export const login = (data: LoginData) => {
//   return http.post<LoginRes>('/admin/login', data)
// }
export const login = (data: LoginData) => {
  return http.post<LoginRes>('/user/login', data)
}
// 获取用户信息
export const getAdminInfo = () => {
  return http.get<userInfoRes>('/admin/info')
}
