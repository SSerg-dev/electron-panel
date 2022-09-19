import { Queue } from '@/queue/index.js'

class LocalStorage {
  // static queues = []
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
    const dataFromLocalStorage = 'data from local storage'
    return dataFromLocalStorage
  }
  set(method, options, type) {
    const args = { method, options, type }

    this.key = window.localStorage.getItem('key')
    if (+this.key < this.maxQueueNumber) {
      this.queue.enqueue(args)
      window.localStorage.setItem(
        this.key.toString(),
        JSON.stringify(this.queue)
      )

      this.key++
      window.localStorage.setItem('key', this.key.toString())

      this.runQueue()
      return 0
    }
    return -1
  }
  runQueue() {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i)

      if (Number.isInteger(+key) && +key < this.maxQueueNumber) {
        console.log(`${key}`)
      } 
    }
  }
}
class LocalStorageClient {
  constructor(method, options, type) {
    this.method = method
    this.options = options
    this.type = type

    this.localStorage = new LocalStorage()
  }
  getClient() {
    // return this.localStorage.get(this.method, this.options, this.type)
    return this.localStorage.set(this.method, this.options, this.type)
  }
}

export { LocalStorage, LocalStorageClient }
