import { defineMock } from 'vite-plugin-mock-dev-server'
import Mock from 'mockjs'
const loginBody = (body) => {
  if (body.username === 'admin' && body.password === '123456') {
    return {
      code: 200,
      message: 'success',
      data: {
        token: Mock.mock('@word(40)'),
      },
    }
  } else {
    return {
      code: 500,
      message: '用户或密码错误',
    }
  }
}
// 登录
export default defineMock([
  {
    url: '/api/user/login',
    body({ body }) {
      return loginBody(body)
    },
  },
  // 查询用户信息
  {
    url: '/api/admin/info',
    body:{
      code: 200,
      message: 'success',
      data: {
        userName: 'admin',
      },
    },
  },
])





