// shapes -------------------------------
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

// box
class Box extends Component {

  constructor(options) {
    super(options.selector)

    this.$el.style.width = this.$el.style.height = options.size + 'px'

    this.$el.style.width = options.width + 'em'
    this.$el.style.height = options.height + 'em'
    
    this.$el.style.background = options.color
    //this.$el.style.borderRadius = options.borderRadius + 'em'

    this.$el.style.borderTopRightRadius = options.borderTopRightRadius + 'em'
    this.$el.style.borderTopLeftRadius = options.borderTopLeftRadius + 'em'
    this.$el.style.borderBottomRightRadius = options.borderBottomRightRadius + 'em'
    this.$el.style.borderBottomLeftRadius = options.borderBottomLeftRadius + 'em'

    this.$el.style.border = options.border
    this.$el.style.boxShadow = options.boxShadow

    
  }
}

// example box --------------------------
/* 
const box01 = new Box({
  selector: '#box01',
  // size: 100,

  width: 10,//160,
  height: 5, //100,

  color: 'yellow',
  borderRadius: 1,
  border: 'solid 0.2em #00B9E3',

  boxShadow: '0px 13px 20px #00B9E3'
  
  

})

const box02 = new Box({
  selector: '#box02',
  size: 120,
  color: 'blue',
  borderRadius: 2,
  border: 'solid 0.2em #00B9E3',

  boxShadow: '0px 13px 20px yellow'
  
  
})

*/

// circle
class Circle extends Box {

  constructor(options) {
    super(options)

    this.$el.style.borderRadius = '50%'
    this.$el.style.boxShadow = '0px 13px 20px red'

  }
}

// example circle -----------------------
/* 
const circle = new Circle ({

  selector: '#circle',
  size: 120,
  color: 'salmon',
  border: 'solid 0.2em #00B9E3' 

})
*/

// button
class Button extends Box {

  constructor(options) {
    super(options)
    this.$el.style.color = options.color
    this.$el.style.boxShadow = options.boxShadow
 

  }
}

// example button -----------------------


  const button = new Button ({

  selector: '#button-main',
  width: 10,
  height: 5,

  color: 'rgb(224, 224, 224)',
  //borderRadius: 1,
  borderTopRightRadius: 1,
  borderTopLeftRadius: 1,
  borderBottomRightRadius: 1,
  borderBottomLeftRadius: 1,

  border: 'solid 0.2em #00B9E3',
  
  boxShadow: '0px 13px 20px #00B9E3'

})


export { Component, Box, Circle, Button }







