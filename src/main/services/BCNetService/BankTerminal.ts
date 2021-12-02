/**
 * BankTerminal.ts
 * 
 * @copyright 2021 Alles Good
 * 
 */

 import { EventEmitter } from 'events'
 import SerialPort from 'serialport'
 
 import { ADR_BILL_VALIDATOR, ADR_CARD_READER, CRC_POLY } from './Constants'
 import BCNetParser from './BCNetParser'
 import CMDS from './Commands'
 import { wait } from '../../utils'
 
 /**
  * Class BankTerminal
  * 
  * The object implements the main methods and events for working 
  * using the "CCNet" protocol.
  * 
  * @version 1.0.0
  */
 class BankTerminal extends EventEmitter {
     adr: number
     commands: any
     port: string
     portOptions: any
     serial: any
     parser: any
     info: any
     billTable: any[]
     status: any
     secondStatus: any
     isDebug: any
     isConnect: boolean
     isSend: boolean
     statusTimer: any
     statusTimerInterval: number
     statusTimerEnable: boolean
     enabled: boolean
 
     /**
      * BankTerminal constructor.
      * 
      * @param {String} port Serialport address.
      * @param {Boolean} debug Printing debug info flag.
      */
     constructor (port: string, debug: boolean = false) {
         /* Parent constructor. */
         super()
         /*  */
         let self = this
         /* --------------------------------------------------------------------- */
         /* Set peripheral addresses. */
        //  this.adr = ADR_BILL_VALIDATOR
        this.adr = ADR_CARD_READER
         /* List of available commands. */
         this.commands = CMDS(this)
         /* --------------------------------------------------------------------- */
         /* Set comport address. */
         this.port = port
         /* Set comport options. */
         this.portOptions = {
             baudRate: 9600,
             databits: 8,
             stopbit: 1,
             parity: 'none',
             autoOpen: false
         }
         /* Create comport driver.  */
         this.serial = new SerialPort(this.port, this.portOptions, (err) => this.debug(err))
         /* On serial open event. */
         this.serial.on('open', () => self.onSerialPortOpen())
         /* On serial error event. */
         this.serial.on('error', (error: any) => self.onSerialPortError(error))
         /* On serial close event. */
         this.serial.on('close', () => this.onSerialPortClose())
         /* Set CCNet packet parser. */
         this.parser = this.serial.pipe(new BCNetParser())
         /* --------------------------------------------------------------------- */
         /* Device identification information. */
         this.info = {
             model  : '',
             serial : '',
             asset  : '',
         }
         /* List of supported bills. */
         this.billTable = []
         /* Main status code. */
         this.status = null
         /* Second status code. */
         this.secondStatus = null
         /* --------------------------------------------------------------------- */
         /* Set debug info flag. */
         this.isDebug = debug
         /* Flag of the established connection to the device. */
         this.isConnect = false
         /* A flag indicating the current send data of the command. */
         this.isSend = false
         /* --------------------------------------------------------------------- */
         /* Container for the timer object. */
         this.statusTimer = null
         /* Status timer interval ms. */
         this.statusTimerInterval = 200
         /* Flag for repeater "POLL" requests. */
         this.statusTimerEnable = false
         /*  */
         this.enabled = false
     }
 
     /* Getters / Setters methods --------------------------------------------- */
     /* ----------------------------------------------------------------------- */
 
     /**
      * Get serial open state.
      */
     get isOpen () { 
         return this.serial.isOpen
     }
 
     /**
      * Get status.
      */
     get getStatus () { 
         return this.status
     }
 
     get getInfo () { 
         return this.info
     }
     
     get getBillTable () { 
         return this.billTable
     }
 
     /* Logics methods -------------------------------------------------------- */
     /* ----------------------------------------------------------------------- */
 
     /**
      * Open comport.
      */
     open = () => {
         let self = this
         return new Promise<any>((resolve, reject) => {
             if ( self.serial.isOpen ) {
                 resolve(true)
             } else {
                 self.serial.open((error: any) => {
                     if ( error ) {
                         reject(error)
                     }
                     resolve(true)
                 })
             }
         })
     }
   
     /**
      * Connect to device.
      */
     connect = async () => {
         /* Check comport. */
         if ( !this.isOpen ) {
             try {
                 await this.open()
             } catch (error) {
                 /* !!! */
                 throw error
             }
         }
         /* Begin device init. -------------------------------------------------- */
         try {
             /* Reset device. */
             await this.reset()
             /* Wait "Initial" status. */
             await this.waitStatus('13', 1500)
             /* Get information about the model and serial numbers. */
             this.info = await this.execute(this.commands.Identification)
             /* Get bill type description. */
             this.billTable = await this.execute(this.commands.GetBillTable)
             return true
         } catch (error) {
             /* !!! */
             throw error
         }
     }
 
     /* ----------------------------------------------------------------------- */
 
     /**
      * 
      */
     reset = async () => {
         try {
             /* Reset device. */
             await this.execute(this.commands.Reset)
         } catch (error) {
             console.log(error)
         }
     }
 
     /**
      * 
      */
     begin = async () => {
         try {
             await this.execute(this.commands.EnableBillTypes, [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF])
         } catch (error) {
             console.log(error)
         }
     }
 
     /**
      * 
      */
     stack = async () => {
         try {
             await this.execute(this.commands.Stack)
         } catch (error) {
             console.log(error)
         }
     }
 
     /**
      * 
      */
     retrieve = async () => {
         try {
             await this.execute(this.commands.Return)
         } catch (error) {
             console.log(error)
         }
     }
 
     /**
      * 
      */
     end = async () => {
         try {
             await this.execute(this.commands.EnableBillTypes, [0x00, 0x00, 0x00, 0x00, 0x00, 0x00])
         } catch (error) {
             console.log(error)
         }
     }
 
     isBusy = () => {
         switch ( this.status ) {
             /* Accepting. */
             case 0x15:           
             /* Stacking. */
             case 0x17:           
             /* Returning. */
             case 0x18:
             /* Holding. */
             case 0x1A:           
             /* Device busy. */
             case 0x1B:           
             /* Generic rejecting code. */
             case 0x1C:           
                 return true
             default:               
                 return false
         }
     }
     
     /* ----------------------------------------------------------------------- */
 
     /**
      * Disconnect from device.
      */
     disconnect = async () => {
         try {
             await this.close()
         } catch (err) {
             throw err
         }
     }
 
     /**
      * Close comport.
      */
     close = () => {
         let self = this
         return new Promise<any>((resolve, reject) => {
             if ( self.serial.isOpen ) {
                 self.serial.close((error: any) => {
                     if ( error ) {
                         reject(error)
                     }
                     resolve(true)
                 })
             } else {
                 resolve(true)
             }
         })
     }
 
     /* Events methods -------------------------------------------------------- */
     /* ----------------------------------------------------------------------- */
 
     /**
      * On serial open event.
      */
     onSerialPortOpen = () => {
         /*  */
         this.statusTimerStart()
         /*  */
         this.debug('Serialport Open.')
     }
 
     /**
      * On serial error event.
      */
     onSerialPortError = (error: any) => this.debug('Serialport Error:', error)
 
     /**
      * On serial close event.
      */
     onSerialPortClose = () => this.debug('Serialport Close.')
 
     /* ----------------------------------------------------------------------- */
 
     /**
      * All device events handler.
      * 
      * @param {Buffer} status 
      */
     onStatus = (status: Buffer) => {
         let code = ''
         /*  */
         if ( status.length >= 2 ) {
             if (
                 this.status !== status[0].toString(16) ||
                 this.secondStatus !== status[1].toString(16)
             ) {
                 /*  */
                 this.status = status[0].toString(16)
                 this.secondStatus = status[1].toString(16)
 
                 /*  */
                 this.emit('status', this.status, this.secondStatus)
 
                 /* Send event by status. */
                 switch (status[0]) {
                     /* Device busy. */
                     case 0x1B:
                     break
                     /* Generic rejecting code. */
                     case 0x1C:
                              if ( status[1] == 0x60 ) code = "Insertion"
                         else if ( status[1] == 0x61 ) code = "Magnetic"
                         else if ( status[1] == 0x62 ) code = "Remained bill in head"
                         else if ( status[1] == 0x63 ) code = "Multiplying"
                         else if ( status[1] == 0x64 ) code = "Conveying"
                         else if ( status[1] == 0x65 ) code = "Identification"
                         else if ( status[1] == 0x66 ) code = "Verification"
                         else if ( status[1] == 0x67 ) code = "Optic"
                         else if ( status[1] == 0x68 ) code = "Inhibit"
                         else if ( status[1] == 0x69 ) code = "Capacity"
                         else if ( status[1] == 0x6A ) code = "Operation"
                         else if ( status[1] == 0x6C ) code = "Length"
                         else if ( status[1] == 0x6D ) code = "UV"
                         else if ( status[1] == 0x92 ) code = "Unrecognised barcode"
                         else if ( status[1] == 0x93 ) code = "Incorrect number of characters in barcode"
                         else if ( status[1] == 0x94 ) code = "Unknown barcode start sequence"
                         else if ( status[1] == 0x95 ) code = "Unknown barcode stop sequence"
                         else                          code = "Unknown"
                         /* Fire event. */
                         this.emit("rejecting", `Rejecting due to ${code}`, status[1].toString(16).padStart(2, '0'))
                     break
                     /* Generic failure codes. */
                     case 0x47:
                         if ( status[1] == 0x50 ) code = "Stack motor"
                         else if ( status[1] == 0x51 ) code = "Transport motor speed"
                         else if ( status[1] == 0x52 ) code = "Transport motor"
                         else if ( status[1] == 0x53 ) code = "Aligning motor"
                         else if ( status[1] == 0x54 ) code = "Initial cassette status"
                         else if ( status[1] == 0x55 ) code = "Optic canal"
                         else if ( status[1] == 0x56 ) code = "Magnetic canal"
                         else if ( status[1] == 0x5F ) code = "Capacitance canal"
                         else                          code = "Unknown"
                         /* Fire event. */
                         this.emit("failure", `${code} failure`, status[1].toString(16).padStart(2, '0'))
                     break
                     /* Escrow position. */
                     case 0x80:
                         /* Fire event. */
                         this.emit('escrow', this.billTable[parseInt(status[1].toString(10))])
                     break
                     /* Bill stacked. */
                     case 0x81:
                         /* Fire event. */
                         this.emit('stacked', this.billTable[parseInt(status[1].toString(10))])
                     break
                     /* Bill returned. */
                     case 0x82:
                         /* Fire event. */
                         this.emit('returned', this.billTable[parseInt(status[1].toString(10))])
                     break
                 }
             }
         } else {
             if (
                 this.status !== status[0].toString(16)
             ) {
                 /*  */
                 this.status = status[0].toString(16)
                 this.secondStatus = ''
                 /*  */
                 this.emit('status', this.status, '')
                 /* Send event by status. */
                 switch (status[0]) {
                     /* Power Up. */
                     case 0x10:
                         /* Fire event. */
                         this.emit('power-up')
                     break
                     /* Power Up with Bill in Validator. */
                     case 0x11:
                         /* Fire event. */
                         this.emit('power-up-with-bill')
                     break
                     /* Power Up with Bill in Stacker. */
                     case 0x12:
                         /* Fire event. */
                         this.emit('power-up-with-bill-in-stacker')
                     break
                     /* Initialize. */
                     case 0x13:
                         /* Fire event. */
                         this.emit('initialize')
                     break
                     /* Idling. */
                     case 0x14:
                         /* Fire event. */
                         this.emit('idling')
                     break
                     /* Accepting. */
                     case 0x15:
                         /* Fire event. */
                         this.emit('accepting')
                     break
                     /* Stacking. */
                     case 0x17:
                         /* Fire event. */
                         this.emit('stacking')
                     break
                     /* Returning. */
                     case 0x18:
                         /* Fire event. */
                         this.emit('returning')
                     break
                     /* Unit Disabled. */
                     case 0x19:
                         /* Fire event. */
                         this.emit('disabled')
                     break
                     /* Holding. */
                     case 0x1A:
                         /* Fire event. */
                         this.emit('holding')
                     break
                     /* Drop Cassette Full. */
                     case 0x41:
                         /* Fire event. */
                         this.emit('cassette-full')
                     break
                     /* Drop Cassette out of position. */
                     case 0x42:
                         /* Fire event. */
                         this.emit('cassette-out-of-position')
                     break
                     /* Validator Jammed. */
                     case 0x43:
                         /* Fire event. */
                         this.emit('validator-jammed')
                     break
                     /* Drop Cassette Jammed. */
                     case 0x44:
                         /* Fire event. */
                         this.emit('cassette-jammed')
                     break
                     /* Cheated. */
                     case 0x45:
                         /* Fire event. */
                         this.emit('cheated')
                     break
                     /* Pause. */
                     case 0x46:
                         /* Fire event. */
                         this.emit('pause')
                     break
                 }
             }
         }
     }
 
     /**
      * Event of processing the status timer.
      */
     onStatusTimer = async () => {
         /* Linked self. */
         let self = this
         /* Clear timer. */
         clearInterval(this.statusTimer)
         /* Check comport init. */
         if ( !this.isOpen ) {
             return
         }
         /* Get current status. */
         try {
             const data = await this.execute(this.commands.Poll)
             /* Send event. */
             self.onStatus(data)
         } catch (error) {
             self.debug(error)
         }
         /* Check permission to run. */
         if ( self.statusTimerEnable ) {
             /* Start status timer. */
             self.statusTimer = setTimeout(() => {
                 self.onStatusTimer()
             }, self.statusTimerInterval)
         }
     }
 
     /* Utils methods --------------------------------------------------------- */
     /* ----------------------------------------------------------------------- */
     
     /**
      * Start status timer.
      */
     statusTimerStart = () => {
         if ( this.statusTimerEnable ) {
             clearTimeout(this.statusTimer)
         }
         /* Linked self. */
         let self = this
         /* Set flag. */
         this.statusTimerEnable = true
         /* Start status timer. */
         this.statusTimer = setTimeout(() => {
             self.onStatusTimer()
         }, this.statusTimerInterval)
     }
 
     /**
      * Stop status timer.
      */
     statusTimerStop = () => {
         /* Set flag. */
         this.statusTimerEnable = false
         /* Clear status timer. */
         clearTimeout(this.statusTimer)
     }
 
     /* ----------------------------------------------------------------------- */
 
     /**
      * Waits for the occurrence of the specified status event.
      * 
      * @param {String} status Number of status code.
      * @param {Number} timeout The maximum time to complete this action.
      * @returns {Promise} 
      */
     waitStatus = (status: string, timeout: number = 1000) => {
         /* Linked self. */
         let self = this
         /* Async worker. */
         return new Promise<any>((resolve, reject) => {
             /* Check current status. */
             if ( self.status == status ) {
                 /* Send event. */
                 resolve(true)
             }
             /* Timeout timer. */
             let timer: any = null
             /* Timeout handler. */
             let timerHandler = () => {
                 /* Clear timeout timer. */
                 clearTimeout(timer)
                 /* Unbind event. */
                 self.removeListener('status', handler)
                 /* Send event. */
                 reject(new Error('Request timeout.'))
             }
             /* Event handler. */
             let handler = (primary: string) => {
                 if ( primary == status ) {
                     /* Clear timeout timer. */
                     clearTimeout(timer)
                     /* Unbind event. */
                     self.removeListener('status', handler)
                     /* Send event. */
                     resolve(true)
                 }
             }
             /* Bind event. */
             self.on('status', handler)
             /* Start timeout timer. */
             if ( timeout ) {
                 timer = setTimeout(timerHandler, timeout)
             }
         })
     }
 
     /**
      * Waiting for the completion of the processing of the current command.
      * 
      * @param {Number} timeout The maximum time to complete this action.
      * @returns {Promise}
      */
     waitSending = (timeout: number = 1000) => {
         /* Linked self. */
         let self = this
         /* Async worker. */
         return new Promise<any>((resolve, reject) => {
             /* Waiting timer. */
             let timer: any = null
             /* Interval for checking the status in ms. */
             let interval:number = 50
             /* Waiting timeout. */
             let counter: number = 0
             /* Check flag. */
             if ( !self.isSend ) {
                 /* Send event. */
                 resolve(true)
             }
             /* Timeout timer handler. */
             let timerHandler = () => {
                 counter += interval
                 /* Check flag. */
                 if ( !self.isSend ) {
                     /* Clear timer. */
                     clearInterval(timer)
                     /* Send event. */
                     resolve(true)
                 } else if ( counter >= timeout ) {
                     /* Clear timer. */
                     clearInterval(timer)
                     /* Send event. */
                     reject(new Error('Request timeout.'))
                 }
             }
             /* Bind timeout handler. */
             timer = setInterval(timerHandler, interval)
         })
     }
 
     /* ----------------------------------------------------------------------- */
 
     /**
      * Sending a data packet.
      * 
      * @param {Buffer} request Data packet.
      * @param {Number} timeout The maximum time to complete this action.
      * @returns {Promise}
      */
     send = (request: Buffer, timeout: number = 1000) => {
         /* Linked self. */
         let self = this
         /* Async worker. */
         return new Promise<any>(async (resolve, reject) => {
             /* Timeout timer. */
             let timer: any = null
             /* Timeout timer handler. */
             let timerHandler = () => {
                 /* Update flag. */
                 self.isSend = false
                 /* Send event. */
                 reject(new Error('Request timeout.'))
             }
             /* Receive packet handler. */
             let handler = async (response: Buffer) => {        
                 /* Unbind timeout handler. */
                 clearTimeout(timer)
                 /* Unbind event. */
                 self.parser.removeListener('data', handler)
 
                 this.debug(`response => ${response.toString()}`)
                 await wait(100)
 
                 /* Check CRC */
                 let ln = response.length
                 let check = response.slice(ln-2, ln)
                 let slice = response.slice(0, ln-2)
                 /* Check response CRC. */
                 if ( check.toString() !== (self.getCRC16(slice)).toString() ) {
                     /* Send NAK. */
                     this.debug("Send NAK")
                     await self.serial.write(self.commands.Nak.request())
                     /* Update flag. */
                     self.isSend = false
                     /* Send event. */
                     reject(new Error('Wrong response data hash.'))
                 }
                 /* Get data from packet. */
                 let data = response.slice(3, ln-2)
                 /* Check response type. */
                 if ( data.length == 1 && data[0] == 0x00 ) {
                     /* Response receive as ACK. */
                 } else 
                 if ( data.length == 1 && data[0] == 0xFF ) {
                     /* Response receive as NAK. */
                     reject(new Error('Wrong request data hash.'))
                 } else {
                     /* Send ACK. */
                     this.debug("Send ACK")
                     await self.serial.write(self.commands.Ack.request())
                 }
                 /* Update flag. */
                 self.isSend = false
                 /* Send event. */
                 resolve(data)
             }
             /* Bind event. */
             self.parser.once('data', handler)
             /* Update flag. */
             self.isSend = true
             /* Send packet. */
             this.debug(`request => ${request.toString()}`)
             await wait(100)
             self.serial.write(request)
             /* Bind timeout handler. */
             timer = setTimeout(timerHandler, timeout)
         })
     }
 
     /**
      * Execute the specified command.
      * 
      * @param {Object} command Target command.
      * @param {Object} params Execute parameters.
      * @param {Number} timeout The maximum time to complete this action.
      * @returns {Promise}
      */
     execute = (command: any, params: any[] = [], timeout: number = 1000) => {
         /* Linked self. */
         let self = this
         /* Async worker. */
         return new Promise<any>(async (resolve, reject) => {
             try {
                 /* Preparing command to send. */
                 let request = command.request(params)
                 /* Waiting if another command is being sending. */
                 await self.waitSending(timeout)
                 /* Send command to device. */
                 let response = await self.send(request, timeout)
                 /* Processing command response. */
                 resolve(command.response(response)) 
             } catch (error) {
                 /* !!! */
                 reject(error)
             }
         })
     }
 
     /* ----------------------------------------------------------------------- */
 
     /**
      * Calculation packet checksum.
      * 
      * @param {Buffer} buffer Raw data for calculation.
      * @returns {Number} Calculated checksum.
      */
     getCRC16 = (buffer: Buffer) => {
         let CRC = 0
         let buf = Buffer.alloc(2)
         for ( let i = 0; i < buffer.length; i++ ) {
             CRC ^= buffer[i]
             for ( let j = 0; j < 8; j++ ) {
                 if ( CRC & 0x0001 ) {
                     CRC >>= 1
                     CRC ^= CRC_POLY
                 } else CRC >>= 1
             }
         }
         buf.writeUInt16BE(CRC, 0)
         return Array.prototype.reverse.call(buf)
     }
 
     /**
      * Printing data to console.
      * 
      * @param {Any} params Data for printing to console.
      */
     debug = (...params: any) => {
         if ( this.isDebug ) {
             console.log(params)
         }
     }
 
 }
 
 export default BankTerminal
 
 /* End of file BankTerminal.ts */
