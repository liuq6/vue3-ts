import { defineStore } from 'pinia'
import { getAdminInfo } from '@/request/login'
// const { locale: i18nLanguage } = useI18n()

interface menusitf {
  parentId: number
  id: number
  children: []
  hidden?: string
  title?: string
  name?: string
  path?: string
}
interface meusObj {
  [key: number]: meusKeyObj
}
interface meusKeyObj {
  children: menusitf[]
  id: number
  title?: string
  name?: string
}
export const useIndexStore = defineStore('Index', {
  state: () => {
    return {
      menus: [],
      localLanguage: 'zh',
      userInfo: {},
      isCollapse: false,
    }
  },
  getters: {
    newMenus(state) {
      const newMenus: meusObj = {}
      state.menus.forEach((menu: menusitf) => {
        if (menu.parentId === 0) {
          //一级菜单
          newMenus[menu.id] = {
            ...menu,
            children: newMenus[menu.id]?.children || [],
          }
        } else {
          //二级菜单
          newMenus[menu.parentId] = newMenus[menu.parentId] || {}
          newMenus[menu.parentId].children =
            newMenus[menu.parentId]?.children || []
          newMenus[menu.parentId].children.push(menu)
        }
      })
      return newMenus
    },
    isCollapseIng: (state) => state.isCollapse,
  },
  actions: {
    updateMenus(menus: []) {
      this.menus = menus
    },
    getAdminInfo() {
      return new Promise((resolve, reject) => {
        getAdminInfo()
          .then((res1) => {
            this.userInfo = res1
            resolve(res1)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    switchIsCollapse() {
      this.isCollapse = !this.isCollapse
    },
  },
  persist: true,
})
