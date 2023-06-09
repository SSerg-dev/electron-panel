/* StandardOptions */
const upStandardOptions = {
  type: 'left',
  background: 'rgb(255, 255, 255)',
  border: '0.4em solid rgb(64, 196, 255)',
  boxShadow: 'rgb(64, 196, 255) 0px 10px 20px',
  fontSize: '1em',
  width: '25.5em'
}
const downStandardOptions = {
  type: 'left',
  background: 'rgb(64, 196, 255)',
  border: '0.4em solid rgb(64, 196, 255)',
  boxShadow: 'rgb(64, 196, 255) 0px 10px 20px',
  fontSize: '1em',
  width: '25.5em'
}
/* X2Options */
const upX2Options = {
  type: 'right',
  background: 'rgb(255, 255, 255)',
  border: '0.4em solid rgb(191,0,229)',
  boxShadow: 'rgb(191,0,229) 0px 10px 20px',
  fontSize: '1em',
  width: '7em'
}
const downX2Options = {
  type: 'right',
  background: 'rgb(191,0,229)',
  border: '0.4em solid rgb(191,0,229)',
  boxShadow: 'rgb(191,0,229) 0px 10px 20px',
  fontSize: '1em',
  width: '7em'
}
/* TurboOptions */
const upTurboOptions = {
  type: 'right',
  background: 'rgb(255, 255, 255)',
  border: '0.4em solid rgb(255,3,3)',
  boxShadow: 'rgb(255,3,3) 0px 10px 20px',
  fontSize: '1.em',
  width: '7em'
}
const downTurboOptions = {
  type: 'right',
  background: 'rgb(255,3,3)',
  border: '0.4em solid rgb(255,3,3)',
  boxShadow: 'rgb(255,3,3) 0px 10px 20px',
  fontSize: '1em',
  width: '7em'
}

/* ColorOptions */
const upColorOptions = {
  type: 'center',
  background:
    'linear-gradient(to bottom right, rgb(81,210,166), rgb(0,185,228),rgb(255,63,155))',
  border: '0.2em solid rgb(81,210,166)',
  boxShadow: 'rgb(81,210,166) 0px 10px 20px',
  fontSize: '1em',
  width: '7em'
}
const downColorOptions = {
  type: 'center',
  background: 'rgb(255,63,155)',
  border: '0.2em solid rgb(255,63,155)',
  boxShadow: 'rgb(255,63,155) 0px 10px 20px',
  fontSize: '1em',
  width: '7em'
}

const upGreenOptions = {
  type: 'left',
  background: 'rgb(255,255,255)',
  border: '0.4em solid rgb(118, 255, 3)',
  boxShadow: 'rgb(118, 255, 3) 0px 10px 20px',
  fontSize: '1em',
  width: '51em' // 51
}
const downGreenOptions = {
  type: 'left',
  background: 'rgb(118, 255, 3)',
  border: '0.4em solid rgb(118, 255, 3)',
  boxShadow: 'rgb(118, 255, 3) 0px 10px 20px',
  fontSize: '1em',
  width: '51em' // 51
}
const upRedOptions = {
  type: 'left',
  background: 'rgb(255,255,255)',
  border: '0.4em solid rgb(255,3,3)',
  boxShadow: 'rgb(255,3,3) 0px 10px 20px',
  fontSize: '1em',
  width: '7em'
}
const downRedOptions = {
  type: 'left',
  background: 'rgb(255,3,3)',
  border: '0.4em solid rgb(255,3,3)',
  boxShadow: 'rgb(255,3,3) 0px 10px 20px',
  fontSize: '1em',
  width: '7em'
}
const upDryOptions = {
  type: 'left',
  background: 'rgb(255,255,255)',
  border: '0.4em solid rgb(29,233,182)',
  boxShadow: 'rgb(29,233,182) 0px 10px 20px',
  fontSize: '1em',
  width: '32.5em'
}
const downDryOptions = {
  type: 'left',
  background: 'rgb(29,233,182)',
  border: '0.4em solid rgb(29,233,182)',
  boxShadow: 'rgb(29,233,182) 0px 10px 20px',
  fontSize: '1em',
  width: '32.5em'
}
/* dev */
/* StopOptions */
const upStopOptions = {
  type: 'stop',
  background: 'rgb(255, 255, 255)',
  border: '0.4em solid rgb(255,3,3)',
  boxShadow: 'rgb(255,3,3) 0px 10px 20px',
  fontSize: '1em',
  width: '32.5em'
}
const downStopOptions = {
  type: 'stop',
  background: 'rgb(255,3,3)',
  border: '0.4em solid rgb(255,3,3)',
  boxShadow: 'rgb(255,3,3) 0px 10px 20px',
  fontSize: '1em',
  width: '32.5'
}

const buttonSizeOptions = {
  borderRadius: 2, //2
  
  height: 7,
  
  extraSmall: 7,
  small: 25.5,
  medium: 32.5,
  extraMedium: 51.5, // 52
  large: 59.5,
  extraLarge: 67,

  halfMore: 0.5,
  halfLess: -0.5,

  oneMore: 1,
  twoMore: 2,
  
  oneLess: -1,
  twoLess: -2,

  suffix: 'em'
}

export {
  upStandardOptions,
  downStandardOptions,
  upX2Options,
  downX2Options,
  upColorOptions,
  downColorOptions,
  upGreenOptions,
  downGreenOptions,
  upRedOptions,
  downRedOptions,
  upTurboOptions,
  downTurboOptions,
  upDryOptions,
  downDryOptions,
  buttonSizeOptions,
  upStopOptions,
  downStopOptions

}
