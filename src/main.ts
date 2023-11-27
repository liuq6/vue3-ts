import './assets/css/index.scss'
import './assets/reset.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


import ElementPlus,{ dayjs } from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCN from "element-plus/dist/locale/zh-cn.mjs";
import i18n from '@/language/index.js'
// 扩展插件
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import relativeTime from 'dayjs/plugin/relativeTime'
import zh from 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.locale(zh)
import "@/utils/comm.ts";
import App from './App.vue'
import { initRouter } from './router'
import "./types/b.ts";
import components  from '@/utils/component'
import * as _ from 'lodash' //引入所有
const app = createApp(App)
app.config.globalProperties.lodash = _;
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
initRouter(app)
app.use(pinia).use(ElementPlus,{locale:zhCN}).use(components).use(i18n).mount('#app')


app.config.globalProperties.$day = dayjs
