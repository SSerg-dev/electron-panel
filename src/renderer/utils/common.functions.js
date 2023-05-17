import { setFullYear, setHours } from 'date-fns'

export function synchronize(options) {
  const result = new Date()

  // set controller date to panel
  const { year, month, day } = options.date
  result.setFullYear(+year, +month - 1, +day)

  // set controller time to panel
  const { hour, minute, second } = options.time
  result.setHours(+hour, +minute, +second)
  // result.setHours(11, 1, 32)

  return result
}

export function compareVersion(v1, v2) {
  if (typeof v1 !== 'string') return false
  if (typeof v2 !== 'string') return false
  v1 = v1.split('.')
  v2 = v2.split('.')
  const k = Math.min(v1.length, v2.length)
  for (let i = 0; i < k; ++i) {
    v1[i] = parseInt(v1[i], 10)
    v2[i] = parseInt(v2[i], 10)

    
    if (v1[i] > v2[i]) return 1
    if (v1[i] < v2[i]) return -1
  }
  const result = v1.length === v2.length ? 0 : v1.length < v2.length ? -1 : 1
  return result

  
}
