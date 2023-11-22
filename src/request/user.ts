import { http } from './axios'
import type {
  adminListRes,
  adminListReq,
  adminInfoReq,
  updateRoleReq,
} from '@/types/user'
import qs from 'qs'

// 获取用户列表
export const getAdminList = (data: adminListReq) => {
  return http.get<adminListRes>('/admin/list', data)
}

// 修改用户信息
export const updateAdminInfo = (id: number, data: adminInfoReq) => {
  return http.post<string>(`/admin/update/${id}`, data)
}

// 获取所有角色
export const getRoleList = () => {
  return http.get<roleListsItf[]>(`/role/listAll`)
}

// 获取指定用户的角色
export const getRoleById = (adminId: number) => {
  return http.get<roleListsItf[]>(`/admin/role/${adminId}`)
}
// console.log(qs.stringify({a:1,rosl:[1,2,3]}));
// 获取指定用户的角色
export const updateRole = (data: updateRoleReq) => {
  return http.post<number>(`/admin/role/update` , qs.stringify(data))
}
