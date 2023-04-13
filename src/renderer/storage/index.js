import { Database } from './database.js'
import { LocalStorage, LocalStorageClient } from './local.js'
import { Fetch, FetchClient } from './fetch.js'
import { ipcRenderer } from 'electron'

//---------------------------------------
class Storage {
  constructor(client, url) {
    this.client = client  
    this.url = url
  }
  getClient(method, options, type) { 
    // console.log('storage-->method-->', method)
    this.getCertificate()

    if (this.client === 'local') 
      this.data = new Database(new LocalStorageClient(method, options, type))
    else if (this.client === 'fetch') 
      this.data = new Database(new FetchClient(this.url, method, options, type))
    else {
        console.warn('database not exist')
        return
    }
    return this.data.getData()  
  }
  getCertificate() {
    const options = 'ipcRenderer.send getCertificate'
    ipcRenderer.send('async-certificate-start', options)
    // console.log('$$++ index.js: 25 async-certificate-start')
    
  }
}

export { Storage }
