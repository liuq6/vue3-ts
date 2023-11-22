import { type RouteRecordRaw } from 'vue-router'
// 处理get参数
export const delObjToStingForGet = (params: {}) => {
  if (!params || !Object.keys(params).length) return ''
  return '?' + new URLSearchParams(params).toString()
}

// 路由获取并且转换为侧边栏菜单
export const routeDisposeMens = (list: RouteRecordRaw[], pPath = '') => {
  const menus: {}[] = []
  const routerList = list.filter((v) => v.meta && v.meta.isShow)
  routerList.forEach((route: RouteRecordRaw) => {
    menus.push({
      name: route.name,
      title: route.meta?.title || '',
      icon: route.meta?.icon || '',
      path: `${pPath ? pPath + '/' : ''}${route.path}`,
      children: routeDisposeMens(
        route.children || [],
        `${pPath ? pPath + '/' : ''}${route.path}`
      ),
    })
  })
  return menus
}

// 当前路由获取title
export const routeDisposeCrumb = (list: {}[]) => {
  const menus: {}[] = []
  const routerList = list.filter((v) => v.meta && v.meta.isShow)
  routerList.forEach((route: RouteRecordRaw) => {
    menus.push({
      title: route.meta?.title || '',
      path: route.path,
    })
  })
  return menus
}

// 根据path获取当前路由
export const findRouteForPath = (
  list: RouteRecordRaw[],
  name: string,
  tRoute: object | null = null
): object | null => {
  
  for (const index in list) {
    const route = list[index]
    if (route.name === name) {
      tRoute = {
        title: route?.title || '',
        path: route.path,
      }
      return tRoute
    } else if (route.children?.length) {
      tRoute = findRouteForPath(route.children, name,tRoute)
      if (tRoute) {
        return tRoute
      }
    }
  }
  return tRoute
}
