import { Box } from '@/shapes/Box.js'

class Button extends Box {
  constructor(options) {
    super(options)
    this.$el.style.color = options.color
    this.$el.style.boxShadow = options.boxShadow
  }
}

export { Button }
