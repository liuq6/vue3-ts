import { createI18n } from 'vue-i18n'
import zh from "./zh"
import en from "./en"

const i18n = createI18n({
    legacy: false,  // 没有该参数可能会报错
    locale: localStorage.getItem('lang') || "zh", //默认显示的语言 ,
    globalInjection: true, //全局生效$t
    messages: {
        zh,
        en
    }
})
 
 
export default i18n