import { Database } from './database.js'
import { LocalStorage, LocalStorageClient } from './local.js'
import { Fetch, FetchClient } from './fetch.js'
import { ipcRenderer } from 'electron'

//---------------------------------------
class Storage {
  constructor(client, url) {
    this.client = client
    this.url = url

    this.certificate = {
      cert: null,
      key: null
    }
    this.getCertificate()
  }

  getClient(method, options, type) {
    if (this.client === 'local')
      this.data = new Database(new LocalStorageClient(method, options, type))
    else if (this.client === 'fetch')
      this.data = new Database(
        new FetchClient(this.url, method, options, type, this.certificate)
      )
    else {
      console.warn('database not exist')
      return
    }
    return this.data.getData()
  }
  getCertificate() {
    const options = {
      isCertificate: true
    }

    /* ipcRenderer.invoke('async-certificate-start', options).then((data) => {
      try {
        data = JSON.parse(data)
        this.certificate.cert = data.crt || {}
        this.certificate.key = data.key || {}
      } catch (err) {
        console.warn('async-certificate-start: Error:', err)
      }
    }) */

    ipcRenderer.send('async-certificate-start', options)

    ipcRenderer.on('async-certificate-reply', (event, dataCert, dataKey) => {
      this.certificate.cert = dataCert || {}
      this.certificate.key = dataKey || {}

      options.isCertificate = false
    })
  }
}

export { Storage }
