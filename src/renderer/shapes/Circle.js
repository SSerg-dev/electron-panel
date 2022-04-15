import { Box } from '@/shapes/Box.js'

class Circle extends Box {
  constructor(options) {
    super(options)

    this.$el.style.borderRadius = '50%'
    this.$el.style.boxShadow = '0px 13px 20px red'
  }
}

export { Circle }
