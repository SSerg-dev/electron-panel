import { Queue } from '@/queue/index.js'

class LocalStorage {
  constructor() {
    this.queue = new Queue()
  }
  get() {
    const dataFromLocalStorage = 'data from local storage'
    return dataFromLocalStorage
  }
  set(method, options, type) {
    // console.log('$$!! setClient options', method, options, type)
    const item = { method, options, type }
    this.queue.enqueue(item)
    // console.log('$$ this.queue.peek()', this.queue.peek())
    // console.log('$$ this.queue.length', this.queue.length)
    return 0
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
