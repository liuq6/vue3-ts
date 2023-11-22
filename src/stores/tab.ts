import { defineStore } from 'pinia'

interface tabInf {
  path: string
  title?: string
  name?: string
  meta?: {
    title: string
  }
  noClose?: Boolean
}
// 初始化必须有首页
const homePage: tabInf = {
  path: '/home',
  title: 'menus.homeName',
  noClose: true,
}
export const useTabBarStore = defineStore('tabBar', {
  state: (): {
    tabList: tabInf[]
    currentRoute: String
  } => {
    return {
      tabList: [],
      currentRoute: '',
    }
  },
  getters: {
    tabLists: (state) => state.tabList,
    currentR: (state) => state.currentRoute,
  },
  actions: {
    addTabs(proxy, tab: tabInf) {
      if (!proxy) return
      console.log('addTabs', tab)

      this.tabList.push(
        tab.path === '/home'
          ? homePage
          : {
              path: tab.path,
              title: tab?.title,
            }
      )
      this.tabList = proxy?.lodash?.uniqWith(
        this.tabList,
        proxy?.lodash?.isEqual
      )
      this.setActiveTab(tab.path)
      this.JudgeHomepage()
    },
    //  判断是否有首页
    JudgeHomepage() {
      const item = this.tabList.find((t) => t.title === homePage.title)
      if (item) return
      this.tabList.unshift(homePage)
    },
    closeTabs(type: string, path: string, router) {
      switch (type) {
        case 'current':
          const index: number = this.tabList.findIndex((t) => t.path === path)
          if (index === -1) return
          this.tabList.splice(index, 1)
          const isThisRoute = this.currentRoute === path
            if (isThisRoute) {
            const path2: string = this.tabList[this.tabList.length - 1].path
            this.currentRoute = path2
            router.push(path2)
          } else {
          }

          break
        default:
          break
      }
    },
    setActiveTab(path: string) {
      this.currentRoute = path
    },
  },
  persist: {
    enabled: true, // 开启数据缓存 +++++++
  },
})
