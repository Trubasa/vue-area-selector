import VueAreaSelector from './VueAreaSelector'
let plugin={
  install(Vue,options){
    Vue.component(VueAreaSelector.name,VueAreaSelector)
  }
}

if(typeof window!==undefined&&window.Vue){
  window.Vue.use(plugin)
}
import  '../assets/iconfont/iconfont.css'
export default plugin;
