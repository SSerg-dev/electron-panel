
export function parseMask(visibleMask, masks = []) {
  let result
  
  if (visibleMask.length > 0) {
    visibleMask = visibleMask.replace(/block/g, '1').replace(/none/g, '0')
  }
  switch (visibleMask) {
      case masks[0]:
      case masks[1]:
      case masks[2]:
      case masks[3]:  
      result = 'extraLarge'   
      break

    default:
      result = 'medium'
      break
  }
  return result
}


