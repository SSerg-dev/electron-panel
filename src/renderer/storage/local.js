class LocalStorage {
  get() {
    const dataFromLocalStorage = 'data from local storage'
    return dataFromLocalStorage
  }
}
class LocalStorageClient {
  constructor() {
    this.localStorage = new LocalStorage()
  }
  getClient(key) {
    return this.localStorage.get(key)
  }
}

export { LocalStorage, LocalStorageClient }
