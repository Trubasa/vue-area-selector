import VueAreaSelector from './VueAreaSelector'
let plugin={
  install(Vue,options){
    Vue.component(VueAreaSelector.name,VueAreaSelector)
  }
}

if(typeof window!==undefined&&window.Vue){
  window.Vue.use(plugin)
}

export default plugin;
