function dateFilter(value, format = 'datetime') {
  const options = {}

  options.day = '2-digit'
  options.month = '2-digit'
  options.year = 'numeric'

  options.hour = '2-digit'
  options.minute = '2-digit'
  options.second = '2-digit'

  let year, month, day
  let hour, minute, second

  let result = new Intl.DateTimeFormat('ru-RU', options).format(new Date(value))

  year = result.slice(6, 10)
  month = result.slice(3, 5)
  day = result.slice(0, 2)

  hour = result.slice(12, 14)
  minute = result.slice(15, 17)
  second = result.slice(18, 20)

  if (format.includes('date')) result = year + month + day
  if (format.includes('time')) result = hour + minute + second
  if (format.includes('datetime'))
    result = year + month + day + hour + minute + second

  return result
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function createOrder() {
  const type = this.getPanelType
  const date = this.dateFilter(new Date())
  let result, index, prefix, suffix
  suffix = this.getRndInteger(10000, 99999)

  switch (type) {
    case 'wash':
      if (this.getWetOrder === '') {
        prefix = 'W'
        index = this.getDefaultPanelNumber
        result = prefix + index + date
        // result = prefix + index + date + '_' + suffix.toString()
      } else result = this.getWetOrder
      break
    case 'vacuum':
      if (this.getDryOrder === '') {
        prefix = 'V'
        index = this.getVacuumNumber
        result = prefix + index + date
        // result = prefix + index + date + '_' + suffix.toString()
      } else result = this.getDryOrder
      break
    default:
      break
  }

  return result
}
function log(value) {
  console.log('log value-->', value)
}

export { dateFilter, getRndInteger, createOrder, log }

// import { dateFilter, getRndInteger, createOrder, log } from '@/utils/order.js'
