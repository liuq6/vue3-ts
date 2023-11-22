import { defineAsyncComponent } from 'vue'
export default {
  install(app: any, obtions: any) {
    const requireModules = import.meta.glob('../components/*.vue')
    for (const path in requireModules) {
      const result: Array<any> = path.match(/.*\/(.+).vue$/)
      const modulesConent: any = requireModules[path]
        app.component(result[1], defineAsyncComponent(modulesConent))
    }
  },
}
