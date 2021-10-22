class Component {
  constructor(selector) {
    this.$el = document.querySelector(selector)
  }

  hide() {
    this.$el.style.display = 'none'
  }
  show() {
    this.$el.style.display = 'block'
  }
  opacity(opacity) {
    this.$el.style.opacity = opacity
  }
}

export { Component }
