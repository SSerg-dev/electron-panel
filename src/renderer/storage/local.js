import { Queue } from '@/queue/index.js'

class LocalStorage {

  key = null
  value = null
  maxQueueNumber = 100

  constructor() {
    this.queue = new Queue()
    // init key
    this.key = window.localStorage.getItem('key')
    if (!this.key) window.localStorage.setItem('key', '0')
  }
  get() {
    const queueKeys = Object.keys(localStorage)
      .filter(key => Number.isInteger(+key) && +key < this.maxQueueNumber)
      .sort((a, b) => (a > b ? 1 : b > a ? -1 : 0))

    const queueValues = []
    queueKeys.forEach((key, index) => {
      queueValues[index] = window.localStorage.getItem(key.toString())
    })

    return queueValues
  }
  set(method, options, type) {
    const args = { method, options, type }

    this.key = window.localStorage.getItem('key')
    if (+this.key < this.maxQueueNumber) {
      window.localStorage.setItem(
        this.key.toString(),
        JSON.stringify(args.options)
      )
      this.key++
      window.localStorage.setItem('key', this.key.toString())
      return 0
    }
    return -1
  }

  /* getQueues() {
    const queueKeys = Object.keys(localStorage)
      .filter(key => Number.isInteger(+key) && +key < this.maxQueueNumber)
      .sort((a, b) => (a > b ? 1 : b > a ? -1 : 0))

    const queueValues = []
    queueKeys.forEach((key, index) => {
      queueValues[index] = window.localStorage.getItem(key.toString())
    })

    // console.log('queueKeys', queueKeys)
    console.log('queueValues', queueValues)

    return queueValues
  } */
}
class LocalStorageClient {
  constructor(method, options, type) {
    this.method = method
    this.options = options
    this.type = type

    this.localStorage = new LocalStorage()
  }
  getClient() {
    let result = null
    
    if (this.type === 'setQueue')
      result = this.localStorage.set(this.method, this.options, this.type)
    if (this.type === 'getQueue')
      result = this.localStorage.get(this.method, this.options, this.type)

    return result
  }
}

export { LocalStorage, LocalStorageClient }
