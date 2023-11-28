import { defineStore } from 'pinia'
interface colorObj {
  menuBg: string
  colorPrimary: string
  themeColor: string
  menuText: string
  subMenuActiveText: string
  menuTitleHover: string
}
export const useColorThemeStore = defineStore('colorTheme', {
  state: (): {
    colorList: {
      [Key: string]: colorObj
    }
    defaultTheme: string
  } => {
    return {
      colorList: {
        default: {
          menuBg: '#001529',
          colorPrimary: '#409eff',
          themeColor: '#001529',
          menuText: 'rgb(254 254 254 / 65%)',
          subMenuActiveText: '#fff',
          menuTitleHover: 'red',
        },
        light: {
          subMenuActiveText: '#FFF',
          menuBg: '#FFFFFF',
          colorPrimary: '#409eff',
          themeColor: '#fff',
          menuText: '#7a80b4',
          menuTitleHover: '#000',
        },
        dusk: {
          subMenuActiveText: '#fff',
          menuBg: '#2a0608',
          colorPrimary: '#F70808',
          themeColor: '#F70808',
          menuText: 'rgb(254 254 254 / 65.1%)',
          menuTitleHover: '#fff',
        },
        volcano: {
          subMenuActiveText: '#fff',
          menuBg: '#2b0e05',
          colorPrimary: '#FA541C',
          themeColor: '#FA541C',
          menuText: 'rgb(254 254 254 / 65%)',
          menuTitleHover: '#fff',
        },
        yellow: {
          subMenuActiveText: '#d25f00',
          menuBg: '#2b2503',
          colorPrimary: '#FADB14',
          themeColor: '#FADB14',
          menuText: 'rgb(254 254 254 / 65%)',
          menuTitleHover: '#fff',
        },
        mingQing: {
          subMenuActiveText: '#fff',
          menuBg: '#032121',
          colorPrimary: '#13C2C2',
          menuTitleHover: '#fff',
          themeColor: '#13C2C2',
          menuText: '#7a80b4',
        },
        auroraGreen: {
          subMenuActiveText: '#fff',
          menuBg: '#0b1e15',
          colorPrimary: '#52C41A',
          menuTitleHover: '#fff',
          themeColor: '#52C41A',
          menuText: '#7a80b4',
        },
        pink: {
          subMenuActiveText: '#fff',
          menuBg: '#28081a',
          menuTitleHover: '#fff',
          colorPrimary: '#EB2F96',
          themeColor: '#EB2F96',
          menuText: '#7a80b4',
        },
        saucePurple: {
          subMenuActiveText: '#fff',
          menuBg: '#130824',
          colorPrimary: '#722ED1',
          menuTitleHover: '#fff',
          themeColor: '#722ED1',
          menuText: '#7a80b4',
        },
      },
      defaultTheme: 'default',
    }
  },
  actions: {
    changeDefaultTheme(defaultTheme: string) {
      this.defaultTheme = defaultTheme
      localStorage.setItem('defaultTheme', defaultTheme)
      const colorObj = this.colorList[defaultTheme]
      document.body.style.setProperty(
        '--el-color-primary',
        colorObj.colorPrimary
      ) //主色
      document.body.style.setProperty('--el-menu-bg-color', colorObj.menuBg) //菜单颜色
      document.body.style.setProperty('--el-menu-hover-bg-color', 'transparent') //菜单hover颜色var(--el-menu-active-color)
      const dom1: Element = document.getElementsByClassName('el-menu') || null
      const dom2: Element =
        document.getElementsByClassName('el-menu-item') || null
      const dom3: Element =
        document.getElementsByClassName('el-sub-menu') || null

      this.ArraySetColor([...dom1, ...dom2, ...dom3], colorObj)
      // var(--el-menu-text-color)
      // var(--el-menu-hover-bg-color)
    },
    ArraySetColor(doms, colorObj) {
      if (!doms || !doms.length) return
      // console.log(doms, 'doms')

      Array.from(doms).forEach((dom) => {
        dom.style.setProperty('--el-menu-text-color', colorObj.menuText) //菜单文字颜色
        dom.style.setProperty(
          '--el-menu-active-color',
          colorObj.subMenuActiveText
        ) //菜单active文字颜色
        dom.style.setProperty(
          '--el-menu-hover-text-color',
          colorObj.menuTitleHover //菜单hover文字颜色
        )
      })
    },
  },
  // persist: true,
})
