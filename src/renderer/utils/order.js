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

function createOrder(type, wetOrder = '', dryOrder = '', panelNumber, vacuumNumber) {
  // const type = this.getPanelType
  const date = dateFilter(new Date())
  let result, index, prefix, suffix
  suffix = getRndInteger(10000, 99999)

  switch (type) {
    case 'wash':
      if (wetOrder === '') {
        prefix = 'W'
        index = panelNumber
        result = prefix + index + date
        // result = prefix + index + date + '_' + suffix.toString()
      } else result = wetOrder
      break
    case 'vacuum':
      if (dryOrder === '') {
        prefix = 'V'
        index = vacuumNumber
        result = prefix + index + date
        // result = prefix + index + date + '_' + suffix.toString()
      } else result = dryOrder
      break
    default:
      break
  }

  return result
}


function log(value) {
  console.log('log value-->', value)
}

export { dateFilter, getRndInteger, log }

// import { dateFilter, getRndInteger, log } from '@/utils/order.js'
