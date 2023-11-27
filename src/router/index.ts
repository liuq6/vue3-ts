import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from 'vue-router'
import { type App } from 'vue'
import HomeView from '@/views/home/index.vue'
// import HomeView from '@/views/home/index.vue'
import { getUserToken } from '@/utils/user'
import { useIndexStore } from '@/stores/index'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      isShow: true,
      title: 'menus.homeName',
      icon: 'HomeFilled',
    },
    component: () => HomeView,
    children:[
      {
        path: '/',
        name:'',
        component: () => import('@/views/index/index.vue'),
        meta: {
          isShow: false,
        },
      },
    ]
  },

  {
    path: '/index',
    name: 'index',
    meta: {
      isShow: true,
      title: 'menus.indexName',
      icon: 'MostlyCloudy',
    },
    component: () => HomeView,
    redirect: '/index/button',
    children: [
      {
        path: 'button',
        name: 'indexButtonName',
        component: () => import('@/views/subassembly/button.vue'),
        meta: {
          isShow: true,
          title: 'menus.indexButtonName',
          keepAlive: true
        },
      },
      {
        path: 'animation',
        name: 'indexanimationName',
        component: () => import('@/views/subassembly/animation.vue'),
        meta: {
          isShow: true,
          title: 'menus.indexanimationName',
          keepAlive: true
        },
      },
    ],
  },
  {
    path: '/featrue',
    name: 'featrue',
    meta: {
      isShow: true,
      title: 'menus.featrueName',
      icon: 'Brush',
    },
    component: () => HomeView,
    redirect: '/index/button',
    children: [
      {
        path: 'barCode',
        name: 'featruebarCodeName',
        component: () => import('@/views/featrue/barCode.vue'),
        meta: {
          isShow: true,
          title: 'menus.featruebarCodeName',
        },
      },
      {
        path: 'download',
        name: 'featrueDownloadName',
        component: () => import('@/views/featrue/download.vue'),
        meta: {
          isShow: true,
          title: 'menus.featrueDownloadName',
        },
      },
      {
        path: 'watermark',
        name: 'featrueWatermarkName',
        component: () => import('@/views/featrue/watermark.vue'),
        meta: {
          isShow: true,
          title: 'menus.featrueWatermarkName',
        },
      },
      // {
      //   path: 'allocMenu',
      //   name: 'allocMenu',
      //   component: () => import('@/views/ums/allocMenu.vue'),
      // },
      // {
      //   path: 'allocResource',
      //   name: 'allocResource',
      //   component: () => import('@/views/ums/allocResource.vue'),
      // },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  // 刚进来就开启进度条
  nprogress.start()
  const token = getUserToken()
  const store = useIndexStore()
  if (!token && to.name !== 'login') {
    next('/login')
    nprogress.done()
  } else if (token && Object.keys(store.userInfo).length === 0) {
    store.getAdminInfo().then(() => {
      next()
    })
  } else if (token && to.name === 'login') {
    next('/index')
    nprogress.done()
  } else {
    next()
  }
  //  else if (token&&Object.keys(store.newMenus).length === 0) {
  //   store.getAdminInfo().then(() => {
  //     for (const key in store.newMenus) {
  //       const obj = store.newMenus[key]
  //       const objMeus:RouteRecordRaw = {
  //         path: `/${obj.name}`,
  //         name: obj.name,
  //         redirect: `/${obj.name}/${obj.children[0].name}`,
  //         component: () => HomeView,
  //         children: obj.children.reduce((res, item) => {
  //           res.push({
  //             path: item.name || '',
  //             name: item.name,
  //             component: () => import(`@/views/${obj.name}/${item.name}.vue`),
  //           })
  //           return res
  //         }, []),
  //       }
  //       router.addRoute(objMeus)
  //     }
  //     router.addRoute({
  //       path: '/index',
  //       name: 'index',
  //       component: () => HomeView,
  //     })
  //     next(to)
  //   })
  // }
})
router.afterEach(() => {
  // 路由跳转完毕后关闭进度条
  nprogress.done()
})
export const initRouter = (app: App<Element>) => {
  app.use(router)
}
