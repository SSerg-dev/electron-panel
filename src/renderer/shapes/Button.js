import { Box } from '@/shapes/Box.js'
import { getBlinkMemoryInfo } from 'process'

class Button extends Box { 

  static type = 'BUTTON'

  constructor(options) {
    super(options)
    /* dev */
    
    // this.$el.style.width = 28,
    // this.$el.style.height = 25,

    // this.$el.style.background = 'rgb(255, 255, 255)',
    // this.$el.style.borderTopRightRadius = 3,
    // this.$el.style.borderTopLeftRadius = 3,
    // this.$el.style.borderBottomRightRadius = 3,
    // this.$el.style.borderBottomLeftRadius = 3
    /*     */

    // font color 
    //this.$el.style.color = options.color
    //this.$el.style.boxShadow = options.boxShadow
    
    // flex
    this.$el.style.display = 'flex'
    this.$el.style.alignItems = 'center'
    this.$el.style.justifyContent = 'center'
    

  }


  // methods
  getButtonInfo() {
    console.log('!!++getButtonInfo')
  }
  // getters
  get background() {
    return this.$el.style.background
  }
  get color() {
    return this.$el.style.color
  }
  get border() {
    return this.$el.style.border
  }
  get boxShadow() {
    return this.$el.style.boxShadow
  }
  
  get fontSize() {
    return this.$el.style.fontSize
  } 

  // setters
  set background(newBackground) {
    this.$el.style.background = newBackground
  }
  set color(newColor) {
    this.$el.style.color = newColor
  } 
  set border(newBorder) {
    this.$el.style.border = newBorder
  }
  set boxShadow(newBoxShadow) {
    this.$el.style.boxShadow = newBoxShadow
  }
  // fontSize
  set fontSize(newFontSize) {
    this.$el.style.fontSize = newFontSize
  }
  // flex
 set display(newDisplay) {
   this.$el.style.display = newDisplay
 }
 set alignItems(newAlignItems) {
   this.$el.style.alignItems = newAlignItems
 }
 set justifyContent(newJustifyContent) {
   this.$el.style.justifyContent = newJustifyContent
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
