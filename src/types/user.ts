export interface adminListRes {
  list: []
  total: number
}
export interface adminListReq {
  keyword: string
  pageNum: number
  pageSize: number
}

export interface adminInfoReq {
  createTime: string
  email: string
  icon: string
  id: number
  loginTime: string
  nickName: string
  note: string
  password: string
  status: 0
  username: string
}


export interface updateRoleReq {
  adminId :number,
  roleIds:string
}
