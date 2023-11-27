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
    body: {
      code: 200,
      message: 'success',
      data: {
        userName: 'admin',
      },
    },
  },
  // 查询用户消息
  {
    url: '/api/admin/msg',
    body: {
      code: 200,
      message: 'success',
      data: {
        list: [
          {
            name: `通知(${
              Mock.mock({
                'number|1-100': 100,
              }).number
            })`,
            list: [
              {
                icon: 'icon-qiyeweixin',
                time: '2022-10-23',
                title: '你收到了 12 份新周报',
              },
              {
                icon: 'icon-dingding',
                time: '2020-10-23 00:00:00',
                title: '你推荐的 前端高手 已通过第三轮面试',
              },
              {
                icon: 'icon-tianjia',
                time: '2023-10-23 00:00:00',
                title: '这种模板可以区分多种通知类型',
              },
              {
                icon: 'icon-shoucang',
                time: '2021-10-23 00:00:00',
                title:
                  '展示标题内容超过一行后的处理方展示标题内容超过一行后的处理方',
              },
            ],
          },
          {
            name: `消息(${
              Mock.mock({
                'number|1-100': 100,
              }).number
            })`,
            list: [
              {
                icon: 'icon-14',
                time: '2022-10-23 00:00:00',
                title: '李白 评论了你',
                content: '长风破浪会有时,直挂云帆济沧海',
              },
              {
                icon: 'icon-14',
                time: '2022-10-23 00:00:00',
                title: '标题',
                content:
                  '请将鼠标移动到此处，以便测试超长的消息在此处将如何处理。本例中设置的描请将鼠标移动到此处，以便测试超长的消息在此处将如何处理。本例中设置的描请将鼠标移动到此处，以便测试超长的消息在此处将如何处理。本例中设置的描请将鼠标移动到此处，以便测试超长的消息在此处将如何处理。本例中设置的描请将鼠标移动到此处，以便测试超长的消息在此处将如何处理。本例中设置的描',
              },
            ],
          },
          {
            name: `待办(${
              Mock.mock({
                'number|1-100': 100,
              }).number
            })`,
            list: [
              {
                title: '任务名称',
                content: '任务需要在2022-10-23 00:00:00前启动',
                status: 0,
              },
              {
                title: '第三方紧急代码变更',
                content:
                  '一拳提交于 2022-11-16，需在 2022-11-18 前完成代码变更任务',
                status: 1,
              },
              {
                title: 'vue-pure-admin 版本发布',
                content: 'vue-pure-admin 版本发布',
                status: 2,
              },
            ],
          },
        ],
      },
    },
  },
])
