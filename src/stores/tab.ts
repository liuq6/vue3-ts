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
    // 是否有正在激活的tab
    JudgeActivePage(paths: [], router) {
      const isHave = this.tabList.some((t) => t.path === paths.includes(t.path))
      if (!isHave) {
        this.setLastTab(router)
      }
    },
    setLastTab(router) {
      const path2: string = this.tabList[this.tabList.length - 1].path
      this.currentRoute = path2
      router.push(path2)
    },
    closeTabs(type: string, path: string, router) {
      switch (type) {
        case 'current':
          // eslint-disable-next-line no-case-declarations
          const index: number = this.tabList.findIndex((t) => t.path === path)
          if (index === -1) return
          this.tabList.splice(index, 1)
          this.JudgeActivePage([path], router)
          break
        case 'left':
          // eslint-disable-next-line no-case-declarations
          const index2: number = this.tabList.findIndex((t) => t.path === path)
          const pathList: [] = this.tabList.slice(1, index2).map((t) => t.path)
          if (index2 === -1) return
          this.tabList = [
            ...this.tabList.slice(0, 1),
            ...this.tabList.slice(index2),
          ]
          this.JudgeActivePage(pathList, router)
          break
        case 'right':
          // eslint-disable-next-line no-case-declarations
          const index3: number = this.tabList.findIndex((t) => t.path === path)
          const pathList2: [] = this.tabList
            .slice(index3 + 1)
            .map((t) => t.path)
          if (index3 === -1) return
          this.tabList = [...this.tabList.slice(0, index3 + 1)]
          this.JudgeActivePage(pathList2, router)
          break
        case 'other':
          // eslint-disable-next-line no-case-declarations
          const item: tabInf = this.tabList.find((t) => t.path === path)
          if (!item) return
          this.tabList = [...this.tabList.slice(0, 1), item]
          this.setLastTab(router)
          break
        case 'all':
          this.tabList = [...this.tabList.slice(0, 1)]
          this.setLastTab(router)
          break
        default:
          break
      }
    },
    setActiveTab(path: string) {
      this.currentRoute = path
    },
  },
  persist: true,
})
