class Database {
  constructor(client) {
    this.client = client
  }
  getData(key) {
    return this.client.getClient(key)
  }
}

export { Database }
