import { Component } from '@/shapes/Component.js'

class Box extends Component {
  constructor(options) {
    super(options.selector)

    this.$el.style.width = options.width + 'em'
    this.$el.style.height = options.height + 'em'

    this.$el.style.borderTopRightRadius = options.borderTopRightRadius + 'em'
    this.$el.style.borderTopLeftRadius = options.borderTopLeftRadius + 'em'
    this.$el.style.borderBottomRightRadius =
      options.borderBottomRightRadius + 'em'
    this.$el.style.borderBottomLeftRadius =
      options.borderBottomLeftRadius + 'em'

    this.$el.style.background = options.color
    this.$el.style.border = options.border
    this.$el.style.boxShadow = options.boxShadow
  }
}

export { Box }
