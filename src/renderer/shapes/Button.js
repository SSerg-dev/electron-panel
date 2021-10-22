import { Box } from '@/shapes/Box.js'

class Button extends Box {
  constructor(options) {
    super(options)
    this.$el.style.color = options.color
    this.$el.style.boxShadow = options.boxShadow
  }
}

export { Button }


/* import { Component, Box, Circle, Button } from '@/shapes/index.js' */
/* html */
/* <div
      id="button-main"
      style="background: white; margin-left: 0em; width: 945px;"
></div> */

/* Java Script */
/* const button = new Button({
      selector: '#button-main',
      width: 60,
      height: 5,

      color: 'rgb(255, 255, 255)',
      borderTopRightRadius: 2,
      borderTopLeftRadius: 2,
      borderBottomRightRadius: 2,
      borderBottomLeftRadius: 2,

      border: 'solid 0.4em #00B9E3',

      boxShadow: '0px 13px 20px #00B9E3'
    })
    button.hide()
    button.show()
    button.opacity(0.5) */
