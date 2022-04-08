export default {
  install(Vue, options) {
    Vue.prototype.$message = function(html) {
      /* M.toast({html}) */
      M.toast({
        html,
        classes: 'rounded toast'
      })
    }

    Vue.prototype.$error = function(html) {
      M.toast({ html: `[Ошибка]: ${html}` })
    }
  }
}
