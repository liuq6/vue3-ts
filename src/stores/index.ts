import { defineStore } from 'pinia'
import { useDark,useToggle } from '@vueuse/core'
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
const initIsDark = localStorage.getItem('useDarkKEY') === 'dark'
export const useIndexStore = defineStore('Index', {
  state: () => {
    console.log(useDark(), 'sdjksdd')

    return {
      menus: [],
      localLanguage: 'zh',
      userInfo: {},
      isCollapse: false,
      // 主题模式
      isDark: useDark()                                                                                     ,
    }
  },
  getters: {
    isCollapseIng: (state) => state.isCollapse,
  },
  actions: {
    theme() {
      return useDark({
        // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
        storageKey: 'useDarkKEY',
        // // 暗黑class名字
        // valueDark: 'dark',
        // // 高亮class名字
        // valueLight: 'light',
      })
    },
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
    updateIsDark() {
      useToggle(
        useDark({
          // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
          storageKey: 'useDarkKEY',
          // // 暗黑class名字
          // valueDark: 'dark',
          // // 高亮class名字
          // valueLight: 'light',
        })
      )
    },
  },
  persist: true,
})
