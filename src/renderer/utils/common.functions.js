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

