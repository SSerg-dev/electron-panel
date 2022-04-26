import { exec } from "child_process"
import { EventEmitter } from 'events'
import { wait } from '../utils'

class RedisService extends EventEmitter {
  
  constructor() {
      super()
      
  }
  public sendRedisData() {
    console.log('[...start sendRedisData]')
    
  } 
}

export default RedisService
